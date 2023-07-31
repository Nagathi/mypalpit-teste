package br.com.api.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "comentario")
@Getter
@Setter
public class ComentarioModelo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String descricao;

    @ManyToOne
    @JoinColumn(name = "arquivo_id")
    private ArquivoModelo arquivo;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private UsuarioModelo usuario;

}
