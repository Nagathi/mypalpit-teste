package br.com.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComentarioDTO {
    private String pathFoto;
    private String usuario;
    private String descricao;
}
