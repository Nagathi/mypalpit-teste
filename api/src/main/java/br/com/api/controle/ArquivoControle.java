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
import br.com.api.modelo.ArquivoModelo;
import br.com.api.modelo.MateriaModelo;
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
            dto.setPalavrasChave(arquivo.getPalavrasChave());
            dto.setDescricao(arquivo.getDescricao());
            dto.setAutorNome(arquivo.getUsuario().getNome());
            dto.setPathFotoAutor(arquivo.getUsuario().getFoto());
            arquivosDTO.add(dto);
        }

        return ResponseEntity.ok(arquivosDTO);
    }
    
    @PostMapping(value = "/salvar_arquivo", consumes = "multipart/form-data")
    public ResponseEntity<?> cadastrar_arquivo(
                                                @RequestPart("file") MultipartFile file,
                                                @RequestPart("image") MultipartFile image,
                                                @RequestParam("titulo") String titulo,
                                                @RequestParam("keywords") String keywords,
                                                @RequestParam("descricao") String descricao,
                                                @RequestParam("data") String data,
                                                @RequestParam("hora") String hora,
                                                @RequestParam("autor") Long autorId,
                                                @RequestParam("materias") String materiasJson){
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            List<MateriaModelo> materias = objectMapper.readValue(materiasJson, new TypeReference<List<MateriaModelo>>(){});
            return arquivoService.salvarArquivo(file, image,  titulo, keywords, descricao, data, hora, autorId, materias);  
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar a requisição.");
        }
    }

    @GetMapping("/destaques/{id}")
    public ResponseEntity<List<ArquivoDTO>> getArquivosSalvosPorUsuarioId(@PathVariable Long id) {
        List<ArquivoDTO> arquivosSalvos = arquivoService.getDestaquesPorId(id);
        return ResponseEntity.ok(arquivosSalvos);
    }
}
