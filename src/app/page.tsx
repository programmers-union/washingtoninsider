import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Projects from "./components/Projects/Projects";
import Videos from "./components/Videos/Videos";
import Qdm from "./components/Qdm/Qdm";
import Atw from "./components/Atw/Atw";
import Story from "./components/Story/Story";

export default function Home() {
  return (
    <main itemScope
    itemType="https://schema.org/WebPage">
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
