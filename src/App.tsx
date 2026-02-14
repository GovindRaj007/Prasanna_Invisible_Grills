import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/common/ScrollToTop";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import About from "./pages/About";

import InvisibleGrills from "./pages/services/InvisibleGrills";
import InvisibleGrillsDealer from "./pages/services/InvisibleGrillsDealer";
import InvisibleGrillsBalcony from "./pages/services/InvisibleGrillsBalcony";
import InvisibleGrillsWindows from "./pages/services/InvisibleGrillsWindows";
import CeilingClothHanger from "./pages/services/CeilingClothHanger";

import InvisibleGrillsVisakhapatnam from "./pages/locations/InvisibleGrillsVisakhapatnam";
import InvisibleGrillsDealerVisakhapatnam from "./pages/locations/InvisibleGrillsDealerVisakhapatnam";
import InvisibleGrillsBalconyVisakhapatnam from "./pages/locations/InvisibleGrillsBalconyVisakhapatnam";
import InvisibleGrillsWindowsVisakhapatnam from "./pages/locations/InvisibleGrillsWindowsVisakhapatnam";
import CeilingClothHangerVisakhapatnam from "./pages/locations/CeilingClothHangerVisakhapatnam";

import InvisibleGrillsVijayawada from "./pages/locations/InvisibleGrillsVijayawada";
import InvisibleGrillsDealerVijayawada from "./pages/locations/InvisibleGrillsDealerVijayawada";
import InvisibleGrillsBalconyVijayawada from "./pages/locations/InvisibleGrillsBalconyVijayawada";
import InvisibleGrillsWindowsVijayawada from "./pages/locations/InvisibleGrillsWindowsVijayawada";
import CeilingClothHangerVijayawada from "./pages/locations/CeilingClothHangerVijayawada";

import InvisibleGrillsGuntur from "./pages/locations/InvisibleGrillsGuntur";
import InvisibleGrillsDealerGuntur from "./pages/locations/InvisibleGrillsDealerGuntur";
import InvisibleGrillsBalconyGuntur from "./pages/locations/InvisibleGrillsBalconyGuntur";
import InvisibleGrillsWindowsGuntur from "./pages/locations/InvisibleGrillsWindowsGuntur";
import CeilingClothHangerGuntur from "./pages/locations/CeilingClothHangerGuntur";

import InvisibleGrillsTirupati from "./pages/locations/InvisibleGrillsTirupati";
import InvisibleGrillsDealerTirupati from "./pages/locations/InvisibleGrillsDealerTirupati";
import InvisibleGrillsBalconyTirupati from "./pages/locations/InvisibleGrillsBalconyTirupati";
import InvisibleGrillsWindowsTirupati from "./pages/locations/InvisibleGrillsWindowsTirupati";
import CeilingClothHangerTirupati from "./pages/locations/CeilingClothHangerTirupati";

import InvisibleGrillsAnantapur from "./pages/locations/InvisibleGrillsAnantapur";
import InvisibleGrillsDealerAnantapur from "./pages/locations/InvisibleGrillsDealerAnantapur";
import InvisibleGrillsBalconyAnantapur from "./pages/locations/InvisibleGrillsBalconyAnantapur";
import InvisibleGrillsWindowsAnantapur from "./pages/locations/InvisibleGrillsWindowsAnantapur";
import CeilingClothHangerAnantapur from "./pages/locations/CeilingClothHangerAnantapur";

import InvisibleGrillsHyderabad from "./pages/locations/InvisibleGrillsHyderabad";
import InvisibleGrillsDealerHyderabad from "./pages/locations/InvisibleGrillsDealerHyderabad";
import InvisibleGrillsBalconyHyderabad from "./pages/locations/InvisibleGrillsBalconyHyderabad";
import InvisibleGrillsWindowsHyderabad from "./pages/locations/InvisibleGrillsWindowsHyderabad";
import CeilingClothHangerHyderabad from "./pages/locations/CeilingClothHangerHyderabad";

import InvisibleGrillsSecunderabad from "./pages/locations/InvisibleGrillsSecunderabad";
import InvisibleGrillsDealerSecunderabad from "./pages/locations/InvisibleGrillsDealerSecunderabad";
import InvisibleGrillsBalconySecunderabad from "./pages/locations/InvisibleGrillsBalconySecunderabad";
import InvisibleGrillsWindowsSecunderabad from "./pages/locations/InvisibleGrillsWindowsSecunderabad";
import CeilingClothHangerSecunderabad from "./pages/locations/CeilingClothHangerSecunderabad";

import InvisibleGrillsGachibowli from "./pages/locations/InvisibleGrillsGachibowli";
import InvisibleGrillsDealerGachibowli from "./pages/locations/InvisibleGrillsDealerGachibowli";
import InvisibleGrillsBalconyGachibowli from "./pages/locations/InvisibleGrillsBalconyGachibowli";
import InvisibleGrillsWindowsGachibowli from "./pages/locations/InvisibleGrillsWindowsGachibowli";
import CeilingClothHangerGachibowli from "./pages/locations/CeilingClothHangerGachibowli";

import InvisibleGrillsKukatpally from "./pages/locations/InvisibleGrillsKukatpally";
import InvisibleGrillsDealerKukatpally from "./pages/locations/InvisibleGrillsDealerKukatpally";
import InvisibleGrillsBalconyKukatpally from "./pages/locations/InvisibleGrillsBalconyKukatpally";
import InvisibleGrillsWindowsKukatpally from "./pages/locations/InvisibleGrillsWindowsKukatpally";
import CeilingClothHangerKukatpally from "./pages/locations/CeilingClothHangerKukatpally";

import InvisibleGrillsMadhapur from "./pages/locations/InvisibleGrillsMadhapur";
import InvisibleGrillsDealerMadhapur from "./pages/locations/InvisibleGrillsDealerMadhapur";
import InvisibleGrillsBalconyMadhapur from "./pages/locations/InvisibleGrillsBalconyMadhapur";
import InvisibleGrillsWindowsMadhapur from "./pages/locations/InvisibleGrillsWindowsMadhapur";
import CeilingClothHangerMadhapur from "./pages/locations/CeilingClothHangerMadhapur";

import InvisibleGrillsShamshabad from "./pages/locations/InvisibleGrillsShamshabad";
import InvisibleGrillsDealerShamshabad from "./pages/locations/InvisibleGrillsDealerShamshabad";
import InvisibleGrillsBalconyShamshabad from "./pages/locations/InvisibleGrillsBalconyShamshabad";
import InvisibleGrillsWindowsShamshabad from "./pages/locations/InvisibleGrillsWindowsShamshabad";
import CeilingClothHangerShamshabad from "./pages/locations/CeilingClothHangerShamshabad";

import InvisibleGrillsKompally from "./pages/locations/InvisibleGrillsKompally";
import InvisibleGrillsDealerKompally from "./pages/locations/InvisibleGrillsDealerKompally";
import InvisibleGrillsBalconyKompally from "./pages/locations/InvisibleGrillsBalconyKompally";
import InvisibleGrillsWindowsKompally from "./pages/locations/InvisibleGrillsWindowsKompally";
import CeilingClothHangerKompally from "./pages/locations/CeilingClothHangerKompally";

import InvisibleGrillsMiyapur from "./pages/locations/InvisibleGrillsMiyapur";
import InvisibleGrillsDealerMiyapur from "./pages/locations/InvisibleGrillsDealerMiyapur";
import InvisibleGrillsBalconyMiyapur from "./pages/locations/InvisibleGrillsBalconyMiyapur";
import InvisibleGrillsWindowsMiyapur from "./pages/locations/InvisibleGrillsWindowsMiyapur";
import CeilingClothHangerMiyapur from "./pages/locations/CeilingClothHangerMiyapur";

import InvisibleGrillsMedchal from "./pages/locations/InvisibleGrillsMedchal";
import InvisibleGrillsDealerMedchal from "./pages/locations/InvisibleGrillsDealerMedchal";
import InvisibleGrillsBalconyMedchal from "./pages/locations/InvisibleGrillsBalconyMedchal";
import InvisibleGrillsWindowsMedchal from "./pages/locations/InvisibleGrillsWindowsMedchal";
import CeilingClothHangerMedchal from "./pages/locations/CeilingClothHangerMedchal";

import InvisibleGrillsKondapur from "./pages/locations/InvisibleGrillsKondapur";
import InvisibleGrillsDealerKondapur from "./pages/locations/InvisibleGrillsDealerKondapur";
import InvisibleGrillsBalconyKondapur from "./pages/locations/InvisibleGrillsBalconyKondapur";
import InvisibleGrillsWindowsKondapur from "./pages/locations/InvisibleGrillsWindowsKondapur";
import CeilingClothHangerKondapur from "./pages/locations/CeilingClothHangerKondapur";

import InvisibleGrillsKokapet from "./pages/locations/InvisibleGrillsKokapet";
import InvisibleGrillsDealerKokapet from "./pages/locations/InvisibleGrillsDealerKokapet";
import InvisibleGrillsBalconyKokapet from "./pages/locations/InvisibleGrillsBalconyKokapet";
import InvisibleGrillsWindowsKokapet from "./pages/locations/InvisibleGrillsWindowsKokapet";
import CeilingClothHangerKokapet from "./pages/locations/CeilingClothHangerKokapet";

import InvisibleGrillsTellapur from "./pages/locations/InvisibleGrillsTellapur";
import InvisibleGrillsDealerTellapur from "./pages/locations/InvisibleGrillsDealerTellapur";
import InvisibleGrillsBalconyTellapur from "./pages/locations/InvisibleGrillsBalconyTellapur";
import InvisibleGrillsWindowsTellapur from "./pages/locations/InvisibleGrillsWindowsTellapur";
import CeilingClothHangerTellapur from "./pages/locations/CeilingClothHangerTellapur";

import InvisibleGrillsMahbubnagar from "./pages/locations/InvisibleGrillsMahbubnagar";
import InvisibleGrillsDealerMahbubnagar from "./pages/locations/InvisibleGrillsDealerMahbubnagar";
import InvisibleGrillsBalconyMahbubnagar from "./pages/locations/InvisibleGrillsBalconyMahbubnagar";
import InvisibleGrillsWindowsMahbubnagar from "./pages/locations/InvisibleGrillsWindowsMahbubnagar";
import CeilingClothHangerMahbubnagar from "./pages/locations/CeilingClothHangerMahbubnagar";

import InvisibleGrillsWarangal from "./pages/locations/InvisibleGrillsWarangal";
import InvisibleGrillsDealerWarangal from "./pages/locations/InvisibleGrillsDealerWarangal";
import InvisibleGrillsBalconyWarangal from "./pages/locations/InvisibleGrillsBalconyWarangal";
import InvisibleGrillsWindowsWarangal from "./pages/locations/InvisibleGrillsWindowsWarangal";
import CeilingClothHangerWarangal from "./pages/locations/CeilingClothHangerWarangal";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
