import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Projects from "./components/Projects/Projects";
import Videos from "./components/Videos/Videos";
import Qdm from "./components/Qdm/Qdm";
import Atw from "./components/Atw/Atw";
import Story from "./components/Story/Story";
import Script from "next/script";

export default function Home() {
  return (
    <main>
      <Script
        id="structured-data-itemlist"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              url: "https://www.washingtoninsider.org/",
              numberOfItems: 2,
              itemListOrder: "http://schema.org/ItemListOrderAscending",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  url: "https://www.washingtoninsider.org/business/Julio-Herrera-Velutini-and-His-Business-Investments-in-the-Global-Market/",
                  name: "Julio Herrera Velutini’s Top 7 Global Business Investments",
                  description:
                    "Julio Herrera Velutini unveils seven key global investments-from UAE fintech and Swiss banking to Caribbean turnarounds, microfinance & sustainable real estate.",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  url: "https://www.washingtoninsider.org/business/",
                  name: "Business Market Trends in 2025",
                  description:
                    "Explore 2025’s business landscape with insights on global investments, luxury real estate trends, high-profile financial moves, and market-shaping events involving leaders like Julio Herrera Velutini, Donald Trump, and emerging markets",
                },
              ],
            },
            null,
            2
          ),
        }}
      />
      

      <Navbar />
      <Story />
      <Atw />
      <Qdm />
      <Projects />
      <Videos />
      <Footer />
    </main>
  );
}
