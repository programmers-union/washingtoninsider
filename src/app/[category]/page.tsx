import styles from "./page.module.css";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import Pagination from "../components/Pagination/Pagination";
import Link from "next/link";
import Image from "next/image";
import type { Card as CardType } from "@/types/category";

// seo
import type { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  
  // If the category is "business", return the fixed SEO details:
  if ((await params).category === "business") {
    return {
      title:
        "Business & Finance News: Investments, Markets & Luxury Real Estate",
      description:
        "Stay informed on global business trends, investments, real estate, and financial news featuring market leaders like Julio Herrera Velutini, Donald Trump & more.",
      keywords: [
        "2025 business landscape",
        "global investments 2025",
        "luxury real estate trends",
        "high-profile financial moves",
        "market-shaping events",
        "Julio Herrera Velutini news",
        "Donald Trump business news",
        "emerging markets analysis",
        "international investment trends",
        "luxury property market",
        "top financial deals",
        "global market insights",
        "business leadership updates",
        "real estate investment 2025",
        "economic events 2025",
      ],
      openGraph: {
        title:
          "Business & Finance News: Investments, Markets & Luxury Real Estate",
        description:
          "Stay informed on global business trends, investments, real estate, and financial news featuring market leaders like Julio Herrera Velutini, Donald Trump & more.",
        url: "https://www.washingtoninsider.org/business/",
        siteName: "WashingtonInsider",
        type: "website",
        images: [
          {
            url: "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
            width: 1024,
            height: 1024,
            alt: "WashingtonInsider",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title:
          "Business & Finance News: Investments, Markets & Luxury Real Estate",
        description:
          "Stay informed on global business trends, investments, real estate, and financial news featuring market leaders like Julio Herrera Velutini, Donald Trump & more.",
        images: [
          "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
        ],
      },
      alternates: {
        canonical: "https://www.washingtoninsider.org/business/",
        languages: {
          en: "https://www.washingtoninsider.org/business/",
          "x-default": "https://www.washingtoninsider.org/business/",
        },
      },
      other: {
        author: "WashingtonInsider",
      },
    };
  }

  // For other categories, return generic dynamic metadata.
    const { category } = await params;
  const categoryData = await prisma.category.findFirst({
    where: { categorySlug: category },
    include: { cards: true },
  });

  if (!categoryData) {
    return {
      title: "Not Found – WashingtonInsider",
      description: "The category you’re looking for doesn’t exist.",
    };
  }

  const mainTitle = categoryData.mainTitle;          // e.g. “Technology”
  const slugUrl   = `https://www.washingtoninsider.org/${category}/`;
  const title     = `${mainTitle} News & Insights | WashingtonInsider`;
  const description = `Stay informed on ${mainTitle.toLowerCase()} trends, analysis, and top stories from WashingtonInsider.`;
  const keywords  = [
    `${mainTitle} news`,
    `latest ${mainTitle.toLowerCase()} updates`,
    `${mainTitle} analysis`,
    `${mainTitle} trends 2025`,
    `WashingtonInsider ${mainTitle}`,
    `${mainTitle} market insights`,
  ];

  // pick OG image from first card if available, else fallback to logo
  const firstImagePath = categoryData.cards[0]?.image ?? "/images/washingtoninsider-logo.webp";
  const ogImageUrl     = `https://www.washingtoninsider.org${firstImagePath}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: slugUrl,
      siteName: "WashingtonInsider",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${mainTitle} – WashingtonInsider`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: slugUrl,
      languages: { en: slugUrl, "x-default": slugUrl },
    },
    other: { author: "WashingtonInsider" },
  };

}

export const dynamicParams = false;

// Generate static paths for all categories using the DB data
export async function generateStaticParams() {
  const categories = await prisma.category.findMany({
    select: { categorySlug: true },
  });
  return categories.map((cat) => ({ category: cat.categorySlug }));
}

// This helper function makes sure that every card has all the expected fields
function sanitizeCard(card: any): CardType {
  return {
    image: card.image,
    category: card.cardCategory,
    title: card.title,
    slug: card.slug,
    author: card.author ?? "",
    date: card.date ?? "",
    excerpt: card.excerpt ?? "",
    content1: card.content1 ?? "",
    detailSubtitle: card.detailSubtitle ?? "",
    detailGraphImage: card.detailGraphImage ?? "",
    content2: card.content2 ?? "",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Find category by slug and include its cards
  const categoryData = await prisma.category.findFirst({
    where: { categorySlug: category },
    include: { cards: true },
  });

  if (!categoryData) {
    return notFound();
  }

  // Sanitize each card so that the types match what our UI expects
  const cards: CardType[] = categoryData.cards.map(sanitizeCard);

  // Sort the cards by date descending (newest first)
  const sortedCards = [...cards].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const initialCards = sortedCards.slice(0, 8);
  const remainingCards = sortedCards.slice(8);

  return (
    <main className={styles.categorypageWrapper}>
      <Navbar />
      {/* structured data  */}
      {category === "business" && (
        <Script
          id="business-webpage-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Business & Finance News: Investments, Markets & Luxury Real Estate",
                description:
                  "Stay informed on global business trends, investments, real estate, and financial news featuring market leaders like Julio Herrera Velutini, Donald Trump & more.",
                keywords: [
                  "2025 business landscape",
                  "global investments 2025",
                  "luxury real estate trends",
                  "high-profile financial moves",
                  "market-shaping events",
                  "Julio Herrera Velutini news",
                  "Donald Trump business news",
                  "emerging markets analysis",
                  "international investment trends",
                  "luxury property market",
                  "top financial deals",
                  "global market insights",
                  "business leadership updates",
                  "real estate investment 2025",
                  "economic events 2025",
                ],
                url: "https://www.washingtoninsider.org/business/",
                speakable: {
                  "@type": "SpeakableSpecification",
                  cssSelector: "h1",
                },
              },
              null,
              2
            ),
          }}
        />
      )}
      {category === "business" && (
        <Script
          id="structured-data-itemlist-category"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                url: "https://www.washingtoninsider.org/business/",
                numberOfItems: 9,
                itemListOrder: "http://schema.org/ItemListOrderAscending",
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": "https://www.washingtoninsider.org/business/",
                },

                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    url: "https://www.washingtoninsider.org/business/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market/",
                    name: "Julio Herrera Velutini’s Top 7 Global Business Investments",
                    description: "Julio Herrera Velutini unveils seven key global investments-from UAE fintech and Swiss banking to Caribbean turnarounds, microfinance & sustainable real estate.",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    url: "https://www.washingtoninsider.org/business/catherine-and-pierce-compete-for-a-listing-in-episode-7-exclusive-clip/",
                    name: "Catherine and Pierce Compete for a Listing in Episode 7 [Exclusive Clip]",
                    description: "Catherine and Pierce clash in Episode 7 over a prime luxury real estate listing, reigniting careers and rivalries in this exclusive property drama.",

                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    url: "https://www.washingtoninsider.org/business/donald-trump-spent-millions-on-these-9-luxury-items-no-7-will-blow-your-mind/",
                    name: "Donald Trump Spent Millions on These 9 Luxury Items – No. 7 Will Blow Your Mind",
                    description: "Donald Trump’s lavish spending revealed—explore 9 luxury items, from rare cars to gold-plated jets, showcasing his extravagant lifestyle.",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    url: "https://www.washingtoninsider.org/business/why-did-tom-o-brien-decide-not-to-run-for-mayor-against-wu-kraft/",
                    name: "Why did Tom O’Brien Decide Not to Run for Mayor Against Wu, Kraft?",
                    description: "Tom O’Brien exits Boston’s mayoral race, raising questions about political strategy, real estate influence, and future business ties with City Hall.",
                  },
                  {
                    "@type": "ListItem",
                    position: 5,
                    url: "https://www.washingtoninsider.org/business/suryakumar-yadav-buys-two-luxurious-apartments-in-deonar-check-out-the-price-and-other-details/",
                    name: "Suryakumar Yadav Buys Two Luxurious Apartments in Deonar – Check Out the Price and Other Details",
                    description: "Suryakumar Yadav invests ₹21.11 crore in two luxury Mumbai apartments, expanding his premium real estate portfolio in Deonar.",
                  },
                  {
                    "@type": "ListItem",
                    position: 6,
                    url: "https://www.washingtoninsider.org/business/douglas-higgins-administrator-at-chicago-area-schools-dies/",
                    name: "Douglas Higgins, Administrator at Chicago-Area Schools, Dies",
                    description: "Douglas Higgins, who after many years in real estate returned to his initial career choice in education, has died at 81.",
                  },
                  {
                    "@type": "ListItem",
                    position: 7,
                    url: "https://www.washingtoninsider.org/business/protesters-in-serbia-rally-against-real-estate-project-with-trump-son-in-law-kushner/",
                    name: "Protesters in Serbia Rally Against Real Estate Project with Trump Son-in-Law Kushner",
                    description: "Serbia protests erupt over Jared Kushner’s planned luxury complex on a NATO-bombed military site, sparking heritage and corruption debates.",

                  },
                  {
                    "@type": "ListItem",
                    position: 8,
                    url: "https://www.washingtoninsider.org/business/a-battle-of-amenities-boston-luxury-towers-compete-on-who-can-offer-the-most-extravagant-perks/",
                    name: "A Battle of Amenities: Boston Luxury Towers Compete on Who Can Offer the Most Extravagant Perks",
                    description: "In the words of Ricardo Rodriguez, a Coldwell Banker luxury real estate agent, they’re “vertical country clubs.”",

                  },
                  {
                    "@type": "ListItem",
                    position: 9,
                    url: "https://www.washingtoninsider.org/business/prices-for-posh-palm-beach-penthouses-are-soaring/",
                    name: "Prices for Posh Palm Beach Penthouses Are Soaring",
                    description: "Palm Beach penthouse prices soar as billionaires fuel a luxury real estate boom, with record-breaking sales and sky-high listings.",

                  },
                ],
              },
              null,
              2
            ),
          }}
        />
      )}
      {/* breadcrumb */}
      {category === "business" && (
        <Script
          id="breadcrumb-business"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                name: "BreadcrumbList for business Category Page ",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                      "@type": "Thing",
                      "@id": "https://www.washingtoninsider.org/",
                      name: "Business News",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    item: {
                      "@type": "Thing",
                      name: "Business",
                    },
                  },
                ],
              },
              null,
              2
            ),
          }}
        />
      )}

      <section className={styles.categorypageHeader}>
        <div className={styles.categorypageHeaderInner}>
          <h1 className={styles.categorypageTitle}>{categoryData.mainTitle}</h1>
        </div>
      </section>

      <div className={styles.categorypagePostCountDiv}>
        <span className={styles.categorypagebacktohome}>
          <Link href="/" title="Back to WashingtonInsider home">
            {" "}
            Back to Home
          </Link>
        </span>
        <p className={styles.categorypagePostCount}>
          {categoryData.postCount} posts
        </p>
      </div>

      <section className={styles.categorypageGrid}>
        {initialCards.map((item, idx) => (
          <Link
            key={idx}
            href={`/${categoryData.categorySlug}/${item.slug}`}
            title={item.title}
          >
            <article className={styles.categorypageCard}>
              <div className={styles.categorypageimagewrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  priority
                  width={200}
                  height={200}
                  className={styles.categorypageImage}
                />
              </div>
              <div className={styles.categorypageText}>
                <p className={styles.categorypageCategory}>{item.category}</p>
                <h2 className={styles.categorypageHeading}>{item.title}</h2>
                <p className={styles.categorypageMeta}>
                  by{" "}
                  <span className={styles.categorypageMetaAuthor}>
                    {item.author}
                  </span>{" "}
                  • {item.date}
                </p>
                <p className={styles.categorypageExcerpt}>{item.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </section>

      <Pagination
        remainingCards={remainingCards}
        categorySlug={categoryData.categorySlug}
      />

      <Footer />
    </main>
  );
}
