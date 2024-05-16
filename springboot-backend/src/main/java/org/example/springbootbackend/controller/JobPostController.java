package org.example.springbootbackend.controller;

import org.example.springbootbackend.entity.JobPost;
import org.example.springbootbackend.service.JobPostService;
import org.example.springbootbackend.utils.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/job-posts")
public class JobPostController {

    @Autowired
    private JobPostService jobPostService;
    private static final Logger logger = LoggerFactory.getLogger(JobPostController.class);

    @PostMapping("/")
    public ResponseEntity<ApiResponse> createJobPost(@RequestBody JobPost jobPost) {
        try {
            logger.info("Attempting to create a job post for user ID {}", jobPost.getUser().getId());
            ApiResponse createdJobPost = jobPostService.createJobPost(jobPost);
            logger.info("Attempting to create a job post for user ID Response {}", jobPost.getUser().getId());

            return ResponseEntity.ok(createdJobPost);

        } catch (Exception e) {
            logger.error("Error creating job post: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(new ApiResponse(e.getMessage(), "Failed to create job post",400));
        }
    }

    @GetMapping("/get-all-job-post-by-user")
    public ResponseEntity<ApiResponse> getJobPostsByUserId(@RequestParam Long userId) {
        try {
            logger.info("Fetching all job posts for user ID {}", userId);
            ApiResponse jobPosts = jobPostService.getJobPostsByUserId(userId);
            logger.info("Fetching all job posts for user ID Controller Response:{}", jobPosts);
            return ResponseEntity.ok(jobPosts);
        } catch (Exception e) {
            logger.error("Error fetching job posts for user ID {}: {}", userId, e.getMessage());
            return ResponseEntity.internalServerError().body(new ApiResponse(e.getMessage(), "Failed to fetch job posts for user",400));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateJobPost(@RequestParam Long id, @RequestBody JobPost jobPost) {
        try {
            logger.info("Updating job post with ID {}", id);
            return ResponseEntity.ok(jobPostService.updateJobPost(id, jobPost));
        } catch (Exception e) {
            logger.error("Error updating job post: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(new ApiResponse(e.getMessage(), "Error updating job post",400));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse> deleteJobPost(@RequestParam Long id) {
        try {
            logger.info("Deleting job post with ID {}", id);
            return ResponseEntity.ok(jobPostService.deleteJobPost(id));
        } catch (Exception e) {
            logger.error("Error deleting job post: {}", e.getMessage());
            return ResponseEntity.internalServerError().body(new ApiResponse(e.getMessage(), "Error deleting job post",400));
        }
    }
    @GetMapping("/getJobPostByID")
    public ResponseEntity<ApiResponse> getJobPostByID(@RequestParam Long j_Id) {
        try {
            logger.info("Fetching  job post for j_Id ID {}", j_Id);
            ApiResponse jobPosts = jobPostService.getJobPostById(j_Id);
            logger.info("Fetching  job posts for j_Id  Controller Response:{}", jobPosts);
            return ResponseEntity.ok(jobPosts);
        } catch (Exception e) {
            logger.error("Error fetching job posts for user ID {}: {}",j_Id , e.getMessage());
            return ResponseEntity.internalServerError().body(new ApiResponse(e.getMessage(), "Failed to fetch job posts for user",400));
        }
    }

    @GetMapping("/job-posting-report")
    public ResponseEntity<ApiResponse> getJobPostingReportDetails(@RequestParam Long userId) {

        // List of job postings
        ApiResponse jobPostings = jobPostService.GetJobPostReportDetails(userId);

        return ResponseEntity.ok(jobPostings);
    }

}
