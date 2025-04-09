'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Pagination.module.css';

type Card = {
  image: string;
  category: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  slug: string;
};

type Props = {
  remainingCards: Card[];
  categorySlug: string;
};

export default function LoadMoreCards({ remainingCards, categorySlug }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const cardsToShow = remainingCards.slice(0, visibleCount);

  return (
    <>
      {cardsToShow.length > 0 && (
        <section className={styles.categorypageGrid}>
          {cardsToShow.map((item, idx) => (
            <Link key={idx} href={`/${categorySlug}/${item.slug}`} title={item.title}>
              <article className={styles.categorypageCard}>
                <div className={styles.categorypageimagewrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={styles.categorypageImage}
                    loading="lazy"
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
      )}
      {visibleCount < remainingCards.length && (
        <button className={styles.loadMoreButton} onClick={loadMore}>
          Load More →
        </button>
      )}
    </>
  );
}
