 import { ServiceLocationPage } from "./ServiceLocationPage";
 
 export default function InvisibleGrillsShamshabad() {
   return (
     <ServiceLocationPage
       service="Invisible Grills"
       serviceSlug="invisible-grills"
       location="Shamshabad"
       locationSlug="shamshabad"
       description="Professional invisible grill installation in Shamshabad airport zone. Quality safety solutions for new residential projects near Rajiv Gandhi International Airport and surrounding areas."
       localities={[
         "RGIA Airport Area",
         "Mamidipally",
         "Budvel",
         "Kishanguda",
         "Pedda Golconda",
         "Adibatla",
         "Maheshwaram",
         "Tukkuguda",
         "Kothur",
         "Shadnagar",
         "Bongulur",
         "Srisailam Highway",
       ]}
       benefits={[
         "Service for airport zone developments",
         "Affordable new construction pricing",
         "10-year warranty",
         "Bulk project discounts",
         "Quick turnaround",
         "Free site assessment",
       ]}
       mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30492.67877648!2d78.4126!3d17.2454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba0cd2d3e5555%3A0x3d8b5ff16f5dc78!2sShamshabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1706789012345!5m2!1sen!2sin"
     />
   );
 }