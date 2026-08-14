import "./Header.css";

export default function Header() {
  return (
    <header className="header">

      <div className="logo-area">

        <div className="logo">
          R
        </div>

        <h1 className="titulo">
          receita<span>+</span>
        </h1>

      </div>

      <div className="usuario">

        <div className="status"></div>

        <span>Dados financeiros</span>

      </div>

    </header>
  );
}