package br.com.api.controle;

import br.com.api.dto.ArquivoDTO;
import br.com.api.modelo.UsuarioModelo;
import br.com.api.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
public class UsuarioControle {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/login")
    public ResponseEntity<Optional<UsuarioModelo>> logar(@RequestParam(value = "email") String email,
                                                         @RequestParam(value = "senha") String senha) {
        Optional<UsuarioModelo> usuarios = usuarioService.logar(email, senha);

        if (usuarios.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(usuarios);
    }

    @PostMapping("/cadastrar_usuarios")
    public ResponseEntity<?> cadastrarUsuarios(@RequestBody UsuarioModelo usuarioModelo) {
        return usuarioService.cadastrarUsuarios(usuarioModelo);
    }

    @PutMapping("/atualizar_usuario/{id}")
    public ResponseEntity<?> atualizarUsuario(@PathVariable Long id, @RequestBody UsuarioModelo usuarioDTO) {
        return usuarioService.atualizarUsuario(id, usuarioDTO);
    }

    @PostMapping(value = "/upload/{codigo}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadFile(@PathVariable("codigo") Long codigo, @RequestParam("file") MultipartFile file) {
        return usuarioService.uploadFile(codigo, file);
    }

    @PutMapping("/atualizar_senha/{id}")
    public ResponseEntity<?> atualizarSenha(@PathVariable Long id, @RequestBody UsuarioModelo usuarioDTO) {
        return usuarioService.atualizarSenha(id, usuarioDTO);
    }

    @GetMapping("/salvos/{id}")
    public ResponseEntity<List<ArquivoDTO>> getArquivosSalvosPorUsuarioId(@PathVariable Long id) {
        List<ArquivoDTO> arquivosSalvos = usuarioService.getArquivosSalvosPorUsuarioId(id);
        return ResponseEntity.ok(arquivosSalvos);
    }

    @PostMapping("/salvar_arquivo")
    public ResponseEntity<?> salvarArquivo(@RequestParam("arquivo_id") Long arquivoId,
                                           @RequestParam("usuario_id") Long usuarioId){
        return usuarioService.salvarArquivo(usuarioId, arquivoId);
    }

    @PostMapping("/curtir")
    public ResponseEntity<?> curtir(@RequestParam("arquivo") Long arquivoId,
                                    @RequestParam("usuario") Long usuarioId){
        return usuarioService.getCurtirStatus(arquivoId, usuarioId);
    }
}
