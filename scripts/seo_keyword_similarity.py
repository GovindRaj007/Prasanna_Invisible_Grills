import re
from pathlib import Path
from itertools import combinations

path = Path(__file__).resolve().parent.parent / "src" / "config" / "seo.constants.ts"
text = path.read_text(encoding="utf-8")

# Extract arrays and object arrays from the file.
patterns = {
    "SITE_CONFIG.primary": r"primary:\s*\"([^\"]*)\",",
    "SITE_CONFIG.secondary": r"secondary:\s*\"([^\"]*)\",
    "HOME_SEO_KEYWORDS": r"export const HOME_SEO_KEYWORDS = \[((?:.|\n)*?)\] as const;",
    "SERVICE_SEO_KEYWORDS": r"export const SERVICE_SEO_KEYWORDS = \{([\s\S]*?)\} as const;",
    "SERVICES": r"export const SERVICES = \[((?:.|\n)*?)\] as const;",
    "LOCATIONS": r"export const LOCATIONS = \[((?:.|\n)*?)\] as const;",
}

pairs = []

# parse values from comma-separated string

def parse_string_list(text):
    return [item.strip().strip('"').strip("'").strip() for item in re.findall(r"['\"](.*?)['\"]", text)]

# parse service keyword object
service_keywords = {}
match = re.search(patterns["SERVICE_SEO_KEYWORDS"], text)
if match:
    block = match.group(1)
    for key_match in re.finditer(r"(\w+):\s*\[([\s\S]*?)\],", block):
        key = key_match.group(1)
        service_keywords[key] = parse_string_list(key_match.group(2))

services = {} 
match = re.search(patterns["SERVICES"], text)
if match:
    block = match.group(1)
    for item_match in re.finditer(r"\{([\s\S]*?)\}\s*,", block):
        item = item_match.group(1)
        slug_m = re.search(r"slug:\s*\"([\w-]+)\"", item)
        if not slug_m:
            continue
        slug = slug_m.group(1)
        kw_m = re.search(r"keywords:\s*\[([\s\S]*?)\]", item)
        if kw_m:
            services[slug] = parse_string_list(kw_m.group(1))

locations = {}
match = re.search(patterns["LOCATIONS"], text)
if match:
    block = match.group(1)
    for item_match in re.finditer(r"\{([\s\S]*?)\}\s*,", block):
        item = item_match.group(1)
        city_m = re.search(r"city:\s*\"([^\"]+)\"", item)
        slug_m = re.search(r"slug:\s*\"([^\"]+)\"", item)
        if not slug_m:
            continue
        slug = slug_m.group(1)
        name = city_m.group(1) if city_m else slug
        kw_m = re.search(r"keywords:\s*\[([\s\S]*?)\]", item)
        if kw_m:
            locations[slug] = {"city": name, "keywords": parse_string_list(kw_m.group(1))}

results = {}
results["SITE_CONFIG.primary"] = [x.strip() for x in re.split(r",\s*", re.search(patterns["SITE_CONFIG.primary"], text).group(1)) if x.strip()]
results["SITE_CONFIG.secondary"] = [x.strip() for x in re.split(r",\s*", re.search(patterns["SITE_CONFIG.secondary"], text).group(1)) if x.strip()]
results["HOME_SEO_KEYWORDS"] = parse_string_list(re.search(patterns["HOME_SEO_KEYWORDS"], text).group(1))
results["SERVICE_SEO_KEYWORDS"] = service_keywords
results["SERVICES"] = services
results["LOCATIONS"] = {k: v["keywords"] for k, v in locations.items()}

# Normalization helpers
STOPWORDS = {"in", "near", "me", "for", "the", "and", "of", "with", "to", "a", "an", "on", "at", "by", "our", "your"}

def normalize(phrase):
    text = phrase.lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    tokens = [t for t in re.split(r"\s+", text) if t and t not in STOPWORDS]
    return " ".join(tokens)


def jaccard(a, b):
    set_a = set(a.split())
    set_b = set(b.split())
    if not set_a or not set_b:
        return 0.0
    return len(set_a & set_b) / len(set_a | set_b)

all_entries = []
for scope, items in results.items():
    if isinstance(items, dict):
        for key, kw_list in items.items():
            all_entries.append((f"{scope}.{key}", kw_list))
    else:
        all_entries.append((scope, items))

# flatten phrases with scope.
phrases = []
for scope, items in all_entries:
    for phrase in items:
        phrases.append((scope, phrase, normalize(phrase)))

# exact duplicates across different scopes
exact = {}
for scope, phrase, norm in phrases:
    exact.setdefault((norm, phrase), []).append(scope)

print("=== Exact normalized duplicates across scopes ===")
for (norm, phrase), scopes in exact.items():
    if len(set(scopes)) > 1:
        print(f"{phrase!r} appears in {sorted(set(scopes))}")

# semantic similarity for phrase pairs across different scopes
print("\n=== Highly similar phrase pairs (Jaccard >= 0.80) across scopes ===")
for (s1, p1, n1), (s2, p2, n2) in combinations(phrases, 2):
    if s1 == s2:
        continue
    score = jaccard(n1, n2)
    if score >= 0.8 and p1.lower() != p2.lower():
        print(f"{score:.2f}: {p1!r} ({s1}) <=> {p2!r} ({s2})")

# service vs services exact mismatches
print("\n=== Exact service keyword coverage check ===")
for service_key, kw_list in service_keywords.items():
    service_scope = f"SERVICE_SEO_KEYWORDS.{service_key}"
    service_values = set(normalize(x) for x in kw_list)
    service_page = services.get(service_key)
    if service_page:
        page_scope = f"SERVICES.{service_key}"
        page_values = set(normalize(x) for x in service_page)
        missing = page_values - service_values
        extra = service_values - page_values
        if missing or extra:
            print(f"{service_scope} vs {page_scope}:")
            if missing:
                print(f"  missing from {service_scope}: {sorted(missing)}")
            if extra:
                print(f"  extra in {service_scope}: {sorted(extra)}")

# location specificity check
print("\n=== Location keywords overlapping with service keywords ===")
for loc_key, kw_list in locations.items():
    loc_norm = [normalize(x) for x in kw_list["keywords"]]
    for service_key, service_kw in service_keywords.items():
        service_norm = [normalize(x) for x in service_kw]
        overlap = set(loc_norm) & set(service_norm)
        if overlap:
            print(f"{loc_key} overlaps with {service_key}: {sorted(overlap)}")
