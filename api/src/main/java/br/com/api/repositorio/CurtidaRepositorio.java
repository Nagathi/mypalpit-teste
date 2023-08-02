package br.com.api.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.api.modelo.ArquivoModelo;
import br.com.api.modelo.CurtidaModelo;
import br.com.api.modelo.UsuarioModelo;

public interface CurtidaRepositorio extends  JpaRepository <CurtidaModelo, Long>{
    @Query("SELECT c.curtir FROM CurtidaModelo c WHERE c.arquivo = :arquivo AND c.usuario = :usuario")
    Boolean findCurtirByUsuarioAndArquivo(@Param("arquivo") ArquivoModelo arquivo,
                                          @Param("usuario") UsuarioModelo usuario);

    CurtidaModelo findByArquivoAndUsuario(ArquivoModelo arquivo, UsuarioModelo usuario);
}