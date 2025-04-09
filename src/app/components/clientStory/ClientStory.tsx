
'use client';
import React, { useEffect, useState } from "react";
import styles from "../Story/Story.module.css";
import { FaPlay, FaPause } from "react-icons/fa";
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
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % stories.length);
    }, 5000);
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
            aria-label={autoPlay ? "Pause" : "Play"}
          >
            {autoPlay ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      </div>

      <Link href={`/${categorySlug}/${stories[current].slug}`} title={stories[current].title}>
        <div className={styles["story-section-image-wrapper"]}>
          <Image
            src={stories[current].image}
            alt={stories[current].title}
            width={800}
            height={200}
            className={styles["story-section-image"]}
           priority
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
