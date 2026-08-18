import { useEffect, useState } from "react";
import "./CardsResumo.css";
import { listarReceitas } from "../../services/receitaService";

export default function CardsResumo() {

    const [receitas, setReceitas] = useState([]);

    useEffect(() => {
        carregarReceitas();
    }, []);

    async function carregarReceitas() {

        try {

            const dados = await listarReceitas();
            setReceitas(dados);

        } catch (error) {

            console.error(error);

        }

    }

    const totalRegistrado = receitas.reduce(
        (total, receita) => total + receita.valor,
        0
    );

    const quantidade = receitas.length;

    const hoje = new Date();

    const totalMes = receitas
        .filter((receita) => {

            const data = new Date(receita.data);

            return (
                data.getMonth() === hoje.getMonth() &&
                data.getFullYear() === hoje.getFullYear()
            );

        })
        .reduce((total, receita) => total + receita.valor, 0);

    const ticketMedio =
        quantidade > 0 ? totalRegistrado / quantidade : 0;

    return (

        <section className="cards-resumo">

            <div className="card-total">

                <p className="card-title">
                    Total registrado
                </p>

                <h2 className="card-value">
                    {totalRegistrado.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </h2>

                <span className="card-description">
                    {quantidade} lançamentos cadastrados
                </span>

            </div>

            <div className="card-default">

                <p className="card-title">
                    Este mês
                </p>

                <h2 className="card-value">
                    {totalMes.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </h2>

                <span className="card-description">
                    Entradas em ago
                </span>

            </div>

            <div className="card-default">

                <p className="card-title">
                    Ticket médio
                </p>

                <h2 className="card-value">
                    {ticketMedio.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </h2>

                <span className="card-description">
                    Por lançamento
                </span>

            </div>

        </section>

    );

}