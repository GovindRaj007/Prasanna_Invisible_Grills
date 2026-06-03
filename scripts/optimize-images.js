#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts images to WebP with responsive sizes (320-2560px)
 * Generates srcset data for responsive image delivery
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESPONSIVE_SIZES = [320, 640, 960, 1280, 1920, 2560];
const IMAGE_QUALITY = { webp: 80, jpeg: 85 };

const SOURCE_DIRS = [
  '../public/og-images',
  '../public/images',
];

const OUTPUT_BASE = '../public/optimized-images';

/**
 * Create output directory if it doesn't exist
 */
function ensureOutputDir() {
  const outputDir = path.join(__dirname, OUTPUT_BASE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  return outputDir;
}

/**
 * Get all image files from source directories
 */
function getImageFiles() {
  const images = [];

  SOURCE_DIRS.forEach((sourceDir) => {
    const fullPath = path.join(__dirname, sourceDir);

    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️  Source directory not found: ${fullPath}`);
      return;
    }

    const files = fs.readdirSync(fullPath);
    files.forEach((file) => {
      if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
        images.push(path.join(fullPath, file));
      }
    });
  });

  return images;
}

/**
 * Generate responsive image variants
 */
async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const variants = [];

  console.log(`📷 Processing: ${filename}`);

  try {
    // Get original image metadata
    const metadata = await sharp(inputPath).metadata();
    const originalWidth = metadata.width;

    // Generate WebP variants
    for (const size of RESPONSIVE_SIZES) {
      if (size > originalWidth) break; // Don't upscale

      const webpPath = path.join(
        outputDir,
        `${filename}-${size}w.webp`
      );

      await sharp(inputPath)
        .resize(size, null, { withoutEnlargement: true })
        .webp({ quality: IMAGE_QUALITY.webp })
        .toFile(webpPath);

      variants.push({
        format: 'webp',
        size: size,
        path: webpPath,
      });

      console.log(`   ✓ WebP ${size}w`);
    }

    // Generate JPEG fallback variants for older browsers
    for (const size of [640, 1280, 1920]) {
      if (size > originalWidth) break;

      const jpegPath = path.join(
        outputDir,
        `${filename}-${size}w.jpg`
      );

      await sharp(inputPath)
        .resize(size, null, { withoutEnlargement: true })
        .jpeg({ quality: IMAGE_QUALITY.jpeg, progressive: true })
        .toFile(jpegPath);

      variants.push({
        format: 'jpeg',
        size: size,
        path: jpegPath,
      });

      console.log(`   ✓ JPEG ${size}w`);
    }

    return {
      original: inputPath,
      filename: filename,
      originalWidth: originalWidth,
      variants: variants,
    };
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
    return null;
  }
}

/**
 * Generate srcset string for use in HTML
 */
function generateSrcset(variants, format = 'webp') {
  return variants
    .filter((v) => v.format === format)
    .sort((a, b) => a.size - b.size)
    .map((v) => `${v.path} ${v.size}w`)
    .join(', ');
}

/**
 * Generate responsive image metadata JSON
 */
function generateImageMetadataJSON(images) {
  const metadata = {};

  images.forEach((img) => {
    if (!img) return;

    metadata[img.filename] = {
      original: img.original,
      originalWidth: img.originalWidth,
      srcset: {
        webp: generateSrcset(img.variants, 'webp'),
        jpeg: generateSrcset(img.variants, 'jpeg'),
      },
      sizes: '(max-width: 640px) 100vw, (max-width: 1200px) 75vw, 1200px',
      variants: img.variants.map((v) => ({
        format: v.format,
        size: v.size,
        path: path.relative(
          path.join(__dirname, '../public'),
          v.path
        ),
      })),
    };
  });

  return metadata;
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🖼️  Image Optimization Script');
  console.log('════════════════════════════════════════════════\n');

  const outputDir = ensureOutputDir();
  const images = getImageFiles();

  if (images.length === 0) {
    console.warn('⚠️  No images found to optimize');
    return;
  }

  console.log(`📂 Found ${images.length} images to optimize\n`);

  const optimizedImages = [];

  for (const imagePath of images) {
    const result = await optimizeImage(imagePath, outputDir);
    if (result) {
      optimizedImages.push(result);
    }
  }

  // Generate metadata JSON
  const metadata = generateImageMetadataJSON(optimizedImages);
  const metadataPath = path.join(outputDir, 'image-metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  console.log('\n✅ Image Optimization Complete!\n');
  console.log('📊 Statistics:');
  console.log(`   Original images: ${images.length}`);
  console.log(`   Optimized variants: ${optimizedImages.reduce((sum, img) => sum + img.variants.length, 0)}`);
  console.log(`   Total WebP files: ${optimizedImages.reduce((sum, img) => sum + img.variants.filter(v => v.format === 'webp').length, 0)}`);
  console.log(`   Total JPEG files: ${optimizedImages.reduce((sum, img) => sum + img.variants.filter(v => v.format === 'jpeg').length, 0)}`);

  console.log('\n📁 Output Directory:');
  console.log(`   ${outputDir}\n`);

  console.log('💾 Metadata saved to:');
  console.log(`   ${metadataPath}\n`);

  console.log('✨ Features:');
  console.log('   ✓ WebP format for modern browsers (30-40% smaller)');
  console.log('   ✓ JPEG fallback for older browsers');
  console.log('   ✓ Responsive sizes (320px to 2560px)');
  console.log('   ✓ Optimized quality (WebP: 80%, JPEG: 85%)');
  console.log('   ✓ Progressive JPEG encoding');
  console.log('   ✓ Metadata JSON for frontend integration');
  console.log('   ✓ No upscaling of images\n');

  console.log('🚀 Usage in Components:');
  console.log(`   import imageMetadata from '/optimized-images/image-metadata.json'`);
  console.log(`   const { srcset, sizes } = imageMetadata['image-name']`);
  console.log(`   <picture>`);
  console.log(`     <source srcSet={srcset.webp} type="image/webp" />`);
  console.log(`     <source srcSet={srcset.jpeg} type="image/jpeg" />`);
  console.log(`     <img src="..." srcSet={srcset.jpeg} sizes={sizes} />`);
  console.log(`   </picture>\n`);
}

main().catch(console.error);
