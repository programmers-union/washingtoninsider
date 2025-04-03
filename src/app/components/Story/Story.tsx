
import React from "react";
import styles from "./Story.module.css";
import Link from "next/link";
import Image from "next/image";
import categoriesJson from "@/data/categories.json";

// Extract dynamic data from JSON
const storiesCategory = categoriesJson["STORIES"];
const resourceCategory = categoriesJson["RESOURCE"];

// For the main story slider, get the latest 5 story cards
const stories = storiesCategory.cards.slice(0, 5);

// For the substory section, get the latest 8 story cards
const subStories = storiesCategory.cards.slice(0, 8);

// For the Resource Center on the right, get the latest 5 cards
const resourceCenterData = resourceCategory.cards.slice(0, 5);

// GIJN Hub remains static (we’ll make it dynamic later)
const gijnHubData = [
  {
    image: "/images/GH1.webp",
    type: "Upcoming Event",
    title: "GIJC25 Call for Academic Papers",
    date: "31 March 2025",
    variant: "event",
    link: "#",
  },
  {
    image: "/images/GH2.webp",
    type: "Upcoming Event",
    title: "Register for #GIJC25: Extended Deadline — April 15, 2025",
    date: "15 April 2025",
    variant: "event",
    link: "#",
  },
  {
    image: "/images/GH3.webp",
    type: "Donate",
    description: "Empower the World’s Watchdog Journalists",
    variant: "donate",
    link: "#",
  },
  {
    image: "/images/GH4.webp",
    title: "GIJN Newsletter",
    description:
      "The GIJN Bulletin is free and distributed to journalists in more than 100 countries",
    cta: "Subscribe →",
    variant: "newsletter",
    link: "#",
  },
  {
    image: "/images/GH5.webp",
    type: "Calendar",
    variant: "calendar",
    link: "#",
  },
  {
    image: "/images/GH6.webp",
    type: "Membership",
    variant: "membership",
    link: "#",
  },
  {
    type: "Jobs Board",
    jobs: [
      {
        title: "Investigative Reporter",
        org: "The War Horse",
        location: "Sanford, North Carolina",
        deadline: "31 March 2025",
      },
      {
        title: "Open Source Investigator and Trainer (Conflict)",
        org: "Bellingcat",
        location: "Remote",
        deadline: "6 April 2025",
      },
      {
        title: "Regional Director, Americas",
        org: "Committee to Protect Journalists",
        location: "New York or DC, US",
        deadline: "24 March 2025",
      },
      {
        title: "Investigative Journalist",
        org: "Daily Maverick",
        location: "Johannesburg or Cape Town",
        deadline: "17 March 2025",
      },
      {
        title: "Chief Investigator",
        org: "Declassified UK",
        location: "Remote/London, UK",
        deadline: "28 March 2025",
      },
    ],
    variant: "jobs",
    link: "#",
  },
];

import ClientStory from "../clientStory/ClientStory";

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

        {/* GIJN Hub Section (Static) */}
        <div className={styles["gh-section-container"]}>
          <h2 className={styles["gh-section-title"]}>GIJN Hub</h2>
          {gijnHubData.map((item, index) => {
            // Jobs Board Card
            if (item.variant === "jobs") {
              return (
                <div key={index} className={styles["gh-section-card-jobs"]}>
                  <p className={styles["gh-section-jobs-label"]}>
                    JOBS BOARD <span>↗</span>
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
              );
            }
            // Donate Card
            if (item.variant === "donate") {
              return (
                <div key={index} className={`${styles["gh-section-card"]} ${styles["gh-donate"]}`}>
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
                        <h3 className={styles["gh-donate-title"]}>Donate</h3>
                        <p className={styles["gh-donate-description"]}>{item.description}</p>
                      </div>
                      <a href={item.link} className={styles["gh-donate-btn"]}>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            }
            // Newsletter Card
            if (item.variant === "newsletter") {
              return (
                <div key={index} className={`${styles["gh-section-card"]} ${styles["gh-newsletter"]}`}>
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
                        <a href={item.link} className={styles["gh-section-cta"]}>
                          {item.cta}
                        </a>
                      )}
                      {item.description && (
                        <p className={styles["gh-newsletter-description"]}>{item.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
            // Calendar & Membership
            if (item.variant === "calendar" || item.variant === "membership") {
              return (
                <div key={index} className={`${styles["gh-section-card"]} ${styles[`gh-${item.variant}`]}`}>
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
              );
            }
            // Default: Event and others
            return (
              <div key={index} className={`${styles["gh-section-card"]} ${styles[`gh-${item.variant}`]}`}>
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
                      <a href={item.link} className={styles["gh-section-info-btn"]}>
                        Information <span>↗</span>
                      </a>
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
                    <a href={item.link} className={styles["gh-section-cta"]}>{item.cta}</a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
