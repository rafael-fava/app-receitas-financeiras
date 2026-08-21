import { useEffect, useState } from "react";
import "./Home.css";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import CardsResumo from "../components/CardsResumo/CardsResumo";
import GraficoReceitas from "../components/GraficoReceitas/GraficoReceitas";
import ConsultaReceita from "../components/ConsultaReceita/ConsultaReceita";
import CadastroReceita from "../components/CadastroReceita/CadastroReceita";
import Toast from "../components/Toast/Toast";
import HistoricoReceitas from "../components/HistoricoReceitas/HistoricoReceitas";

export default function Home() {
  const [atualizarHistorico, setAtualizarHistorico] = useState(0);
  const [atualizarGrafico, setAtualizarGrafico] = useState(0);
  const [atualizarLeituraRapida, setAtualizarLeituraRapida] = useState(0);
  const [atualizarDados, setAtualizarDados] = useState(0);
  const [receitaEditando, setReceitaEditando] = useState(null);

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  function editarReceita(receita) {
    setReceitaEditando(receita);
  }

  function cancelarEdicao() {
    setReceitaEditando(null);
  }

  function mostrarMensagem(mensagem, tipo) {
    setMensagem(mensagem);
    setTipoMensagem(tipo);

    setTimeout(() => {
      setMensagem("");
    }, 3000);
  }

  function aoSalvar(dataResposta, receitaEditando, erro = false) {

    if (erro) {

      mostrarMensagem(
        receitaEditando
          ? "Erro ao atualizar receita."
          : "Erro ao cadastrar receita.",
        "erro"
      );

      return;

    }

    console.log(
      "💾 Receita salva com sucesso:",
      dataResposta
    );

    console.log(
      "🔄 Solicitando atualização do gráfico..."
    );

    /*
     * Muda o valor do estado.
     *
     * O GraficoReceitas está observando esse valor.
     * Quando ele mudar, o gráfico fará um novo GET.
     */
    setAtualizarGrafico(
      valorAtual => valorAtual + 1
    );

    setAtualizarHistorico(
      valorAtual => valorAtual + 1
    );

    setAtualizarLeituraRapida(
      valorAtual => valorAtual + 1
    );

    mostrarMensagem(
      receitaEditando
        ? "Receita atualizada com sucesso!"
        : "Receita cadastrada com sucesso!",
      "sucesso"
    );

    setReceitaEditando(null);
  }

  useEffect(() => {
    if (!receitaEditando) {
      return;
    }

    document.getElementById("section4")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [receitaEditando]);

  return (
    <main className="home">

      <div className="home-container">

        <Header />

        <Hero />

        <CardsResumo />

        <section className="section3">

          <GraficoReceitas
            atualizar={atualizarGrafico}
          />

          <ConsultaReceita
            editarReceita={editarReceita}
          />

        </section>

        <section
          id="section4"
          className="section4"
        >

          <CadastroReceita
            receitaEditando={receitaEditando}
            cancelarEdicao={cancelarEdicao}
            aoSalvar={aoSalvar}
            atualizar={atualizarLeituraRapida}
          />

        </section>

        <section className="section5">

          <HistoricoReceitas
            editarReceita={editarReceita}
            atualizar={atualizarHistorico}
            atualizarLeituraRapida={() => {
              setAtualizarLeituraRapida(
                valorAtual => valorAtual + 1
              );
            }}
          />

        </section>

      </div>

      <Toast
        mensagem={mensagem}
        tipo={tipoMensagem}
      />

    </main>
  );
}