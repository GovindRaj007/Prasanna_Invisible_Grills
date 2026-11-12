import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/config/business";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  darkMode?: boolean;
}

export function Breadcrumbs({ items, darkMode = false }: BreadcrumbsProps) {
  const { pathname } = useLocation();

  // "Home" is always prepended; generic "Services" crumbs have no real page.
  const filtered = items.filter((item) => !["home", "services"].includes(item.label.toLowerCase()));
  const allItems: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...filtered];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => {
      const isLast = index === allItems.length - 1;
      const href = isLast ? pathname : item.href ?? pathname;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: href === "/" ? `${SITE_URL}/` : `${SITE_URL}${href}`,
      };
    }),
  };

  const textColor = darkMode ? "text-white/70" : "text-muted-foreground";
  const activeColor = darkMode ? "text-white" : "text-foreground";
  const hoverColor = darkMode ? "hover:text-white" : "hover:text-primary";
  const iconColor = darkMode ? "text-white/50" : "text-muted-foreground";

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={index} className="flex items-center">
                {index > 0 && <ChevronRight className={`mx-1 h-4 w-4 ${iconColor}`} aria-hidden="true" />}
                {index === 0 && <Home className={`mr-1 h-4 w-4 ${textColor}`} aria-hidden="true" />}
                {item.href && !isLast ? (
                  <Link to={item.href} className={`${textColor} transition-colors ${hoverColor}`}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={`font-medium ${activeColor}`} aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
