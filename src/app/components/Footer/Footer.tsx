import React from "react";
import styles from "./Footer.module.css";
import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaRss,
  FaNewspaper,
  FaBluesky
  
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.FooterContainer}>
      <div className={styles.FooterTop}>
        <div className={styles.FooterLogoSection}>
          <div className={styles.FooterLogoWrapper}>
            <img src="/images/logo.webp" alt="GIJN Logo" className={styles.FooterLogo} />
            <h1 className={styles.FooterTitle}>Global Investigative <br /> Journalism Network</h1>
          </div>
          <p className={styles.FooterFollow}>FOLLOW GIJN</p>
          <div className={styles.FooterIcons}>
            <FaFacebookF />
            <FaXTwitter />
            <FaYoutube />
            <FaLinkedinIn />
            <FaInstagram />
            <FaNewspaper/>
            <FaBluesky/>
            <FaRss />
            
            
          </div>
        </div>

        <div className={styles.FooterLinksSection}>
          <div className={styles.FooterColumn}>
            <h3>GIJN</h3>
            <ul>
              <li>Organizing Statement</li>
              <li>Staff & Consultants</li>
              <li>Board of Directors</li>
              <li>Donate</li>
            </ul>
          </div>
          <div className={styles.FooterColumn}>
            <h3>NETWORK</h3>
            <ul>
              <li>GIJN’s Global Network</li>
              <li>Our Members</li>
              <li>Global Conferences</li>
            </ul>
          </div>
          <div className={styles.FooterColumn}>
            <h3>OUR WORK</h3>
            <ul>
              <li>Stories</li>
              <li>Resource</li>
              <li>Projects</li>
              <li>Advisory Services</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.FooterBottom}>
        <p>© Copyright 2025, Global Investigative Journalism Network</p>
        <p>Site by Rectangle</p>
      </div>
    </footer>
  );
};

export default Footer;
