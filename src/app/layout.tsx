import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// app/layout.tsx



export const metadata: Metadata = {
  title: "Julio Herrera Velutini and His Business Investments ",
  description: "Explore Julio Herrera Velutini’s expansive investment portfolio across the UAE, UK, Caribbean, Europe, and Latin America."
  ,
  keywords: [ 
    "julio herrera velutini",
    "julio herrera",
    "Julio Herrera Velutini and His Business Investments in the Global Market",
    "Julio Herrera Velutini is a renowned global investor",
    "private banking strategist",
    "washingtoninsider",
    "Who is Julio Herrera Velutini", 
    "Julio Herrera Velutini net worth", 
    "Julio Herrera Velutini background",
    "Julio Herrera Velutini banking strategies",
    "Britannia Financial Group global investments",
    "Herrera Velutini banking history",
    "Julio Herrera Velutini financial controversies",
    "Latin American banking industry",
    "private wealth management in Europe",
    "high-net-worth banking strategies",
    "investment banking leadership"   
  ],
  robots: "index, follow",
  openGraph: {
    title: "Julio Herrera Velutini and His Business Investments",
    description: "Explore Julio Herrera Velutini’s expansive investment portfolio across the UAE, UK, Caribbean, Europe, and Latin America. Learn about his case studies, innovations, global ventures, and prestigious awards.",
    url: "https://www.washingtoninsider.org/",
    siteName: "washingtoninsider",
    images: [
      {
        url: "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
        width: 1200,
        height: 630,
        alt: "washingtoninsider",
      }
    ],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Julio Herrera Velutini and His Business Investments",
    description: "Explore Julio Herrera Velutini’s expansive investment portfolio across the UAE, UK, Caribbean, Europe, and Latin America. Learn about his case studies, innovations, global ventures, and prestigious awards.",
    images: ["https://www.washingtoninsider.org/images/washingtoninsider-logo.webp"],
  },
  alternates: {
    canonical: "https://www.washingtoninsider.org/",
  },
  other: {
    "author": "washingtoninsider",
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
      <Script
  id="structured-data"
  type="application/ld+json"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "Julio Herrera Velutini and His Business Investments",
      "author": {
        "@type": "Organization",
        "name": "Washington Insider"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Washington Insider",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp"
        }
      },
      "datePublished": "2025-04-09T00:00:00Z",
      "dateModified": "2025-04-09T00:00:00Z",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.washingtoninsider.org/realestate/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market/"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
        "width": 1200,
        "height": 630
      },
      "articleSection": "Finance",
      "url": "https://www.washingtoninsider.org/realestate/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market/",
      "description": "Explore Julio Herrera Velutini’s expansive investment portfolio across the UAE, UK, Caribbean, Europe, and Latin America. Learn about his case studies, innovations, global ventures, and prestigious awards."
    }, null, 2),
  }}
/>

<link rel="sitemap" type="application/xml" href="/sitemap.xml" />

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} itemScope itemType="https://schema.org/WebPage">
        {children}
      </body>
    </html>
  );
}
