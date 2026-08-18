const API_URL = "http://localhost:8080/api/receitas";

export async function listarReceitas() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar receitas");
  }

  return await response.json();
}