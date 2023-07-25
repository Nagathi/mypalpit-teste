package br.com.api.service;

import br.com.api.exception.UsuarioNotFoundException;
import br.com.api.modelo.UsuarioModelo;
import br.com.api.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepositorio ur;

    public Optional<UsuarioModelo> logar(String email, String senha) {
        return ur.findByEmailAndSenha(email, senha);
    }

    public ResponseEntity<?> cadastrarUsuarios(UsuarioModelo usuarioModelo) {
        if (ur.existsByEmail(usuarioModelo.getEmail())) {
            return ResponseEntity.badRequest().body("E-mail já cadastrado");
        } else if (ur.existsByUsuario(usuarioModelo.getUsuario())) {
            return ResponseEntity.badRequest().body("Usuário já cadastrado");
        } else {
            UsuarioModelo novoUsuario = ur.save(usuarioModelo);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        }
    }

    public ResponseEntity<?> atualizarUsuario(Long id, UsuarioModelo usuarioDTO) {
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

    public String uploadFile(Long codigo, MultipartFile file) {
    if (!file.isEmpty()) {
        try {
            String uploadDir = "C:/Users/gu-gu/OneDrive/Documentos/palpit/api/src/fotos/";
            String originalFileName = file.getOriginalFilename();
            
            // Gera um nome único usando um UUID (Universally Unique Identifier).
            String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName;
            
            Path destination = Path.of(uploadDir + uniqueFileName);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

            Optional<UsuarioModelo> optionalUsuario = ur.findById(codigo);
            UsuarioModelo usuario = optionalUsuario.orElse(null);
            usuario.setFoto(uniqueFileName); // Salva o nome único do arquivo no banco de dados.
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

    public ResponseEntity<?> atualizarSenha(Long id, UsuarioModelo usuarioDTO) {
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
