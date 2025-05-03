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
        id="structured-data-webpage"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Business, Stock Market, Crypto, AI & Investment News for Global Market",
              description:
                "Stay updated with breaking news, global business insights, and financial strategies. Explore business investments, market trends, and analysis.",
              url: "https://www.washingtoninsider.org/",
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["h1"],
              },
            },
            null,
            2
          ),
        }}
      />

      <Script
        id="structured-data-itemlist"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              url: "https://www.washingtoninsider.org/",
              numberOfItems: 5,
              itemListOrder: "http://schema.org/ItemListOrderAscending",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.washingtoninsider.org/",
              },

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
                  url: "https://www.washingtoninsider.org/business/catherine-and-pierce-compete-for-a-listing-in-episode-7-exclusive-clip/",
                  name: "Catherine and Pierce Compete for a Listing in Episode 7 [Exclusive Clip]",
                  description:
                    "Catherine and Pierce clash in Episode 7 over a prime luxury real estate listing, reigniting careers and rivalries in this exclusive property drama.",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  url: "https://www.washingtoninsider.org/business/donald-trump-spent-millions-on-these-9-luxury-items-no-7-will-blow-your-mind/",
                  name: "Donald Trump Spent Millions on These 9 Luxury Items – No. 7 Will Blow Your Mind",
                  description:
                    "Donald Trump’s lavish spending revealed—explore 9 luxury items, from rare cars to gold-plated jets, showcasing his extravagant lifestyle.",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  url: "https://www.washingtoninsider.org/business/why-did-tom-o-brien-decide-not-to-run-for-mayor-against-wu-kraft/",
                  name: "Why did Tom O’Brien Decide Not to Run for Mayor Against Wu, Kraft?",
                  description:
                    "Tom O’Brien exits Boston’s mayoral race, raising questions about political strategy, real estate influence, and future business ties with City Hall.",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  url: "https://www.washingtoninsider.org/business/suryakumar-yadav-buys-two-luxurious-apartments-in-deonar-check-out-the-price-and-other-details/",
                  name: "Suryakumar Yadav Buys Two Luxurious Apartments in Deonar – Check Out the Price and Other Details",
                  description:
                    "Suryakumar Yadav invests ₹21.11 crore in two luxury Mumbai apartments, expanding his premium real estate portfolio in Deonar.",
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
