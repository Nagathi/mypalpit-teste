package br.com.api.modelo;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="arquivo")
@Getter
@Setter
public class ArquivoModelo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String pathArquivo;
    private String pathImagem;
    private String titulo;
    private String descricao;
    private String data;
    private String hora;
    private String impressora;
    private int curtidas;
    private int downloads;
    private int views;
    
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "arquivo_id")
    private List<MateriaModelo> materias;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "arquivo_id")
    private List<PalavrasModelo> palavras;

    @ManyToOne
    @JoinColumn(name = "autor_codigo")
    private UsuarioModelo usuario;

}
