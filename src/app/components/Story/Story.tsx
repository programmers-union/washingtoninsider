// File: src/app/story/page.tsx

import React from "react";
import styles from "./Story.module.css";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/db";
import ClientStory from "../clientStory/ClientStory";

/**
 * 1) Define TypeScript interfaces that match your Prisma models + extra fields.
 *    Adjust optional vs. required fields to match your schema exactly.
 */
interface ExtendedCard {
  id: number;
  categoryId: number;
  cardCategory: string;
  category: string;
  image: string;
  title: string;
  slug: string;
  author: string | null;
  date: string | null;
  excerpt: string | null;
  content1: string | null;
  detailSubtitle: string | null;
  detailGraphImage: string | null;
  content2: string | null;
}

interface ExtendedCategory {
  id: number;
  categorySlug: string;
  mainTitle: string;
  postCount: number;
  cards: ExtendedCard[];
}

/**
 * 2) Fetch data from DB, map the "cardCategory" field to "category" for rendering.
 */
export default async function Story() {
  // Fetch each Category by its unique slug:
  const storiesCategory = (await prisma.category.findUnique({
    where: { categorySlug: "business" },
    include: { cards: true },
  })) as ExtendedCategory | null;

  const resourceCategory = (await prisma.category.findUnique({
    where: { categorySlug: "stocks" },
    include: { cards: true },
  })) as ExtendedCategory | null;

  const gijnHubCategory = (await prisma.category.findUnique({
    where: { categorySlug: "cryptocurrency" },
    include: { cards: true },
  })) as ExtendedCategory | null;

  // If any are missing, show an error:
  if (!storiesCategory || !resourceCategory || !gijnHubCategory) {
    return <div>One or more categories not found</div>;
  }

  // Map DB field "cardCategory" => "category":
  const mappedStoriesCategory: ExtendedCategory = {
    ...storiesCategory,
    cards: storiesCategory.cards.map((card) => ({
      ...card,
      category: card.cardCategory ?? "",
    })),
  };

  const mappedResourceCategory: ExtendedCategory = {
    ...resourceCategory,
    cards: resourceCategory.cards.map((card) => ({
      ...card,
      category: card.cardCategory ?? "",
    })),
  };

  const mappedGijnHubCategory: ExtendedCategory = {
    ...gijnHubCategory,
    cards: gijnHubCategory.cards.map((card) => ({
      ...card,
      category: card.cardCategory ?? "",
    })),
  };

  // For the main story slider, get the latest 5 story cards:
  const stories = mappedStoriesCategory.cards.slice(0, 5);

  // For the substory section, get the latest 6 story cards:
  const subStories = mappedStoriesCategory.cards.slice(0, 6);

  // For the Resource Center on the right, get the latest 5 cards:
  const resourceCenterData = mappedResourceCategory.cards.slice(0, 5);

  // For the GIJN Hub section, show only the latest 6 cards:
  const ghCards = mappedGijnHubCategory.cards.slice(0, 6);

  /**
   * 3) Render your existing JSX, referencing the mapped categories & slices.
   */
  return (
    <div className={styles["story-section-container"]}>
      <div className={styles["story-section-left"]}>
        {/* ClientStory handles the auto-playing slider */}
        <ClientStory
          stories={stories}
          categorySlug={mappedStoriesCategory.categorySlug}
        />

        {/* Substories Section */}
        <div className={styles.substoryWrapper}>
          {subStories.map((story, index) => (
            <Link
              href={`/${mappedStoriesCategory.categorySlug}/${story.slug}`}
              key={index}
              title={story.title}
            >
              <div className={styles.substoryCard}>
                <div className={styles.substoryImageWrapper}>
                  <Image
                    src={story.image}
                    alt={story.title ?? ""}
                    quality={25}
                    width={400}
                    height={200}
                    className={styles.substoryImage}
                    // sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </div>
                <div className={styles.substoryText}>
                  <p className={styles.substoryCategory}>{story.category}</p>
                  <h2 className={styles.substoryTitle}>{story.title}</h2>
                  <p className={styles.substoryMeta}>
                    <span className={styles.substoryAuthor}>by {story.author}</span>{" "}
                    • {story.date}
                  </p>
                  <p className={styles.substoryDescription}>{story.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
          <Link
            className={styles.substoryContinue}
            href={`/${mappedStoriesCategory.categorySlug}`}
            title="continue to all business"
          >
            Continue to all Business →
          </Link>
        </div>
      </div>

      <div className={styles["story-section-right"]}>
        {/* Resource Center Section */}
        <div className={styles["rc-section-container"]}>
          <h2 className={styles["rc-section-title"]}>
            <Link href={`/${mappedResourceCategory.categorySlug}`} title="stockmarket">
              Stock market
            </Link>
          </h2>

          {resourceCenterData.map((item, index) => (
            <Link
              href={`/${mappedResourceCategory.categorySlug}/${item.slug}`}
              key={index}
              title={item.title}
            >
              <div
                className={`${styles["rc-section-card"]} ${
                  styles[`rc-section-card-${index}`]
                }`}
              >
                <div className={styles["rc-section-img-wrapper"]}>
                  <Image
                    src={item.image}
                    alt={item.title ?? ""}
                    width={400}
                    height={200}
                    quality={25}
                    className={styles["rc-section-image"]}
                    loading="lazy"
                  />
                </div>
                <div className={styles["rc-section-card-content"]}>
                  <p className={styles["rc-section-category"]}>{item.category}</p>
                  <h3 className={styles["rc-section-card-title"]}>{item.title}</h3>
                  <p className={styles["rc-section-description"]}>
                    {item.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          ))}

          <Link
            className={styles["rc-section-link"]}
            href={`/${mappedResourceCategory.categorySlug}`}
            title="continue to all stocks"
          >
            Continue to all Stocks →
          </Link>
        </div>

        {/* GIJN Hub Section */}
        <div className={styles["gh-section-container"]}>
          <h2 className={styles["gh-section-title"]}>
            <Link href={`/${mappedGijnHubCategory.categorySlug}`} title={mappedGijnHubCategory.mainTitle}>
              {mappedGijnHubCategory.mainTitle}
            </Link>
          </h2>

          {ghCards.map((item, index) => (
            <Link
              href={`/${mappedGijnHubCategory.categorySlug}/${item.slug}`}
              key={index}
              title={item.title}
            >
              {item.image && (
                <div className={styles["gh-section-image-wrapper"]}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    quality={25}
                    width={400}
                    height={200}
                    className={styles["gh-section-image"]}
                    loading="lazy"
                  />
                  <span className={styles["gh-section-info-btn"]}>
                    <span>↗</span>
                  </span>
                </div>
              )}
              <div className={styles["gh-section-card-content"]}>
                <h3 className={styles["gh-section-card-title"]}>
                  {item.title}
                </h3>
                {item.date && (
                  <p className={styles["gh-section-date"]}>{item.date}</p>
                )}
              </div>
            </Link>
          ))}

          <Link
            className={styles["gh-section-link"]}
            href={`/${mappedGijnHubCategory.categorySlug}`}
            title="continue to all cryptocurrency"
          >
            Continue to all cryptocurrency →
          </Link>
        </div>
      </div>
    </div>
  );
}
