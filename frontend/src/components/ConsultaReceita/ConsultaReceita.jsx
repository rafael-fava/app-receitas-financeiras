import { useState } from "react";
import "./ConsultaReceita.css";
import Toast from "../Toast/Toast";

export default function ConsultaReceita() {
  const [id, setId] = useState("");
  const [receita, setReceita] = useState(null);

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  async function buscarReceita() {
    if (!id.trim()) {
      setReceita(null);

      setTipoMensagem("erro");
      setMensagem("Informe um ID.");

      setTimeout(() => {
        setMensagem("");
      }, 3000);

      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/receitas/${id}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setReceita(data);

      setTipoMensagem("sucesso");
      setMensagem("Receita encontrada com sucesso.");

      setTimeout(() => {
        setMensagem("");
      }, 3000);
    } catch {
      setReceita(null);

      setTipoMensagem("erro");
      setMensagem("Receita não encontrada.");

      setTimeout(() => {
        setMensagem("");
      }, 3000);
    }
  }

  return (
    <aside className="consulta">
      <div className="consulta-header">
        <p className="consulta-subtitulo">
          CONSULTA RÁPIDA
        </p>

        <h2 className="consulta-titulo">
          Buscar por ID
        </h2>

        <div className="consulta-form">
          <input
            type="number"
            placeholder="Digite o ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <button onClick={buscarReceita}>
            Consultar
          </button>
        </div>
      </div>

      {receita ? (
        <div className="consulta-resultado">
          <p className="resultado-id">
            Receita #{receita.id}
          </p>

          <h3 className="resultado-descricao">
            {receita.descricao}
          </h3>

          <p className="resultado-info">
            {Number(receita.valor).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}{" "}
            em{" "}
            {new Date(receita.data).toLocaleDateString("pt-BR")}
          </p>

          <button
            className="btn-editar"
            onClick={() => console.log("Editar")}
          >
            Editar esta receita
          </button>
        </div>
      ) : (
        <p className="consulta-texto">
          Use o identificador de um lançamento para consultar seu registro
          individual.
        </p>
      )}

      <Toast
        mensagem={mensagem}
        tipo={tipoMensagem}
      />
    </aside>
  );
}