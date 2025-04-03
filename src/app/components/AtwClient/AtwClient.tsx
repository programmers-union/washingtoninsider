'use client';

import { useEffect } from 'react';
import styles from '../Atw/Atw.module.css';

export default function AtwClient() {
  useEffect(() => {
    const container = document.getElementById('atw-scroll-container');

    const scroll = (direction: 'left' | 'right') => {
      if (container) {
        container.scrollBy({
          left: direction === 'left' ? -300 : 300,
          behavior: 'smooth',
        });
      }
    };

    const leftBtn = document.getElementById('atw-scroll-left');
    const rightBtn = document.getElementById('atw-scroll-right');

    if (leftBtn) leftBtn.onclick = () => scroll('left');
    if (rightBtn) rightBtn.onclick = () => scroll('right');

    // Optional: cleanup (in case component ever unmounts)
    return () => {
      if (leftBtn) leftBtn.onclick = null;
      if (rightBtn) rightBtn.onclick = null;
    };
  }, []);

  return (
    <>
      <button id="atw-scroll-left" className={styles['ATW-section-scrollBtn']}>←</button>
      <button id="atw-scroll-right" className={styles['ATW-section-scrollBtn']}>→</button>
    </>
  );
}
