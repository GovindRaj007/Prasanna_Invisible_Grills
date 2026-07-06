const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../src/config/seo.constants.ts');
let src = fs.readFileSync(filePath, 'utf8');

function dedupeArrayLiteral(match, p1, p2){
  const items = [];
  const regex = /(['"])(.*?)\1/g;
  let m;
  while((m = regex.exec(p2)) !== null){
    items.push(m[2].trim());
  }
  const seen = new Set();
  const out = [];
  for(const it of items){
    const key = it.toLowerCase();
    if(!seen.has(key)){
      seen.add(key);
      out.push(it);
    }
  }
  const formatted = out.map(s => `  \"${s}\",`).join('\n');
  return `[\n${formatted}\n]`;
}

// HOME_SEO_KEYWORDS
src = src.replace(/export const HOME_SEO_KEYWORDS = \[((?:.|\n)*?)\] as const;/m, (m, p1)=>{
  const newArr = dedupeArrayLiteral(m, '[', p1);
  return `export const HOME_SEO_KEYWORDS = ${newArr} as const;`;
});

// SERVICE_SEO_KEYWORDS
src = src.replace(/export const SERVICE_SEO_KEYWORDS = \{([\s\S]*?)\} as const;/m, (m, p1)=>{
  let body = p1.replace(/:\s*\[([\s\S]*?)\],/g, (mm, inner)=>{
    const newArr = dedupeArrayLiteral(mm, '[', inner);
    return `: ${newArr},`;
  });
  return `export const SERVICE_SEO_KEYWORDS = {${body}} as const;`;
});

// SERVICES keywords
src = src.replace(/keywords:\s*\[([\s\S]*?)\],/g, (m, p1)=>{
  const newArr = dedupeArrayLiteral(m, '[', p1);
  return `keywords: ${newArr},`;
});

// LOCATIONS keywords
src = src.replace(/keywords:\s*\[([\s\S]*?)\],/g, (m, p1)=>{
  const newArr = dedupeArrayLiteral(m, '[', p1);
  return `keywords: ${newArr},`;
});

fs.writeFileSync(filePath, src, 'utf8');
console.log('seo.constants.ts normalized.');
