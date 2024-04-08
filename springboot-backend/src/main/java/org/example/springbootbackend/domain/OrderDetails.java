package org.example.springbootbackend.domain;

import jakarta.persistence.*;
import java.sql.Time;

@Entity
@Table(name = "OrderDetails") // Specify the table name
public class OrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "User_ID") // Change to match the column name in your database
    private long uId;

    @Column(name = "item_id") // Change to match the column name in your database
    private long iId;

    @Column(name = "Address")
    private String address;

    @Column(name = "Status")
    private String status;

    @Column(name = "Time")
    private Time time;

    public OrderDetails() {}

    public OrderDetails(long uId, long iId, String address, String status, Time time) {
        this.uId = uId;
        this.iId = iId;
        this.address = address;
        this.status = status;
        this.time = time;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getuId() {
        return uId;
    }

    public void setuId(long uId) {
        this.uId = uId;
    }

    public long getiId() {
        return iId;
    }

    public void setiId(long iId) {
        this.iId = iId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }
}
