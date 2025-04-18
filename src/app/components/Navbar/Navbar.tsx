"use client";
import { useRef, useState } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  // Toggle Menu Dropdown
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle Accessibility Dropdown
  const handleAccessibilityToggle = () => {
    setIsAccessibilityOpen(!isAccessibilityOpen);
  };

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Toggle Search Bar
  const handleSearchToggle = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents closing when clicking inside search
    setIsSearchOpen((prev) => !prev);
  };

  // Close Search Bar if Clicking Outside
  const handleNavbarClick = (event: React.MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={styles["navbar-container"]}
        onClick={handleNavbarClick}
      >
        {/* Top Language Bar */}
        <div className={styles["navbar-languageBar"]}>
          {[
            { name: "English"},
            { name: "Français"},
            { name: "Español"},
            { name: "Português"},
            { name: "Українська"},
            { name: "Türkçe"},
            { name: "Русский"},
            { name: "Deutsch"},
            { name: "Italiano"},
            { name: "Polski" },
            { name: "Nederlands",},
            { name: "Čeština" },
            { name: "Svenska"},
            { name: "Română"},
            { name: "Ελληνικά"},
          ].map((lang, index) => (
            <span
              key={index}
              className={styles["navbar-language"]}
            >
              {lang.name}
            </span>
          ))}
        </div>

        {/* Main Navigation */}
        <div className={styles["navbar-mainNav"]}>
          <div className={styles["navbar-leftSection"]} ref={searchRef}>
            <div
              className={`${styles["navbar-searchWrapper"]} ${
                isSearchOpen ? styles["searchOpen"] : ""
              }`}
            >
              <svg
                className={styles["navbar-icon"]}
                onClick={handleSearchToggle}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="15"
                height="15"
              >
                <path
                  fill="#ffffff"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                />
              </svg>

              {!isSearchOpen && <span>Search</span>}

              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="Search"
                  className={styles["navbar-searchInput"]}
                />
              )}
            </div>
          </div>

          {/* Logo and Title Side by Side */}
          <div className={styles["navbar-centerSection"]}>
          <Link href="/" title="washington insider">
            <span className="navbar-logo-icon">
              <Image
                src="/images/washingtoninsider-logo.avif"
                alt="Global Investigative Journalism Network"
                quality={25}
                width={50}
                height={50}
                priority
              />
            </span>
            </Link>
            <Link href="/" title="washington insider">
              <span className={styles["navbar-title"]}>washingtoninsider</span>
            </Link>

            <button
              className={styles["navbar-menuButton"]}
              onClick={handleMenuToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="15"
                height="15"
              >
                <path
                  fill="#ffffff"
                  d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
                />
              </svg>
              <span>Menu</span>
            </button>
          </div>

          {/* Right Section */}
          <div className={styles["navbar-rightSection"]}>
            <div
              className={styles["navbar-accessibilityIcon"]}
              onClick={handleAccessibilityToggle}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="20"
                  height="20"
                >
                  <path
                    fill="#ffffff"
                    d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm161.5-86.1c-12.2-5.2-26.3 .4-31.5 12.6s.4 26.3 12.6 31.5l11.9 5.1c17.3 7.4 35.2 12.9 53.6 16.3l0 50.1c0 4.3-.7 8.6-2.1 12.6l-28.7 86.1c-4.2 12.6 2.6 26.2 15.2 30.4s26.2-2.6 30.4-15.2l24.4-73.2c1.3-3.8 4.8-6.4 8.8-6.4s7.6 2.6 8.8 6.4l24.4 73.2c4.2 12.6 17.8 19.4 30.4 15.2s19.4-17.8 15.2-30.4l-28.7-86.1c-1.4-4.1-2.1-8.3-2.1-12.6l0-50.1c18.4-3.5 36.3-8.9 53.6-16.3l11.9-5.1c12.2-5.2 17.8-19.3 12.6-31.5s-19.3-17.8-31.5-12.6L338.7 175c-26.1 11.2-54.2 17-82.7 17s-56.5-5.8-82.7-17l-11.9-5.1zM256 160a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
                  />
                </svg>
              </span>
            </div>

            <button className={styles["navbar-donateButton"]}>Donate</button>
          </div>
        </div>
      </header>
      <div className={styles["search-mobile-div"]}>
        {isSearchOpen && (
          <div className={styles["inside-search-mobile-div"]}>
            <input
              type="text"
              placeholder="🔍 Search"
              className={styles["navbar-searchInput2"]}
            />
          </div>
        )}
      </div>
      <div className="nav-dropdown-div">
        {isMenuOpen && (
          <div className={styles["navbar-dropdown"]}>
            <ul className={styles["navbar-menuList"]}>
              <Link href="/business">
                <li>
                  <span className={styles["navbar-itemTitle"]}>Business</span>
                  <span className={styles["navbar-itemDesc"]}>
                    Trends and insights shaping global markets
                  </span>
                  <span className={styles["navbar-itemArrow"]}>→</span>
                </li>
              </Link>
              <Link href="/stocks">
                <li>
                  <span className={styles["navbar-itemTitle"]}>Stocks</span>
                  <span className={styles["navbar-itemDesc"]}>
                    Daily updates and strategies for smart investing
                  </span>
                  <span className={styles["navbar-itemArrow"]}>→</span>
                </li>
              </Link>
              <Link href="/cryptocurrency">
                <li>
                  <span className={styles["navbar-itemTitle"]}>
                    Cryptocurrency
                  </span>
                  <span className={styles["navbar-itemDesc"]}>
                    Digital assets, blockchain news, and crypto trends
                  </span>
                  <span className={styles["navbar-itemArrow"]}>→</span>
                </li>
              </Link>
              <Link href="/reits">
                <li>
                  <span className={styles["navbar-itemTitle"]}>REITs</span>
                  <span className={styles["navbar-itemDesc"]}>
                    Smart ways to invest in income-generating properties
                  </span>
                  <span className={styles["navbar-itemArrow"]}>→</span>
                </li>
              </Link>
              <Link href="/artificial-intelligence-and-tech-startups">
                <li>
                  <span className={styles["navbar-itemTitle"]}>
                    Artificial Intelligence (AI) & Tech Startups
                  </span>
                  <span className={styles["navbar-itemDesc"]}>
                    The latest in innovation, automation, and disruption
                  </span>
                  <span className={styles["navbar-itemArrow"]}>→</span>
                </li>
              </Link>
              <Link href="/sustainable-and-esg-investments">
                <li>
                  <span className={styles["navbar-itemTitle"]}>
                    Sustainable & ESG Investments
                  </span>
                  <span className={styles["navbar-itemDesc"]}>
                    Finance that fuels a better, greener future
                  </span>
                  <span className={styles["navbar-itemArrow"]}>→</span>
                </li>
              </Link>

              <Link href="/private-equity-and-venture-capital">
                <li>
                  <span className={styles["navbar-itemTitle"]}>
                    Private Equity & Venture Capital
                  </span>
                  <span className={styles["navbar-itemDesc"]}>
                    Inside deals, funding rounds, and startup success
                  </span>
                  <span className={styles["navbar-itemArrow"]}>→</span>
                </li>
              </Link>
              <Link href="/metaverse-and-virtual-real-estate">
                <li>
                  <span className={styles["navbar-itemTitle"]}>
                    Metaverse & Virtual Real Estate
                  </span>
                  <span className={styles["navbar-itemDesc"]}>
                    Exploring digital spaces and next-gen property markets
                  </span>
                  <span className={styles["navbar-itemArrow"]}>→</span>
                </li>
              </Link>
            </ul>

            {/* Languages Row */}
            <div className={styles["navbar-languagesRow"]}>
              {[
                "English",
                "Français",
                "Español",
                "Português",
                "Українська",
                "Türkçe",
                "Русский",
                "Deutsch",
                "Italiano",
                "Polski",
                "Nederlands",
                "Čeština",
                "Svenska",
                "Română",
                "Ελληνικά",
              ].map((lang, index) => (
                <button key={index} className={styles["navbar-langButton"]}>
                  {lang}
                </button>
              ))}
            </div>

            <div className={styles["navbar-footer"]}>
              {/* Social Media Icons (Left) */}
              <div className={styles["navbar-socialIcons"]}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    width="15"
                    height="15"
                    fill="currentColor"
                  >
                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                  </svg>
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="15"
                    height="15"
                    fill="currentColor"
                  >
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    width="15"
                    height="15"
                    fill="currentColor"
                  >
                    <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                  </svg>
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="15"
                    height="15"
                    fill="currentColor"
                  >
                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                  </svg>
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="15"
                    height="15"
                    fill="currentColor"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="15"
                    height="15"
                    fill="currentColor"
                  >
                    <path d="M0 64C0 46.3 14.3 32 32 32c229.8 0 416 186.2 416 416c0 17.7-14.3 32-32 32s-32-14.3-32-32C384 253.6 226.4 96 32 96C14.3 96 0 81.7 0 64zM0 416a64 64 0 1 1 128 0A64 64 0 1 1 0 416zM32 160c159.1 0 288 128.9 288 288c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-123.7-100.3-224-224-224c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
                  </svg>
                </span>
              </div>

              {/* Donate Button (Right) */}
              <button className={styles["navbar-donateButton"]}>Donate</button>
            </div>
          </div>
        )}
      </div>
      <div className="nav-accessebility-div">
        {isAccessibilityOpen && (
          <div className={styles["navbar-accessibilityDropdown"]}>
            <div className={styles["navbar-accessibility-left"]}>
              <h2 className={styles["navbar-accessibilityTitle"]}>
                ACCESSIBILITY SETTINGS
              </h2>

              {/* Reset Button */}
              <button className={styles["navbar-accessibilityReset"]}>
                reset all
              </button>
            </div>

            {/* Accessibility Grid */}
            <div className={styles["navbar-accessibility-right"]}>
              <div className={styles["navbar-accessibilityGrid"]}>
                {/* Text Size */}
                <div>
                  <h3>TEXT SIZE</h3>
                  <button>— decrease</button>
                  <button>+ increase</button>
                </div>

                {/* Color Options */}
                <div>
                  <h3>COLOR OPTIONS</h3>
                  <button>monochrome</button>
                  <button>muted color</button>
                  <button>dark</button>
                </div>

                {/* Reading Tools */}
                <div>
                  <h3>READING TOOLS</h3>
                  <button>isolation</button>
                  <button>ruler</button>
                </div>

                {/* Other */}
                <div>
                  <h3>OTHER</h3>
                  <button>no motion</button>
                  <button>large cursor</button>
                </div>
              </div>
            </div>

            {/* Close Button (top-right) */}
            <button
              className={styles["navbar-accessibilityClose"]}
              onClick={handleAccessibilityToggle}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
