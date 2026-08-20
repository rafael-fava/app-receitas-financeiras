import { useEffect, useState } from "react";
import "./Home.css";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import CardsResumo from "../components/CardsResumo/CardsResumo";
import GraficoReceitas from "../components/GraficoReceitas/GraficoReceitas";
import ConsultaReceita from "../components/ConsultaReceita/ConsultaReceita";
import CadastroReceita from "../components/CadastroReceita/CadastroReceita";
import Toast from "../components/Toast/Toast";

export default function Home() {
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

          <GraficoReceitas />

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