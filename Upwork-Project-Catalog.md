# Upwork Project Catalog: Advanced Tracking & Analytics Implementation

## Title

**You will get Integration of Meta Pixel, CAPI, GA4, TikTok Pixel, and GTM in your Next.js, Node.js, and React app**

---

## Project Overview

I provide professional **Integration of Meta Pixel, CAPI, GA4, TikTok Pixel, and GTM in Next.js and Node.js**, ensuring your marketing data is 100% accurate, bypassing ad-blockers and iOS privacy updates for higher ROAS.

I specialize in **Next.js, Node.js, React, and Modern Web Frameworks**, implementing robust tracking systems that synchronize browser-side (GTM) and server-side (CAPI) events with perfect deduplication.

### What I Solve:

- **Low Event Match Quality (EMQ):** I push 10+ user parameters (hashed) to Meta for 10/10 scores.
- **Data Discrepancy:** Ensuring GA4 and Meta Pixel show consistent numbers.
- **iOS 14.5+ Issues:** Server-side tracking bypasses browser limitations.
- **Deduplication Errors:** Eliminating double-counting with unique Event IDs.

---

## Service Packages

| Feature                | **Starter: Basic Tracking** | **Standard: Full E-commerce**       | **Advanced: Max Optimization**        |
| :--------------------- | :-------------------------- | :---------------------------------- | :------------------------------------ |
| **Price (Est.)**       | $150                        | $350                                | $600+                                 |
| **Delivery Time**      | 3 Days                      | 5 Days                              | 7 Days                                |
| **Google Tag Manager** | Setup & Integration         | Advanced Data Layer                 | Custom GTM Architecture               |
| **GA4 Tracking**       | Basic Page Views            | Full E-commerce (Purchase/Checkout) | Custom Dimensions & Funnels           |
| **Meta Pixel**         | Browser-side only           | Browser + Server (CAPI)             | 10/10 Match Quality Setup             |
| **TikTok Pixel**       | Basic Pixel Setup           | Events API Integration              | Advanced Event Matching               |
| **Deduplication**      | No                          | Yes (Basic)                         | Yes (Advanced Event ID)               |
| **User Data Hashing**  | No                          | Email & Phone                       | 10+ Parameters (FN, LN, PH, EM, etc.) |
| **Platform Support**   | Shopify/WP                  | Custom Code/JS                      | Next.js/React Specialist              |

---

## What’s Included in the "Advanced" Package?

1.  **Comprehensive User Data Tracking**: Implementing high-precision matching by sending hashed:
    - Email & Phone Number (Normalized for international standards)
    - First & Last Name (With smart splitting logic for full names)
    - City, State, Zip, and Country (ISO-standard normalization)
    - External ID & Click IDs (FBP/FBC persistence for 90+ days)
    - IP Address & User Agent caching for performance
2.  **Server-Side Conversions API (CAPI)**: Direct server-to-server communication using SHA-256 hashing to capture events missed by browsers.
3.  **Perfect Deduplication Architecture**:
    - **Deterministic Purchase IDs**: Ensuring `order_id` based deduplication for zero double-counts.
    - **Custom Event ID Resolution**: Prioritizing manual IDs and fallback random seeds for consistent cross-channel matching.
4.  **Multi-Platform Tracking**:
    - **GA4 Enhanced E-commerce**: Complete tracking for the full funnel: `view_item`, `add_to_cart`, `begin_checkout`, `add_payment_info`, and `purchase`.
    - **TikTok Pixel & Events API**: Synchronized tracking for TikTok Ads optimization.
    - **GTM Architecture**: Clean and scalable Google Tag Manager setup with custom Data Layer.
5.  **Technical Implementation**:
    - Next.js Server Actions, API Routes, or **custom Node.js backend** integration.
    - Automated data normalization (Phone/Email/DOB/Gender formatting).
    - Clean data handling (automatic null/undefined property removal to reduce payload weight).
    - Persistent Visitor IDs for anonymous user journey tracking.

---

## Steps to Complete

1.  **Audit & Planning**: Review current tracking setup and identify gaps.
2.  **Container Configuration**: Setup GTM containers and GA4 properties.
3.  **Data Layer Implementation**: (For custom sites) Implement a robust Data Layer or Tracking Helper logic.
4.  **Meta CAPI Integration**: Setup the server-side endpoint and event triggers.
5.  **Validation & Testing**: Use Meta Events Manager (Test Events) and GTM Preview mode to ensure 100% accuracy.
6.  **Handover & Documentation**: Provide a summary of the setup and instructions for future maintenance.

---

## Frequently Asked Questions

**Q: Why do I need Meta CAPI if I already have the Pixel?**
A: Browsers are increasingly blocking cookies and scripts. CAPI sends data directly from your server to Meta, ensuring you don't miss sales data from users with ad-blockers or iOS devices.

**Q: How do you achieve a 10/10 Match Quality score?**
A: Meta assigns a score based on how much user information you send. By securely hashing and sending details like City, State, and Name along with Email/Phone, we maximize the chance of Meta finding the user, leading to better ad targeting.

**Q: Do you work with Next.js App Router and React?**
A: Yes! I specialize in modern **React and Next.js** architectures, including handling tracking in Server Components vs. Client Components and using Server Actions for secure CAPI calls.

---

## Why Choose Me?

- **Technical Expertise**: I don't just "plug and play." I write clean, optimized code for high-performance applications.
- **Match Quality Obsessed**: I aim for the highest possible match scores to make your ads perform better.
- **Privacy First**: All sensitive data is normalized and SHA-256 hashed before transmission.
