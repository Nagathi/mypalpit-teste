package br.com.api.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.api.dto.ArquivoDTO;
import br.com.api.modelo.ArquivoModelo;
import br.com.api.modelo.MateriaModelo;
import br.com.api.modelo.UsuarioModelo;
import br.com.api.repositorio.ArquivoRepositorio;
import br.com.api.repositorio.UsuarioRepositorio;

@Service
public class ArquivoService {

    @Autowired
    private ArquivoRepositorio arquivoRepositorio;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public Iterable<ArquivoModelo> listarArquivos(){
        return arquivoRepositorio.findAll();
    }

    public ResponseEntity<?> salvarArquivo (
                                            MultipartFile file, 
                                            MultipartFile image,
                                            String titulo,
                                            String keywords,
                                            String descricao,
                                            String data,
                                            String hora,
                                            Long autorId,
                                            List<MateriaModelo> materias
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
            novoArquivo.setPalavrasChave(keywords);
            novoArquivo.setDescricao(descricao);
            novoArquivo.setData(data);
            novoArquivo.setHora(hora);
            novoArquivo.setCurtidas(0);
            Optional<UsuarioModelo> autorOptional  = usuarioRepositorio.findById(autorId);
            UsuarioModelo usuario = autorOptional.get();
            novoArquivo.setUsuario(usuario);
            novoArquivo.setMaterias(materias);

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
                dto.setPalavrasChave(destaque.getPalavrasChave());
                dto.setDescricao(destaque.getDescricao());
                dto.setData(destaque.getData());
                dto.setHora(destaque.getHora());
                dto.setCurtidas(destaque.getCurtidas());
                dto.setTitulo(destaque.getTitulo());
                dto.setAutorNome(destaque.getUsuario().getNome());
                dto.setPathFotoAutor(destaque.getUsuario().getFoto());
                destaquesUsuario.add(dto);
            }

            return destaquesUsuario;
        }
}
