
import React from "react";
import styles from "./Story.module.css";
import Link from "next/link";
import Image from "next/image";
import categoriesJson from "@/data/categories.json";
import ClientStory from "../clientStory/ClientStory";



// Extract dynamic data from JSON
const storiesCategory = categoriesJson["category1"];
const resourceCategory = categoriesJson["category2"];
const gijnHubCategory = categoriesJson["category8"];


// For the main story slider, get the latest 5 story cards
const stories = storiesCategory.cards.slice(0, 5);

// For the substory section, get the latest 8 story cards
const subStories = storiesCategory.cards.slice(0, 8);

// For the Resource Center on the right, get the latest 5 cards
const resourceCenterData = resourceCategory.cards.slice(0, 5);



export default function Story() {
  return (
    <div className={styles["story-section-container"]}>
      <div className={styles["story-section-left"]}>
        {/* ClientStory handles the auto-playing slider */}
        <ClientStory stories={stories} categorySlug={storiesCategory.categorySlug} />

        {/* Substories Section */}
        <div className={styles.substoryWrapper}>
          {subStories.map((story, index) => (
            <Link href={`/${storiesCategory.categorySlug}/${story.slug}`} key={index}>
              <div className={styles.substoryCard}>
                <div className={styles.substoryImageWrapper}>
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className={styles.substoryImage}
                  />
                </div>
                <div className={styles.substoryText}>
                  <p className={styles.substoryCategory}>{story.category}</p>
                  <h2 className={styles.substoryTitle}>{story.title}</h2>
                  <p className={styles.substoryMeta}>
                    <span className={styles.substoryAuthor}>by {story.author}</span> • {story.date}
                  </p>
                  <p className={styles.substoryDescription}>{story.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
          <Link className={styles.substoryContinue} href={`/${storiesCategory.categorySlug}`}>
            Continue to all Stories →
          </Link>
        </div>
      </div>

      <div className={styles["story-section-right"]}>
        {/* Resource Center Section */}
        <div className={styles["rc-section-container"]}>
          <h2 className={styles["rc-section-title"]}>
            <Link href={`/${resourceCategory.categorySlug}`}>
              Resource Center
            </Link>
          </h2>
          {resourceCenterData.map((item, index) => (
            <Link href={`/${resourceCategory.categorySlug}/${item.slug}`} key={index}>
              <div className={`${styles["rc-section-card"]} ${styles[`rc-section-card-${index}`]}`}>
                <div className={styles["rc-section-img-wrapper"]}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={200}
                    className={styles["rc-section-image"]}
                  />
                </div>
                <div className={styles["rc-section-card-content"]}>
                  <p className={styles["rc-section-category"]}>{item.category}</p>
                  <h2 className={styles["rc-section-card-title"]}>{item.title}</h2>
                  <p className={styles["rc-section-description"]}>{item.excerpt}</p>
                  {Array.isArray(item.chapters) && item.chapters.length > 0 && (
                    <div className={styles["rc-section-chapters"]}>
                      <p className={styles["rc-section-chapter-label"]}>{item.chapterLabel}</p>
                      {item.chapters.map((ch, idx) => (
                        <p key={idx} className={styles["rc-section-chapter"]}>{ch}</p>
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
          <Link className={styles["rc-section-link"]} href={`/${resourceCategory.categorySlug}`}>
            Continue to all Resources →
          </Link>
        </div>

        {/* GIJN Hub Section (Dynamic) */}
<div className={styles["gh-section-container"]}>
  <h2 className={styles["gh-section-title"]}>
    <Link href={`/${gijnHubCategory.categorySlug}`}>{gijnHubCategory.mainTitle}</Link>
  </h2>
  {gijnHubCategory.cards.map((item, index) => {
    // Jobs Board Card
    if (item.variant === "jobs") {
      return (
        <Link href={`/${gijnHubCategory.categorySlug}/${item.slug}`} key={index}>
          <div className={styles["gh-section-card-jobs"]}>
            <p className={styles["gh-section-jobs-label"]}>
              {item.type.toUpperCase()} <span>↗</span>
            </p>
            {item.jobs?.map((job, idx) => (
              <div key={idx} className={styles["gh-section-job"]}>
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
        <Link href={`/${gijnHubCategory.categorySlug}/${item.slug}`} key={index}>
          <div className={`${styles["gh-section-card"]} ${styles["gh-donate"]}`}>
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
                  <h3 className={styles["gh-donate-title"]}>{item.type}</h3>
                  <p className={styles["gh-donate-description"]}>{item.description}</p>
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
        <Link href={`/${gijnHubCategory.categorySlug}/${item.slug}`} key={index}>
          <div className={`${styles["gh-section-card"]} ${styles["gh-newsletter"]}`}>
            <div className={styles["gh-newsletter-image-wrapper"]}>
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.variant}
                  width={400}
                  height={200}
                  className={styles["gh-section-image"]}
                />
              )}
              <div className={styles["gh-newsletter-overlay"]}>
                <h3 className={styles["gh-newsletter-title"]}>{item.title}</h3>
                {item.cta && (
                  <span className={styles["gh-section-cta"]}>{item.cta}</span>
                )}
                {item.description && (
                  <p className={styles["gh-newsletter-description"]}>{item.description}</p>
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
        <Link href={`/${gijnHubCategory.categorySlug}/${item.slug}`} key={index}>
          <div className={`${styles["gh-section-card"]} ${styles[`gh-${item.variant}`]}`}>
            {item.image && (
              <div className={styles["gh-section-image-wrapper"]}>
                <Image
                  src={item.image}
                  alt={item.variant}
                  width={400}
                  height={200}
                  className={styles["gh-section-image"]}
                />
              </div>
            )}
            <div className={styles["gh-section-card-content"]}>
              <div className={styles["gh-arrow-title-row"]}>
                <h3 className={styles["gh-section-card-title"]}>{item.type}</h3>
                <span className={styles["gh-arrow"]}>→</span>
              </div>
            </div>
          </div>
        </Link>
      );
    }
    // Default Card: for Event and similar types
    return (
      <Link href={`/${gijnHubCategory.categorySlug}/${item.slug}`} key={index}>
        <div className={`${styles["gh-section-card"]} ${styles[`gh-${item.variant}`]}`}>
          {item.image && (
            <div className={styles["gh-section-image-wrapper"]}>
              <Image
                src={item.image}
                alt={item.variant}
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
            <h3 className={styles["gh-section-card-title"]}>{item.title}</h3>
            {item.description && (
              <p className={styles["gh-section-description"]}>{item.description}</p>
            )}
            {item.date && (
              <p className={styles["gh-section-date"]}>{item.date}</p>
            )}
            {item.cta && (
              <span className={styles["gh-section-cta"]}>{item.cta}</span>
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
