package org.example.springbootbackend.service;

import org.example.springbootbackend.entity.JobPost;
import org.example.springbootbackend.utils.ApiResponse;

public interface JobPostService {

    ApiResponse createJobPost(JobPost jobPost);
    ApiResponse getJobPostsByUserId(Long userId);

    ApiResponse updateJobPost(Long id, JobPost jobPost);
    ApiResponse deleteJobPost(Long id);
    ApiResponse getJobPostById(Long j_Id);
    ApiResponse GetJobPostReportDetails(Long userId);


}
