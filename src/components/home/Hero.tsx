import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Award, Clock, Phone, ArrowRight } from "lucide-react";

const stats = [
  { icon: Shield, value: "10,000+", label: "Installations" },
  { icon: Award, value: "8+ Years", label: "Experience" },
  { icon: Clock, value: "24/7", label: "Support" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Floating shapes */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <div className="container relative z-10 py-16 md:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Content */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white lg:justify-start">
              <Shield className="h-4 w-4" />
              Trusted by 10,000+ Families
            </div>
            
            <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Premium Invisible Grills & Safety Nets for Your Home
            </h1>
            
            <p className="mb-8 text-lg text-white/80 md:text-xl">
              Protect your loved ones with our state-of-the-art invisible grills and safety net solutions. 
              Professional installation across Hyderabad, Vijayawada, and Visakhapatnam.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button
                size="lg"
                className="w-full cta-gradient text-white hover:opacity-90 sm:w-auto"
                asChild
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Get Free Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
                asChild
              >
                <a href="tel:+919876543210" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  +91 98765 43210
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="mx-auto mb-2 h-6 w-6 text-white/80" />
                  <div className="font-heading text-2xl font-bold text-white md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square">
              {/* Decorative elements */}
              <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-sm" />
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border-2 border-white/20" />
              
              {/* Main visual content */}
              <div className="absolute inset-4 flex items-center justify-center rounded-2xl bg-gradient-to-br from-white/20 to-white/5">
                <div className="text-center">
                  <div className="mb-4 inline-flex h-24 w-24 items-center justify-center rounded-full bg-white/20 floating">
                    <Shield className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">Safety First</h3>
                  <p className="mt-2 text-white/70">Your Family's Protection</p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="absolute -left-8 top-1/4 rounded-xl bg-white p-4 shadow-xl fade-in">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                    <Award className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">ISO Certified</p>
                    <p className="text-xs text-muted-foreground">Quality Assured</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-1/4 rounded-xl bg-white p-4 shadow-xl fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Same Day</p>
                    <p className="text-xs text-muted-foreground">Installation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}
