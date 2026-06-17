# ⚡ Flash Foodie - Affiliate Food Portal

A high-performance, modern Next.js application designed to supercharge food delivery affiliate marketing (focusing on ShopeeFood, Grab, and LINE MAN). 

This portal acts as both a **public-facing premium landing page** to capture "Last Click Wins" commissions and an **administrative control center** for generating engaging social media broadcasts.

![Flash Foodie Landing Mockup](/public/mockup-placeholder.png) <!-- Note: Replace with actual screenshot path if added to public folder -->

## ✨ Key Features

1. **Premium Deals Landing Page (`/deals`)**
   - A modern, dark-mode, glassmorphism-styled UI designed to maximize conversion rates.
   - Displays top campaigns and curated "Bait Deals" with micro-animations.
   - Fully responsive and optimized for mobile viewing.
   - Real-time updates driven by a Redis backend.

2. **Admin Control Panel (`/admin`)**
   - A secure dashboard for administrators to manage active deals.
   - **Live Landing Page Updates:** Instantly publish new promotional codes and affiliate links directly to the public `/deals` page.
   - **LINE Flex Message Generator:** Automatically generates complex JSON structures (both single Bubbles and multi-card Carousels) based on input deals, ready to be pasted into the LINE Official Account Manager for immediate broadcasting.

3. **Advanced Link Resolver API (`/api/resolve-link`)**
   - Bypasses deep-link app restrictions by analyzing network traffic and redirect chains.
   - **Dual-Path Architecture:** 
     - *Path 1:* Rapidly resolves known API endpoints (e.g., Shopee Internal APIs).
     - *Path 2:* Uses Headless Puppeteer (`@sparticuz/chromium`) as a fallback to scrape dynamic content.
   - Implements **Upstash Redis Caching** to ensure lightning-fast response times and prevent rate-limiting from source applications.

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Frontend:** React 18, Vanilla CSS Modules (Glassmorphism design language)
- **Backend/API:** Next.js Route Handlers
- **Database/Caching:** Upstash Redis Serverless
- **Scraping Engine:** Puppeteer Core + Sparticuz Chromium

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- An Upstash Redis account (for the database)
- An Affiliate Network Account (e.g., Involve Asia, Ecomobi Passio, AccessTrade)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dejoro-vsh/affiliate-food-portal.git
   cd affiliate-food-portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your Upstash credentials:
   ```env
   UPSTASH_REDIS_REST_URL=your_upstash_rest_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_rest_token
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   - Public Landing Page: `http://localhost:3000/deals`
   - Admin Panel: `http://localhost:3000/admin`

## 📊 Workflow & Business Logic

1. **Sourcing:** The Administrator sources high-value discount codes (e.g., 70% off) from an affiliate network like Ecomobi Passio.
2. **Input:** The Admin inputs the deal title, discount code, and generated affiliate URL into the **Admin Control Panel**.
3. **Broadcasting:** The Admin clicks to copy the generated **LINE Flex JSON** and broadcasts it to their LINE Official Account followers.
4. **Synchronization:** The Admin clicks "Save to Landing Page" to instantly update the public `/deals` page.
5. **Conversion:** Followers click the visually appealing LINE Flex message or the Landing Page links, ensuring the affiliate cookie is planted ("Last Click Wins"), resulting in successful commissions.

---
*Designed for maximizing affiliate revenue through superior UX and technical automation.*
