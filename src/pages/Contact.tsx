import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/common/SEOHead";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    location: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
  });
  const { toast } = useToast();

  // Validate name - minimum 7 letters (excluding spaces)
  const isNameValid = (name: string) => {
    const trimmedName = name.trim();
    const letterCount = trimmedName.replace(/\s/g, '').length;
    return letterCount >= 7 && /^[a-zA-Z\s]+$/.test(trimmedName) && trimmedName.length > 0;
  };

  // Validate phone - exactly 10 digits
  const isPhoneValid = (phone: string) => /^\d{10}$/.test(phone);

  // Validate email - proper email format (optional, but must be valid if provided)
  const isEmailValid = (email: string) => {
    if (email.trim() === "") return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  // Check if form is valid for submission
  const isFormValid = 
    isNameValid(formData.name) && 
    isPhoneValid(formData.phone) && 
    isEmailValid(formData.email) &&
    formData.service !== "" && 
    formData.location !== "";

  const handleNameChange = (value: string) => {
    setFormData({...formData, name: value});
    
    if (touched.name) {
      if (value.trim().length === 0) {
        setErrors({...errors, name: ""});
      } else if (!isNameValid(value)) {
        setErrors({...errors, name: "Enter a valid full name"});
      } else {
        setErrors({...errors, name: ""});
      }
    }
  };

  const handleNameBlur = () => {
    setTouched({...touched, name: true});
    if (formData.name.trim().length > 0 && !isNameValid(formData.name)) {
      setErrors({...errors, name: "Enter a valid full name (minimum 7 letters)"});
    }
  };

  const handlePhoneChange = (value: string) => {
    // Only allow digits
    const digitsOnly = value.replace(/\D/g, "");
    // Limit to 10 digits
    const limitedDigits = digitsOnly.slice(0, 10);
    
    setFormData({...formData, phone: limitedDigits});
    
    if (touched.phone) {
      if (limitedDigits.length === 0) {
        setErrors({...errors, phone: ""});
      } else if (!isPhoneValid(limitedDigits)) {
        setErrors({...errors, phone: "Enter a valid 10-digit phone number"});
      } else {
        setErrors({...errors, phone: ""});
      }
    }
  };

  const handlePhoneBlur = () => {
    setTouched({...touched, phone: true});
    if (formData.phone.length > 0 && !isPhoneValid(formData.phone)) {
      setErrors({...errors, phone: "Enter a valid 10-digit phone number"});
    }
  };

  const handleEmailChange = (value: string) => {
    setFormData({...formData, email: value});
    
    if (touched.email) {
      if (value.trim().length === 0) {
        setErrors({...errors, email: ""});
      } else if (!isEmailValid(value)) {
        setErrors({...errors, email: "Enter a valid email address"});
      } else {
        setErrors({...errors, email: ""});
      }
    }
  };

  const handleEmailBlur = () => {
    setTouched({...touched, email: true});
    if (formData.email.trim().length > 0 && !isEmailValid(formData.email)) {
      setErrors({...errors, email: "Enter a valid email address"});
    } else {
      setErrors({...errors, email: ""});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation check
    if (!isFormValid) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create a hidden form and submit it
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://formspree.io/f/mdalzypl";
      form.style.display = "none";

      const fields = {
        name: formData.name.trim(),
        phone: formData.phone,
        email: formData.email.trim() || "no-email@provided.com",
        service: formData.service,
        location: formData.location,
        message: formData.message.trim() || "",
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);

      // Show success message
      toast({
        title: "Success!",
        description: "Your enquiry has been submitted. We'll contact you within 2 hours.",
      });

      // Reset form after submission
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        location: "",
        message: "",
      });
      setErrors({ name: "", phone: "", email: "" });
      setTouched({ name: false, phone: false, email: false });

      // Submit form after a short delay to ensure toast is visible
      setTimeout(() => {
        form.submit();
      }, 1000);

    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again or contact us directly.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Contact Prasanna Invisible Grills | Free Quote & Visit"
        description="Contact Prasanna Invisible Grills for free quote & home visit. Call, WhatsApp, email. Expert consultants ready across Andhra Pradesh & Telangana."
        keywords="contact Prasanna, invisible grills quote, free consultation, invisible grills near me, best invisible grills, expert advice"
        canonicalUrl="/contact"
        ogImage="/og-images/prasanna-invisible-grills-og.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Prasanna Invisible Grills",
          "description": "Contact Prasanna Invisible Grills for free consultation and quote",
          "url": "https://prasannainvisible.in/contact",
          "organization": {
            "@type": "LocalBusiness",
            "name": "Prasanna Invisible Grills",
            "telephone": "+917339306098",
            "email": "info@prasannainvisible.in",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Visakhapatnam",
              "addressRegion": "Andhra Pradesh",
              "addressCountry": "IN"
            }
          }
        }}
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
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/90">Full Name *</Label>
                    <Input 
                      id="name" 
                      placeholder="Your full name" 
                      required 
                      value={formData.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      onBlur={handleNameBlur}
                      className={`bg-white/10 text-white placeholder:text-white/50 ${
                        errors.name 
                          ? "border-red-500 border-2" 
                          : touched.name && isNameValid(formData.name)
                          ? "border-green-500 border-2"
                          : "border-white/20"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-400 font-medium">{errors.name}</p>
                    )}
                    {!errors.name && touched.name && isNameValid(formData.name) && (
                      <p className="text-sm text-green-400 font-medium flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Valid name
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white/90">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="10-digit mobile number" 
                      required 
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      onBlur={handlePhoneBlur}
                      maxLength={10}
                      className={`bg-white/10 text-white placeholder:text-white/50 ${
                        errors.phone 
                          ? "border-red-500 border-2" 
                          : touched.phone && isPhoneValid(formData.phone)
                          ? "border-green-500 border-2"
                          : "border-white/20"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-400 font-medium">{errors.phone}</p>
                    )}
                    {!errors.phone && touched.phone && isPhoneValid(formData.phone) && (
                      <p className="text-sm text-green-400 font-medium flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Valid phone number
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">Email Address (Optional)</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={formData.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={handleEmailBlur}
                    className={`bg-white/10 text-white placeholder:text-white/50 ${
                      errors.email 
                        ? "border-red-500 border-2" 
                        : touched.email && formData.email.trim().length > 0 && isEmailValid(formData.email)
                        ? "border-green-500 border-2"
                        : "border-white/20"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400 font-medium">{errors.email}</p>
                  )}
                  {!errors.email && touched.email && formData.email.trim().length > 0 && isEmailValid(formData.email) && (
                    <p className="text-sm text-green-400 font-medium flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Valid email
                    </p>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-white/90">Service Required *</Label>
                    <Select 
                      value={formData.service} 
                      onValueChange={(value) => setFormData({...formData, service: value})}
                      required
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
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
                    <Select 
                      value={formData.location} 
                      onValueChange={(value) => setFormData({...formData, location: value})}
                      required
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
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
                  <Label htmlFor="message" className="text-white/90">Additional Details (Optional)</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your requirements" 
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50" 
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={loading || !isFormValid}
                  className="w-full cta-gradient text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Enquiry"}
                </Button>
                {!isFormValid && (touched.name || touched.phone || touched.email) && (
                  <p className="text-sm text-amber-400 text-center">
                    Please fill all required fields correctly to submit
                  </p>
                )}
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">Get in Touch</h2>
                <p className="text-muted-foreground">Prefer to reach out directly? Use any of the methods below.</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-3">
                <a href="tel:+917339306098" data-track="call" className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-[hsl(215,25%,15%)] via-[hsl(217,30%,20%)] to-[hsl(220,35%,18%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20"><Phone className="h-6 w-6 text-primary" /></div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">Call Us</p>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-white/70">+91 7339306098</p>
                      <p className="text-white/70">+91 8328376098</p>
                    </div>
                  </div>
                </a>
              </div>
                <a href="https://wa.me/917339306098" data-track="whatsapp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-[hsl(215,25%,15%)] via-[hsl(217,30%,20%)] to-[hsl(220,35%,18%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/20"><WhatsAppIcon className="h-6 w-6 text-[#25D366]" /></div>
                  <div><p className="font-semibold text-white">WhatsApp</p><p className="text-white/70">Chat with us instantly</p></div>
                </a>
                <a href="mailto:info@prasannainvisible.in" className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-[hsl(215,25%,15%)] via-[hsl(217,30%,20%)] to-[hsl(220,35%,18%)] p-4 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20"><Mail className="h-6 w-6 text-primary" /></div>
                  <div><p className="font-semibold text-white">Email</p><p className="text-white/70">info@prasannainvisible.in</p></div>
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
                <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=21-34/1,+Viman+Nagar,+Kakani+Nagar,+Visakhapatnam,+530009"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    📍 Get Directions
                  </a>
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