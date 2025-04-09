"use client";
import { useRef, useState } from "react"; // <-- ADDED for menu toggle state
import styles from "./Navbar.module.css";
import Image from "next/image";
import { FaSearch, FaBars } from "react-icons/fa";
import "@fortawesome/fontawesome-free/css/all.min.css";
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
    <header className={styles["navbar-container"]} onClick={handleNavbarClick}>
      {/* Top Language Bar */}
      <div className={styles["navbar-languageBar"]}>
        {[
  { name: "English", link: "#" },
  { name: "Français", link: "#" },
  { name: "Español", link: "#" },
  { name: "Português", link: "#" },
  { name: "Українська", link: "#" },
  { name: "Türkçe", link: "#" },
  { name: "Русский", link: "#" },
  { name: "Deutsch", link: "#" },
  { name: "Italiano", link: "#" },
  { name: "Polski", link: "#" },
  { name: "Nederlands", link: "#" },
  { name: "Čeština", link: "#" },
  { name: "Svenska", link: "#" },
  { name: "Română", link: "#" },
  { name: "Ελληνικά", link: "#" }
]
.map((lang, index) => (
          <a key={index} href={lang.link} className={styles["navbar-language"]}>
            {lang.name}
          </a>
        ))}
      </div>

      {/* Main Navigation */}
      <div className={styles["navbar-mainNav"]}>
        <div className={styles["navbar-leftSection"]} ref={searchRef} >
          <div 
            className={`${styles["navbar-searchWrapper"]} ${
              isSearchOpen ? styles["searchOpen"] : ""
            }`}
            
          >
            <FaSearch className={styles["navbar-icon"]} onClick={handleSearchToggle}  />

           
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
          <span className="navbar-logo-icon">
            <Image
              src="/images/washingtoninsider-logo.webp"
              alt="Global Investigative Journalism Network"
              width={50}
              height={50}
            />
          </span>
            <Link href="/">
            <span className={styles["navbar-title"]}>
            washingtoninsider
          </span>
            </Link>
          
          <button
            className={styles["navbar-menuButton"]}
            onClick={handleMenuToggle}
          >
            <FaBars />
            <span>Menu</span>
          </button>
        </div>

        {/* Right Section */}
        <div className={styles["navbar-rightSection"]}>
          <div
            className={styles["navbar-accessibilityIcon"]}
            onClick={handleAccessibilityToggle}
          >
            <i className="fa-solid fa-universal-access"></i>
          </div>

          
          <button className={styles["navbar-donateButton"]}>Donate</button>
        </div>
      </div>

      
      
      {/* ▲▲▲ END DROPDOWN MENU ▲▲▲ */}
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
              Trends and insights shaping global  markets
              </span>
              <span className={styles["navbar-itemArrow"]}>→</span>
            </li>
            </Link>
            <Link href="/stocks">
            <li>
              <span className={styles["navbar-itemTitle"]}>
              Stocks
              </span>
              <span className={styles["navbar-itemDesc"]}>
              Daily updates and strategies for smart investing
              </span>
              <span className={styles["navbar-itemArrow"]}>→</span>
            </li>
            </Link>
            <Link href="/cryptocurrency">
            <li>
              <span className={styles["navbar-itemTitle"]}>Cryptocurrency</span>
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
              <span className={styles["navbar-itemTitle"]}>Artificial Intelligence (AI) & Tech Startups</span>
              <span className={styles["navbar-itemDesc"]}>
              The latest in innovation, automation, and disruption
              </span>
              <span className={styles["navbar-itemArrow"]}>→</span>
            </li>
            </Link>
            <Link href="/sustainable-and-esg-investments">
            <li>
              <span className={styles["navbar-itemTitle"]}>Sustainable & ESG Investments</span>
              <span className={styles["navbar-itemDesc"]}>
              Finance that fuels a better, greener future
              </span>
              <span className={styles["navbar-itemArrow"]}>→</span>
            </li>
            </Link>
            
            <Link href="/private-equity-and-venture-capital">
            <li>
              <span className={styles["navbar-itemTitle"]}>Private Equity & Venture Capital</span>
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

          {/* ▼▼▼ Add this at the end of your dropdown menu ▼▼▼ */}
          <div className={styles["navbar-footer"]}>
            {/* Social Media Icons (Left) */}
            <div className={styles["navbar-socialIcons"]}>
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fas fa-rss"></i>
              </a>
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
                <h3 className={styles["navbar-accessibilityTitle"]}>
                  ACCESSIBILITY SETTINGS
                </h3>

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
                    <h4>TEXT SIZE</h4>
                    <button>— decrease</button>
                    <button>+ increase</button>
                  </div>

                  {/* Color Options */}
                  <div>
                    <h4>COLOR OPTIONS</h4>
                    <button>monochrome</button>
                    <button>muted color</button>
                    <button>dark</button>
                  </div>

                  {/* Reading Tools */}
                  <div>
                    <h4>READING TOOLS</h4>
                    <button>isolation</button>
                    <button>ruler</button>
                  </div>

                  {/* Other */}
                  <div>
                    <h4>OTHER</h4>
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
