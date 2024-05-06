package org.example.springbootbackend.service;

import org.example.springbootbackend.dto.StoreItemDto;
import org.example.springbootbackend.entity.StoreItem;

import java.util.List;

public interface StoreItemService {

    public StoreItemDto postStoreItem(StoreItemDto storeItemDto);
    public List<StoreItemDto> getAllStoreItem();
    public StoreItemDto getStoreItemById(Long id);
    public StoreItemDto updateProduct(Long id, StoreItemDto storeItemDto);
    public Boolean deleteStoreItem(Long id);

}
