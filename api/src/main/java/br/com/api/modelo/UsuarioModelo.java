package br.com.api.modelo;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="usuarios")
@Getter
@Setter
public class UsuarioModelo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long codigo;

    private String foto;

    private String nome;

    private String email;

    private String sobre;

    private String cidade;
    
    private String usuario;
    
    private String senha;

}

