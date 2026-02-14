 import { ServiceLocationPage } from "./ServiceLocationPage";
 
 export default function InvisibleGrillsMadhapur() {
   return (
     <ServiceLocationPage
       service="Invisible Grills"
       serviceSlug="invisible-grills"
       location="Madhapur"
       locationSlug="madhapur"
       description="Premium invisible grill installation in Madhapur tech hub. Expert safety solutions for luxury apartments and gated communities in Ayyappa Society, Kavuri Hills, and Cyber Towers area."
       localities={[
         "Ayyappa Society",
         "Kavuri Hills",
         "Cyber Towers",
         "Hitech City",
         "Durgam Cheruvu",
         "Whitefields",
         "Inorbit Mall Area",
         "Raheja Mind Space",
         "Shilparamam",
         "Road No. 36",
         "Road No. 45",
         "Peddamma Temple Area",
       ]}
       benefits={[
         "Premium installation for tech hub",
         "High-rise building expertise",
         "10-year warranty",
         "Weekend appointments available",
         "Free consultation",
         "EMI options available",
       ]}
       mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30452.67877648!2d78.3826!3d17.4454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91b4b9f60e7f%3A0x3d8b5ff16f5dc78!2sMadhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1706789012345!5m2!1sen!2sin"
     />
   );
 }