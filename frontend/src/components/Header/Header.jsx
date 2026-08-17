import "./Header.css";

export default function Header() {
  return (
    <header className="header">

      <div className="header-container">

        <div className="header-left">

          <div className="header-logo">
            R
          </div>

          <h2 className="header-title">
            receita<span>+</span>
          </h2>

        </div>

        <div className="header-right">

          <span className="header-status"></span>

          <p className="header-text">
            Dados financeiros
          </p>

        </div>

      </div>

    </header>
  );
}