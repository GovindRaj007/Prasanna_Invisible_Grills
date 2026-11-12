import { ComponentType, lazy, ReactNode, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { PageLoader } from "@/components/common/PageLoader";
import { useGTMTracking } from "@/hooks/useGTMTracking";
import { LOCATION_ROUTES, routeToComponentName } from "@/routes";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));

const InvisibleGrills = lazy(() => import("./pages/services/InvisibleGrills"));
const InvisibleGrillsDealer = lazy(() => import("./pages/services/InvisibleGrillsDealer"));
const InvisibleGrillsBalcony = lazy(() => import("./pages/services/InvisibleGrillsBalcony"));
const InvisibleGrillsWindows = lazy(() => import("./pages/services/InvisibleGrillsWindows"));
const CeilingClothHanger = lazy(() => import("./pages/services/CeilingClothHanger"));

// One lazily-loaded chunk per service × location page (pages/locations/<PascalCaseRoute>.tsx)
const locationModules = import.meta.glob<{ default: ComponentType }>([
  "./pages/locations/*.tsx",
  "!./pages/locations/ServiceLocationPage.tsx",
]);

const locationRoutes = LOCATION_ROUTES.flatMap(({ path }) => {
  const loader = locationModules[`./pages/locations/${routeToComponentName(path)}.tsx`];
  if (!loader) {
    if (import.meta.env.DEV) console.warn(`Missing location page component for ${path}`);
    return [];
  }
  return [{ path, Component: lazy(loader) }];
});

/** Route tree shared by the browser (BrowserRouter) and the prerenderer (StaticRouter). */
export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/invisible-grills" element={<InvisibleGrills />} />
        <Route path="/invisible-grills-dealer" element={<InvisibleGrillsDealer />} />
        <Route path="/invisible-grills-balcony" element={<InvisibleGrillsBalcony />} />
        <Route path="/invisible-grills-windows" element={<InvisibleGrillsWindows />} />
        <Route path="/ceiling-cloth-hanger" element={<CeilingClothHanger />} />

        {locationRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export function AppProviders({ children, helmetContext }: { children: ReactNode; helmetContext?: object }) {
  return (
    <HelmetProvider context={helmetContext}>
      <Toaster />
      {children}
    </HelmetProvider>
  );
}

const App = () => {
  useGTMTracking();
  return (
    <AppProviders>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
};

export default App;
