const URL = "http://localhost:8080/api/receitas";

/*
=========================================
Buscar todas as receitas
GET /api/receitas
=========================================
*/
export async function listarReceitas() {

    const response = await fetch(URL);

    if (!response.ok) {

        throw new Error("Erro ao buscar receitas.");

    }

    return await response.json();

}

/*
=========================================
Buscar receita por ID
GET /api/receitas/{id}
=========================================
*/
export async function buscarReceitaPorId(id) {

    const response = await fetch(`${URL}/${id}`);

    if (!response.ok) {

        throw new Error("Receita não encontrada.");

    }

    return await response.json();

}