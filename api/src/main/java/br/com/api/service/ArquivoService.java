package br.com.api.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.api.dto.ArquivoDTO;
import br.com.api.dto.ComentarioDTO;
import br.com.api.modelo.ArquivoModelo;
import br.com.api.modelo.ComentarioModelo;
import br.com.api.modelo.MateriaModelo;
import br.com.api.modelo.PalavrasModelo;
import br.com.api.modelo.UsuarioModelo;
import br.com.api.repositorio.ArquivoRepositorio;
import br.com.api.repositorio.ComentarioRepositorio;
import br.com.api.repositorio.UsuarioRepositorio;

@Service
public class ArquivoService {

    @Autowired
    private ArquivoRepositorio arquivoRepositorio;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired 
    private ComentarioRepositorio comentarioRepositorio;

    public Iterable<ArquivoModelo> listarArquivos(){
        return arquivoRepositorio.findAll();
    }

    public ResponseEntity<?> salvarArquivo (
                                            MultipartFile file, 
                                            MultipartFile image,
                                            String titulo,
                                            String descricao,
                                            String data,
                                            String hora,
                                            Long autorId,
                                            List<MateriaModelo> materias,
                                            List<PalavrasModelo> palavras
                                            ){

        try{

            String uploadImage = "C:/Users/gu-gu/OneDrive/Documentos/palpit/api/src/arquivos/";;
            String uploadFile = "C:/Users/gu-gu/OneDrive/Documentos/palpit/api/src/arquivos/";;

            String uniqueImageName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
            String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            Path destinoImage = Path.of(uploadImage + uniqueImageName);
            Files.copy(image.getInputStream(), destinoImage, StandardCopyOption.REPLACE_EXISTING);
            Path destinoFile = Path.of(uploadFile + uniqueFileName);
            Files.copy(file.getInputStream(), destinoFile, StandardCopyOption.REPLACE_EXISTING);

            ArquivoModelo novoArquivo = new ArquivoModelo();
            novoArquivo.setPathArquivo(uniqueFileName);
            novoArquivo.setPathImagem(uniqueImageName);
            novoArquivo.setTitulo(titulo);
            novoArquivo.setDescricao(descricao);
            novoArquivo.setData(data);
            novoArquivo.setHora(hora);
            novoArquivo.setCurtidas(0);
            Optional<UsuarioModelo> autorOptional  = usuarioRepositorio.findById(autorId);
            UsuarioModelo usuario = autorOptional.get();
            novoArquivo.setUsuario(usuario);
            novoArquivo.setMaterias(materias);
            novoArquivo.setPalavras(palavras);

            arquivoRepositorio.save(novoArquivo);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoArquivo);
            
        }catch(IOException e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar a requisição.");
        }
    }

    public List<ArquivoDTO> getDestaquesPorId(Long usuarioId){
        UsuarioModelo usuario = new UsuarioModelo();
        usuario.setCodigo(usuarioId);
        List<ArquivoModelo> destaques = arquivoRepositorio.findEnviadosByUsuario(usuario);
        List<ArquivoDTO> destaquesUsuario = new ArrayList<>();

        for (ArquivoModelo destaque : destaques) {
            ArquivoDTO dto = new ArquivoDTO();
            dto.setId(destaque.getId());
            dto.setPathArquivo(destaque.getPathArquivo());
            dto.setPathImagem(destaque.getPathImagem());            
            dto.setDescricao(destaque.getDescricao());
            dto.setData(destaque.getData());
            dto.setHora(destaque.getHora());
            dto.setCurtidas(destaque.getCurtidas());
            dto.setTitulo(destaque.getTitulo());
            dto.setAutorNome(destaque.getUsuario().getNome());
            dto.setPathFotoAutor(destaque.getUsuario().getFoto());
            dto.setKeywords(destaque.getPalavras());
            destaquesUsuario.add(dto);
        }

        return destaquesUsuario;
    }

    public List<ArquivoDTO> pesquisarArquivos(List<String> palavrasChave, String disciplina, List<String> niveis) {
        List<ArquivoModelo> arquivos;
        List<ArquivoDTO> arquivosDTO = new ArrayList<>();
        if (palavrasChave != null && !palavrasChave.isEmpty()) {
            arquivos = arquivoRepositorio.findByPalavras_PalavraIn(palavrasChave);
        } else if (disciplina != null && !disciplina.isEmpty()) {
            arquivos = arquivoRepositorio.findByMaterias_Disciplina(disciplina);
        } else if (niveis != null && !niveis.isEmpty()) {
            arquivos = arquivoRepositorio.findByMaterias_NivelIn(niveis);
        } else {
            arquivos = toList(arquivoRepositorio.findAll());
        }

        for(ArquivoModelo arquivo : arquivos){
            ArquivoDTO dto = new ArquivoDTO();
            dto.setId(arquivo.getId());
            dto.setPathArquivo(arquivo.getPathArquivo());
            dto.setPathImagem(arquivo.getPathImagem());            
            dto.setDescricao(arquivo.getDescricao());
            dto.setData(arquivo.getData());
            dto.setHora(arquivo.getHora());
            dto.setCurtidas(arquivo.getCurtidas());
            dto.setTitulo(arquivo.getTitulo());
            dto.setAutorNome(arquivo.getUsuario().getNome());
            dto.setPathFotoAutor(arquivo.getUsuario().getFoto());
            dto.setKeywords(arquivo.getPalavras());
            arquivosDTO.add(dto);
        }
        return arquivosDTO;
    }

    private <T> List<T> toList(Iterable<T> iterable) {
        return StreamSupport.stream(iterable.spliterator(), false)
                .collect(Collectors.toList());
    }

   public ResponseEntity<?> comentar(Long arquivoId, Long usuarioId, String descricao){
        Optional<ArquivoModelo> arquivoOptional = arquivoRepositorio.findById(arquivoId);
        Optional<UsuarioModelo> usuarioOptional = usuarioRepositorio.findById(usuarioId);

        if (arquivoOptional.isPresent() && usuarioOptional.isPresent()) {
            ArquivoModelo arquivo = arquivoOptional.get();
            UsuarioModelo usuario = usuarioOptional.get();
            ComentarioModelo comentario = new ComentarioModelo();
            comentario.setDescricao(descricao);
            comentario.setArquivo(arquivo);
            comentario.setUsuario(usuario);
            comentarioRepositorio.save(comentario);
            return ResponseEntity.ok(comentario);
        } else {
            return ResponseEntity.notFound().build();
        }
   }

   public List<ComentarioDTO> listarComentariosPorIdArquivo(Long arquivoId){
        List<ComentarioModelo> comentarios = comentarioRepositorio.findByArquivoId(arquivoId);
        List<ComentarioDTO> comentariosDTO = new ArrayList<>();   

        for(ComentarioModelo comentario : comentarios){
            ComentarioDTO dto = new ComentarioDTO();
            dto.setPathFoto(comentario.getUsuario().getFoto());
            dto.setUsuario(comentario.getUsuario().getUsuario());
            dto.setDescricao(comentario.getDescricao());
            comentariosDTO.add(dto);
        }

        return comentariosDTO;
  }

   public List<ArquivoDTO> buscarArquivosPorKeyword(String palavra) {
        List<ArquivoModelo> arquivos = arquivoRepositorio.findByKeyword(palavra);;
        List<ArquivoDTO> arquivosDTO = new ArrayList<>();

        for(ArquivoModelo arquivo : arquivos){
            ArquivoDTO dto = new ArquivoDTO();
            dto.setId(arquivo.getId());
            dto.setPathArquivo(arquivo.getPathArquivo());
            dto.setPathImagem(arquivo.getPathImagem());            
            dto.setDescricao(arquivo.getDescricao());
            dto.setData(arquivo.getData());
            dto.setHora(arquivo.getHora());
            dto.setCurtidas(arquivo.getCurtidas());
            dto.setTitulo(arquivo.getTitulo());
            dto.setAutorNome(arquivo.getUsuario().getNome());
            dto.setPathFotoAutor(arquivo.getUsuario().getFoto());
            dto.setKeywords(arquivo.getPalavras());
            arquivosDTO.add(dto);
        }
        return arquivosDTO;
    }
}

