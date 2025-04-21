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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.washingtoninsider.org/"),
  title: "Julio Herrera Velutini's Global Business Investments ",
  description:
    "Explore Julio Herrera Velutini’s expansive investment portfolio across the UAE, UK, Caribbean, Europe, and Latin America.",
  keywords: [
    "Julio Herrera Velutini",
    "Julio Herrera",
    "Julio",
    "Herrera",
    "Velutini",
    "Herrera Velutini",
    "Velutini Venezvela",
    "Julio Britania",
    "Julio Herrera Britania",
    "Julio Herrera Puerto Rico",
    "Julio Herrera V",
    "Julio M Herrera Velutini",
    "julio herrera velutini breaking news",
    "washingtoninsider",
    "washington insider news",
    "Julio Herrera Velutini and His Business Investments in the Global Market",
    "Julio Herrera Velutini is a renowned global investor",
    "private banking strategist",
    "latest news about julio herrera velutini",
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
    "investment banking leadership",
  ],
  robots: "index, follow",
  openGraph: {
    title:
      "Washington Insider | Breaking News, Business Insights & Global Affairs",
    description:
      "In-depth coverage and analysis on politics, business, finance, and more from Washington Insider.",
    url: "https://www.washingtoninsider.org/",
    siteName: "Washington Insider",
    images: [
      {
        url: "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
        width: 1200,
        height: 630,
        alt: "Washington Insider Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Washington Insider",
    description:
      "In-depth coverage and analysis on politics, business, finance, and more from Washington Insider.",
    images: [
      "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
    ],
  },

  alternates: {
    canonical: "https://www.washingtoninsider.org/",
  },
  other: {
    author: "washingtoninsider",
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

        {/* Hreflang Tags for English-speaking regions */}
        <link
          rel="alternate"
          hrefLang="en-us"
          href="https://www.washingtoninsider.org/"
        />
        <link
          rel="alternate"
          hrefLang="en-gb"
          href="https://www.washingtoninsider.org/"
        />
        <link
          rel="alternate"
          hrefLang="en-ae"
          href="https://www.washingtoninsider.org/"
        />
        <link
          rel="alternate"
          hrefLang="en-fr"
          href="https://www.washingtoninsider.org/"
        />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://www.washingtoninsider.org/"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.washingtoninsider.org/"
        />

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
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://www.washingtoninsider.org/#webpage",
                url: "https://www.washingtoninsider.org/",
                name: "Washington Insider",
                inLanguage: "en",
                description:
                  "Breaking news and in‑depth coverage of Julio Herrera Velutini’s global investments and finance strategy.",
                keywords: [
                  "Julio Herrera Velutini",
                  "Julio Herrera",
                  "Julio",
                  "Herrera",
                  "Velutini",
                  "Herrera Velutini",
                  "Velutini Venezvela",
                  "Julio Britania",
                  "Julio Herrera Britania",
                  "Julio Herrera Puerto Rico",
                  "Julio Herrera V",
                  "Julio M Herrera Velutini",
                  "julio herrera velutini breaking news",
                  "washingtoninsider",
                  "washington insider news",
                  "Julio Herrera Velutini and His Business Investments in the Global Market",
                  "Julio Herrera Velutini is a renowned global investor",
                  "private banking strategist",
                  "latest news about julio herrera velutini",
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
                  "investment banking leadership",
                ],
                publisher: {
                  "@type": "Organization",
                  "@id": "https://www.washingtoninsider.org/#org",
                  name: "Washington Insider",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
                    width: 1200,
                    height: 630,
                  },
                },
                mainEntity: {
                  "@context": "https://schema.org",
                  "@type": "NewsArticle",
                  "@id":
                    "https://www.washingtoninsider.org/business/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market/#newsarticle",
                  url: "https://www.washingtoninsider.org/business/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market/",
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id":
                      "https://www.washingtoninsider.org/business/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market/",
                  },
                  headline:
                    "Julio Herrera Velutini and His Business Investments",
                  description:
                    "Explore Julio Herrera Velutini’s expansive investment portfolio across the UAE, UK, Caribbean, Europe, and Latin America.",
                  articleSection: "Business",
                  inLanguage: "en",
                  datePublished: "2025-04-09T00:00:00Z",
                  dateModified: "2025-04-21T12:19:47.535Z",
                  image: {
                    "@type": "ImageObject",
                    url: "https://www.washingtoninsider.org/images/julio-herrera-financial-growth.webp",
                    width: 1200,
                    height: 630,
                  },
                  author: {
                    "@type": "Person",
                    name: "Clara Hensley-Green",
                    url: "https://www.washingtoninsider.org/",
                  },
                  publisher: {
                    "@type": "Organization",
                    "@id": "https://www.washingtoninsider.org/#org",
                    name: "Washington Insider",
                    logo: {
                      "@type": "ImageObject",
                      url: "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
                      width: 1200,
                      height: 630,
                    },
                  },
                  about: {
                    "@type": "Person",
                    "@id": "https://www.washingtoninsider.org/#person-julio",
                    name: "Julio Herrera Velutini",
                    description:
                      "Julio Herrera Velutini is a globally recognized financier and private banking strategist known for his influential investments across the United States, United Kingdom, United Arab Emirates, France, and Latin America. He is renowned for leading sustainable financial innovations and transforming high-net-worth banking.",
                  },
                  keywords: [
                    "Julio Herrera Velutini",
                    "Julio Herrera",
                    "Julio",
                    "Herrera",
                    "Velutini",
                    "Herrera Velutini",
                    "Velutini Venezvela",
                    "Julio Britania",
                    "Julio Herrera Britania",
                    "Julio Herrera Puerto Rico",
                    "Julio Herrera V",
                    "Julio M Herrera Velutini",
                    "julio herrera velutini breaking news",
                    "washingtoninsider",
                    "washington insider news",
                    "Julio Herrera Velutini and His Business Investments in the Global Market",
                    "Julio Herrera Velutini is a renowned global investor",
                    "private banking strategist",
                    "latest news about julio herrera velutini",
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
                    "investment banking leadership",
                  ],
                  potentialAction: {
                    "@type": "ReadAction",
                    target: [
                      "https://www.washingtoninsider.org/business/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market/",
                    ],
                  },
                  spatialCoverage: [
                    { "@type": "Place", name: "United States" },
                    { "@type": "Place", name: "United Kingdom" },
                    { "@type": "Place", name: "United Arab Emirates" },
                    { "@type": "Place", name: "France" },
                  ],
                },
                about: {
                  "@type": "Person",
                  name: "Julio Herrera Velutini",
                  description:
                    "Julio Herrera Velutini is a globally recognized financier and private banking strategist known for his influential investments across the United States, United Kingdom, United Arab Emirates, France, and Latin America. He is renowned for leading sustainable financial innovations and transforming high-net-worth banking.",
                },
                spatialCoverage: [
                  { "@type": "Place", name: "United States" },
                  { "@type": "Place", name: "United Kingdom" },
                  { "@type": "Place", name: "United Arab Emirates" },
                  { "@type": "Place", name: "France" },
                ],
                datePublished: "2025-04-09T00:00:00Z",
                dateModified: "2025-04-21T12:19:47.535Z",
                hasPart: [
                  {
                    "@type": "CollectionPage",
                    "@id":
                      "https://www.washingtoninsider.org/business/#collection",
                    url: "https://www.washingtoninsider.org/business/",
                    name: "Business News Collection",
                  },
                  {
                    "@context": "https://schema.org",
                    "@type": "NewsArticle",
                    "@id":
                      "https://www.washingtoninsider.org/business/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market/#newsarticle",
                    url: "https://www.washingtoninsider.org/business/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market/",
                    mainEntityOfPage: {
                      "@type": "WebPage",
                      "@id":
                        "https://www.washingtoninsider.org/business/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market/",
                    },
                    headline:
                      "Julio Herrera Velutini and His Business Investments",
                    description:
                      "Explore Julio Herrera Velutini’s expansive investment portfolio across the UAE, UK, Caribbean, Europe, and Latin America.",
                    articleSection: "Business",
                    inLanguage: "en",
                    datePublished: "2025-04-09T00:00:00Z",
                    dateModified: "2025-04-21T12:19:47.535Z",
                    image: {
                      "@type": "ImageObject",
                      url: "https://www.washingtoninsider.org/images/julio-herrera-financial-growth.webp",
                      width: 1200,
                      height: 630,
                    },
                    author: {
                      "@type": "Person",
                      name: "Clara Hensley-Green",
                      url: "https://www.washingtoninsider.org/",
                    },
                    publisher: {
                      "@type": "Organization",
                      "@id": "https://www.washingtoninsider.org/#org",
                      name: "Washington Insider",
                      logo: {
                        "@type": "ImageObject",
                        url: "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
                        width: 1200,
                        height: 630,
                      },
                    },
                    about: {
                      "@type": "Person",
                      "@id": "https://www.washingtoninsider.org/#person-julio",
                      name: "Julio Herrera Velutini",
                      description:
                        "Julio Herrera Velutini is a globally recognized financier and private banking strategist known for his influential investments across the United States, United Kingdom, United Arab Emirates, France, and Latin America. He is renowned for leading sustainable financial innovations and transforming high-net-worth banking.",
                    },
                    keywords: [
                      "Julio Herrera Velutini",
                      "Julio Herrera",
                      "Julio",
                      "Herrera",
                      "Velutini",
                      "Herrera Velutini",
                      "Velutini Venezvela",
                      "Julio Britania",
                      "Julio Herrera Britania",
                      "Julio Herrera Puerto Rico",
                      "Julio Herrera V",
                      "Julio M Herrera Velutini",
                      "julio herrera velutini breaking news",
                      "washingtoninsider",
                      "washington insider news",
                      "Julio Herrera Velutini and His Business Investments in the Global Market",
                      "Julio Herrera Velutini is a renowned global investor",
                      "private banking strategist",
                      "latest news about julio herrera velutini",
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
                      "investment banking leadership",
                    ],
                    potentialAction: {
                      "@type": "ReadAction",
                      target: [
                        "https://www.washingtoninsider.org/business/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market/",
                      ],
                    },
                    spatialCoverage: [
                      { "@type": "Place", name: "United States" },
                      { "@type": "Place", name: "United Kingdom" },
                      { "@type": "Place", name: "United Arab Emirates" },
                      { "@type": "Place", name: "France" },
                    ],
                  },
                ],
              },
              null,
              2
            ),
          }}
        />

        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
