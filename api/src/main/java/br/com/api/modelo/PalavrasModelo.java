package br.com.api.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "palavra")
@Getter
@Setter
public class PalavrasModelo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String palavra;
}
