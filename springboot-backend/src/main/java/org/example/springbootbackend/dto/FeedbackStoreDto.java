package org.example.springbootbackend.dto;

import jakarta.persistence.*;
import lombok.Data;
import org.example.springbootbackend.entity.FeedbackStore;
import org.modelmapper.ModelMapper;

@Data
public class FeedbackStoreDto {

    private long id;
    private String rating;
    private String review;
    private StoreItemDto storeItemDto;


    public FeedbackStore toEntity(ModelMapper mapper) {
        FeedbackStore feedbackStore = mapper.map(this, FeedbackStore.class);

//        if (null != empId) {
//            Emp emp = new Emp();
//            emp.setEmpId(this.empId);
//            storeItem.setEmp(emp);
//        }

        return feedbackStore;
    }

}
