package org.example.springbootbackend.service;

import org.example.springbootbackend.dto.FeedbackStoreDto;
import org.example.springbootbackend.dto.StoreItemDto;
import org.example.springbootbackend.entity.Feedback;

public interface FeedbackStoreService {

    FeedbackStoreDto saveFeedback(FeedbackStoreDto feedbackStoreDto);
    FeedbackStoreDto getFeedback(Long id);
    FeedbackStoreDto updateFeedback(Long id, FeedbackStoreDto feedbackStoreDto);
    Boolean deleteStoreItem(Long id);
    public StoreItemDto getMostRatedItem();

}
