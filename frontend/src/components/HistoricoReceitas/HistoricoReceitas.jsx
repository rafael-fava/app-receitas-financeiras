import { useEffect, useState } from "react";
import "./HistoricoReceitas.css";
import Toast from "../Toast/Toast";

export default function HistoricoReceitas({
    editarReceita,
    atualizar,
    atualizarLeituraRapida,
}) {

    const [receitas, setReceitas] = useState([]);

    const [filtro, setFiltro] = useState("");

    const [carregando, setCarregando] = useState(false);

    // Receita que está aguardando confirmação de exclusão
    const [receitaExcluir, setReceitaExcluir] = useState(null);

    // Toast
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");


    /*
     * ==============================
     * BUSCAR RECEITAS
     * ==============================
     */

    async function carregarReceitas() {

        try {

            setCarregando(true);

            console.log(
                "📡 Histórico: fazendo GET /api/receitas"
            );

            const response = await fetch(
                "http://localhost:8080/api/receitas"
            );

            console.log(
                "📥 Histórico: status do GET:",
                response.status
            );

            if (!response.ok) {

                throw new Error(
                    "Erro ao buscar receitas"
                );

            }

            const data = await response.json();

            console.log(
                "📦 Histórico: receitas recebidas:",
                data
            );

            setReceitas(data);

        } catch (error) {

            console.error(
                "❌ Erro ao carregar histórico:",
                error
            );

        } finally {

            setCarregando(false);

        }

    }


    /*
     * Carrega quando o componente aparece
     * e quando uma receita é alterada.
     */

    useEffect(() => {

        carregarReceitas();

    }, [atualizar]);


    /*
     * ==============================
     * TOAST
     * ==============================
     */

    function mostrarMensagem(
        mensagemTexto,
        tipo
    ) {

        setMensagem(mensagemTexto);

        setTipoMensagem(tipo);

        setTimeout(() => {

            setMensagem("");

        }, 3000);

    }


    /*
     * ==============================
     * ABRIR CONFIRMAÇÃO
     * ==============================
     */

    function solicitarExclusao(receita) {

        console.log(
            "🗑️ Solicitação de exclusão:",
            receita
        );

        setReceitaExcluir(receita);

    }


    /*
     * ==============================
     * CANCELAR EXCLUSÃO
     * ==============================
     */

    function cancelarExclusao() {

        console.log(
            "↩️ Exclusão cancelada"
        );

        setReceitaExcluir(null);

    }


    /*
     * ==============================
     * EXCLUIR RECEITA
     * ==============================
     */

    async function confirmarExclusao() {

        if (!receitaExcluir) {

            return;

        }

        const id = receitaExcluir.id;

        try {

            console.log(
                `🗑️ Excluindo receita ${id}...`
            );

            const response = await fetch(
                `http://localhost:8080/api/receitas/${id}`,
                {
                    method: "DELETE",
                }
            );

            console.log(
                "📥 Status do DELETE:",
                response.status
            );

            if (!response.ok) {

                throw new Error(
                    "Erro ao excluir receita"
                );

            }

            console.log(
                `✅ Receita ${id} excluída com sucesso`
            );

            // Fecha a confirmação
            setReceitaExcluir(null);

            await carregarReceitas();
            
            console.log(
                "🔄 Histórico: avisando a Section 4 para atualizar..."
            );
            
            atualizarLeituraRapida();
            
            mostrarMensagem(
                "Receita excluída com sucesso!",
                "sucesso"
            );
        } catch (error) {

            console.error(
                "❌ Erro ao excluir receita:",
                error
            );

            setReceitaExcluir(null);

            mostrarMensagem(
                "Não foi possível excluir a receita.",
                "erro"
            );

        }

    }


    /*
     * ==============================
     * FILTRO
     * ==============================
     */

    const receitasFiltradas = receitas.filter(
        (receita) =>
            receita.descricao
                ?.toLowerCase()
                .includes(
                    filtro.toLowerCase()
                )
    );


    return (

        <>

            <section className="historico">

                {/* ================= TOPO ================= */}

                <div className="historico-topo">

                    <div>

                        <p className="historico-subtitulo">
                            HISTÓRICO
                        </p>

                        <h2 className="historico-titulo">
                            Todas as receitas
                        </h2>

                    </div>


                    <div className="historico-acoes">

                        <input
                            type="text"
                            placeholder="Filtrar por descricao"
                            value={filtro}
                            onChange={(e) =>
                                setFiltro(e.target.value)
                            }
                        />

                        <button
                            type="button"
                            onClick={carregarReceitas}
                        >
                            Atualizar
                        </button>

                    </div>

                </div>


                {/* ================= CABEÇALHO ================= */}

                <div className="historico-cabecalho">

                    <span>
                        DESCRICAO
                    </span>

                    <span>
                        DATA
                    </span>

                    <span>
                        VALOR
                    </span>

                    <span></span>

                </div>


                {/* ================= LISTA ================= */}

                <div className="historico-lista">

                    {carregando ? (

                        <p className="historico-mensagem">
                            Carregando receitas...
                        </p>

                    ) : receitasFiltradas.length === 0 ? (

                        <p className="historico-mensagem">
                            Nenhuma receita encontrada.
                        </p>

                    ) : (

                        receitasFiltradas.map(
                            (receita) => (

                                <div
                                    className="historico-item"
                                    key={receita.id}
                                >

                                    {/* DESCRIÇÃO */}

                                    <div className="historico-descricao">

                                        <strong>
                                            {receita.descricao}
                                        </strong>

                                        <span>
                                            ID #{receita.id}
                                        </span>

                                    </div>


                                    {/* DATA */}

                                    <div className="historico-data">

                                        {new Date(
                                            receita.data
                                        ).toLocaleDateString(
                                            "pt-BR"
                                        )}

                                    </div>


                                    {/* VALOR */}

                                    <div className="historico-valor">

                                        {Number(
                                            receita.valor
                                        ).toLocaleString(
                                            "pt-BR",
                                            {
                                                style: "currency",
                                                currency: "BRL",
                                            }
                                        )}

                                    </div>


                                    {/* AÇÕES */}

                                    <div className="historico-botoes">

                                        <button
                                            type="button"
                                            className="btn-historico-editar"
                                            onClick={() =>
                                                editarReceita(
                                                    receita
                                                )
                                            }
                                        >
                                            Editar
                                        </button>

                                        <button
                                            type="button"
                                            className="btn-historico-excluir"
                                            onClick={() =>
                                                solicitarExclusao(
                                                    receita
                                                )
                                            }
                                        >
                                            Excluir
                                        </button>

                                    </div>

                                </div>

                            )
                        )

                    )}

                </div>

            </section>


            {/* ================= CONFIRMAÇÃO DE EXCLUSÃO ================= */}

            {receitaExcluir && (

                <div className="confirmacao-overlay">

                    <div className="confirmacao-card">

                        <div className="confirmacao-icone">
                            !
                        </div>

                        <p className="confirmacao-subtitulo">
                            EXCLUSÃO
                        </p>

                        <h2 className="confirmacao-titulo">
                            Excluir esta receita?
                        </h2>

                        <p className="confirmacao-texto">

                            A receita{" "}

                            <strong>
                                "{receitaExcluir.descricao}"
                            </strong>{" "}

                            será removida permanentemente.

                        </p>

                        <div className="confirmacao-botoes">

                            <button
                                type="button"
                                className="btn-confirmacao-cancelar"
                                onClick={cancelarExclusao}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                className="btn-confirmacao-excluir"
                                onClick={confirmarExclusao}
                            >
                                Excluir receita
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* ================= TOAST ================= */}

            <Toast
                mensagem={mensagem}
                tipo={tipoMensagem}
            />

        </>

    );

}