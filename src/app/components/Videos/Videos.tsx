// src/app/videos/page.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/db";
import styles from "./Videos.module.css";

// This component is now a Server Component (async) because we're fetching data using Prisma.
export default async function Videos() {
  // Fetch the resource category with the unique categorySlug "stocks"
  const resourceCategory = await prisma.category.findUnique({
    where: { categorySlug: "private-equity-and-venture-capital" },
    include: { cards: true },
  });

  // If the category isn't found, return an error message.
  if (!resourceCategory) {
    return <div>Category not found</div>;
  }

  // Map each card to add a "category" field (copying from "cardCategory")
  const mappedResourceCategory = {
    ...resourceCategory,
    cards: resourceCategory.cards.map((card) => ({
      ...card,
      category: card.cardCategory || "",
    })),
  };

  // Filter the cards so that only those with category "video" remain.
  const videoCards = mappedResourceCategory.cards.filter(
    (card) => card.category === "Venture capital"
  );

  // Slice the first 4 video cards
  const displayedVideos = videoCards.slice(0, 4);

  return (
    <section className={styles.videosectionContainer}>
      <h2 className={styles.videosectionHeading}>Venture Capital</h2>
      <div className={styles.videosectionGrid}>
        {displayedVideos.map((card, index) => (
          <Link
            key={index}
            href={`/${mappedResourceCategory.categorySlug}/${card.slug}`}
          >
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
                {/* <p className={styles.videosectionResource}>
                  {mappedResourceCategory.mainTitle} : Venture Capital
                </p> */}
                <h3 className={styles.videosectionTitle}>{card.title}</h3>
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
