import { useEffect, useState } from "react";
import "./GraficoReceitas.css";

export default function GraficoReceitas({ atualizar }) {

    const [receitas, setReceitas] = useState([]);

    /*
     * Sempre que "atualizar" mudar,
     * fazemos um novo GET na API.
     */
    useEffect(() => {

        console.log("📊 GraficoReceitas: iniciando carregamento...");

        carregarReceitas();

    }, [atualizar]);


    async function carregarReceitas() {

        try {

            console.log(
                "📡 Fazendo GET: http://localhost:8080/api/receitas"
            );

            const response = await fetch(
                "http://localhost:8080/api/receitas"
            );

            console.log(
                "📥 Status do GET:",
                response.status
            );

            if (!response.ok) {

                throw new Error(
                    "Erro ao buscar receitas"
                );

            }

            const data = await response.json();

            console.log(
                "📦 Receitas recebidas pela API:",
                data
            );

            setReceitas(data);

        } catch (error) {

            console.error(
                "❌ Erro ao carregar receitas:",
                error
            );

        }

    }


    /*
     * Cria os últimos 6 meses.
     */
    const monthFormatter = new Intl.DateTimeFormat(
        "pt-BR",
        {
            month: "short",
        }
    );


    const months = Array.from(
        { length: 6 },
        (_, index) => {

            const date = new Date();

            date.setMonth(
                date.getMonth() - (5 - index),
                1
            );

            return {

                key: `${date.getFullYear()}-${String(
                    date.getMonth() + 1
                ).padStart(2, "0")}`,

                label: monthFormatter
                    .format(date)
                    .replace(".", "")
                    .replace(
                        /^./,
                        c => c.toUpperCase()
                    ),

                total: 0,

            };

        }
    );


    console.log(
        "📅 Meses considerados pelo gráfico:",
        months
    );


    /*
     * Distribui cada receita dentro do mês correspondente.
     */
    receitas.forEach((receita) => {

        console.log(
            "🔎 Analisando receita:",
            receita
        );

        console.log(
            "📅 Data da receita:",
            receita.data
        );

        const mesDaReceita = receita.data.slice(0, 7);

        console.log(
            "🗓️ Mês extraído da receita:",
            mesDaReceita
        );

        const month = months.find(
            ({ key }) => key === mesDaReceita
        );

        if (month) {

            month.total += Number(
                receita.valor
            );

            console.log(
                `✅ Receita ${receita.id} adicionada ao mês ${month.key}`
            );

            console.log(
                `💰 Novo total de ${month.key}:`,
                month.total
            );

        } else {

            console.log(
                `⚠️ Receita ${receita.id} está fora dos últimos 6 meses:`,
                mesDaReceita
            );

        }

    });


    console.log(
        "📊 Totais finais dos meses:",
        months
    );


    const max = Math.max(
        ...months.map(m => m.total),
        1
    );


    console.log(
        "📈 Maior valor usado no gráfico:",
        max
    );


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

                    <span>
                        Valor recebido
                    </span>

                </div>

            </div>


            <div className="grafico-area">

                <div className="linha linha-topo">

                    <span>
                        R$ {max.toFixed(2)}
                    </span>

                </div>


                <div className="linha linha-meio">

                    <span>
                        R$ {(max / 2).toFixed(2)}
                    </span>

                </div>


                <div className="linha linha-base">

                    <span>
                        R$ 0,00
                    </span>

                </div>


                {/* Área SOMENTE das barras */}

                <div className="grafico-barras">

                    {months.map((month) => {

                        const altura =
                            month.total === 0
                                ? 3
                                : (month.total / max) * 210;

                        console.log(
                            `📊 Barra ${month.label}:`,
                            {
                                total: month.total,
                                altura,
                            }
                        );

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