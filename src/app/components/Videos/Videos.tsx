import React from "react";
import Link from "next/link";
import Image from "next/image";
import categoriesJson from "@/data/categories.json";
import styles from "./Videos.module.css";

export default function Videos() {
  // Get the RESOURCE category data
const resourceCategory = categoriesJson["category2"];

// Filter only cards where card.category is 'video'
const videoCards = resourceCategory.cards.filter(card => card.category === "video");

// Show only the first 4 videos (adjust if needed)
const displayedVideos = videoCards.slice(0, 4);


  return (
    <section className={styles.videosectionContainer}>
      <h2 className={styles.videosectionHeading}>Videos</h2>
      <div className={styles.videosectionGrid}>
        {displayedVideos.map((card, index) => (
          <Link key={index} href={`/${resourceCategory.categorySlug}/${card.slug}`}>
            <div className={styles.videosectionCard}>
              <div className={styles.videosectionImageWrapper}>
                <Image
                  src={card.image}
                  alt={card.title}
                  layout="fill"
                  objectFit="cover"
                  className={styles.videosectionImage}
                />
              </div>
              <div className={styles.videosectionCardContent}>
                <p className={styles.videosectionResource}>{resourceCategory.categorySlug} : videos</p>
                <h3 className={styles.videosectionTitle}>
                  {card.title}
                </h3>
                <p className={styles.videosectionDescription}>
                  {card.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
