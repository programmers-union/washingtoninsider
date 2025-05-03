import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { url } from "inspector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.washingtoninsider.org/"),
  title: "Business, Stock Market, Crypto, AI & Investment News for Global Market",
  description:
    "Stay updated with breaking news, global business insights, and financial strategies. Explore business investments, market trends, and analysis.",
  keywords:
    "Breaking business news, Global financial insights, Global business investments, Market trends 2025, Private equity insights, Venture capital news, Cryptocurrency updates, Blockchain analysis, AI & tech startup news, Sustainable investing, ESG strategies, Stock market tips, Smart investing, WashingtonInsider",
  openGraph: {
    title: "Business, Stock Market, Crypto, AI & Investment News for Global Market",
    description:
      "Stay updated with breaking news, global business insights, and financial strategies. Explore business investments, market trends, and analysis.",
    url: "https://www.washingtoninsider.org/",
    siteName: "WashingtonInsider",
    images: [
      {
        url: "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
        width: 1024,
        height: 1024,
        alt: "WashingtonInsider Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business, Stock Market, Crypto, AI & Investment News for Global Market",
    description:
      "Stay updated with breaking news, global business insights, and financial strategies. Explore business investments, market trends, and analysis.",
    images:
      "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
  },
  alternates: {
    canonical: "https://www.washingtoninsider.org/",
    languages: {
      en: "https://www.washingtoninsider.org/",
      "x-default": "https://www.washingtoninsider.org/",
    },
  },
  other: {
    author: "WashingtonInsider",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager Head Script */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WC3SMJ6Q');
          `}
        </Script>
        <link
          rel="preload"
          as="image"
          href="/images/julio-herrera-financial-growth.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/images/julio-herrera-financial-growth-blur.webp"
          type="image/webp"
        />

        <Script
          id="structured-data-newsmediaorganization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "NewsMediaOrganization",
                "@id": "https://www.washingtoninsider.org/#organization",
                name: "WashingtonInsider",
                url: "https://www.washingtoninsider.org/",
                foundingDate: "2010-04-05",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
                  width: 1024,
                  height: 1024,
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "Customer Service",
                  email: "support@washingtoninsider.org",
                  areaServed: "US",
                  availableLanguage: ["English"],
                },
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Capitol Hill Ave",
                  addressLocality: "Washington",
                  addressRegion: "DC",
                  postalCode: "20004",
                  addressCountry: "US",
                },
                sameAs: ["https://www.washingtoninsider.org/"],
              },
              null,
              2
            ),
          }}
        />
        <Script
          id="structured-data-site-navigation"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "SiteNavigationElement",
                name: [
                  "Home",
                  "Business",
                  "Stock market",
                  "Cryptocurrency",
                  "Real Estate Investment Trusts",
                  "Artificial intelligence and Tech startups",
                  "Sustainable and ESG investments",
                  "Private Equity and Venture Capital",
                  "Metaverse and virtual real estate",
                ],
                url: [
                  "https://www.washingtoninsider.org/",
                  "https://www.washingtoninsider.org/business/",
                  "https://www.washingtoninsider.org/stocks/",
                  "https://www.washingtoninsider.org/cryptocurrency/",
                  "https://www.washingtoninsider.org/reits/",
                  "https://www.washingtoninsider.org/artificial-intelligence-and-tech-startups/",
                  "https://www.washingtoninsider.org/sustainable-and-esg-investments/",
                  "https://www.washingtoninsider.org/private-equity-and-venture-capital/",
                  "https://www.washingtoninsider.org/metaverse-and-virtual-real-estate/",
                ],
              },
              null,
              2
            ),
          }}
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* <link rel="sitemap" type="application/xml" href="/sitemap.xml" /> */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        {/* Google Tag Manager Body Noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WC3SMJ6Q"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
