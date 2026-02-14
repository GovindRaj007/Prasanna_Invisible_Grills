import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/common/SEOHead";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

export default function Contact() {
  return (
    <Layout>
      <SEOHead
        title="Contact Us"
        description="Get in touch with Prasanna Invisible Grills for a free quote. Call us, WhatsApp, or fill out our contact form."
        keywords="contact invisible grills, get quote invisible grills, invisible grills enquiry"
        canonicalUrl="/contact"
      />

      <section className="section-bg-2 relative py-12 md:py-16">
        <div className="absolute inset-0 grid-pattern-dark opacity-30" />
        <div className="container relative z-10">
          <Breadcrumbs items={[{ label: "Contact" }]} darkMode />
          <h1 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Ready to protect your home? Get in touch for a free consultation and quote. Our team responds within 2 hours.
          </p>
        </div>
      </section>

      <section className="section-bg-1 relative py-8 md:py-12">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 shadow-lg md:p-8">
              <h2 className="mb-6 font-heading text-2xl font-bold text-white">Get Free Quote</h2>
              <form className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/90">Full Name *</Label>
                    <Input id="name" placeholder="Your name" required className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white/90">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="+91 73393 06098" required className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-white/90">Service Required *</Label>
                    <Select>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="Select service" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="invisible-grills">Invisible Grills</SelectItem>
                        <SelectItem value="invisible-grills-dealer">Invisible Grills Dealer</SelectItem>
                        <SelectItem value="invisible-grills-balcony">Invisible Grills for Balcony</SelectItem>
                        <SelectItem value="invisible-grills-windows">Invisible Grill for Windows</SelectItem>
                        <SelectItem value="ceiling-cloth-hanger">Ceiling Cloth Hanger</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white/90">Your Location *</Label>
                    <Select>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white"><SelectValue placeholder="Select city" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visakhapatnam">Visakhapatnam</SelectItem>
                        <SelectItem value="vijayawada">Vijayawada</SelectItem>
                        <SelectItem value="guntur">Guntur</SelectItem>
                        <SelectItem value="tirupati">Tirupati</SelectItem>
                        <SelectItem value="anantapur">Anantapur</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="secunderabad">Secunderabad</SelectItem>
                        <SelectItem value="warangal">Warangal</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white/90">Additional Details</Label>
                  <Textarea id="message" placeholder="Tell us about your requirements" rows={4} className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                </div>
                <Button type="submit" size="lg" className="w-full cta-gradient text-white hover:opacity-90">Submit Enquiry</Button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">Get in Touch</h2>
                <p className="text-muted-foreground">Prefer to reach out directly? Use any of the methods below.</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <a href="tel:+917339306098" className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-[hsl(215,25%,15%)] via-[hsl(217,30%,20%)] to-[hsl(220,35%,18%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20"><Phone className="h-6 w-6 text-primary" /></div>
                    <div><p className="font-semibold text-white">Call Us</p><p className="text-white/70">+91 7339306098</p></div>
                  </a>
                  <a href="tel:+918328376098" className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-[hsl(215,25%,15%)] via-[hsl(217,30%,20%)] to-[hsl(220,35%,18%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20"><Phone className="h-6 w-6 text-primary" /></div>
                    <div><p className="font-semibold text-white">Call Us</p><p className="text-white/70">+91 8328376098</p></div>
                  </a>
                </div>
                <a href="https://wa.me/917339306098" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-[hsl(215,25%,15%)] via-[hsl(217,30%,20%)] to-[hsl(220,35%,18%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/20"><WhatsAppIcon className="h-6 w-6 text-[#25D366]" /></div>
                  <div><p className="font-semibold text-white">WhatsApp</p><p className="text-white/70">Chat with us instantly</p></div>
                </a>
                <a href="mailto:info@prasannagrills.com" className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-[hsl(215,25%,15%)] via-[hsl(217,30%,20%)] to-[hsl(220,35%,18%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20"><Mail className="h-6 w-6 text-primary" /></div>
                  <div><p className="font-semibold text-white">Email</p><p className="text-white/70">prasannainvisible@gmail.com</p></div>
                </a>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,33%,17%)] to-[hsl(215,25%,22%)] p-6 shadow-lg">
                <h3 className="mb-4 font-heading text-lg font-semibold text-white">Head Office</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-accent" />
                    <p className="text-white/70">21-34/1, Viman Nagar,<br />Kakani Nagar, Visakhapatnam – 530009</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-accent" />
                    <div className="text-white/70"><p>Mon - Sat: 9:00 AM - 7:00 PM</p><p>Sunday: 10:00 AM - 5:00 PM</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-bg-5 relative pb-8">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container relative z-10">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground">Find Us</h2>
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.1310241462825!2d83.22323687463464!3d17.73846449259752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3968744d7ba41d%3A0x981e3823aa3ee38c!2s21-3%2F4%2F3%2C%20Viman%20Nagar%2C%20Kakani%20Nagar%2C%20Visakhapatnam%2C%20Andhra%20Pradesh%20530009!5e0!3m2!1sen!2sin!4v1771075787961!5m2!1sen!2sin" 
              width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Prasanna Invisible Grills Office Location"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
