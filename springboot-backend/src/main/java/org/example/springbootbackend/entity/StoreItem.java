package org.example.springbootbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "store_item")
public class StoreItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "name")
    private String Name;
    @Column(name = "description")
    private String description;
    @Column(name = "price")
    private double Price;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "category")
    private String Category;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private  byte[] data ;







    @OneToMany(mappedBy = "storeItem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderDetails> orderDetails;


    @OneToMany(mappedBy = "storeItem")
    private List<StoreCart> storeCarts;

}
