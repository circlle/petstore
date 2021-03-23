package com.dora.petstore.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Entity
@NoArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private String description;

    private String photo;

    public Category(String name, String description, String photo) {
        this.name = name;
        this.description = description;
        this.photo = photo;
    }
}
