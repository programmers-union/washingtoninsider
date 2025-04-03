import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar/Navbar';
import Footer from '@/app/components/Footer/Footer';
import categoriesJson from '@/data/categories.json';
import type { Categories } from '@/types/category';
import styles from './page.module.css';

// Cast JSON to our defined type
const data = categoriesJson as Categories;

export async function generateStaticParams() {
  const paths: Array<{ category: string; slug: string }> = [];
  // Use each category's categorySlug rather than the key
  for (const key in data) {
    const categoryObj = data[key];
    for (const card of categoryObj.cards) {
      paths.push({ category: categoryObj.categorySlug, slug: card.slug });
    }
  }
  return paths;
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } =  await params;
  // Look up category by matching categorySlug
  const categoryData = Object.values(data).find(
    (cat) => cat.categorySlug === category
  );
  if (!categoryData) return notFound();

  const card = categoryData.cards.find((card) => card.slug === slug);
  if (!card) return notFound();

  // --- Compute Next Categories for left/right sections ---
  const totalCategories = Object.keys(data).length; // e.g., 9
  const currentCatId = categoryData.id;
  const nextId = (currentCatId % totalCategories) + 1;
  const nextNextId = ((currentCatId + 1) % totalCategories) + 1;
  const categoriesArray = Object.values(data);
  const nextCategoryData = categoriesArray.find((cat) => cat.id === nextId);
  const nextNextCategoryData = categoriesArray.find((cat) => cat.id === nextNextId);

  // --- Compute "Read Next" Cards from the same category (latest 4 excluding current) ---
  const readNextCards = [...categoryData.cards]
    .filter((c) => c.slug !== slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

    // --- Build Tags: extract unique card category values from current category's cards ---
const uniqueTags = Array.from(new Set(categoryData.cards.map((c) => c.category)));
const tagLinks = uniqueTags.map((tag) => {
  const targetCard = categoryData.cards.find((c) => c.category === tag);
  return {
    tag,
    href: `/${categoryData.categorySlug}/${targetCard?.slug}`,
  };
});


  // --- For Left Section (Next Category Cards): Sort nextCategoryData.cards descending, then take first 4 ---
  const sortedNextCards =
    nextCategoryData && nextCategoryData.cards
      ? [...nextCategoryData.cards].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ).slice(0, 4)
      : [];

  // --- For Right Section (Next-Next Category Cards): Sort descending and take first 4 ---
  const sortedNextNextCards =
    nextNextCategoryData && nextNextCategoryData.cards
      ? [...nextNextCategoryData.cards].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ).slice(0, 4)
      : [];

 


  return (
    <>
      <Navbar />

      {/* TOP SECTION */}
      <div className={styles.detailpageWrapper}>
        <div className={styles.detailpageBackground}>
          <Image
            src={card.image}
            alt="Background image"
            fill
            className={styles.detailpageBgImage}
            priority
          />
        </div>
        <div className={styles.detailpageForeground}>
          <Image
            src={card.image}
            alt="Foreground image"
            fill
            className={styles.detailpageForegroundImage}
            priority
          />
        </div>
      </div>

      {/* TITLE HEADER SECTION */}
      <div className={styles.detailpageTitleHeader}>
        <div className={styles.detailpageTitleHeaderLeft}>
          <p className={styles.detailpageBreadcrumbs}>
            {card.category} •{' '}
            <Link href={`/${categoryData.categorySlug}`}>
              <span>{categoryData.categorySlug}</span>
            </Link>
          </p>
        </div>
        <div className={styles.detailpageTitleHeaderCenter}>
          <h1 className={styles.detailpageMainTitle}>{card.title}</h1>
          <p className={styles.detailpageMainByline}>
            by {card.author} • {card.date}
          </p>
        </div>
      </div>

      <div className={styles.detailpageContentWrapper}>
        {/* LEFT COLUMN: Share & Related Resources (Next Category) */}
        <div className={styles.detailpageLeft}>
          {/* SHARE SECTION */}
          <div className={styles.detailpageShareBlock}>
            <h4 className={styles.detailpageShareTitle}>SHARE</h4>
            <div className={styles.detailpageShareGrid}>
        <div className={styles.detailpageShareItem}>
          <span className={styles.detailpageShareIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/></svg>
          </span>
          Tweet
        </div>

        <div className={styles.detailpageShareItem}>
          <span className={styles.detailpageShareIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256z"/></svg>
          </span>
          Facebook
        </div>

        <div className={styles.detailpageShareItem}>
          <span className={styles.detailpageShareIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M128 0C92.7 0 64 28.7 64 64v96h64V64h226.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v96H128v-96h256zm64 32h32c17.7 0 32-14.3 32-32v-96c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32h32v64c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64v-64zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
          </span>
          Print
        </div>

        <div className={styles.detailpageShareItem}>
          <span className={styles.detailpageShareIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H32C14.3 32 0 46.5 0 64v384c0 17.5 14.3 32 32 32h384c17.7 0 32-14.5 32-32V64c0-17.5-14.3-32-32-32zM135.4 416H69V202.2h66.4V416zM102.2 173c-21.3 0-38.5-17.2-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.2 38.5 38.5 0 21.3-17.3 38.5-38.5 38.5zM379 416h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.5 0-39.8 27-39.8 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.6 44.3 79.6 101.9V416z"/></svg>
          </span>
          LinkedIn
        </div>

        <div className={styles.detailpageShareItem}>
          <span className={styles.detailpageShareIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
          </span>
          WhatsApp
        </div>
        <div className={styles.detailpageShareItem}>
          <span className={styles.detailpageShareIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/></svg>
          </span>
          Telegram
        </div>

        <div className={styles.detailpageShareItem}>
          <span className={styles.detailpageShareIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M373 138.6c-25.2 0-46.3-17.5-51.9-41l0 0c-30.6 4.3-54.2 30.7-54.2 62.4l0 .2c47.4 1.8 90.6 15.1 124.9 36.3c12.6-9.7 28.4-15.5 45.5-15.5c41.3 0 74.7 33.4 74.7 74.7c0 29.8-17.4 55.5-42.7 67.5c-2.4 86.8-97 156.6-213.2 156.6S45.5 410.1 43 323.4C17.6 311.5 0 285.7 0 255.7c0-41.3 33.4-74.7 74.7-74.7c17.2 0 33 5.8 45.7 15.6c34-21.1 76.8-34.4 123.7-36.4l0-.3c0-44.3 33.7-80.9 76.8-85.5C325.8 50.2 347.2 32 373 32c29.4 0 53.3 23.9 53.3 53.3s-23.9 53.3-53.3 53.3zM157.5 255.3c-20.9 0-38.9 20.8-40.2 47.9s17.1 38.1 38 38.1s36.6-9.8 37.8-36.9s-14.7-49.1-35.7-49.1zM395 303.1c-1.2-27.1-19.2-47.9-40.2-47.9s-36.9 22-35.7 49.1c1.2 27.1 16.9 36.9 37.8 36.9s39.3-11 38-38.1zm-60.1 70.8c1.5-3.6-1-7.7-4.9-8.1c-23-2.3-47.9-3.6-73.8-3.6s-50.8 1.3-73.8 3.6c-3.9 .4-6.4 4.5-4.9 8.1c12.9 30.8 43.3 52.4 78.7 52.4s65.8-21.6 78.7-52.4z"/></svg>          </span>
          Reddit
        </div>

        <div className={styles.detailpageShareItem}>
          <span className={styles.detailpageShareIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z"/></svg>
          </span>
          Republish
        </div>
      </div>
          </div>
          {/* NEXT CATEGORY CARDS (Latest from Next Category) */}
          {nextCategoryData && (
            <div className={styles.detailpageResourcesBlock}>
              <h4 className={styles.detailpageResourcesTitle}>
                {nextCategoryData.mainTitle}
              </h4>
              <div className={styles.resourceCards}>
                {sortedNextCards.map((resCard, index) => (
                  <Link key={index} href={`/${nextCategoryData.categorySlug}/${resCard.slug}`}>
                    <div className={styles.detailpageResourceCard}>
                      <Image
                        src={resCard.image}
                        alt={resCard.title}
                        width={80}
                        height={80}
                        className={styles.detailpageResourceImage}
                      />
                      <p className={styles.detailpageResourceText}>
                        {resCard.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href={`/${nextCategoryData.categorySlug}`}>
                <span className={styles.moreStoriesLink}>More Stories →</span>
              </Link>
            </div>
          )}
        </div>

        {/* CENTER COLUMN: Main Article Content */}
        <div className={styles.detailpageCenter}>
          <p className={styles.detailpageParagraph}>{card.content1}</p>
          <h2 className={styles.detailpageSubheading}>
            {card.detailSubtitle}
          </h2>
          <div className={styles.detailpageGraph}>
            <Image
              src={card.detailGraphImage}
              alt="Detail Graph"
              fill
              className={styles.detailpageGraphImage}
            />
          </div>
          <p className={styles.detailpageParagraph}>{card.content2}</p>
        </div>

        {/* RIGHT COLUMN: Related Stories from Next-Next Category (Latest) */}
        {nextNextCategoryData && (
          <div className={styles.detailpageRight}>
            <h3 className={styles.detailpageRightHeading}>
              {nextNextCategoryData.mainTitle}
            </h3>
            <div className={styles.storyCards}>
              {sortedNextNextCards.map((storyCard, idx) => (
                <Link key={idx} href={`/${nextNextCategoryData.categorySlug}/${storyCard.slug}`}>
                  <div className={styles.detailpageStoryCard}>
                    <Image
                      src={storyCard.image}
                      alt={storyCard.title}
                      width={90}
                      height={90}
                      className={styles.detailpageStoryImage}
                    />
                    <p className={styles.detailpageStoryText}>
                      {storyCard.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Link href={`/${nextNextCategoryData.categorySlug}`}>
              <span className={styles.moreStoriesLink}>More Stories →</span>
            </Link>
          </div>
        )}
      </div>
      {/* FOOTER NOTE & TAGS */}
      <div className={styles.detailpageFooterNote}>
        <div className={styles.detailpageLicense}>
          <div className={styles.detailpageLicenseLeft}>
            <div className={styles.detailpageFooternotImagewrapper}>
              <Image
                className={styles.detailpageFooternotImage}
                src="/images/by-nc.webp"
                alt="Creative Commons License"
                width={60}
                height={20}
              />
            </div>
            <p>
              This work is licensed under a{' '}
              <a href="#" target="_blank" rel="noopener noreferrer">
                Creative Commons Attribution-NoDerivatives 4.0 International License
              </a>
            </p>
          </div>
          <div className={styles.detailpageLicenseRight}>
            <button className={styles.detailpageRepublishBtn}>
              <span className={styles.detailpageRepublishBtnSpan}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z"/></svg>
              </span>{' '}
              Republish this article
            </button>
            <p>
              Republish our articles for free, online or in print, under a Creative Commons license.
            </p>
          </div>
        </div>
        <div className={styles.detailpageTags}>
          <p className={styles.detailpageTagsHeading}>
            READ OTHER STORIES TAGGED WITH:
          </p>
          <div className={styles.detailpageTagList}>
          {tagLinks.map((item, index) => (
  <Link key={index} href={item.href}>
    <span className={styles.detailpageTag}>{item.tag}</span>
  </Link>
))}

          </div>
        </div>
      </div>

      {/* READ NEXT SECTION: Latest 4 cards from current category (excluding current) */}
      <div className={styles.detailpageReadNext}>
        <h2 className={styles.detailpageReadNextHeading}>Read Next</h2>
        <div className={styles.detailpageReadNextGrid}>
          {readNextCards.map((nextCard, idx) => (
            <Link key={idx} href={`/${categoryData.categorySlug}/${nextCard.slug}`}>
              <div className={styles.detailpageCard}>
                <div className={styles.detailpageCardImageDiv}>
                  <Image
                    src={nextCard.image}
                    alt={nextCard.title}
                    width={400}
                    height={200}
                    className={styles.detailpageCardImage}
                  />
                </div>
                <p className={styles.detailpageCardTag}>{nextCard.category}</p>
                <h3 className={styles.detailpageCardTitle}>{nextCard.title}</h3>
                <p className={styles.detailpageCardByline}>
                  by <em>{nextCard.author}</em> • {nextCard.date}
                </p>
                <p className={styles.detailpageCardExcerpt}>{nextCard.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}