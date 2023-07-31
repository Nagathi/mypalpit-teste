package br.com.api.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import br.com.api.modelo.ArquivoModelo;
import br.com.api.modelo.UsuarioModelo;

public interface ArquivoRepositorio extends  CrudRepository <ArquivoModelo, Long>{
    List<ArquivoModelo> findEnviadosByUsuario(UsuarioModelo autor);
    List<ArquivoModelo> findByPalavras_PalavraIn(List<String> palavras);
    List<ArquivoModelo> findByMaterias_Disciplina(String disciplina);
    List<ArquivoModelo> findByMaterias_NivelIn(List<String> niveis);

    @Query("SELECT DISTINCT a FROM ArquivoModelo a " +
       "LEFT JOIN a.materias m " +
       "LEFT JOIN a.palavras p " +
       "WHERE (a.titulo LIKE %:key% OR a.descricao LIKE %:key% OR m.disciplina LIKE %:key% OR m.nivel LIKE %:key% OR p.palavra LIKE %:key%)")
    List<ArquivoModelo> findByKeyword(String key);
}