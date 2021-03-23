package com.dora.petstore.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Pet {
    public static enum Status {
        AVAILABLE,
        PENDING,
        SOLD
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private String description;

    @ManyToOne(cascade = {CascadeType.DETACH}, optional = false)
    private Category category;

    @ElementCollection
    private List<String> photoUrls = new ArrayList<String>();

    @Enumerated(EnumType.ORDINAL)
    private Status status;
    private double price;
    private double costPrice;

    public Pet(String name, String description, List<String> photoUrls, double price, double costPrice, Status status) {
        this.name = name;
        this.description = description;
        this.photoUrls = photoUrls;
        this.status = status;
        this.price = price;
        this.costPrice = costPrice;
    }
}
