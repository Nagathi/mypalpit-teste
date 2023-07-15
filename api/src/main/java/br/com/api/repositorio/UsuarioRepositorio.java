package br.com.api.repositorio;

import org.springframework.data.repository.CrudRepository;
import br.com.api.modelo.UsuarioModelo;
import java.util.Optional;

public interface UsuarioRepositorio extends  CrudRepository <UsuarioModelo, Long>{

    Optional<UsuarioModelo> findByEmailAndSenha(String email, String senha);
    boolean existsByEmail(String email);
    boolean existsByUsuario(String usuario);
    Optional<UsuarioModelo> findByEmail(String email);
    Optional<UsuarioModelo> findByUsuario(String usuario);
    Optional<UsuarioModelo> findById(long id);
}
