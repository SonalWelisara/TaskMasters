package org.example.springbootbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.dto.StoreItemDto;
import org.example.springbootbackend.entity.StoreItem;
import org.example.springbootbackend.exception.NotFoundException;
import org.example.springbootbackend.repository.StoreItemRepository;
import org.example.springbootbackend.service.StoreItemService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StoreItemServiceImpl implements StoreItemService {

    @Autowired
    private final StoreItemRepository storeItemRepository;

    private final ModelMapper mapper;

    //add product
    @Override
    public StoreItemDto postStoreItem(StoreItemDto storeItemDto){
        storeItemRepository.save(storeItemDto.toEntity(mapper));
        return storeItemDto;
    }




    //get all product
    @Override
    public List<StoreItemDto> getAllStoreItem(){
        List<StoreItem> itemRepositoryAll = storeItemRepository.findAll();
        if (itemRepositoryAll.isEmpty()) {
            return new ArrayList<>();
        } else {
            return itemRepositoryAll.stream().map(storeItem -> storeItem.toDto(mapper)).toList();
        }
    }

    //get product by id
    @Override
    public StoreItemDto getStoreItemById(Long id){
        Optional<StoreItem> storeItem = storeItemRepository.findById(id);
        if (storeItem.isPresent()) {
            return storeItem.get().toDto(mapper);
        } else {
            throw new NotFoundException("No Item by this ID");
        }

//        if (!storeItem.getFeedBackRatingList().isEmpty()) {
//            AtomicReference<Double> avgRating = new AtomicReference<Double>(0.00);
//            storeItem.getFeedBackRatingList().forEach(feedBackRating -> {
//                avgRating.updateAndGet(v -> v + Double.parseDouble(feedBackRating.getRating()));
//            });
//            dto.setAverageRating(avgRating.get()/storeItem.getFeedBackRatingList().size());
//        }

    }

    //update product by id
    @Override
    public StoreItemDto updateProduct(Long id, StoreItemDto storeItemDto){
        StoreItem storeItem = storeItemDto.toEntity(mapper);
        storeItem.setId(id);
        StoreItem savedItem = storeItemRepository.save(storeItem);
        return savedItem.toDto(mapper);
    }

    //delete Product
    @Override
    public Boolean deleteStoreItem(Long id){
        storeItemRepository.deleteById(id);
        return true;
    }
}
