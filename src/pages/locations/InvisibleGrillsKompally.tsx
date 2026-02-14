 import { ServiceLocationPage } from "./ServiceLocationPage";
 
 export default function InvisibleGrillsKompally() {
   return (
     <ServiceLocationPage
       service="Invisible Grills"
       serviceSlug="invisible-grills"
       location="Kompally"
       locationSlug="kompally"
       description="Expert invisible grill installation in Kompally. Quality safety solutions for growing residential areas including Gundlapochampally, Petbasheerabad, and the Medchal corridor."
       localities={[
         "Gundlapochampally",
         "Petbasheerabad",
         "Medchal",
         "Kandlakoya",
         "Bachupally",
         "Jeedimetla",
         "Bollaram",
         "Suraram",
         "Dulapally",
         "IDA Bollaram",
         "Patancheru Road",
         "ORR Kompally",
       ]}
       benefits={[
         "Growing area specialists",
         "New project expertise",
         "10-year warranty",
         "Competitive pricing",
         "Fast installation",
         "Local support team",
       ]}
       mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30425.67877648!2d78.4626!3d17.5454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb05cd2d3e5555%3A0x3d8b5ff16f5dc78!2sKompally%2C%20Secunderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1706789012345!5m2!1sen!2sin"
     />
   );
 }