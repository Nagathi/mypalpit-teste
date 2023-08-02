package br.com.api.controle;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.api.dto.ArquivoDTO;
import br.com.api.dto.ComentarioDTO;
import br.com.api.modelo.ArquivoModelo;
import br.com.api.modelo.MateriaModelo;
import br.com.api.modelo.PalavrasModelo;
import br.com.api.service.ArquivoService;

@RestController
public class ArquivoControle {

    @Autowired
    private ArquivoService arquivoService;

    @GetMapping("/listar")
    public ResponseEntity<List<ArquivoDTO>> listarArquivosComNomeAutor() {
        Iterable<ArquivoModelo> arquivos = arquivoService.listarArquivos();
        List<ArquivoDTO> arquivosDTO = new ArrayList<>();

        for (ArquivoModelo arquivo : arquivos) {
            ArquivoDTO dto = new ArquivoDTO();
            dto.setId(arquivo.getId());
            dto.setPathArquivo(arquivo.getPathArquivo());
            dto.setPathImagem(arquivo.getPathImagem());
            dto.setTitulo(arquivo.getTitulo());
            dto.setData(arquivo.getData());
            dto.setHora(arquivo.getHora());
            dto.setDescricao(arquivo.getDescricao());
            dto.setAutorNome(arquivo.getUsuario().getNome());
            dto.setPathFotoAutor(arquivo.getUsuario().getFoto());
            dto.setCurtidas(arquivo.getCurtidas());
            dto.setHora(arquivo.getHora());
            dto.setKeywords(arquivo.getPalavras());
            arquivosDTO.add(dto);
        }

        return ResponseEntity.ok(arquivosDTO);
    }
    
    @PostMapping(value = "/salvar_arquivo", consumes = "multipart/form-data")
    public ResponseEntity<?> cadastrar_arquivo(
                                                @RequestPart("file") MultipartFile file,
                                                @RequestPart("image") MultipartFile image,
                                                @RequestParam("titulo") String titulo,
                                                @RequestParam("descricao") String descricao,
                                                @RequestParam("data") String data,
                                                @RequestParam("hora") String hora,
                                                @RequestParam("autor") Long autorId,
                                                @RequestParam("materias") String materiasJson,
                                                @RequestParam("keywords") String palavrasJson){
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<MateriaModelo> materias = objectMapper.readValue(materiasJson, new TypeReference<List<MateriaModelo>>(){});
            List<PalavrasModelo> palavras = objectMapper.readValue(palavrasJson, new TypeReference<List<PalavrasModelo>>(){});
            return arquivoService.salvarArquivo(file, image,  titulo, descricao, data, hora, autorId, materias, palavras);  
        }catch(Exception e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar a requisição.");
        }
    }

    @GetMapping("/destaques/{id}")
    public ResponseEntity<List<ArquivoDTO>> getArquivosSalvosPorUsuarioId(@PathVariable Long id) {
        List<ArquivoDTO> arquivosSalvos = arquivoService.getDestaquesPorId(id);
        return ResponseEntity.ok(arquivosSalvos);
    }

    @GetMapping("/consulta")
    public ResponseEntity<List<ArquivoDTO>> pesquisarArquivos(
            @RequestParam(value = "palavrasChave", required = false) List<String> palavrasChave,
            @RequestParam(value = "disciplina", required = false) String disciplina,
            @RequestParam(value = "nivel", required = false) List<String> nivel
    ) {

        List<ArquivoDTO> arquivos = arquivoService.pesquisarArquivos(palavrasChave, disciplina, nivel);

        if (arquivos.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(arquivos);
        }
    }

    @GetMapping("/pesquisar")
    public ResponseEntity<List<ArquivoDTO>> buscarArquivosPorKeyword(@RequestParam("palavra") String palavra) {
        List<ArquivoDTO> arquivos = arquivoService.buscarArquivosPorKeyword(palavra);
        if (arquivos.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(arquivos);
        }
    }

    @PostMapping("/comentar")
    public ResponseEntity<?> enviarComentario(@RequestParam("arquivo") Long arquivoId,
                                              @RequestParam("usuario") Long usuarioId,
                                              @RequestParam("descricao") String descricao){
        return arquivoService.comentar(arquivoId, usuarioId, descricao);
    }

    @GetMapping("/listar_comentarios")
    public List<ComentarioDTO> listarComentarios(@RequestParam("arquivo") Long arquivoId){
        return arquivoService.listarComentariosPorIdArquivo(arquivoId);
    }
}
