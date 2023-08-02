package br.com.api.service;

import br.com.api.dto.ArquivoDTO;
import br.com.api.exception.UsuarioNotFoundException;
import br.com.api.modelo.ArquivoModelo;
import br.com.api.modelo.CurtidaModelo;
import br.com.api.modelo.SalvoModelo;
import br.com.api.modelo.UsuarioModelo;
import br.com.api.repositorio.ArquivoRepositorio;
import br.com.api.repositorio.CurtidaRepositorio;
import br.com.api.repositorio.SalvoRepositorio;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private SalvoRepositorio salvoRepositorio;

    @Autowired
    private CurtidaRepositorio curtidaRepositorio;

    @Autowired
    private ArquivoRepositorio arquivoRepositorio;

    public Optional<UsuarioModelo> logar(String email, String senha) {
        return usuarioRepositorio.findByEmailAndSenha(email, senha);
    }

    public ResponseEntity<?> cadastrarUsuarios(UsuarioModelo usuarioModelo) {
        if (usuarioRepositorio.existsByEmail(usuarioModelo.getEmail())) {
            return ResponseEntity.badRequest().body("E-mail já cadastrado");
        } else if (usuarioRepositorio.existsByUsuario(usuarioModelo.getUsuario())) {
            return ResponseEntity.badRequest().body("Usuário já cadastrado");
        } else {
            UsuarioModelo novoUsuario = usuarioRepositorio.save(usuarioModelo);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        }
    }

    public ResponseEntity<?> atualizarUsuario(Long id, UsuarioModelo usuarioDTO) {
        try {
            UsuarioModelo usuario = usuarioRepositorio.findById(id)
                    .orElseThrow(() -> new UsuarioNotFoundException("Usuário não encontrado"));

            if (usuarioRepositorio.existsByEmail(usuarioDTO.getEmail()) && !usuarioRepositorio.findByEmail(usuarioDTO.getEmail()).get().getCodigo().equals(id)) {
                return ResponseEntity.badRequest().body("E-mail já cadastrado");
            } else if (usuarioRepositorio.existsByUsuario(usuarioDTO.getUsuario()) && !usuarioRepositorio.findByUsuario(usuarioDTO.getUsuario()).get().getCodigo().equals(id)) {
                return ResponseEntity.badRequest().body("Usuário já cadastrado");
            } else {
                usuario.setNome(usuarioDTO.getNome());
                usuario.setUsuario(usuarioDTO.getUsuario());
                usuario.setSobre(usuarioDTO.getSobre());
                usuario.setCidade(usuarioDTO.getCidade());
                usuario.setEmail(usuarioDTO.getEmail());
                usuario.setFoto(usuarioDTO.getFoto());

                UsuarioModelo usuarioAtualizado = usuarioRepositorio.save(usuario);

                return ResponseEntity.ok(usuarioAtualizado);
            }
        } catch (UsuarioNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    public String uploadFile(Long codigo, MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                String uploadDir = "C:/Users/gu-gu/OneDrive/Documentos/palpit/api/src/arquivos/";
                String originalFileName = file.getOriginalFilename();
                
                String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName;
                
                Path destination = Path.of(uploadDir + uniqueFileName);
                Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

                Optional<UsuarioModelo> optionalUsuario = usuarioRepositorio.findById(codigo);
                UsuarioModelo usuario = optionalUsuario.orElse(null);
                usuario.setFoto(uniqueFileName);
                usuarioRepositorio.save(usuario);

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
            UsuarioModelo usuario = usuarioRepositorio.findById(id)
                    .orElseThrow(() -> new UsuarioNotFoundException("Usuário não encontrado"));

            usuario.setSenha(usuarioDTO.getSenha());

            UsuarioModelo usuarioAtualizado = usuarioRepositorio.save(usuario);

            return ResponseEntity.ok(usuarioAtualizado);
        } catch (UsuarioNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    public List<ArquivoDTO> getArquivosSalvosPorUsuarioId(Long usuarioId) {

            UsuarioModelo usuario = new UsuarioModelo();
            usuario.setCodigo(usuarioId);
            List<SalvoModelo> salvos = salvoRepositorio.findSalvosByUsuario(usuario);
            List<ArquivoDTO> arquivosSalvos = new ArrayList<ArquivoDTO>();

            for (SalvoModelo salvo : salvos) {
                ArquivoDTO dto = new ArquivoDTO();
                dto.setId(salvo.getArquivo().getId());
                dto.setPathArquivo(salvo.getArquivo().getPathArquivo());
                dto.setPathImagem(salvo.getArquivo().getPathImagem());
                dto.setDescricao(salvo.getArquivo().getDescricao());
                dto.setData(salvo.getArquivo().getData());
                dto.setHora(salvo.getArquivo().getHora());
                dto.setCurtidas(salvo.getArquivo().getCurtidas());
                dto.setTitulo(salvo.getArquivo().getTitulo());
                dto.setAutorNome(salvo.getArquivo().getUsuario().getNome());
                dto.setPathFotoAutor(salvo.getArquivo().getUsuario().getFoto());
                dto.setKeywords(salvo.getArquivo().getPalavras());
                arquivosSalvos.add(dto);
            }

            return arquivosSalvos;
        }

        public ResponseEntity<?> salvarArquivo(Long usuarioId, Long arquivoId){
            
            UsuarioModelo usuario = new UsuarioModelo();
            usuario.setCodigo(usuarioId);
            ArquivoModelo arquivo = new ArquivoModelo();
            arquivo.setId(arquivoId);

            if(!salvoRepositorio.existsByUsuarioAndArquivo(usuario, arquivo)){
                SalvoModelo salvar = new SalvoModelo();
                salvar.setUsuario(usuario);
                salvar.setArquivo(arquivo);
                salvoRepositorio.save(salvar);
                return ResponseEntity.ok().build();
            }else{
                return ResponseEntity.notFound().build();
            }
        }

        public ResponseEntity<?> getCurtirStatus(Long arquivoId, Long usuarioId) {
        Optional<ArquivoModelo> arquivoOptional = arquivoRepositorio.findById(arquivoId);
        Optional<UsuarioModelo> usuarioOptional = usuarioRepositorio.findById(usuarioId);

        if (arquivoOptional.isPresent() && usuarioOptional.isPresent()) {
            ArquivoModelo arquivo = arquivoOptional.get();
            UsuarioModelo usuario = usuarioOptional.get();

            Boolean curtir = curtidaRepositorio.findCurtirByUsuarioAndArquivo(arquivo, usuario);

            if (curtir == null) {
                arquivo.setCurtidas(arquivo.getCurtidas() + 1);
                arquivoRepositorio.save(arquivo);

                CurtidaModelo novaCurtida = new CurtidaModelo();
                novaCurtida.setCurtir(true);
                novaCurtida.setArquivo(arquivo);
                novaCurtida.setUsuario(usuario);
                curtidaRepositorio.save(novaCurtida);

                return ResponseEntity.ok(true);
            } else {
                if (curtir) {
                    arquivo.setCurtidas(arquivo.getCurtidas() - 1);
                    arquivoRepositorio.save(arquivo);

                    CurtidaModelo curtidaExistente = curtidaRepositorio.findByArquivoAndUsuario(arquivo, usuario);
                    curtidaExistente.setCurtir(false);
                    curtidaRepositorio.save(curtidaExistente);

                    return ResponseEntity.ok(false);
                } else {
                    arquivo.setCurtidas(arquivo.getCurtidas() + 1);
                    arquivoRepositorio.save(arquivo);

                    CurtidaModelo curtidaExistente = curtidaRepositorio.findByArquivoAndUsuario(arquivo, usuario);
                    curtidaExistente.setCurtir(true);
                    curtidaRepositorio.save(curtidaExistente);

                    return ResponseEntity.ok(true);
                }
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
