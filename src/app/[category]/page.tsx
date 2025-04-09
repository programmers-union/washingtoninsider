import styles from './page.module.css';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import Pagination from '../components/Pagination/Pagination';
import Link from 'next/link';
import Image from 'next/image';
import type { Card as CardType } from '@/types/category';

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
    // Map "cardCategory" (from the DB) to "category" (for our UI)
    category: card.cardCategory,
    title: card.title,
    slug: card.slug,
    // Provide fallback values for nullable fields
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
  const { category } =await params;

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

      <section className={styles.categorypageHeader}>
        <div className={styles.categorypageHeaderInner}>
          <h1 className={styles.categorypageTitle}>{categoryData.mainTitle}</h1>
        </div>
      </section>

      <div className={styles.categorypagePostCountDiv}>
        <p className={styles.categorypagePostCount}>
          {categoryData.postCount} posts
        </p>
      </div>

      <section className={styles.categorypageGrid}>
        {initialCards.map((item, idx) => (
          <Link key={idx} href={`/${categoryData.categorySlug}/${item.slug}`}>
            <article className={styles.categorypageCard}>
              <div className={styles.categorypageimagewrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={styles.categorypageImage}
                />
              </div>
              <div className={styles.categorypageText}>
                <p className={styles.categorypageCategory}>{item.category}</p>
                <h2 className={styles.categorypageHeading}>{item.title}</h2>
                <p className={styles.categorypageMeta}>
                  by{' '}
                  <span className={styles.categorypageMetaAuthor}>
                    {item.author}
                  </span>{' '}
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
