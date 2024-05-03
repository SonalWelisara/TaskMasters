package org.example.springbootbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobReportDTO {
    private int totalCategoryCount;
    private int totalJobPostCount;
    private Map<String, Integer> categoryCount;
    private Map<String, Integer> stateCount;

    // Add getters and setters
}
