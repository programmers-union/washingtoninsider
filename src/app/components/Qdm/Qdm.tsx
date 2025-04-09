// src/app/components/Qdm/Qdm.tsx
import ClientQdm from '../ClientQdm/ClientQdm';
import prisma from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Qdm.module.css';
import { TabType } from '../ClientQdm/ClientQdm';

const Qdm = async () => {
  // Fetch categories (with their related cards) from the database.
  // Here we assume category4, category5, and category6 have ids 4, 5, and 6 respectively.
  const category4 = await prisma.category.findUnique({
    where: { id: 4 },
    include: { cards: true },
  });
  const category5 = await prisma.category.findUnique({
    where: { id: 5 },
    include: { cards: true },
  });
  const category6 = await prisma.category.findUnique({
    where: { id: 6 },
    include: { cards: true },
  });

  if (!category4 || !category5 || !category6) {
    return <div>Error loading categories.</div>;
  }

  // Map each card so that we add a "category" field from the DB field "cardCategory"
  const cards4 = category4.cards.map((card) => ({
    ...card,
    category: card.cardCategory,
  })).slice(0, 4);

  const cards5 = category5.cards.map((card) => ({
    ...card,
    category: card.cardCategory,
  })).slice(0, 4);

  const cards6 = category6.cards.map((card) => ({
    ...card,
    category: card.cardCategory,
  })).slice(0, 4);

  // Prepare tab header data
  const tabs: { id: TabType; label: string }[] = [
    { id: 'category4', label: category4.mainTitle },
    { id: 'category5', label: category5.mainTitle },
    { id: 'category6', label: category6.mainTitle },
  ];

  // Helper function to render a grid of cards
  const renderCards = (cards: any[], categorySlug: string, activeTabId: string) => (
    <div className={styles['qdm-card-grid']}>
      {cards.map((card, index) => (
        <Link href={`/${categorySlug}/${card.slug}`} key={index} title={card.title}>
          <div className={styles['qdm-card']}>
            <div className={styles['qdm-card-img']}>
              <Image
                className={styles['qdm-card-image']}
                src={card.image}
                alt={card.title}
                fill
                loading='lazy'
              />
            </div>
            <div className={styles['qdm-card-body']}>
              {card.category ? (
                <h3 className={styles['qdm-card-tag']}>{card.category}</h3>
              ) : activeTabId === 'category4' ? (
                <h3 className={styles['qdm-card-tag']}>category</h3>
              ) : null}
              <h2 className={styles['qdm-card-title']}>{card.title}</h2>
              <p className={styles['qdm-card-meta']}>
                by <span className={styles['qdm-card-author']}>{card.author}</span> • {card.date}
              </p>
              <p className={styles['qdm-card-desc']}>{card.excerpt}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className={styles['qdm-section-wrapper']}>
      {/* Tabs managed by the client-side component */}
      <ClientQdm tabs={tabs} />

      <div className={styles['qdm-section-content']}>
        {/* All content is rendered server-side for SEO purposes */}
        <div id="category4-content" className="qdm-tab-content active">
          {renderCards(cards4, category4.categorySlug, 'category4')}
        </div>
        <div id="category5-content" className="qdm-tab-content">
          {renderCards(cards5, category5.categorySlug, 'category5')}
        </div>
        <div id="category6-content" className="qdm-tab-content">
          {renderCards(cards6, category6.categorySlug, 'category6')}
        </div>
      </div>
    </div>
  );
};

export default Qdm;
