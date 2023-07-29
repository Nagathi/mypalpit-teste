package br.com.api.repositorio;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import br.com.api.modelo.ArquivoModelo;
import br.com.api.modelo.UsuarioModelo;

public interface ArquivoRepositorio extends  CrudRepository <ArquivoModelo, Long>{
    List<ArquivoModelo> findEnviadosByUsuario(UsuarioModelo autor);
}