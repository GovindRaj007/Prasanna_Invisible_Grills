import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/common/SEOHead";
import { SERVICES } from "@/config/seo.constants";
import { PHONES } from "@/config/business";

/**
 * Rendered for unknown routes. The prerender step writes this to /404.html and
 * .htaccess serves it with a real HTTP 404 status (no soft-404s in Search Console).
 */
const NotFound = () => (
  <Layout>
    <SEOHead
      title="Page Not Found"
      description="The page you are looking for does not exist. Browse our invisible grills and ceiling cloth hanger services."
      canonicalUrl="/404"
      noindex
    />
    <section className="section-bg-1 flex min-h-[60vh] items-center py-16">
      <div className="container text-center">
        <p className="mb-2 font-heading text-6xl font-bold text-primary">404</p>
        <h1 className="mb-4 font-heading text-3xl font-bold text-foreground">Page not found</h1>
        <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
          This page doesn't exist or has moved. Try one of our services below, or call{" "}
          <a href={`tel:${PHONES.primary.e164}`} className="font-semibold text-primary hover:underline">
            {PHONES.primary.display}
          </a>
          .
        </p>
        <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
          <li>
            <Link to="/" className="inline-block rounded-full bg-primary px-5 py-2 text-sm font-medium text-white">
              Home
            </Link>
          </li>
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link
                to={`/${s.slug}`}
                className="inline-block rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                {s.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/contact"
              className="inline-block rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </section>
  </Layout>
);

export default NotFound;
