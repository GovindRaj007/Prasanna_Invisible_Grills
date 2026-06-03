/**
 * Google Analytics 4 (GA4) Tracking Hook
 * Comprehensive event tracking for enterprise SEO
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_CONFIG } from "@/config/seo.constants";

// Declare gtag function
declare function gtag(command: string, action?: string, params?: Record<string, any>): void;

export interface GA4EventParams {
  event: string;
  [key: string]: any;
}

export interface PageViewParams {
  page_path: string;
  page_title: string;
  page_location?: string;
}

export interface ConversionParams {
  currency?: string;
  value?: number;
  [key: string]: any;
}

/**
 * useGA4Tracking Hook
 * Automatically tracks page views and provides event tracking
 */
export function useGA4Tracking() {
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    if (typeof gtag !== "undefined") {
      const pageTitle = document.title;
      const pageLocation = `${window.location.origin}${location.pathname}`;

      gtag("event", "page_view", {
        page_path: location.pathname,
        page_title: pageTitle,
        page_location: pageLocation,
      });
    }
  }, [location]);

  /**
   * Track custom event
   */
  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof gtag !== "undefined") {
      gtag("event", eventName, {
        ...params,
        timestamp: new Date().toISOString(),
      });
    }
  };

  /**
   * Track service view
   */
  const trackServiceView = (serviceName: string, serviceSlug: string) => {
    trackEvent("view_service", {
      service_name: serviceName,
      service_slug: serviceSlug,
      event_category: "service",
      event_label: serviceName,
    });
  };

  /**
   * Track location view
   */
  const trackLocationView = (locationName: string, locationSlug: string, state?: string) => {
    trackEvent("view_location", {
      location_name: locationName,
      location_slug: locationSlug,
      state: state,
      event_category: "location",
      event_label: locationName,
    });
  };

  /**
   * Track service + location combination view
   */
  const trackServiceLocationView = (
    serviceName: string,
    locationName: string,
    serviceSlug: string,
    locationSlug: string
  ) => {
    trackEvent("view_service_location", {
      service_name: serviceName,
      location_name: locationName,
      service_slug: serviceSlug,
      location_slug: locationSlug,
      event_category: "service_location",
      event_label: `${serviceName} - ${locationName}`,
    });
  };

  /**
   * Track phone click (call conversion)
   */
  const trackPhoneClick = (phoneNumber: string, location?: string) => {
    trackEvent("phone_click", {
      phone_number: phoneNumber,
      location: location,
      event_category: "engagement",
      event_label: "phone_call",
    });
  };

  /**
   * Track WhatsApp click
   */
  const trackWhatsAppClick = (message?: string) => {
    trackEvent("whatsapp_click", {
      message: message,
      event_category: "engagement",
      event_label: "whatsapp",
    });
  };

  /**
   * Track CTA button click
   */
  const trackCTAClick = (ctaText: string, ctaType: string, location?: string) => {
    trackEvent("cta_click", {
      cta_text: ctaText,
      cta_type: ctaType,
      location: location,
      event_category: "engagement",
      event_label: ctaText,
    });
  };

  /**
   * Track form submission
   */
  const trackFormSubmission = (formName: string, formType: string) => {
    trackEvent("form_submit", {
      form_name: formName,
      form_type: formType,
      event_category: "conversion",
      event_label: formName,
    });
  };

  /**
   * Track contact form submission with conversion
   */
  const trackContactFormSubmission = (email: string, phone: string, subject: string) => {
    trackEvent("contact_submission", {
      email: email,
      phone: phone,
      subject: subject,
      event_category: "conversion",
      event_label: "contact_form",
      value: 1,
      currency: "INR",
    });
  };

  /**
   * Track quote request
   */
  const trackQuoteRequest = (serviceType: string, location?: string) => {
    trackEvent("quote_request", {
      service_type: serviceType,
      location: location,
      event_category: "conversion",
      event_label: "quote_request",
      value: 1,
    });
  };

  /**
   * Track video play
   */
  const trackVideoPlay = (videoTitle: string, videoId?: string) => {
    trackEvent("video_play", {
      video_title: videoTitle,
      video_id: videoId,
      event_category: "engagement",
      event_label: videoTitle,
    });
  };

  /**
   * Track video completion
   */
  const trackVideoComplete = (videoTitle: string, videoDuration?: number) => {
    trackEvent("video_complete", {
      video_title: videoTitle,
      video_duration: videoDuration,
      event_category: "engagement",
      event_label: videoTitle,
      value: 1,
    });
  };

  /**
   * Track FAQ interaction
   */
  const trackFAQInteraction = (faqQuestion: string, category: string) => {
    trackEvent("faq_interaction", {
      faq_question: faqQuestion,
      faq_category: category,
      event_category: "engagement",
      event_label: faqQuestion,
    });
  };

  /**
   * Track image gallery interaction
   */
  const trackGalleryInteraction = (imageTitle: string, imageIndex: number) => {
    trackEvent("gallery_interaction", {
      image_title: imageTitle,
      image_index: imageIndex,
      event_category: "engagement",
      event_label: imageTitle,
    });
  };

  /**
   * Track scroll depth
   */
  const trackScrollDepth = (depth: number, pageSection?: string) => {
    trackEvent("scroll_depth", {
      scroll_depth: depth,
      page_section: pageSection,
      event_category: "engagement",
      event_label: `scroll_${depth}%`,
    });
  };

  /**
   * Track search
   */
  const trackSearch = (searchQuery: string, searchCategory?: string) => {
    trackEvent("search", {
      search_term: searchQuery,
      search_category: searchCategory,
      event_category: "engagement",
      event_label: searchQuery,
    });
  };

  /**
   * Track review submission
   */
  const trackReviewSubmission = (rating: number, reviewText?: string) => {
    trackEvent("review_submit", {
      rating: rating,
      review_text: reviewText,
      event_category: "engagement",
      event_label: `review_${rating}_star`,
      value: rating,
    });
  };

  /**
   * Track comparison interaction
   */
  const trackComparison = (item1: string, item2: string) => {
    trackEvent("comparison_view", {
      item_1: item1,
      item_2: item2,
      event_category: "engagement",
      event_label: `${item1} vs ${item2}`,
    });
  };

  /**
   * Track social share
   */
  const trackSocialShare = (platform: string, contentTitle: string) => {
    trackEvent("social_share", {
      platform: platform,
      content_title: contentTitle,
      event_category: "engagement",
      event_label: platform,
    });
  };

  /**
   * Track outbound link click
   */
  const trackOutboundLink = (url: string, linkText?: string) => {
    trackEvent("outbound_click", {
      outbound_url: url,
      link_text: linkText,
      event_category: "engagement",
      event_label: url,
    });
  };

  /**
   * Track error/exception
   */
  const trackError = (errorMessage: string, errorCode?: string, errorLocation?: string) => {
    trackEvent("exception", {
      description: errorMessage,
      error_code: errorCode,
      error_location: errorLocation,
      event_category: "error",
      event_label: errorMessage,
    });
  };

  /**
   * Track timing (performance metrics)
   */
  const trackTiming = (
    category: string,
    variable: string,
    value: number,
    label?: string
  ) => {
    trackEvent("timing_complete", {
      name: variable,
      value: value,
      category: category,
      label: label,
    });
  };

  /**
   * Track user engagement
   */
  const trackEngagement = (engagementType: string, engagementValue?: number) => {
    trackEvent("user_engagement", {
      engagement_type: engagementType,
      engagement_value: engagementValue,
      event_category: "engagement",
      event_label: engagementType,
    });
  };

  return {
    trackEvent,
    trackServiceView,
    trackLocationView,
    trackServiceLocationView,
    trackPhoneClick,
    trackWhatsAppClick,
    trackCTAClick,
    trackFormSubmission,
    trackContactFormSubmission,
    trackQuoteRequest,
    trackVideoPlay,
    trackVideoComplete,
    trackFAQInteraction,
    trackGalleryInteraction,
    trackScrollDepth,
    trackSearch,
    trackReviewSubmission,
    trackComparison,
    trackSocialShare,
    trackOutboundLink,
    trackError,
    trackTiming,
    trackEngagement,
  };
}

/**
 * Initialize GA4 tracking
 * Call this once in your App.tsx or main entry point
 */
export function initializeGA4(measurementId: string) {
  if (typeof window !== "undefined" && measurementId) {
    // Inject GA4 script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(command: string, action?: string, params?: Record<string, any>) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.dataLayer as any).push(arguments);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag = gtag;
    gtag("js", new Date().toISOString());
    gtag("config", measurementId, {
      page_path: window.location.pathname,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }
}

/**
 * Set user properties for GA4
 */
export function setGA4UserProperties(userId?: string, userProperties?: Record<string, any>) {
  if (typeof gtag !== "undefined") {
    const properties: Record<string, any> = {};

    if (userId) {
      gtag("config", "GA_MEASUREMENT_ID", {
        user_id: userId,
      });
    }

    if (userProperties) {
      Object.entries(userProperties).forEach(([key, value]) => {
        properties[key] = value;
      });
    }

    if (Object.keys(properties).length > 0) {
      gtag("set", "user_properties", properties);
    }
  }
}

export default useGA4Tracking;
