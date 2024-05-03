package org.example.springbootbackend.service;

import org.example.springbootbackend.entity.StoreItem;

import java.util.List;

public interface StoreItemService {

    public StoreItem postStoreItem(StoreItem storeItem);
    public List<StoreItem> getAllStoreItem();
    public StoreItem getStoreItemById(Long id);
    public StoreItem updateProduct(StoreItem storeItem);
    public void deleteStoreItem(Long id);

}
