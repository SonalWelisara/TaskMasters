package org.example.springbootbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackReportDTO {
    private int totalFeedbackCount;
    private double overallAvgRating;
    private List<Map<String, Object>> serviceTypeCount;
    private List<Map<String, Object>> serviceTypeAvgRating;
    // Add getters and setters
}