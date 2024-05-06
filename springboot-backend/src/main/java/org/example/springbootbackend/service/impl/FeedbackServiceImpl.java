package org.example.springbootbackend.service.impl;

import org.example.springbootbackend.dto.FeedbackReportDTO;
import org.example.springbootbackend.entity.Feedback;
import org.example.springbootbackend.entity.HiredLabour;
import org.example.springbootbackend.exception.NotFoundException;
import org.example.springbootbackend.repository.FeedbackRepository;
import org.example.springbootbackend.repository.HiredLabourRepository;
import org.example.springbootbackend.service.FeedbackService;
import org.example.springbootbackend.utils.ApiResponse;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(FeedbackService.class);

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private HiredLabourRepository hiredLabourRepository;
    @Override
    public Feedback saveFeedback(Feedback feedback) {
        try {
            logger.info(" saving feedback Request:{}", feedback.getHiredLabour());
            HiredLabour managedHiredLabour = hiredLabourRepository.findById(feedback.getHiredLabour().getId())
                    .orElseThrow(() -> new NotFoundException("HiredLabour Not Found"));
            Feedback newObject= new  Feedback();
            newObject.setRating(feedback.getRating());
            newObject.setReview(feedback.getReview());
            newObject.setServiceType(feedback.getServiceType());
            newObject.setHiredLabour(feedback.getHiredLabour());
            Feedback savedFeedback = feedbackRepository.save(newObject);
            long id=savedFeedback.getHiredLabour().getId();
            managedHiredLabour.setStatus("CompletedRated");
            hiredLabourRepository.save(managedHiredLabour);

            return savedFeedback;
        } catch (Exception e) {
            logger.error("Error saving feedback", e);
            throw new RuntimeException("Failed to save feedback", e);
        }
    }
    @Override
    public Feedback getFeedback(Long id) {
        try {
          Feedback respnse=feedbackRepository.findById(id).orElseThrow(() -> new NotFoundException("Feedback not found for ID: " + id));
            return respnse ;
        } catch (RuntimeException e) {
            logger.error("Failed to retrieve feedback with ID: {}", id, e);
            throw e;
        }
    }
    @Override
    public Feedback updateFeedback(Long id, Feedback feedbackDetails) {
        try {
            Feedback feedback = feedbackRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Feedback not found for ID: " + id));
            feedback.setReview(feedbackDetails.getReview());
            feedback.setRating(feedbackDetails.getRating());
            feedback.setServiceType(feedbackDetails.getServiceType());
            return feedbackRepository.save(feedback);
        } catch (RuntimeException e) {
            logger.error("Failed to update feedback with ID: {}", id, e);
            throw e;
        }
    }

    @Override
    public void deleteFeedback(Long id) {
        try {
            Feedback feedback = feedbackRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Feedback not found for ID: " + id));
            feedbackRepository.delete(feedback);
            HiredLabour managedHiredLabour = hiredLabourRepository.findById(feedback.getHiredLabour().getId())
                    .orElseThrow(() -> new NotFoundException("HiredLabour Not Found"));
            managedHiredLabour.setStatus("Completed");
            hiredLabourRepository.save(managedHiredLabour);

        } catch (RuntimeException e) {
            logger.error("Failed to delete feedback with ID: {}", id, e);
            throw e;
        }
    }
@Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {
        try {
            logger.info("Fetching all feedbacks for user ID: {}", userId);
            return feedbackRepository.findAllFeedbacksByUserId(userId);
        } catch (Exception e) {
            logger.error("Error fetching feedbacks for user ID: {}", userId, e);
            throw new RuntimeException("Failed to fetch feedbacks for user ID: " + userId, e);
        }
    }
    @Override
    public Feedback getFeedbackByHiredLabourId(Long hiredLabourId) {
        try {
            return feedbackRepository.findByHiredLabourId(hiredLabourId)
                    .orElseThrow(() -> new NotFoundException("No feedback found for HiredLabour with ID: " + hiredLabourId));
        } catch (RuntimeException e) {
            logger.error("Failed to retrieve feedback for HiredLabour ID: {}", hiredLabourId, e);
            throw e;
        }
    }

    @Override
    public ApiResponse GetFeedBackReportDetails(Long userId) {
        logger.info("GetFeedBackReportDetails:{}", userId);
        List<Feedback> data = feedbackRepository.findAllFeedbacksByUserId(userId);

        // Initialize variables for report generation
        int totalFeedbackCount = data.size();
        double totalRating = 0;
        Map<String, Integer> serviceTypeCountMap = new HashMap<>();
        Map<String, Double> serviceTypeTotalRatingMap = new HashMap<>();

        // Process feedback data
        for (Feedback feedback : data) {
            // Check if rating is not null
            String ratingStr = feedback.getRating();
            if (ratingStr != null && !ratingStr.trim().isEmpty()) {
                // Calculate total rating
                totalRating += Double.parseDouble(ratingStr);

                // Count feedback per service type
                String serviceType = feedback.getServiceType();
                if (serviceType != null) { // Check for null serviceType
                    serviceTypeCountMap.put(serviceType, serviceTypeCountMap.getOrDefault(serviceType, 0) + 1);

                    // Calculate total rating per service type
                    double rating = Double.parseDouble(ratingStr);
                    double totalRatingForType = serviceTypeTotalRatingMap.getOrDefault(serviceType, 0.0);
                    totalRatingForType += rating;
                    serviceTypeTotalRatingMap.put(serviceType, totalRatingForType);
                }
            }
        }

        // Avoid division by zero if there are no feedbacks
        double overallAvgRating = totalFeedbackCount > 0 ? totalRating / totalFeedbackCount : 0;

        // Convert maps to arrays of objects
        List<Map<String, Object>> serviceTypeCount = new ArrayList<>();
        List<Map<String, Object>> serviceTypeAvgRating = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : serviceTypeCountMap.entrySet()) {
            Map<String, Object> countMap = new HashMap<>();
            countMap.put(entry.getKey(), entry.getValue());
            serviceTypeCount.add(countMap);

            double avgRating = entry.getValue() > 0 ? serviceTypeTotalRatingMap.getOrDefault(entry.getKey(), 0.0) / entry.getValue() : 0.0;
            Map<String, Object> avgRatingMap = new HashMap<>();
            avgRatingMap.put(entry.getKey(), avgRating);
            serviceTypeAvgRating.add(avgRatingMap);
        }

        // Populate FeedbackReportDTO
        FeedbackReportDTO reportDTO = new FeedbackReportDTO();
        reportDTO.setTotalFeedbackCount(totalFeedbackCount);
        reportDTO.setOverallAvgRating(overallAvgRating);
        reportDTO.setServiceTypeCount(serviceTypeCount);
        reportDTO.setServiceTypeAvgRating(serviceTypeAvgRating);

        return new ApiResponse<>("GetFeedBackReportDetails", reportDTO, 200);
    }


}
