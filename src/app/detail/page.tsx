'use client';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Image from 'next/image';
import styles from './page.module.css';

// Example data for the 3-column layout below the top image
const leftColumnData = [
  {
    label: 'STORIES > Data Journalism Top 10',
  },
];

const centerColumnData = {
  title: "COVID-19's Impact Five Years On, Chinese Harassment of Taiwan, Peruvian Political Fortunes, and 75 Years of Formula 1",
  byline: "By Ana Beatriz Assam - March 28, 2025",
  paragraphs: [
    "Sometimes it seems like it was just yesterday that the World Health Organization (WHO) declared COVID-19 a pandemic. But it was five years ago — March 11, 2024 — that we started to quarantine ourselves and adopt extra protection and hygiene measures. To mark the date, The New York Times shows in 30 graphs how the US has changed in the meantime.",
    "This edition of our Top 10 in Data Journalism, which considered stories between March 8 and 21, also highlights an ESPN report on the 30th anniversary of Formula 1 major team records; a visual narrative from Nikkei on the 30th anniversary; an Al Jazeera special feature on how Ramadan works in countries with opposite time zones; and a statistical tool from FlowData on the grim science of predicting when a person will die.",
  ],
  subheading: "COVID-19 Pandemic's Legacy, Five Years On",
  graphImage: "/images/detailgraph.webp",
  belowGraphText:
  "On March 11, 2020, the WHO declared COVID-19 — an acute respiratory infection caused by the highly transmissible and often fatal coronavirus SARS-CoV-2 — a pandemic. As The New York Times noted, decades from now the pandemic’s imprint will still be visible in historical data for almost everything that can be measured, whether as a spike or a sharp decline. In this special report, the newspaper presents a series of graphs that capture these sharp changes and wide-ranging impact that COVID-19 has had in the United States, from the number of unemployment claims to Google searches for how to cut your own hair — both have seen dramatic increases — to those indicators that have seen sharp declines, such as time spent socializing with others, public transportation travel, and even money spent on food. Finally, the saddest graph: the total number of deaths in the US, which had the highest number of lives lost in the world.",
};

const rightColumnData = {
  heading: 'RELATED STORIES',
  cards: [
    {
      id: 1,
      title: 'Investigating US Government and Freedoms',
      image: '/images/detailpagecard.webp',
    },
    {
      id: 2,
      title: 'Peruvian Political Fortunes: A Deep Dive',
      image: '/images/detailpagecard.webp',
    },
    {
      id: 3,
      title: 'Exploring AI Tools in Journalism',
      image: '/images/detailpagecard.webp',
    },
  ],
};

export default function DetailPage() {
  return (
    <>
      <Navbar />

      {/* 
        TOP SECTION (KEEPING YOUR EXACT CODE)
        -------------------------------------
      */}
      <div className={styles.detailpageWrapper}>
        {/* Background (blurred) */}
        <div className={styles.detailpageBackground}>
          <Image
            src="/images/detailpage.webp" // your image in public/images
            alt="Blurred background"
            fill
            className={styles.detailpageBgImage}
            priority
          />
        </div>

        {/* Foreground (50% width) */}
        <div className={styles.detailpageForeground}>
          <Image
            src="/images/detailpage.webp" // same image
            alt="Foreground image"
            fill
            className={styles.detailpageForegroundImage}
            priority
          />
        </div>
      </div>
      {/* 
        END OF TOP SECTION 
        -------------------------------------
      */}

      {/* TITLE HEADER SECTION */}
<div className={styles.detailpageTitleHeader}>
  <div className={styles.detailpageTitleHeaderLeft}>
  
  <p className={styles.detailpageBreadcrumbs}>
    STORIES • TOPICS » <a href="#">Data Journalism Top 10</a>
  </p>


  </div>

  <div className={styles.detailpageTitleHeaderCenter}>
    <h1 className={styles.detailpageMainTitle}>{centerColumnData.title}</h1>
    <p className={styles.detailpageMainByline}>{centerColumnData.byline}</p>
  </div>
</div>


      <div className={styles.detailpageContentWrapper}>
        {/* Left Column */}
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

{/* RELATED RESOURCES */}
<div className={styles.detailpageResourcesBlock}>
  <h4 className={styles.detailpageResourcesTitle}>RELATED RESOURCES</h4>
  {[
    'Tipsheet: How Journalists Can Use a UN Process to Evaluate National Human Rights Records',
    'Investigating US Government — and Trump Administration — Influence in Your Country',
    'Academic and Training Scholarships for Investigative Journalism',
    'Guide to Investigating Fossil Fuels',
  ].map((text, index) => (
    <div key={index} className={styles.detailpageResourceCard}>
      <Image
        src="/images/detailpagecard.webp"
        alt="Related Resource"
        width={80}
        height={80}
        className={styles.detailpageResourceImage}
      />
      <p className={styles.detailpageResourceText}>{text}</p>
    </div>
  ))}
</div>

        </div>

        {/* Center Column: Main Article */}
        <div className={styles.detailpageCenter}>
          {/* <h1 className={styles.detailpageTitle}>{centerColumnData.title}</h1>
          <p className={styles.detailpageByline}>{centerColumnData.byline}</p> */}

          {centerColumnData.paragraphs.map((paragraph, idx) => (
            <p key={idx} className={styles.detailpageParagraph}>
              {paragraph}
            </p>
          ))}

          <h2 className={styles.detailpageSubheading}>
            {centerColumnData.subheading}
          </h2>

          <div className={styles.detailpageGraph}>
  <Image
    src={centerColumnData.graphImage}
    alt="Detail Graph"
    fill
    className={styles.detailpageGraphImage}
  />
</div>
<p className={styles.detailpageParagraph}>
  {centerColumnData.belowGraphText}
</p>

        </div>

        {/* Right Column: Related Stories */}
        {/* RIGHT COLUMN - RELATED STORIES */}
<div className={styles.detailpageRight}>
  <h3 className={styles.detailpageRightHeading}>RELATED STORIES</h3>

  {[
    'What’s Left of Post-War Gaza, ‘Forever’ Chemicals in Spain’s Water, and the United States of Deportation',
    '‘New Great Wall’ of China, Ukraine on the Offensive, Spain’s Coast Under Threat, and the Scale of Gaza Destruction',
    'Iron Dome’s Defense Network, Hong Kong’s Plastic Waste Ban, European ‘Brain Waste,’ and 100 Days to Paris Olympics',
    'Generative AI Hiring Bias, Women’s Advances in National Politics, Predicting UK Voters, and North Korea Bypassing Sanctions',
  ].map((title, idx) => (
    <div key={idx} className={styles.detailpageStoryCard}>
      <Image
        src={`/images/detailpagecard.webp`} // You can replace with unique per card later
        alt="Related story"
        width={90}
        height={90}
        className={styles.detailpageStoryImage}
      />
      <p className={styles.detailpageStoryText}>{title}</p>
    </div>
  ))}

  <a href="#" className={styles.detailpageMoreStories}>
    More Stories →
  </a>
</div>


      </div>
      <div className={styles.detailpageFooterNote}>
  {/* Left: Creative Commons Section */}
  <div className={styles.detailpageLicense}>
    <div className={styles.detailpageLicenseLeft}>
      <div className={styles.detailpageFooternotImagewrapper}>
      <Image
      className={styles.detailpageFooternotImage}
        src="/images/by-nc.svg" 
        alt="Creative Commons License"
        width={60}
        height={20}
      />
      </div>
      
      <p>
        This work is licensed under a{' '}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Creative Commons Attribution-NoDerivatives 4.0 International License
        </a>
      </p>
    </div>

    <div className={styles.detailpageLicenseRight}>
      <button className={styles.detailpageRepublishBtn}><span className={styles.detailpageRepublishBtnSpan}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.9 142.9c-17.5 17.5-30.1 38-37.8 59.8c-5.9 16.7-24.2 25.4-40.8 19.5s-25.4-24.2-19.5-40.8C55.6 150.7 73.2 122 97.6 97.6c87.2-87.2 228.3-87.5 315.8-1L455 55c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2l0 128c0 13.3-10.7 24-24 24l-8.4 0c0 0 0 0 0 0L344 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l41.1-41.1c-62.6-61.5-163.1-61.2-225.3 1zM16 312c0-13.3 10.7-24 24-24l7.6 0 .7 0L168 288c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-41.1 41.1c62.6 61.5 163.1 61.2 225.3-1c17.5-17.5 30.1-38 37.8-59.8c5.9-16.7 24.2-25.4 40.8-19.5s25.4 24.2 19.5 40.8c-10.8 30.6-28.4 59.3-52.9 83.8c-87.2 87.2-228.3 87.5-315.8 1L57 457c-6.9 6.9-17.2 8.9-26.2 5.2S16 449.7 16 440l0-119.6 0-.7 0-7.6z"/></svg>
      </span> Republish this article</button>
      <p>
        Republish our articles for free, online or in print, under a Creative Commons license.
      </p>
    </div>
  </div>

  {/* Right: Tags Section */}
  <div className={styles.detailpageTags}>
    <p className={styles.detailpageTagsHeading}>READ OTHER STORIES TAGGED WITH:</p>
    <div className={styles.detailpageTagList}>
      <span>covid-19</span>
      <span>data visualization</span>
      <span>follow the money</span>
      <span>marine tracking</span>
    </div>
  </div>
</div>


<div className={styles.detailpageReadNext}>
  <h2 className={styles.detailpageReadNextHeading}>Read Next</h2>
  <div className={styles.detailpageReadNextGrid}>
    {[
      {
        title: "What’s Left of Post-War Gaza, ‘Forever’ Chemicals in Spain’s Water, and the United States of Deportation",
        author: "Ana Beatriz Assam",
        date: "January 31, 2025",
        excerpt: "The latest edition of our Top 10 in Data Journalism column also highlights the risks of nuclear war, drought in the Amazon, and a guide to the upcoming Year of the Snake.",
      },
      {
        title: "‘New Great Wall’ of China, Ukraine on the Offensive, Spain’s Coast Under Threat, and the Scale of Gaza Destruction",
        author: "Ana Beatriz Assam",
        date: "August 23, 2024",
        excerpt: "Our latest column curates some of the best data journalism from around the world, with pieces about the Olympics, gambling in South Korea, and online shopping trends.",
      },
      {
        title: "Iron Dome’s Defense Network, Hong Kong’s Plastic Waste Ban, European ‘Brain Waste,’ and 100 Days to Paris Olympics",
        author: "Ana Beatriz Assam",
        date: "April 26, 2024",
        excerpt: "In this edition, we also highlight the export destinations of smuggled Peruvian gold, the worker shortage hampering the Russian economy, and refugee flow patterns.",
      },
      {
        title: "Generative AI Hiring Bias, Women’s Advances in National Politics, Predicting UK Voters, and North Korea Bypassing Sanctions",
        author: "Alexa van Sickle and Eunice Au",
        date: "March 15, 2024",
        excerpt: "Our curated list of the most interesting data journalism between February 26 and March 11, including gender data, predictive tools, and AI regulation.",
      },
    ].map((card, idx) => (
      <div key={idx} className={styles.detailpageCard}>
        <Image
          src="/images/detailpagecard.webp"
          alt="Next article"
          width={400}
          height={200}
          className={styles.detailpageCardImage}
        />
        <p className={styles.detailpageCardTag}>DATA JOURNALISM TOP 10</p>
        <h3 className={styles.detailpageCardTitle}>{card.title}</h3>
        <p className={styles.detailpageCardByline}>
          by <em>{card.author}</em> • {card.date}
        </p>
        <p className={styles.detailpageCardExcerpt}>{card.excerpt}</p>
      </div>
    ))}
  </div>
</div>


      <Footer />
    </>
  );
}
