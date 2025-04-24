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
      title: "Business News Collection - Washington Insider",
      description:
        "Explore business and financial news stories, with featured coverage on Julio Herrera Velutini’s global investment strategies.",
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
        title: "Business News Collection - Washington Insider",
        description:
          "Explore business and financial news stories, with featured coverage on Julio Herrera Velutini’s global investment strategies.",
        url: "https://www.washingtoninsider.org/business/",
        siteName: "Washington Insider",
        type: "website",
        images: [
          {
            url: "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
            width: 1024,
            height: 1024,
            alt: "Washington Insider",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Business News Collection - Washington Insider",
        description:
          "Explore business and financial news stories, with featured coverage on Julio Herrera Velutini’s global investment strategies.",
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
        author: "Washington Insider",
      },
    };
  }

  // For other categories, return generic dynamic metadata.

  return {
    title: `${
      (await params).category.charAt(0).toUpperCase() +
      (await params).category.slice(1)
    } - Washington Insider`,
    description: `${
      (await params).category
    } category page on Washington Insider.`,
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
          id="structured-data-category"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "@id": "https://www.washingtoninsider.org/business/#collection",
                url: "https://www.washingtoninsider.org/business/",
                name: "Business News - Julio Herrera Velutini",
                inLanguage: "en",
                description:
                  "Explore business and financial news stories, with featured coverage on Julio Herrera Velutini’s global investment strategies.",
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
                publisher: {"@id": "https://www.washingtoninsider.org/#organization"},
                datePublished: "2025-04-09T00:00:00Z",
                dateModified: "2025-04-24T10:26:56.561Z",
                spatialCoverage: [
                  { "@type": "Place", name: "United States" },
                  { "@type": "Place", name: "United Kingdom" },
                  { "@type": "Place", name: "United Arab Emirates" },
                  { "@type": "Place", name: "France" },
                ],
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
                "@id": "https://www.washingtoninsider.org/business/#itemlist",
                url: "https://www.washingtoninsider.org/business/",
                numberOfItems: 9,
                itemListOrder: "http://schema.org/ItemListOrderAscending",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    url: "https://www.washingtoninsider.org/business/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market/",
                    name: "Julio Herrera Velutini’s Top 7 Global Business Investments",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    url: "https://www.washingtoninsider.org/business/catherine-and-pierce-compete-for-a-listing-in-episode-7-exclusive-clip/",
                    name: "Catherine and Pierce Compete for a Listing in Episode 7 [Exclusive Clip]",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    url: "https://www.washingtoninsider.org/business/donald-trump-spent-millions-on-these-9-luxury-items-no-7-will-blow-your-mind/",
                    name: "Donald Trump Spent Millions on These 9 Luxury Items – No. 7 Will Blow Your Mind",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    url: "https://www.washingtoninsider.org/business/why-did-tom-o-brien-decide-not-to-run-for-mayor-against-wu-kraft/",
                    name: "Why did Tom O’Brien Decide Not to Run for Mayor Against Wu, Kraft?",
                  },
                  {
                    "@type": "ListItem",
                    position: 5,
                    url: "https://www.washingtoninsider.org/business/suryakumar-yadav-buys-two-luxurious-apartments-in-deonar-check-out-the-price-and-other-details/",
                    name: "Suryakumar Yadav Buys Two Luxurious Apartments in Deonar – Check Out the Price and Other Details",
                  },
                  {
                    "@type": "ListItem",
                    position: 6,
                    url: "https://www.washingtoninsider.org/business/douglas-higgins-administrator-at-chicago-area-schools-dies/",
                    name: "Douglas Higgins, Administrator at Chicago-Area Schools, Dies",
                  },
                  {
                    "@type": "ListItem",
                    position: 7,
                    url: "https://www.washingtoninsider.org/business/protesters-in-serbia-rally-against-real-estate-project-with-trump-son-in-law-kushner/",
                    name: "Protesters in Serbia Rally Against Real Estate Project with Trump Son-in-Law Kushner",
                  },
                  {
                    "@type": "ListItem",
                    position: 8,
                    url: "https://www.washingtoninsider.org/business/a-battle-of-amenities-boston-luxury-towers-compete-on-who-can-offer-the-most-extravagant-perks/",
                    name: "A Battle of Amenities: Boston Luxury Towers Compete on Who Can Offer the Most Extravagant Perks",
                  },
                  {
                    "@type": "ListItem",
                    position: 9,
                    url: "https://www.washingtoninsider.org/business/prices-for-posh-palm-beach-penthouses-are-soaring/",
                    name: "Prices for Posh Palm Beach Penthouses Are Soaring",
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
                "@id": "https://www.washingtoninsider.org/business/#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://www.washingtoninsider.org/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Business",
                    item: "https://www.washingtoninsider.org/business/",
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
          <Link href="/" title="Back to Washington Insider home">
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
