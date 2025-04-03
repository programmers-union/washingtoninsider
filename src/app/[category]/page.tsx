import styles from './page.module.css';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import { notFound } from 'next/navigation';
import data from '@/data/categories.json';
import type { Categories } from '@/types/category';
import Pagination from '../components/Pagination/Pagination';
import Link from 'next/link';
import Image from 'next/image';

const categoriesData = data as Categories;

export const dynamicParams = false;

export async function generateStaticParams() {
  // Pre-render pages for all categories using their categorySlug
  return Object.values(categoriesData).map((cat) => ({ category: cat.categorySlug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  // Find the category using its categorySlug
  const categoryData = Object.values(categoriesData).find(
    (cat) => cat.categorySlug === category
  );
  if (!categoryData) return notFound();

  // Sort cards by date descending (latest on top)
  const sortedCards = [...categoryData.cards].sort(
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
        {/* <div className={styles.categorypageFloatingSearchBox}>
          <div className={styles.categorypageSearchWrapper}>
            <span className={styles.categorypageSearchIcon}>🔍</span>
            <input
              type="text"
              className={styles.categorypageSearchInput}
              placeholder={categoryData.searchPlaceholder}
            />
          </div>
          <div className={styles.categorypageSelectDiv}>
            <select className={styles.categorypageSelect}>
              <option>Select Topic</option>
              <option>10 Questions</option>
              <option>Africa focus</option>
            </select>
          </div>
        </div> */}
      </section>

      <div className={styles.categorypagePostCountDiv}>
        <p className={styles.categorypagePostCount}>
          {categoryData.postCount} posts
        </p>
      </div>

      {/* SSR Rendered Initial Cards */}
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

      {/* Client Component: Loads additional cards on demand */}
      <Pagination
        remainingCards={remainingCards}
        categorySlug={categoryData.categorySlug}
      />
      <Footer />
    </main>
  );
}