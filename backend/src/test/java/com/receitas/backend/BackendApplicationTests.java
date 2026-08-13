package com.receitas.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class BackendApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {
	}

	@Test
	void shouldRejectReceitaWithoutValor() throws Exception {
		mockMvc.perform(post("/api/receitas")
				.contentType(MediaType.APPLICATION_JSON)
				.content("{\"descricao\":\"Sem valor\",\"data\":\"2026-08-13\"}"))
				.andExpect(status().isBadRequest());
	}

}
