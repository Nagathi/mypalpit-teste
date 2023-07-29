package br.com.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArquivoDTO {
    private Long id;
    private String pathArquivo;
    private String pathImagem;
    private String palavrasChave;
    private String descricao;
    private String data;
    private String hora;
    private int curtidas;
    private String titulo;
    private String autorNome;
    private String pathFotoAutor;
}
