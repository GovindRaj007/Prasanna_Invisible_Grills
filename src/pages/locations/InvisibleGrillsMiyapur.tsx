 import { ServiceLocationPage } from "./ServiceLocationPage";
 
 export default function InvisibleGrillsMiyapur() {
   return (
     <ServiceLocationPage
       service="Invisible Grills"
       serviceSlug="invisible-grills"
       location="Miyapur"
       locationSlug="miyapur"
       description="Quality invisible grill installation in Miyapur. Professional safety solutions for residential complexes in Chandanagar, BHEL, Lingampally and the western Hyderabad corridor."
       localities={[
         "Chandanagar",
         "BHEL",
         "Lingampally",
         "Hafeezpet",
         "Ameenpur",
         "Patancheru",
         "Nallagandla",
         "Tellapur",
         "Gajularamaram",
         "Ramachandrapuram",
         "Gangaram",
         "Madinaguda",
       ]}
       benefits={[
         "Western corridor specialists",
         "Housing society expertise",
         "10-year warranty",
         "Group discounts available",
         "Weekend installations",
         "Local support",
       ]}
       mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30442.67877648!2d78.3426!3d17.4954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f88ddc57%3A0x3d8b5ff16f5dc78!2sMiyapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1706789012345!5m2!1sen!2sin"
     />
   );
 }