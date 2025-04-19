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
      title: "Julio Herrera Velutini and His Business Investments",
      description:
        "Explore Julio Herrera Velutini’s expansive investment portfolio across the UAE, UK, Caribbean, Europe, and Latin America",
      keywords: [
        "julio herrera velutini",
        "julio herrera velutini breaking news",
        "julio herrera",
        "Julio Herrera Velutini and His Business Investments in the Global Market",
        "Julio Herrera Velutini is a renowned global investor",
        "private banking strategist",
        "washingtoninsider",
        "washington insider news",
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
        title: "Julio Herrera Velutini and His Business Investments",
        description:
          "Explore Julio Herrera Velutini’s expansive investment portfolio across the UAE, UK, Caribbean, Europe, and Latin America",
        url: "https://www.washingtoninsider.org/business/",
        siteName: "Washington Insider",
        type: "website",
        images: [
          {
            url: "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
            width: 1200,
            height: 630,
            alt: "Washington Insider",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Julio Herrera Velutini and His Business Investments",
        description:
          "Explore Julio Herrera Velutini’s expansive investment portfolio across the UAE, UK, Caribbean, Europe, and Latin America",
        images: [
          "https://www.washingtoninsider.org/images/washingtoninsider-logo.webp",
        ],
      },
      alternates: {
        canonical: "https://www.washingtoninsider.org/business/",
        languages: {
          "en-us": "https://www.washingtoninsider.org/business/",
          "en-gb": "https://www.washingtoninsider.org/business/",
          "en-ae": "https://www.washingtoninsider.org/business/",
          "en-fr": "https://www.washingtoninsider.org/business/",
          "en": "https://www.washingtoninsider.org/business/",
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
    <main
      className={styles.categorypageWrapper}
      itemScope
      itemType="https://schema.org/CollectionPage"
    >
      <Navbar />
      {/* structured data  */}
      {category === "business" && (
        <Script
          id="structured-data-category"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "@id": "https://www.washingtoninsider.org/business/#webpage",
                url: "https://www.washingtoninsider.org/business/",
                name: "Business News - Julio Herrera Velutini",
                isAccessibleForFree: true,
                inLanguage: "en",
                description:
                  "Explore business and financial news stories, with featured coverage on Julio Herrera Velutini’s global investment strategies.",
                  keywords: [
                    "Julio Herrera Velutini",
                    "Julio Herrera Velutini business news",
                    "Julio Herrera Velutini investments",
                    "Julio Herrera Velutini finance",
                    "Julio Herrera Velutini latest news",
                    "Julio Herrera Velutini global markets",
                    "Julio Herrera banking strategies",
                    "Julio Herrera private banking",
                    "Herrera Velutini investment portfolio",
                    "Julio Herrera Britannia Financial",
                    "Julio Herrera financial news",
                    "Julio Herrera Velutini net worth",
                    "Julio Herrera Velutini business insights",
                    "Julio Herrera Velutini UK business",
                    "Julio Herrera Velutini UAE business",
                    "Julio Herrera Latin America investments",
                    "Julio Herrera Caribbean banking",
                    "Julio Herrera Velutini business biography",
                    "Julio Herrera wealth management",
                    "Washington Insider business news"
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
                dateModified: new Date().toISOString(),
                hasPart: {
                  "@type": "ItemList",
                  "@id": "https://www.washingtoninsider.org/business/#business-list",
                  itemListOrder: "http://schema.org/ItemListOrderDescending",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      url: "https://www.washingtoninsider.org/business/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market/",
                    },
                  ],
                },
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
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
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
