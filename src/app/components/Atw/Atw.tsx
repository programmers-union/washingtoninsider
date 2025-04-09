// src/app/components/Atw/Atw.tsx
import Link from 'next/link';
import styles from './Atw.module.css';
import AtwClient from '../AtwClient/AtwClient';
import prisma from '@/lib/db'; // <-- Prisma client

const Atw = async () => {
  // Fetch the "private-equity-and-venture-capital" category (assumed to be ID: 7)
  const atwCategory = await prisma.category.findUnique({
    where: { id: 7 },
    include: { cards: true },
  });

  // If no category is found, the component returns nothing
  if (!atwCategory) return null;

  return (
    <div className={styles['ATW-section-wrapper']} style={{ position: 'relative' }}>
      <h2 className={styles['ATW-section-title']}>
        {atwCategory.mainTitle || 'Private Equity & Venture Capital'}
      </h2>

      {/* Scrollable container with content */}
      <div className={styles['ATW-section-container']} id="atw-scroll-container">
        {atwCategory.cards.map((item, index) => {
          // Truncate content1 to maximum 200 characters and append an ellipsis if needed
          const truncatedContent =
            item.content1 && item.content1.length > 500
              ? item.content1.substring(0, 500) + '...'
              : item.content1;

          // Use the categorySlug (or a default if not available) and the card's slug to construct the link
          const categorySlug = atwCategory.categorySlug || 'private-equity-and-venture-capital';

          return (
            <Link key={index} href={`/${categorySlug}/${item.slug}`}>
              <div className={styles['ATW-section-card']}>
                <h3 className={styles['ATW-section-heading']}>{item.title}</h3>
                <p className={styles['ATW-section-source']}>Date: {item.date}</p>
                <p className={styles['ATW-section-content']}>{truncatedContent}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Scroll Buttons */}
      <div className={styles['ATW-section-scrollBtns']}>
        <AtwClient />
      </div>
    </div>
  );
};

export default Atw;
