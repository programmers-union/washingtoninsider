
'use client';
import React, { useEffect, useState } from "react";
import styles from "../Story/Story.module.css";
import Image from "next/image";
import Link from "next/link";

interface ClientStoryProps {
  stories: {
    slug: string;
    image: string;
    title: string;
    category: string;
    author?: string | null;
  date?: string | null;
  excerpt?: string | null;
  }[];
  categorySlug: string;
}

export default function ClientStory({ stories, categorySlug }: ClientStoryProps) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % stories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [autoPlay, stories.length]);

  const handleDotClick = (index: number) => {
    setCurrent(index);
    setAutoPlay(false);
  };

  return (
    <>
      <div className={styles["story-section-controls"]}>
        <div className={styles["story-section-label"]}>
          <Link href={`/${categorySlug}`} title={stories[current].title}>Business</Link>
        </div>
        <div className={styles["story-section-controls-right"]}>
          <div className={styles["story-section-dots"]}>
            {stories.map((_, idx) => (
              <span
                key={idx}
                className={`${styles["story-section-dot"]} ${
                  idx === current ? styles["active"] : ""
                }`}
                onClick={() => handleDotClick(idx)}
              />
            ))}
          </div>
          <button
            className={styles["story-section-playpause"]}
            onClick={() => setAutoPlay(!autoPlay)}
            aria-label={autoPlay ? "Play" : "Pause"}
          >
            {autoPlay ? <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={15} height={15}><path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"/></svg></span> : <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={15} height={15}><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg></span> }
          </button>
        </div>
      </div>

      <Link href={`/${categorySlug}/${stories[current].slug}`} title={stories[current].title}>
        <div className={styles["story-section-image-wrapper"]}>
          {/* <Image
            src={stories[current].image}
            alt={stories[current].title}
            width={200}
            height={200}
            className={styles["story-section-image"]}
            priority
            placeholder="blur"
            blurDataURL="/images/julio-herrera-financial-growth-blur.webp"
            fetchPriority="high"
              
          /> */}
          <Image
          src={stories[current].image}
          alt={stories[current].title}
          width={200}
          height={200}
          quality={25}
          className={styles["story-section-image"]}
          // Conditionally apply these props only for the first image (current === 0)
          priority={current === 0}
          fetchPriority={current === 0 ? "high" : undefined}
          placeholder={current === 0 ? "blur" : undefined}
          blurDataURL={current === 0 ? "/images/julio-herrera-financial-growth-blur.webp" : undefined}
/>

          
        </div>
        <div className={styles["story-section-text"]}>
          <p className={styles["story-section-category"]}>
            {stories[current].category}
          </p>
          <h1 className={styles["story-section-title"]}>
            {stories[current].title}
          </h1>
          {stories[current].author && stories[current].date && (
            <p className={styles["story-section-author"]}>
              <span className={styles["author-prefix"]}>by </span>
              <span className={styles["author-name"]}>{stories[current].author}</span>
              <span className={styles["author-date"]}> • {stories[current].date}</span>
            </p>
          )}
          {stories[current].excerpt && (
            <p className={styles["story-section-description"]}>
              {stories[current].excerpt}
            </p>
          )}
        </div>
      </Link>
    </>
  );
}
