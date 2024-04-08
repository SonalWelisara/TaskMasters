package org.example.springbootbackend.domain;

import jakarta.persistence.*;

import javax.annotation.processing.Generated;

@Entity
@Table(name="employees")

public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="First_name")
    private String firstname;
    @Column(name="Last_name")
    private String lastname;
    @Column(name="Address")
    private String address;
    @Column(name="Mobile")
    private int mobile;
    @Column(name="Email")
    private String email;
    @Column(name="age")
    private int age;
    @Column(name="Password")
    private String password;
public Employee(){

}

    public Employee(long id, String firstname, String lastname, String address, int mobile, String email, int age, String password) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.mobile = mobile;
        this.email = email;
        this.age = age;
        this.password = password;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getMobile() {
        return mobile;
    }

    public void setMobile(int mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
