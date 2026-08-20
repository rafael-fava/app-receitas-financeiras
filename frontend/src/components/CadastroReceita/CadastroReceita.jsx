import { useEffect, useState } from "react";
import "./CadastroReceita.css";

export default function CadastroReceita({
    receitaEditando,
    cancelarEdicao,
    aoSalvar,
}) {
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");

    const [maiorReceita, setMaiorReceita] = useState(null);

    useEffect(() => {
        if (receitaEditando) {
            setDescricao(receitaEditando.descricao || "");
            setValor(receitaEditando.valor ?? "");
            setData(receitaEditando.data || "");
        } else {
            setDescricao("");
            setValor("");
            setData("");
        }
    }, [receitaEditando]);

    async function buscarMaiorReceita() {
        try {
            const response = await fetch(
                "http://localhost:8080/api/receitas"
            );

            if (!response.ok) {
                throw new Error();
            }

            const receitas = await response.json();

            if (!receitas.length) {
                setMaiorReceita(null);
                return;
            }

            const maior = receitas.reduce((maiorAtual, receita) => {
                return Number(receita.valor) > Number(maiorAtual.valor)
                    ? receita
                    : maiorAtual;
            });

            setMaiorReceita(maior);
        } catch (error) {
            console.error("Erro ao buscar maior receita:", error);
        }
    }

    useEffect(() => {
        buscarMaiorReceita();
    }, []);

    async function salvarReceita(e) {
        e.preventDefault();

        const receita = {
            descricao,
            valor: Number(valor),
            data,
        };

        try {
            const url = receitaEditando
                ? `http://localhost:8080/api/receitas/${receitaEditando.id}`
                : "http://localhost:8080/api/receitas";

            const method = receitaEditando ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(receita),
            });

            if (!response.ok) {
                throw new Error();
            }

            const dataResposta = await response.json();

            // Atualiza a Leitura Rápida com os dados atuais
            await buscarMaiorReceita();

            // Avisa a Home que a operação foi concluída
            if (aoSalvar) {
                aoSalvar(dataResposta, receitaEditando);
            }

            // Limpa o formulário somente quando for novo cadastro
            if (!receitaEditando) {
                setDescricao("");
                setValor("");
                setData("");
            }

        } catch (error) {
            console.error(error);

            if (aoSalvar) {
                aoSalvar(null, receitaEditando, true);
            }
        }
    }

    const receitaDestaque = maiorReceita;

    return (
        <section className="cadastro-section">

            {/* ================= FORMULÁRIO ================= */}

            <div className="cadastro-card">

                <div className="cadastro-topo">

                    <div>
                        <p className="cadastro-subtitulo">
                            {receitaEditando
                                ? "EDIÇÃO"
                                : "NOVO LANÇAMENTO"}
                        </p>

                        <h2 className="cadastro-titulo">
                            {receitaEditando
                                ? `Editar receita #${receitaEditando.id}`
                                : "Adicionar receita"}
                        </h2>
                    </div>

                    {receitaEditando && (
                        <button
                            type="button"
                            className="btn-cancelar"
                            onClick={cancelarEdicao}
                        >
                            Cancelar
                        </button>
                    )}

                </div>

                <form onSubmit={salvarReceita}>

                    <div className="campo campo-descricao">

                        <label htmlFor="descricao">
                            Descricao
                        </label>

                        <input
                            id="descricao"
                            type="text"
                            placeholder="Ex.: Salario mensal"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />

                    </div>

                    <div className="cadastro-linha">

                        <div className="campo">

                            <label htmlFor="valor">
                                Valor
                            </label>

                            <input
                                id="valor"
                                type="number"
                                step="0.01"
                                placeholder="0,00"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                                required
                            />

                        </div>

                        <div className="campo">

                            <label htmlFor="data">
                                Data
                            </label>

                            <input
                                id="data"
                                type="date"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                required
                            />

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="btn-salvar"
                    >
                        {receitaEditando
                            ? "Salvar alterações"
                            : "Adicionar receita"}
                    </button>

                </form>

            </div>

            {/* ================= LEITURA RÁPIDA ================= */}

            <div className="leitura-card">

                <p className="leitura-subtitulo">
                    LEITURA RÁPIDA
                </p>

                <h2 className="leitura-titulo">
                    Seu maior lançamento
                </h2>

                {receitaDestaque ? (
                    <>
                        <p className="leitura-valor">
                            {Number(
                                receitaDestaque.valor
                            ).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </p>

                        {receitaEditando && (
                            <p className="leitura-descricao">
                                {receitaEditando.descricao}
                            </p>
                        )}
                    </>
                ) : (
                    <p className="leitura-valor">
                        R$ 0,00
                    </p>
                )}

            </div>

        </section>
    );
}