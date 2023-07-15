package br.com.api.controle;

import br.com.api.exception.UsuarioNotFoundException;
import br.com.api.modelo.UsuarioModelo;
import br.com.api.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

@RestController
public class UsuarioControle {

    @Autowired
    private UsuarioRepositorio ur;

    @GetMapping("/login")
    public ResponseEntity<Optional<UsuarioModelo>> logar(@RequestParam(value = "email") String email,
                                                         @RequestParam(value = "senha") String senha) {
        Optional<UsuarioModelo> usuarios = ur.findByEmailAndSenha(email, senha);

        if (usuarios.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(usuarios);
    }

    @PostMapping("/cadastrar_usuarios")
    public ResponseEntity<?> cadastrarUsuarios(@RequestBody UsuarioModelo usuarioModelo) {
        if (ur.existsByEmail(usuarioModelo.getEmail())) {
            return ResponseEntity.badRequest().body("E-mail já cadastrado");
        } else if (ur.existsByUsuario(usuarioModelo.getUsuario())) {
            return ResponseEntity.badRequest().body("Usuário já cadastrado");
        } else {
            UsuarioModelo novoUsuario = ur.save(usuarioModelo);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        }
    }

    @PutMapping("/atualizar_user/{id}")
    public ResponseEntity<?> atualizarUsuario(@PathVariable Long id, @RequestBody UsuarioModelo usuarioDTO) {
        try {
            UsuarioModelo usuario = ur.findById(id)
                    .orElseThrow(() -> new UsuarioNotFoundException("Usuário não encontrado"));

            if (ur.existsByEmail(usuarioDTO.getEmail()) && !ur.findByEmail(usuarioDTO.getEmail()).get().getCodigo().equals(id)) {
                return ResponseEntity.badRequest().body("E-mail já cadastrado");
            } else if (ur.existsByUsuario(usuarioDTO.getUsuario()) && !ur.findByUsuario(usuarioDTO.getUsuario()).get().getCodigo().equals(id)) {
                return ResponseEntity.badRequest().body("Usuário já cadastrado");
            } else {
                usuario.setNome(usuarioDTO.getNome());
                usuario.setUsuario(usuarioDTO.getUsuario());
                usuario.setSobre(usuarioDTO.getSobre());
                usuario.setCidade(usuarioDTO.getCidade());
                usuario.setEmail(usuarioDTO.getEmail());
                usuario.setFoto(usuarioDTO.getFoto());

                UsuarioModelo usuarioAtualizado = ur.save(usuario);

                return ResponseEntity.ok(usuarioAtualizado);
            }
        } catch (UsuarioNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping(value = "/upload/{codigo}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadFile(@PathVariable("codigo") Long codigo, @RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {
               
                String uploadDir = "C:/Users/gu-gu/OneDrive/Documentos/palpit/api/src/fotos/";

                
                String fileName = file.getOriginalFilename();
                String pathFotos = "/" + file.getOriginalFilename();
                
                Path destination = Path.of(uploadDir + fileName);
                
                Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
                
                Optional<UsuarioModelo> optionalUsuario = ur.findById(codigo);
                UsuarioModelo usuario = optionalUsuario.orElse(null);
        
                usuario.setFoto(pathFotos.toString()); 
                ur.save(usuario);
                
                return "Arquivo salvo com sucesso!";
            } catch (IOException e) {
                e.printStackTrace();
               
                return "Erro ao salvar o arquivo!";
            }
        } else {
         
            return "Arquivo não enviado!";
        }
    }

     @PutMapping("/atualizar_senha/{id}")
    public ResponseEntity<?> atualizarSenha(@PathVariable Long id, @RequestBody UsuarioModelo usuarioDTO) {
        try {
            UsuarioModelo usuario = ur.findById(id)
            .orElseThrow(() -> new UsuarioNotFoundException("Usuário não encontrado"));
        
            usuario.setSenha(usuarioDTO.getSenha());

            UsuarioModelo usuarioAtualizado = ur.save(usuario);

            return ResponseEntity.ok(usuarioAtualizado);
        } catch (UsuarioNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}

