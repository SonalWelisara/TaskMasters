package org.example.springbootbackend.dto;

import lombok.Data;
import org.example.springbootbackend.entity.StoreItem;
import org.modelmapper.ModelMapper;

@Data
public class StoreItemDto {
    private Long id;
    private String Name;
    private String description;
    private double Price;
    private int quantity;
    private String Category;
//    private Long empId;

    //private List<FeedBackRatingDto> feedBackRatingDtoList;

    public StoreItem toEntity(ModelMapper mapper){
        StoreItem storeItem = mapper.map(this, StoreItem.class);

//        if (null != empId) {
//            Emp emp = new Emp();
//            emp.setEmpId(this.empId);
//            storeItem.setEmp(emp);
//        }

        return storeItem;
    }
}
