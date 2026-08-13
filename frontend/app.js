const apiUrl = "http://localhost:8080/api/receitas";
const form = document.querySelector("#receita-form");
const lista = document.querySelector("#lista");
const mensagem = document.querySelector("#mensagem");
const total = document.querySelector("#total-receitas");

const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

function mostrarMensagem(texto = "") {
  mensagem.textContent = texto;
}

function formatarData(data) {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${data}T00:00:00Z`));
}

function criarLinha(receita) {
  const item = document.createElement("article");
  item.className = "receita";

  const detalhes = document.createElement("div");
  const descricao = document.createElement("div");
  descricao.className = "receita-descricao";
  descricao.textContent = receita.descricao;
  const data = document.createElement("div");
  data.className = "receita-data";
  data.textContent = formatarData(receita.data);
  detalhes.append(descricao, data);

  const valor = document.createElement("strong");
  valor.className = "receita-valor";
  valor.textContent = moeda.format(receita.valor);

  const excluir = document.createElement("button");
  excluir.className = "excluir";
  excluir.type = "button";
  excluir.textContent = "Excluir";
  excluir.addEventListener("click", () => excluirReceita(receita.id));

  item.append(detalhes, valor, excluir);
  return item;
}

async function carregarReceitas() {
  try {
    const resposta = await fetch(apiUrl);
    if (!resposta.ok) throw new Error();

    const receitas = await resposta.json();
    lista.replaceChildren();
    total.textContent = moeda.format(receitas.reduce((soma, receita) => soma + Number(receita.valor), 0));

    if (receitas.length === 0) {
      lista.innerHTML = '<p class="vazio">Nenhuma receita cadastrada.</p>';
      return;
    }

    receitas.forEach((receita) => lista.append(criarLinha(receita)));
  } catch {
    mostrarMensagem("Nao foi possivel conectar ao backend em http://localhost:8080.");
  }
}

async function excluirReceita(id) {
  try {
    const resposta = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    if (!resposta.ok) throw new Error();
    await carregarReceitas();
  } catch {
    mostrarMensagem("Nao foi possivel excluir a receita.");
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  mostrarMensagem();

  const dados = Object.fromEntries(new FormData(form));
  dados.valor = Number(dados.valor);

  try {
    const resposta = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
    if (!resposta.ok) throw new Error();

    form.reset();
    document.querySelector("#data").valueAsDate = new Date();
    await carregarReceitas();
  } catch {
    mostrarMensagem("Nao foi possivel salvar a receita.");
  }
});

document.querySelector("#atualizar").addEventListener("click", carregarReceitas);
document.querySelector("#data").valueAsDate = new Date();
carregarReceitas();