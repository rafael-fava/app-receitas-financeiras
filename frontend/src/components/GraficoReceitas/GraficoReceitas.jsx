import { useEffect, useState } from "react";
import "./GraficoReceitas.css";

export default function GraficoReceitas() {

    const [receitas, setReceitas] = useState([]);

    useEffect(() => {
        carregarReceitas();
    }, []);

    async function carregarReceitas() {

        try {

            const response = await fetch("http://localhost:8080/api/receitas");

            if (!response.ok) {
                throw new Error("Erro ao buscar receitas");
            }

            const data = await response.json();

            setReceitas(data);

        } catch (error) {

            console.error(error);

        }

    }

    const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
        month: "short",
    });

    const months = Array.from({ length: 6 }, (_, index) => {

        const date = new Date();

        date.setMonth(date.getMonth() - (5 - index), 1);

        return {

            key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,

            label: monthFormatter
                .format(date)
                .replace(".", "")
                .replace(/^./, c => c.toUpperCase()),

            total: 0,

        };

    });

    receitas.forEach((receita) => {

        const month = months.find(
            ({ key }) => key === receita.data.slice(0, 7)
        );

        if (month) {

            month.total += Number(receita.valor);

        }

    });

    const max = Math.max(...months.map(m => m.total), 1);

    return (

        <section className="grafico">

            <div className="grafico-topo">

                <div>

                    <p className="grafico-subtitulo">
                        EVOLUÇÃO
                    </p>

                    <h2 className="grafico-titulo">
                        Receitas nos últimos 6 meses
                    </h2>

                </div>

                <div className="grafico-legenda">

                    <span className="grafico-bolinha"></span>

                    <span>Valor recebido</span>

                </div>

            </div>

            <div className="grafico-area">

                <div className="linha linha-topo">
                    <span>R$ {max.toFixed(2)}</span>
                </div>

                <div className="linha linha-meio">
                    <span>R$ {(max / 2).toFixed(2)}</span>
                </div>

                <div className="linha linha-base">
                    <span>R$ 0,00</span>
                </div>

                {/* Área SOMENTE das barras */}
                <div className="grafico-barras">

                    {months.map((month) => {

                        const altura =
                            month.total === 0
                                ? 3
                                : (month.total / max) * 210;

                        return (

                            <div
                                key={month.key}
                                className="barra"
                                style={{
                                    height: `${altura}px`
                                }}
                            ></div>

                        );

                    })}

                </div>

                {/* Área SOMENTE dos meses */}
                <div className="grafico-meses">

                    {months.map((month) => (

                        <span key={month.key}>
                            {month.label}
                        </span>

                    ))}

                </div>

            </div>

        </section>

    );

}