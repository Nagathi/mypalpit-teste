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
@Table(name = "salvo")
@Getter
@Setter
public class SalvoModelo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "arquivo_id")
    private ArquivoModelo arquivo;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private UsuarioModelo usuario;

}
