package br.com.api.repositorio;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import br.com.api.modelo.ComentarioModelo;

public interface ComentarioRepositorio extends  CrudRepository <ComentarioModelo, Long>{
    List<ComentarioModelo> findByArquivoId(Long arquivoId);
}