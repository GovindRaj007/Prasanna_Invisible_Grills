 import { ServiceLocationPage } from "./ServiceLocationPage";
 
 export default function InvisibleGrillsHyderabad() {
   return (
     <ServiceLocationPage
       service="Invisible Grills"
       serviceSlug="invisible-grills"
       location="Hyderabad"
       locationSlug="hyderabad"
       description="Premium invisible grill installation in Hyderabad. Modern safety solutions with marine-grade SS316 stainless steel for apartments and villas across Banjara Hills, Jubilee Hills, Hitech City, and all Hyderabad areas."
       localities={[
         "Banjara Hills",
         "Jubilee Hills",
         "Hitech City",
         "Madhapur",
         "Kondapur",
         "Gachibowli",
         "Kukatpally",
         "Secunderabad",
         "Begumpet",
         "Ameerpet",
         "Somajiguda",
         "Himayatnagar",
       ]}
       benefits={[
         "Premium SS316 marine-grade steel",
         "Expert installation team in Hyderabad",
         "10-year warranty on all installations",
         "Child and pet safety certified",
         "Same-day site assessment",
         "Competitive pricing",
       ]}
       mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3199888726!2d78.24323145!3d17.4123487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1706789012345!5m2!1sen!2sin"
     />
   );
 }