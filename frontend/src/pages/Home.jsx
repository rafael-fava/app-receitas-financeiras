import "./Home.css";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import CardsResumo from "../components/CardsResumo/CardsResumo";
import GraficoReceitas from "../components/GraficoReceitas/GraficoReceitas";
import ConsultaReceita from "../components/ConsultaReceita/ConsultaReceita";

export default function Home() {
  return (
    <main className="home">

      <div className="home-container">

        {/* Header */}
        <Header />

        {/* Section 1 */}
        <Hero />

        {/* Section 2 */}
        <CardsResumo />

        {/* Section 3 */}
        <section className="section3">

          <GraficoReceitas />

          <ConsultaReceita />

        </section>

      </div>

    </main>
  );
}