import sharp from 'sharp';
const src='src/assets/logo-Prasanna-invisible-grills.png';
await sharp(src).resize({width:400}).webp({quality:85}).toFile('src/assets/logo-Prasanna-invisible-grills.webp');
await sharp(src).resize({width:600}).png({compressionLevel:9}).toFile('public/logo.png');
// square 512 icon for manifest / schema
await sharp('public/favicon.png').metadata().then(m=>console.log('favicon',m.width,m.height));
for (const f of ['prasanna-invisible-grills-og','invisible-grills-og','balcony-invisible-grills-og','window-invisible-grills-og','ceiling-cloth-hanger-og','invisible-grills-dealer-og']) {
  const p='public/og-images/'+f+'.jpg'; const buf=await sharp(p).resize(1200,630,{fit:'cover'}).jpeg({quality:78,mozjpeg:true}).toBuffer();
  (await import('fs')).writeFileSync(p,buf); console.log(f, Math.round(buf.length/1024)+'KB');
}
