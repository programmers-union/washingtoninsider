'use client';

import { useState, useEffect } from 'react';
import styles from '../Qdm/Qdm.module.css';

export type TabType = 'category4' | 'category5' | 'category6';

type Tab = {
  id: TabType;
  label: string;
};

type ClientQdmProps = {
  tabs: Tab[];
};

const ClientQdm: React.FC<ClientQdmProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<TabType>('category4');

  useEffect(() => {
    // Toggle visibility of the content panels based on the active tab
    const tabIds: TabType[] = ['category4', 'category5', 'category6'];
    tabIds.forEach((tabId) => {
      const contentEl = document.getElementById(`${tabId}-content`);
      if (contentEl) {
        if (tabId === activeTab) {
          contentEl.classList.add('active');
        } else {
          contentEl.classList.remove('active');
        }
      }
    });
  }, [activeTab]);

  return (
    <div className={styles['qdm-section-tabs']}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles['qdm-section-tab']} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {activeTab === tab.id && <span className={styles['qdm-section-dot']} />}
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default ClientQdm;
