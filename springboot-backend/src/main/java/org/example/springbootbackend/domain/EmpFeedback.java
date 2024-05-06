package org.example.springbootbackend.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "emp_feedback")
public class EmpFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fid")
    private long fid;

    @ManyToOne
    @JoinColumn(name = "emp_id", referencedColumnName = "id")
    private Employee employee;


    @Column(name = "feedback")
    private String feedback;

    public EmpFeedback() {
    }

    public EmpFeedback(Employee employee, String feedback) {
        this.employee = employee;
        this.feedback = feedback;
    }

    public long getFid() {
        return fid;
    }

    public void setFid(long fid) {
        this.fid = fid;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}
