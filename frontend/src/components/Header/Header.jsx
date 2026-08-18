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

                    <span className="header-text">
                        Dados financeiros
                    </span>

                </div>

            </div>

        </header>

    );

}