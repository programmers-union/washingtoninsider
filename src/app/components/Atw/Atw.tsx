import otherData from '@/data/otherData.json';
import styles from './Atw.module.css';
import AtwClient from '../AtwClient/AtwClient';

export default function Atw() {
  return (
    <div className={styles['ATW-section-wrapper']} style={{ position: 'relative' }}>
      <h2 className={styles['ATW-section-title']}>Around the World</h2>

      {/* Scrollable container with content */}
      <div className={styles['ATW-section-container']} id="atw-scroll-container">
        {otherData.atw.map((item, index) => (
          <div className={styles['ATW-section-card']} key={index}>
            <h3 className={styles['ATW-section-heading']}>{item.title}</h3>
            <p className={styles['ATW-section-source']}>Source: {item.source}</p>
            <p className={styles['ATW-section-content']}>{item.content}</p>
          </div>
        ))}
      </div>

      {/* Scroll Buttons */}
      <div className={styles['ATW-section-scrollBtns']}>
        <AtwClient />
      </div>
    </div>
  );
}
