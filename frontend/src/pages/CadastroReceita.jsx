import { useState } from "react";
import "./CadastroReceita.css";

export default function CadastroReceita() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");

  async function salvarReceita(e) {
    e.preventDefault();

    const receita = {
      descricao,
      valor: Number(valor),
      data,
    };

    try {
      const response = await fetch("http://localhost:8080/api/receitas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(receita),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar receita");
      }

      alert("Receita cadastrada com sucesso!");

      setDescricao("");
      setValor("");
      setData("");
    } catch (error) {
      alert("Erro ao cadastrar receita.");
      console.error(error);
    }
  }

  return (
    <div className="container">
      <div className="card">

        <h1>Nova Receita</h1>

        <form onSubmit={salvarReceita}>

          <div className="campo">
            <label>Descrição da receita</label>
            <input
              type="text"
              placeholder="Digite a descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="linha">

            <div className="campo">
              <label>Data</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>

            <div className="campo">
              <label>Valor (R$)</label>
              <input
                type="number"
                placeholder="0,00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>

          </div>

          <button type="submit">
            Salvar Receita
          </button>

        </form>

      </div>
    </div>
  );
}