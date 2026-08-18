import "./Home.css";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import CardsResumo from "../components/CardsResumo/CardsResumo";

export default function Home() {
  return (
    <main className="home">

      <div className="home-container">

        <Header />

        <Hero />

        <CardsResumo />

      </div>

    </main>
  );
}