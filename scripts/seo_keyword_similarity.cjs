const fs = require('fs');
const path = require('path');
const text = fs.readFileSync(path.resolve(__dirname, '../src/config/seo.constants.ts'), 'utf8');

const normalize = (phrase) => {
  const cleaned = phrase.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const tokens = cleaned.split(/\s+/).filter(Boolean).filter(t => !['in','near','me','for','the','and','of','with','to','a','an','on','at','by','our','your'].includes(t));
  return tokens.join(' ');
};

const parseStringList = (text) => {
  const matches = [...text.matchAll(/['\"](.*?)['\"]/g)];
  return matches.map(m => m[1].trim()).filter(Boolean);
};

const parseServiceKeywords = () => {
  const match = text.match(/export const SERVICE_SEO_KEYWORDS = \{([\s\S]*?)\} as const;/);
  if (!match) return {};
  const body = match[1];
  const groups = {};
  const re = /(\w+):\s*\[([\s\S]*?)\],/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    groups[m[1]] = parseStringList(m[2]);
  }
  return groups;
};

const parseServices = () => {
  const match = text.match(/export const SERVICES = \[([\s\S]*?)\] as const;/);
  if (!match) return {};
  const body = match[1];
  const groups = {};
  const itemRe = /\{([\s\S]*?)\}\s*,/g;
  let item;
  while ((item = itemRe.exec(body)) !== null) {
    const slug = item[1].match(/slug:\s*['\"](.*?)['\"]/);
    const kw = item[1].match(/keywords:\s*\[([\s\S]*?)\]/);
    if (slug && kw) {
      groups[slug[1]] = parseStringList(kw[1]);
    }
  }
  return groups;
};

const parseLocations = () => {
  const match = text.match(/export const LOCATIONS = \[([\s\S]*?)\] as const;/);
  if (!match) return {}; // Some files may not have as const
  const body = match[1];
  const groups = {};
  const itemRe = /\{([\s\S]*?)\}\s*,/g;
  let item;
  while ((item = itemRe.exec(body)) !== null) {
    const slug = item[1].match(/slug:\s*['\"](.*?)['\"]/);
    const kw = item[1].match(/keywords:\s*\[([\s\S]*?)\]/);
    if (slug && kw) {
      groups[slug[1]] = parseStringList(kw[1]);
    }
  }
  return groups;
};

const parseHome = () => {
  const match = text.match(/export const HOME_SEO_KEYWORDS = \[([\s\S]*?)\] as const;/);
  if (!match) return [];
  return parseStringList(match[1]);
};

const parseSiteConfig = () => {
  const primary = text.match(/primary:\s*['\"](.*?)['\"]/);
  const secondary = text.match(/secondary:\s*['\"](.*?)['\"]/);
  return {
    primary: primary ? primary[1].split(/,\s*/).map(s => s.trim()).filter(Boolean) : [],
    secondary: secondary ? secondary[1].split(/,\s*/).map(s => s.trim()).filter(Boolean) : []
  };
};

const serviceKeywords = parseServiceKeywords();
const services = parseServices();
const locations = parseLocations();
const homeKeywords = parseHome();
const siteConfig = parseSiteConfig();

const phrases = [];
const addPhrases = (scope, list) => {
  list.forEach(p => phrases.push({ scope, phrase: p, norm: normalize(p) }));
};
addPhrases('SITE_CONFIG.primary', siteConfig.primary);
addPhrases('SITE_CONFIG.secondary', siteConfig.secondary);
addPhrases('HOME_SEO_KEYWORDS', homeKeywords);
Object.entries(serviceKeywords).forEach(([k, list]) => addPhrases(`SERVICE_SEO_KEYWORDS.${k}`, list));
Object.entries(services).forEach(([k, list]) => addPhrases(`SERVICES.${k}`, list));
Object.entries(locations).forEach(([k, list]) => addPhrases(`LOCATIONS.${k}`, list));

const exact = {};
phrases.forEach(({ scope, phrase, norm }) => {
  const key = `${norm}|${phrase.toLowerCase()}`;
  if (!exact[key]) exact[key] = new Set();
  exact[key].add(scope);
});

console.log('=== Exact normalized duplicates across scopes ===');
Object.entries(exact).forEach(([key, scopes]) => {
  if (scopes.size > 1) {
    const phrase = key.split('|')[1];
    console.log(`'${phrase}' appears in ${Array.from(scopes).sort().join(', ')}`);
  }
});

const jaccard = (a, b) => {
  const sa = new Set(a.split(' '));
  const sb = new Set(b.split(' '));
  const inter = new Set([...sa].filter(x => sb.has(x)));
  const union = new Set([...sa, ...sb]);
  if (!union.size) return 0;
  return inter.size / union.size;
};

console.log('\n=== Highly similar phrase pairs (Jaccard >= 0.8) across scopes ===');
for (let i = 0; i < phrases.length; i++) {
  for (let j = i + 1; j < phrases.length; j++) {
    const a = phrases[i];
    const b = phrases[j];
    if (a.scope === b.scope) continue;
    const score = jaccard(a.norm, b.norm);
    if (score >= 0.8 && a.phrase.toLowerCase() !== b.phrase.toLowerCase()) {
      console.log(`${score.toFixed(2)}: '${a.phrase}' (${a.scope}) <=> '${b.phrase}' (${b.scope})`);
    }
  }
}

console.log('\n=== Service keyword coverage mismatches ===');
Object.entries(serviceKeywords).forEach(([key, list]) => {
  const s1 = new Set(list.map(normalize));
  const s2 = new Set((services[key] || []).map(normalize));
  const missing = [...s2].filter(x => !s1.has(x));
  const extra = [...s1].filter(x => !s2.has(x));
  if (missing.length || extra.length) {
    console.log(`${key}:`);
    if (missing.length) console.log(`  missing from SERVICE_SEO_KEYWORDS: ${missing.join(', ')}`);
    if (extra.length) console.log(`  extra in SERVICE_SEO_KEYWORDS: ${extra.join(', ')}`);
  }
});

console.log('\n=== Location vs service overlaps ===');
Object.entries(locations).forEach(([loc, list]) => {
  const locSet = new Set(list.map(normalize));
  Object.entries(serviceKeywords).forEach(([key, kw]) => {
    const overlap = list.filter(p => setHas(normalize(p), kw.map(normalize)));
    if (overlap.length) {
      console.log(`${loc} overlaps with ${key}: ${Array.from(new Set(overlap.map(normalize))).join(', ')}`);
    }
  });
});

function setHas(item, array) {
  return array.some(x => x === item);
}
