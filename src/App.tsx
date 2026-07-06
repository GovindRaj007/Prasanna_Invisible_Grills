
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { PageLoader } from "@/components/common/PageLoader";
import { useGTMTracking } from "@/hooks/useGTMTracking";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));

const InvisibleGrills = lazy(() => import("./pages/services/InvisibleGrills"));
const InvisibleGrillsDealer = lazy(() => import("./pages/services/InvisibleGrillsDealer"));
const InvisibleGrillsBalcony = lazy(() => import("./pages/services/InvisibleGrillsBalcony"));
const InvisibleGrillsWindows = lazy(() => import("./pages/services/InvisibleGrillsWindows"));
const CeilingClothHanger = lazy(() => import("./pages/services/CeilingClothHanger"));

const InvisibleGrillsVisakhapatnam = lazy(() => import("./pages/locations/InvisibleGrillsVisakhapatnam"));
const InvisibleGrillsDealerVisakhapatnam = lazy(() => import("./pages/locations/InvisibleGrillsDealerVisakhapatnam"));
const InvisibleGrillsBalconyVisakhapatnam = lazy(() => import("./pages/locations/InvisibleGrillsBalconyVisakhapatnam"));
const InvisibleGrillsWindowsVisakhapatnam = lazy(() => import("./pages/locations/InvisibleGrillsWindowsVisakhapatnam"));
const CeilingClothHangerVisakhapatnam = lazy(() => import("./pages/locations/CeilingClothHangerVisakhapatnam"));

const InvisibleGrillsRajahmundry = lazy(() => import("./pages/locations/InvisibleGrillsRajahmundry"));
const InvisibleGrillsDealerRajahmundry = lazy(() => import("./pages/locations/InvisibleGrillsDealerRajahmundry"));
const InvisibleGrillsBalconyRajahmundry = lazy(() => import("./pages/locations/InvisibleGrillsBalconyRajahmundry"));
const InvisibleGrillsWindowsRajahmundry = lazy(() => import("./pages/locations/InvisibleGrillsWindowsRajahmundry"));
const CeilingClothHangerRajahmundry = lazy(() => import("./pages/locations/CeilingClothHangerRajahmundry"));

const InvisibleGrillsVijayawada = lazy(() => import("./pages/locations/InvisibleGrillsVijayawada"));
const InvisibleGrillsDealerVijayawada = lazy(() => import("./pages/locations/InvisibleGrillsDealerVijayawada"));
const InvisibleGrillsBalconyVijayawada = lazy(() => import("./pages/locations/InvisibleGrillsBalconyVijayawada"));
const InvisibleGrillsWindowsVijayawada = lazy(() => import("./pages/locations/InvisibleGrillsWindowsVijayawada"));
const CeilingClothHangerVijayawada = lazy(() => import("./pages/locations/CeilingClothHangerVijayawada"));

const InvisibleGrillsGuntur = lazy(() => import("./pages/locations/InvisibleGrillsGuntur"));
const InvisibleGrillsDealerGuntur = lazy(() => import("./pages/locations/InvisibleGrillsDealerGuntur"));
const InvisibleGrillsBalconyGuntur = lazy(() => import("./pages/locations/InvisibleGrillsBalconyGuntur"));
const InvisibleGrillsWindowsGuntur = lazy(() => import("./pages/locations/InvisibleGrillsWindowsGuntur"));
const CeilingClothHangerGuntur = lazy(() => import("./pages/locations/CeilingClothHangerGuntur"));

const InvisibleGrillsTirupati = lazy(() => import("./pages/locations/InvisibleGrillsTirupati"));
const InvisibleGrillsDealerTirupati = lazy(() => import("./pages/locations/InvisibleGrillsDealerTirupati"));
const InvisibleGrillsBalconyTirupati = lazy(() => import("./pages/locations/InvisibleGrillsBalconyTirupati"));
const InvisibleGrillsWindowsTirupati = lazy(() => import("./pages/locations/InvisibleGrillsWindowsTirupati"));
const CeilingClothHangerTirupati = lazy(() => import("./pages/locations/CeilingClothHangerTirupati"));

const InvisibleGrillsAnantapur = lazy(() => import("./pages/locations/InvisibleGrillsAnantapur"));
const InvisibleGrillsDealerAnantapur = lazy(() => import("./pages/locations/InvisibleGrillsDealerAnantapur"));
const InvisibleGrillsBalconyAnantapur = lazy(() => import("./pages/locations/InvisibleGrillsBalconyAnantapur"));
const InvisibleGrillsWindowsAnantapur = lazy(() => import("./pages/locations/InvisibleGrillsWindowsAnantapur"));
const CeilingClothHangerAnantapur = lazy(() => import("./pages/locations/CeilingClothHangerAnantapur"));

const InvisibleGrillsHyderabad = lazy(() => import("./pages/locations/InvisibleGrillsHyderabad"));
const InvisibleGrillsDealerHyderabad = lazy(() => import("./pages/locations/InvisibleGrillsDealerHyderabad"));
const InvisibleGrillsBalconyHyderabad = lazy(() => import("./pages/locations/InvisibleGrillsBalconyHyderabad"));
const InvisibleGrillsWindowsHyderabad = lazy(() => import("./pages/locations/InvisibleGrillsWindowsHyderabad"));
const CeilingClothHangerHyderabad = lazy(() => import("./pages/locations/CeilingClothHangerHyderabad"));

const InvisibleGrillsSecunderabad = lazy(() => import("./pages/locations/InvisibleGrillsSecunderabad"));
const InvisibleGrillsDealerSecunderabad = lazy(() => import("./pages/locations/InvisibleGrillsDealerSecunderabad"));
const InvisibleGrillsBalconySecunderabad = lazy(() => import("./pages/locations/InvisibleGrillsBalconySecunderabad"));
const InvisibleGrillsWindowsSecunderabad = lazy(() => import("./pages/locations/InvisibleGrillsWindowsSecunderabad"));
const CeilingClothHangerSecunderabad = lazy(() => import("./pages/locations/CeilingClothHangerSecunderabad"));

const InvisibleGrillsGachibowli = lazy(() => import("./pages/locations/InvisibleGrillsGachibowli"));
const InvisibleGrillsDealerGachibowli = lazy(() => import("./pages/locations/InvisibleGrillsDealerGachibowli"));
const InvisibleGrillsBalconyGachibowli = lazy(() => import("./pages/locations/InvisibleGrillsBalconyGachibowli"));
const InvisibleGrillsWindowsGachibowli = lazy(() => import("./pages/locations/InvisibleGrillsWindowsGachibowli"));
const CeilingClothHangerGachibowli = lazy(() => import("./pages/locations/CeilingClothHangerGachibowli"));

const InvisibleGrillsKukatpally = lazy(() => import("./pages/locations/InvisibleGrillsKukatpally"));
const InvisibleGrillsDealerKukatpally = lazy(() => import("./pages/locations/InvisibleGrillsDealerKukatpally"));
const InvisibleGrillsBalconyKukatpally = lazy(() => import("./pages/locations/InvisibleGrillsBalconyKukatpally"));
const InvisibleGrillsWindowsKukatpally = lazy(() => import("./pages/locations/InvisibleGrillsWindowsKukatpally"));
const CeilingClothHangerKukatpally = lazy(() => import("./pages/locations/CeilingClothHangerKukatpally"));

const InvisibleGrillsMadhapur = lazy(() => import("./pages/locations/InvisibleGrillsMadhapur"));
const InvisibleGrillsDealerMadhapur = lazy(() => import("./pages/locations/InvisibleGrillsDealerMadhapur"));
const InvisibleGrillsBalconyMadhapur = lazy(() => import("./pages/locations/InvisibleGrillsBalconyMadhapur"));
const InvisibleGrillsWindowsMadhapur = lazy(() => import("./pages/locations/InvisibleGrillsWindowsMadhapur"));
const CeilingClothHangerMadhapur = lazy(() => import("./pages/locations/CeilingClothHangerMadhapur"));

const InvisibleGrillsShamshabad = lazy(() => import("./pages/locations/InvisibleGrillsShamshabad"));
const InvisibleGrillsDealerShamshabad = lazy(() => import("./pages/locations/InvisibleGrillsDealerShamshabad"));
const InvisibleGrillsBalconyShamshabad = lazy(() => import("./pages/locations/InvisibleGrillsBalconyShamshabad"));
const InvisibleGrillsWindowsShamshabad = lazy(() => import("./pages/locations/InvisibleGrillsWindowsShamshabad"));
const CeilingClothHangerShamshabad = lazy(() => import("./pages/locations/CeilingClothHangerShamshabad"));

const InvisibleGrillsKompally = lazy(() => import("./pages/locations/InvisibleGrillsKompally"));
const InvisibleGrillsDealerKompally = lazy(() => import("./pages/locations/InvisibleGrillsDealerKompally"));
const InvisibleGrillsBalconyKompally = lazy(() => import("./pages/locations/InvisibleGrillsBalconyKompally"));
const InvisibleGrillsWindowsKompally = lazy(() => import("./pages/locations/InvisibleGrillsWindowsKompally"));
const CeilingClothHangerKompally = lazy(() => import("./pages/locations/CeilingClothHangerKompally"));

const InvisibleGrillsMiyapur = lazy(() => import("./pages/locations/InvisibleGrillsMiyapur"));
const InvisibleGrillsDealerMiyapur = lazy(() => import("./pages/locations/InvisibleGrillsDealerMiyapur"));
const InvisibleGrillsBalconyMiyapur = lazy(() => import("./pages/locations/InvisibleGrillsBalconyMiyapur"));
const InvisibleGrillsWindowsMiyapur = lazy(() => import("./pages/locations/InvisibleGrillsWindowsMiyapur"));
const CeilingClothHangerMiyapur = lazy(() => import("./pages/locations/CeilingClothHangerMiyapur"));

const InvisibleGrillsMedchal = lazy(() => import("./pages/locations/InvisibleGrillsMedchal"));
const InvisibleGrillsDealerMedchal = lazy(() => import("./pages/locations/InvisibleGrillsDealerMedchal"));
const InvisibleGrillsBalconyMedchal = lazy(() => import("./pages/locations/InvisibleGrillsBalconyMedchal"));
const InvisibleGrillsWindowsMedchal = lazy(() => import("./pages/locations/InvisibleGrillsWindowsMedchal"));
const CeilingClothHangerMedchal = lazy(() => import("./pages/locations/CeilingClothHangerMedchal"));

const InvisibleGrillsKondapur = lazy(() => import("./pages/locations/InvisibleGrillsKondapur"));
const InvisibleGrillsDealerKondapur = lazy(() => import("./pages/locations/InvisibleGrillsDealerKondapur"));
const InvisibleGrillsBalconyKondapur = lazy(() => import("./pages/locations/InvisibleGrillsBalconyKondapur"));
const InvisibleGrillsWindowsKondapur = lazy(() => import("./pages/locations/InvisibleGrillsWindowsKondapur"));
const CeilingClothHangerKondapur = lazy(() => import("./pages/locations/CeilingClothHangerKondapur"));

const InvisibleGrillsKokapet = lazy(() => import("./pages/locations/InvisibleGrillsKokapet"));
const InvisibleGrillsDealerKokapet = lazy(() => import("./pages/locations/InvisibleGrillsDealerKokapet"));
const InvisibleGrillsBalconyKokapet = lazy(() => import("./pages/locations/InvisibleGrillsBalconyKokapet"));
const InvisibleGrillsWindowsKokapet = lazy(() => import("./pages/locations/InvisibleGrillsWindowsKokapet"));
const CeilingClothHangerKokapet = lazy(() => import("./pages/locations/CeilingClothHangerKokapet"));

const InvisibleGrillsTellapur = lazy(() => import("./pages/locations/InvisibleGrillsTellapur"));
const InvisibleGrillsDealerTellapur = lazy(() => import("./pages/locations/InvisibleGrillsDealerTellapur"));
const InvisibleGrillsBalconyTellapur = lazy(() => import("./pages/locations/InvisibleGrillsBalconyTellapur"));
const InvisibleGrillsWindowsTellapur = lazy(() => import("./pages/locations/InvisibleGrillsWindowsTellapur"));
const CeilingClothHangerTellapur = lazy(() => import("./pages/locations/CeilingClothHangerTellapur"));

const InvisibleGrillsMahbubnagar = lazy(() => import("./pages/locations/InvisibleGrillsMahbubnagar"));
const InvisibleGrillsDealerMahbubnagar = lazy(() => import("./pages/locations/InvisibleGrillsDealerMahbubnagar"));
const InvisibleGrillsBalconyMahbubnagar = lazy(() => import("./pages/locations/InvisibleGrillsBalconyMahbubnagar"));
const InvisibleGrillsWindowsMahbubnagar = lazy(() => import("./pages/locations/InvisibleGrillsWindowsMahbubnagar"));
const CeilingClothHangerMahbubnagar = lazy(() => import("./pages/locations/CeilingClothHangerMahbubnagar"));

const InvisibleGrillsWarangal = lazy(() => import("./pages/locations/InvisibleGrillsWarangal"));
const InvisibleGrillsDealerWarangal = lazy(() => import("./pages/locations/InvisibleGrillsDealerWarangal"));
const InvisibleGrillsBalconyWarangal = lazy(() => import("./pages/locations/InvisibleGrillsBalconyWarangal"));
const InvisibleGrillsWindowsWarangal = lazy(() => import("./pages/locations/InvisibleGrillsWindowsWarangal"));
const CeilingClothHangerWarangal = lazy(() => import("./pages/locations/CeilingClothHangerWarangal"));

const queryClient = new QueryClient();

const App = () => {
  useGTMTracking();
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
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

            <Route path="/invisible-grills-visakhapatnam" element={<InvisibleGrillsVisakhapatnam />} />
            <Route path="/invisible-grills-dealer-visakhapatnam" element={<InvisibleGrillsDealerVisakhapatnam />} />
            <Route path="/invisible-grills-balcony-visakhapatnam" element={<InvisibleGrillsBalconyVisakhapatnam />} />
            <Route path="/invisible-grills-windows-visakhapatnam" element={<InvisibleGrillsWindowsVisakhapatnam />} />
            <Route path="/ceiling-cloth-hanger-visakhapatnam" element={<CeilingClothHangerVisakhapatnam />} />

            <Route path="/invisible-grills-rajahmundry" element={<InvisibleGrillsRajahmundry />} />
            <Route path="/invisible-grills-dealer-rajahmundry" element={<InvisibleGrillsDealerRajahmundry />} />
            <Route path="/invisible-grills-balcony-rajahmundry" element={<InvisibleGrillsBalconyRajahmundry />} />
            <Route path="/invisible-grills-windows-rajahmundry" element={<InvisibleGrillsWindowsRajahmundry />} />
            <Route path="/ceiling-cloth-hanger-rajahmundry" element={<CeilingClothHangerRajahmundry />} />

            <Route path="/invisible-grills-vijayawada" element={<InvisibleGrillsVijayawada />} />
            <Route path="/invisible-grills-dealer-vijayawada" element={<InvisibleGrillsDealerVijayawada />} />
            <Route path="/invisible-grills-balcony-vijayawada" element={<InvisibleGrillsBalconyVijayawada />} />
            <Route path="/invisible-grills-windows-vijayawada" element={<InvisibleGrillsWindowsVijayawada />} />
            <Route path="/ceiling-cloth-hanger-vijayawada" element={<CeilingClothHangerVijayawada />} />

            <Route path="/invisible-grills-guntur" element={<InvisibleGrillsGuntur />} />
            <Route path="/invisible-grills-dealer-guntur" element={<InvisibleGrillsDealerGuntur />} />
            <Route path="/invisible-grills-balcony-guntur" element={<InvisibleGrillsBalconyGuntur />} />
            <Route path="/invisible-grills-windows-guntur" element={<InvisibleGrillsWindowsGuntur />} />
            <Route path="/ceiling-cloth-hanger-guntur" element={<CeilingClothHangerGuntur />} />

            <Route path="/invisible-grills-tirupati" element={<InvisibleGrillsTirupati />} />
            <Route path="/invisible-grills-dealer-tirupati" element={<InvisibleGrillsDealerTirupati />} />
            <Route path="/invisible-grills-balcony-tirupati" element={<InvisibleGrillsBalconyTirupati />} />
            <Route path="/invisible-grills-windows-tirupati" element={<InvisibleGrillsWindowsTirupati />} />
            <Route path="/ceiling-cloth-hanger-tirupati" element={<CeilingClothHangerTirupati />} />

            <Route path="/invisible-grills-anantapur" element={<InvisibleGrillsAnantapur />} />
            <Route path="/invisible-grills-dealer-anantapur" element={<InvisibleGrillsDealerAnantapur />} />
            <Route path="/invisible-grills-balcony-anantapur" element={<InvisibleGrillsBalconyAnantapur />} />
            <Route path="/invisible-grills-windows-anantapur" element={<InvisibleGrillsWindowsAnantapur />} />
            <Route path="/ceiling-cloth-hanger-anantapur" element={<CeilingClothHangerAnantapur />} />

            <Route path="/invisible-grills-hyderabad" element={<InvisibleGrillsHyderabad />} />
            <Route path="/invisible-grills-dealer-hyderabad" element={<InvisibleGrillsDealerHyderabad />} />
            <Route path="/invisible-grills-balcony-hyderabad" element={<InvisibleGrillsBalconyHyderabad />} />
            <Route path="/invisible-grills-windows-hyderabad" element={<InvisibleGrillsWindowsHyderabad />} />
            <Route path="/ceiling-cloth-hanger-hyderabad" element={<CeilingClothHangerHyderabad />} />

            <Route path="/invisible-grills-secunderabad" element={<InvisibleGrillsSecunderabad />} />
            <Route path="/invisible-grills-dealer-secunderabad" element={<InvisibleGrillsDealerSecunderabad />} />
            <Route path="/invisible-grills-balcony-secunderabad" element={<InvisibleGrillsBalconySecunderabad />} />
            <Route path="/invisible-grills-windows-secunderabad" element={<InvisibleGrillsWindowsSecunderabad />} />
            <Route path="/ceiling-cloth-hanger-secunderabad" element={<CeilingClothHangerSecunderabad />} />

            <Route path="/invisible-grills-gachibowli" element={<InvisibleGrillsGachibowli />} />
            <Route path="/invisible-grills-dealer-gachibowli" element={<InvisibleGrillsDealerGachibowli />} />
            <Route path="/invisible-grills-balcony-gachibowli" element={<InvisibleGrillsBalconyGachibowli />} />
            <Route path="/invisible-grills-windows-gachibowli" element={<InvisibleGrillsWindowsGachibowli />} />
            <Route path="/ceiling-cloth-hanger-gachibowli" element={<CeilingClothHangerGachibowli />} />

            <Route path="/invisible-grills-kukatpally" element={<InvisibleGrillsKukatpally />} />
            <Route path="/invisible-grills-dealer-kukatpally" element={<InvisibleGrillsDealerKukatpally />} />
            <Route path="/invisible-grills-balcony-kukatpally" element={<InvisibleGrillsBalconyKukatpally />} />
            <Route path="/invisible-grills-windows-kukatpally" element={<InvisibleGrillsWindowsKukatpally />} />
            <Route path="/ceiling-cloth-hanger-kukatpally" element={<CeilingClothHangerKukatpally />} />

            <Route path="/invisible-grills-madhapur" element={<InvisibleGrillsMadhapur />} />
            <Route path="/invisible-grills-dealer-madhapur" element={<InvisibleGrillsDealerMadhapur />} />
            <Route path="/invisible-grills-balcony-madhapur" element={<InvisibleGrillsBalconyMadhapur />} />
            <Route path="/invisible-grills-windows-madhapur" element={<InvisibleGrillsWindowsMadhapur />} />
            <Route path="/ceiling-cloth-hanger-madhapur" element={<CeilingClothHangerMadhapur />} />

            <Route path="/invisible-grills-shamshabad" element={<InvisibleGrillsShamshabad />} />
            <Route path="/invisible-grills-dealer-shamshabad" element={<InvisibleGrillsDealerShamshabad />} />
            <Route path="/invisible-grills-balcony-shamshabad" element={<InvisibleGrillsBalconyShamshabad />} />
            <Route path="/invisible-grills-windows-shamshabad" element={<InvisibleGrillsWindowsShamshabad />} />
            <Route path="/ceiling-cloth-hanger-shamshabad" element={<CeilingClothHangerShamshabad />} />

            <Route path="/invisible-grills-kompally" element={<InvisibleGrillsKompally />} />
            <Route path="/invisible-grills-dealer-kompally" element={<InvisibleGrillsDealerKompally />} />
            <Route path="/invisible-grills-balcony-kompally" element={<InvisibleGrillsBalconyKompally />} />
            <Route path="/invisible-grills-windows-kompally" element={<InvisibleGrillsWindowsKompally />} />
            <Route path="/ceiling-cloth-hanger-kompally" element={<CeilingClothHangerKompally />} />

            <Route path="/invisible-grills-miyapur" element={<InvisibleGrillsMiyapur />} />
            <Route path="/invisible-grills-dealer-miyapur" element={<InvisibleGrillsDealerMiyapur />} />
            <Route path="/invisible-grills-balcony-miyapur" element={<InvisibleGrillsBalconyMiyapur />} />
            <Route path="/invisible-grills-windows-miyapur" element={<InvisibleGrillsWindowsMiyapur />} />
            <Route path="/ceiling-cloth-hanger-miyapur" element={<CeilingClothHangerMiyapur />} />

            <Route path="/invisible-grills-medchal" element={<InvisibleGrillsMedchal />} />
            <Route path="/invisible-grills-dealer-medchal" element={<InvisibleGrillsDealerMedchal />} />
            <Route path="/invisible-grills-balcony-medchal" element={<InvisibleGrillsBalconyMedchal />} />
            <Route path="/invisible-grills-windows-medchal" element={<InvisibleGrillsWindowsMedchal />} />
            <Route path="/ceiling-cloth-hanger-medchal" element={<CeilingClothHangerMedchal />} />

            <Route path="/invisible-grills-kondapur" element={<InvisibleGrillsKondapur />} />
            <Route path="/invisible-grills-dealer-kondapur" element={<InvisibleGrillsDealerKondapur />} />
            <Route path="/invisible-grills-balcony-kondapur" element={<InvisibleGrillsBalconyKondapur />} />
            <Route path="/invisible-grills-windows-kondapur" element={<InvisibleGrillsWindowsKondapur />} />
            <Route path="/ceiling-cloth-hanger-kondapur" element={<CeilingClothHangerKondapur />} />

            <Route path="/invisible-grills-kokapet" element={<InvisibleGrillsKokapet />} />
            <Route path="/invisible-grills-dealer-kokapet" element={<InvisibleGrillsDealerKokapet />} />
            <Route path="/invisible-grills-balcony-kokapet" element={<InvisibleGrillsBalconyKokapet />} />
            <Route path="/invisible-grills-windows-kokapet" element={<InvisibleGrillsWindowsKokapet />} />
            <Route path="/ceiling-cloth-hanger-kokapet" element={<CeilingClothHangerKokapet />} />

            <Route path="/invisible-grills-tellapur" element={<InvisibleGrillsTellapur />} />
            <Route path="/invisible-grills-dealer-tellapur" element={<InvisibleGrillsDealerTellapur />} />
            <Route path="/invisible-grills-balcony-tellapur" element={<InvisibleGrillsBalconyTellapur />} />
            <Route path="/invisible-grills-windows-tellapur" element={<InvisibleGrillsWindowsTellapur />} />
            <Route path="/ceiling-cloth-hanger-tellapur" element={<CeilingClothHangerTellapur />} />

            <Route path="/invisible-grills-mahbubnagar" element={<InvisibleGrillsMahbubnagar />} />
            <Route path="/invisible-grills-dealer-mahbubnagar" element={<InvisibleGrillsDealerMahbubnagar />} />
            <Route path="/invisible-grills-balcony-mahbubnagar" element={<InvisibleGrillsBalconyMahbubnagar />} />
            <Route path="/invisible-grills-windows-mahbubnagar" element={<InvisibleGrillsWindowsMahbubnagar />} />
            <Route path="/ceiling-cloth-hanger-mahbubnagar" element={<CeilingClothHangerMahbubnagar />} />

            <Route path="/invisible-grills-warangal" element={<InvisibleGrillsWarangal />} />
            <Route path="/invisible-grills-dealer-warangal" element={<InvisibleGrillsDealerWarangal />} />
            <Route path="/invisible-grills-balcony-warangal" element={<InvisibleGrillsBalconyWarangal />} />
            <Route path="/invisible-grills-windows-warangal" element={<InvisibleGrillsWindowsWarangal />} />
            <Route path="/ceiling-cloth-hanger-warangal" element={<CeilingClothHangerWarangal />} />

            <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
