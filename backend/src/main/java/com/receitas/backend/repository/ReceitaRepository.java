package com.receitas.backend.repository;

import com.receitas.backend.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    List<Receita> findAllByOrderByDataDesc();
}