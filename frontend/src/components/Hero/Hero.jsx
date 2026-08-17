import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-container">

        <div className="hero-left">

          <p className="hero-subtitle">
            VISÃO GERAL
          </p>

          <h1 className="hero-title">
            Suas receitas,

            <span>em movimento.</span>
          </h1>

          <p className="hero-description">
            Um painel simples para acompanhar cada entrada e
            enxergar o que faz seu mês crescer.
          </p>

        </div>

        <div className="hero-right">

          <div className="hero-line"></div>

          <p className="hero-today">
            Hoje
          </p>

          <h3 className="hero-date">
            13 de Agosto
          </h3>

        </div>

      </div>

    </section>
  );
}