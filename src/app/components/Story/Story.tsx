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
  // From DB:
  cardCategory: string;   // e.g. "1-HOW THEY DID IT"
  // Mapped at runtime:
  category: string;       // We'll copy cardCategory into this
  image: string;          // If your schema can be null, do: string | null
  title: string;
  slug: string;
  author: string | null;
  date: string | null;
  excerpt: string | null;
  content1: string | null;
  content2: string | null;
  detailSubtitle: string | null;
  detailGraphImage: string | null;
  chapterLabel: string | null;
  chapters: string[];     // If your DB field is String[]; or (string[] | null) if optional
  more: string | null;
  variant: string | null; // e.g. "jobs", "donate", etc.
  type: string | null;
  description: string | null;
  cta: string | null;
  jobs: any;             // or a more specific array type if you know the shape
}

interface ExtendedCategory {
  id: number;
  categorySlug: string;
  mainTitle: string;
  searchPlaceholder: string;
  postCount: number;
  cards: ExtendedCard[];
}

/**
 * 2) Fetch data from DB, map the "cardCategory" field to "category" for rendering.
 */
export default async function Story() {
  // Fetch each Category by its unique slug:
  const storiesCategory = (await prisma.category.findUnique({
    where: { categorySlug: "realestate" },
    include: { cards: true },
  })) as ExtendedCategory | null;

  const resourceCategory = (await prisma.category.findUnique({
    where: { categorySlug: "stocks" },
    include: { cards: true },
  })) as ExtendedCategory | null;

  const gijnHubCategory = (await prisma.category.findUnique({
    where: { categorySlug: "metaverse-virtual-real-estate" },
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

  // For the substory section, get the latest 8 story cards:
  const subStories = mappedStoriesCategory.cards.slice(0, 8);

  // For the Resource Center on the right, get the latest 5 cards:
  const resourceCenterData = mappedResourceCategory.cards.slice(0, 5);

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
            >
              <div className={styles.substoryCard}>
                <div className={styles.substoryImageWrapper}>
                  <Image
                    src={story.image}
                    alt={story.title ?? ""}
                    fill
                    className={styles.substoryImage}
                  />
                </div>
                <div className={styles.substoryText}>
                  <p className={styles.substoryCategory}>{story.category}</p>
                  <h2 className={styles.substoryTitle}>{story.title}</h2>
                  <p className={styles.substoryMeta}>
                    <span className={styles.substoryAuthor}>
                      by {story.author}
                    </span>{" "}
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
          >
            Continue to all Stories →
          </Link>
        </div>
      </div>

      <div className={styles["story-section-right"]}>
        {/* Resource Center Section */}
        <div className={styles["rc-section-container"]}>
          <h2 className={styles["rc-section-title"]}>
            <Link href={`/${mappedResourceCategory.categorySlug}`}>
              Resource Center
            </Link>
          </h2>
          {resourceCenterData.map((item, index) => (
            <Link
              href={`/${mappedResourceCategory.categorySlug}/${item.slug}`}
              key={index}
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
                    className={styles["rc-section-image"]}
                  />
                </div>
                <div className={styles["rc-section-card-content"]}>
                  <p className={styles["rc-section-category"]}>
                    {item.category}
                  </p>
                  <h2 className={styles["rc-section-card-title"]}>
                    {item.title}
                  </h2>
                  <p className={styles["rc-section-description"]}>
                    {item.excerpt}
                  </p>
                  {Array.isArray(item.chapters) && item.chapters.length > 0 && (
                    <div className={styles["rc-section-chapters"]}>
                      <p className={styles["rc-section-chapter-label"]}>
                        {item.chapterLabel}
                      </p>
                      {item.chapters.map((ch, idx2) => (
                        <p key={idx2} className={styles["rc-section-chapter"]}>
                          {ch}
                        </p>
                      ))}
                      {item.more && (
                        <p className={styles["rc-section-more"]}>{item.more}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
          <Link
            className={styles["rc-section-link"]}
            href={`/${mappedResourceCategory.categorySlug}`}
          >
            Continue to all Resources →
          </Link>
        </div>

        {/* GIJN Hub Section */}
        <div className={styles["gh-section-container"]}>
          <h2 className={styles["gh-section-title"]}>
            <Link href={`/${mappedGijnHubCategory.categorySlug}`}>
              {mappedGijnHubCategory.mainTitle}
            </Link>
          </h2>
          {mappedGijnHubCategory.cards.map((item, index) => {
            // Jobs Board Card
            if (item.variant === "jobs") {
              return (
                <Link
                  href={`/${mappedGijnHubCategory.categorySlug}/${item.slug}`}
                  key={index}
                >
                  <div className={styles["gh-section-card-jobs"]}>
                    <p className={styles["gh-section-jobs-label"]}>
                      {item.type?.toUpperCase()} <span>↗</span>
                    </p>
                    {item.jobs?.map((job: any, jIdx: number) => (
                      <div key={jIdx} className={styles["gh-section-job"]}>
                        <h4>{job.title}</h4>
                        <p>{job.org}</p>
                        <p>{job.location}</p>
                        <p>Deadline: {job.deadline}</p>
                      </div>
                    ))}
                  </div>
                </Link>
              );
            }

            // Donate Card
            if (item.variant === "donate") {
              return (
                <Link
                  href={`/${mappedGijnHubCategory.categorySlug}/${item.slug}`}
                  key={index}
                >
                  <div
                    className={`${styles["gh-section-card"]} ${styles["gh-donate"]}`}
                  >
                    <div className={styles["gh-donate-image-wrapper"]}>
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.variant || "Donate"}
                          width={400}
                          height={200}
                          className={styles["gh-section-image"]}
                        />
                      )}
                      <div className={styles["gh-donate-overlay"]}>
                        <div>
                          <h3 className={styles["gh-donate-title"]}>
                            {item.type}
                          </h3>
                          <p className={styles["gh-donate-description"]}>
                            {item.description}
                          </p>
                        </div>
                        <span className={styles["gh-donate-btn"]}>↗</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }

            // Newsletter Card
            if (item.variant === "newsletter") {
              return (
                <Link
                  href={`/${mappedGijnHubCategory.categorySlug}/${item.slug}`}
                  key={index}
                >
                  <div
                    className={`${styles["gh-section-card"]} ${styles["gh-newsletter"]}`}
                  >
                    <div className={styles["gh-newsletter-image-wrapper"]}>
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.variant || "newsletter"}
                          width={400}
                          height={200}
                          className={styles["gh-section-image"]}
                        />
                      )}
                      <div className={styles["gh-newsletter-overlay"]}>
                        <h3 className={styles["gh-newsletter-title"]}>
                          {item.title}
                        </h3>
                        {item.cta && (
                          <span className={styles["gh-section-cta"]}>
                            {item.cta}
                          </span>
                        )}
                        {item.description && (
                          <p className={styles["gh-newsletter-description"]}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }

            // Calendar & Membership Cards
            if (item.variant === "calendar" || item.variant === "membership") {
              return (
                <Link
                  href={`/${mappedGijnHubCategory.categorySlug}/${item.slug}`}
                  key={index}
                >
                  <div
                    className={`${styles["gh-section-card"]} ${
                      styles[`gh-${item.variant}`] || ""
                    }`}
                  >
                    {item.image && (
                      <div className={styles["gh-section-image-wrapper"]}>
                        <Image
                          src={item.image}
                          alt={item.variant || "calendar"}
                          width={400}
                          height={200}
                          className={styles["gh-section-image"]}
                        />
                      </div>
                    )}
                    <div className={styles["gh-section-card-content"]}>
                      <div className={styles["gh-arrow-title-row"]}>
                        <h3 className={styles["gh-section-card-title"]}>
                          {item.type}
                        </h3>
                        <span className={styles["gh-arrow"]}>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }

            // Default Card: for "event" and other variants
            const variantClass = item.variant ? `gh-${item.variant}` : "";
            return (
              <Link
                href={`/${mappedGijnHubCategory.categorySlug}/${item.slug}`}
                key={index}
              >
                <div
                  className={`${styles["gh-section-card"]} ${
                    styles[variantClass] || ""
                  }`}
                >
                  {item.image && (
                    <div className={styles["gh-section-image-wrapper"]}>
                      <Image
                        src={item.image}
                        alt={item.variant || "event"}
                        width={400}
                        height={200}
                        className={styles["gh-section-image"]}
                      />
                      {item.variant === "event" && (
                        <span className={styles["gh-section-info-btn"]}>
                          {item.cta} <span>↗</span>
                        </span>
                      )}
                    </div>
                  )}
                  <div className={styles["gh-section-card-content"]}>
                    {item.type && (
                      <p className={styles["gh-section-type"]}>
                        {item.type.toUpperCase()}
                      </p>
                    )}
                    <h3 className={styles["gh-section-card-title"]}>
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className={styles["gh-section-description"]}>
                        {item.description}
                      </p>
                    )}
                    {item.date && (
                      <p className={styles["gh-section-date"]}>{item.date}</p>
                    )}
                    {item.cta && (
                      <span className={styles["gh-section-cta"]}>
                        {item.cta}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
