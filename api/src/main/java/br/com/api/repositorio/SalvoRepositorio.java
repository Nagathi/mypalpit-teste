package br.com.api.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import br.com.api.modelo.ArquivoModelo;
import br.com.api.modelo.SalvoModelo;
import br.com.api.modelo.UsuarioModelo;

public interface SalvoRepositorio extends  CrudRepository <SalvoModelo, Long>{
    List<SalvoModelo> findSalvosByUsuario(UsuarioModelo usuario);
    
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END FROM SalvoModelo s " +
           "WHERE s.usuario = :usuario AND s.arquivo = :arquivo")
    boolean existsByUsuarioAndArquivo(@Param("usuario") UsuarioModelo usuario,
                                      @Param("arquivo") ArquivoModelo arquivo);
}
