 import { ServiceLocationPage } from "./ServiceLocationPage";
 
 export default function InvisibleGrillsGachibowli() {
   return (
     <ServiceLocationPage
       service="Invisible Grills"
       serviceSlug="invisible-grills"
       location="Gachibowli"
       locationSlug="gachibowli"
       description="Expert invisible grill installation in Gachibowli IT corridor. Modern safety solutions for premium apartments and high-rise buildings in Financial District, Nanakramguda, and surrounding tech hub areas."
       localities={[
         "Financial District",
         "Nanakramguda",
         "Raidurg",
         "DLF Cyber City",
         "Mind Space",
         "Biodiversity Junction",
         "Gopanpally",
         "Tellapur",
         "Narsingi",
         "Manikonda",
         "Puppalaguda",
         "Khajaguda",
       ]}
       benefits={[
         "Expertise in high-rise installations",
         "Premium materials for IT corridor",
         "10-year warranty coverage",
         "Weekend installation available",
         "Corporate billing options",
         "Same-day quotes",
       ]}
       mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30453.67877648!2d78.3326!3d17.4504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19a7f5d1e4e9a8c!2sGachibowli%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1706789012345!5m2!1sen!2sin"
     />
   );
 }