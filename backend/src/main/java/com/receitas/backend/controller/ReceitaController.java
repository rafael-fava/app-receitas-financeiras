package com.receitas.backend.controller;

import com.receitas.backend.model.Receita;
import com.receitas.backend.repository.ReceitaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/receitas")
@CrossOrigin(origins = "*")
public class ReceitaController {

    private final ReceitaRepository receitaRepository;

    public ReceitaController(ReceitaRepository receitaRepository) {
        this.receitaRepository = receitaRepository;
    }

    @GetMapping
    public List<Receita> listar() {
        return receitaRepository.findAllByOrderByDataDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receita> buscarPorId(@PathVariable Long id) {
        return receitaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Receita> criar(@RequestBody Receita receita) {
        Receita receitaSalva = receitaRepository.save(receita);
        return ResponseEntity.created(URI.create("/api/receitas/" + receitaSalva.getId()))
                .body(receitaSalva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Receita> atualizar(@PathVariable Long id, @RequestBody Receita receita) {
        return receitaRepository.findById(id)
                .map(receitaExistente -> {
                    receitaExistente.setDescricao(receita.getDescricao());
                    receitaExistente.setValor(receita.getValor());
                    receitaExistente.setData(receita.getData());
                    return ResponseEntity.ok(receitaRepository.save(receitaExistente));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!receitaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        receitaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}