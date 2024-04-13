package org.example.springbootbackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.cache.spi.support.AbstractReadWriteAccess;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "store_cart")
public class StoreCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private String quantity;

    @ManyToOne
    @JoinColumn(name = "item_ID")
    private StoreItem storeItem;

    @ManyToOne
    @JoinColumn(name = "user_ID")
    private User user;

}
