package org.example.springbootbackend.utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse<T> {
    // Getters and Setters
    private String message;
    private Integer status;
    private T data;

    public ApiResponse(String message, T data,Integer status ) {
        this.status= status;
        this.message = message;
        this.data = data;
    }
//    public ApiResponse(String message, String AccessToken) {
//        this.message = message;
//        this.AccessToken = AccessToken;
//    }
    public ApiResponse(String message ,Integer status) {
        this.message = message;
        this.status= status;
    }
    public void setMessage(String message) {
        this.message = message;
    }

    public void setData(T data) {
        this.data = data;
    }
}

