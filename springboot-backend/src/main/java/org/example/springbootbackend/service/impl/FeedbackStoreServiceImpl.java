package org.example.springbootbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.springbootbackend.dto.FeedbackStoreDto;
import org.example.springbootbackend.dto.StoreItemDto;
import org.example.springbootbackend.entity.FeedbackStore;
import org.example.springbootbackend.entity.StoreItem;
import org.example.springbootbackend.repository.FeedbackStoreRepository;
import org.example.springbootbackend.service.FeedbackService;
import org.example.springbootbackend.service.FeedbackStoreService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class FeedbackStoreServiceImpl implements FeedbackStoreService {

    @Autowired
    private final FeedbackStoreRepository feedbackStoreRepository;

    private final ModelMapper mapper;
    @Override
    public FeedbackStoreDto saveFeedback(FeedbackStoreDto feedbackStoreDto) {
        feedbackStoreRepository.save(feedbackStoreDto.toEntity(mapper));
        return feedbackStoreDto;
    }

    @Override
    public FeedbackStoreDto getFeedback(Long id) {

        return null;
    }

    @Override
    public FeedbackStoreDto updateFeedback(Long id, FeedbackStoreDto feedbackStoreDto) {
        FeedbackStore feedbackStore = feedbackStoreDto.toEntity(mapper);
        feedbackStore.setId(id);
        FeedbackStore saved = feedbackStoreRepository.save(feedbackStore);
        return saved.toDto(mapper);
    }

    @Override
    public Boolean deleteStoreItem(Long id){
        feedbackStoreRepository.deleteById(id);
        return true;
    }

    public StoreItemDto getMostRatedItem(){
        StoreItemDto storeItemDto = feedbackStoreRepository.findMostRatedItem().toDto(mapper);

        if (!storeItemDto.getFeedbackStoreDtoList().isEmpty()) {
            AtomicReference<Double> avgRating = new AtomicReference<Double>(0.00);
            storeItemDto.getFeedbackStoreDtoList().forEach(feedbackStoreDto -> {
                avgRating.updateAndGet(v->v+Double.parseDouble(feedbackStoreDto.getRating()));
            });
            storeItemDto.setAvgRating(avgRating.get()/storeItemDto.getFeedbackStoreDtoList().size());
        }

        return storeItemDto;
    }

}
