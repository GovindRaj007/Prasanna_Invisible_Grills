import { ServiceLocationPage } from "./ServiceLocationPage";

export default function InvisibleGrillsVisakhapatnam() {
  return (
    <ServiceLocationPage
      service="Invisible Grills"
      serviceSlug="invisible-grills"
      location="Visakhapatnam"
      locationSlug="visakhapatnam"
      description="Premium invisible grill installation in Visakhapatnam with coastal-grade 316 marine stainless steel. Designed to withstand the humid coastal climate of Vizag. Serving Beach Road, MVP Colony, Madhurawada, and all Vizag areas."
      localities={[
        "Beach Road",
        "MVP Colony",
        "Siripuram",
        "Madhurawada",
        "Gajuwaka",
        "Seethammadhara",
        "Dwaraka Nagar",
        "Rushikonda",
        "PM Palem",
        "Akkayyapalem",
        "Lawsons Bay",
        "NAD Junction",
      ]}
      benefits={[
        "Coastal-grade materials resistant to sea air and humidity",
        "316 marine-grade stainless steel for maximum corrosion resistance",
        "Experience with Vizag's unique architectural requirements",
        "Local team based in Visakhapatnam for quick service",
        "10-year warranty even in coastal conditions",
        "Free site visit and consultation",
      ]}
      mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243239.76735912054!2d83.05124165!3d17.7231276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39431389e6973f%3A0x92d9c20395498468!2sVisakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1706789012345!5m2!1sen!2sin"
    />
  );
}
