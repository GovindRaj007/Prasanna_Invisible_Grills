import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { getSiteUrl } from "@/lib/getSiteUrl";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  darkMode?: boolean;
}

export function Breadcrumbs({ items, darkMode = false }: BreadcrumbsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const siteUrl = getSiteUrl();

  // Filter out any "Home" items from the input to avoid duplication
  const filteredItems = items.filter(item => item.label.toLowerCase() !== "home");
  const allItems = [{ label: "Home", href: "/" }, ...filteredItems];

  // Generate Schema.org BreadcrumbList
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  };

  const textColor = darkMode ? "text-white/70" : "text-muted-foreground";
  const activeColor = darkMode ? "text-white" : "text-foreground";
  const hoverColor = darkMode ? "hover:text-white" : "hover:text-primary";
  const iconColor = darkMode ? "text-white/50" : "text-muted-foreground";

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#services");
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className={`mx-1 h-4 w-4 ${iconColor}`} />
              )}
              {index === 0 && <Home className={`mr-1 h-4 w-4 ${textColor}`} />}
              {item.href && index !== allItems.length - 1 ? (
                item.label.toLowerCase() === "services" ? (
                  <button
                    onClick={handleServicesClick}
                    className={`${textColor} transition-colors ${hoverColor}`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`${textColor} transition-colors ${hoverColor}`}
                  >
                    {item.label}
                  </Link>
                )
              ) : (
                <span className={`font-medium ${activeColor}`}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
