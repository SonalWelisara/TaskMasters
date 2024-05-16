package org.example.springbootbackend.service.impl;

import org.example.springbootbackend.controller.UserController;
import org.example.springbootbackend.dto.JobReportDTO;
import org.example.springbootbackend.entity.HiredLabour;
import org.example.springbootbackend.entity.JobPost;
import org.example.springbootbackend.repository.HiredLabourRepository;
import org.example.springbootbackend.repository.JobPostRepository;
import org.example.springbootbackend.service.JobPostService;
import org.example.springbootbackend.utils.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class createJobPostImpl implements JobPostService {
    @Autowired
    private JobPostRepository jobPostRepository;
    @Autowired
    private HiredLabourRepository hiredLabourRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Override
    public ApiResponse createJobPost(JobPost jobPost) {
try {
    logger.info("Create Job post ServiceImpl Request JobPost data:{} ",jobPost);

    HiredLabour hiredLabour = new HiredLabour();
//    hiredLabour.setEmployee(null);
    hiredLabour.setUser(jobPost.getUser());
    hiredLabour.setDate(LocalDateTime.now());
    hiredLabour.setStatus("Pending");
    logger.info("Create Job post ServiceImpl Request hiredLabour Save data:{} ",hiredLabour);
    HiredLabour respone= hiredLabourRepository.save(hiredLabour);
    logger.info("Create Job post ServiceImpl Response hiredLabour  data:{} ",respone);
    jobPost.setHiredLabour(respone);
    JobPost data = jobPostRepository.save(jobPost);
    logger.info("Create Job post ServiceImpl Response-data:{} ",data);
    return new ApiResponse("create Job Post Success", data,200);
}catch (Exception e){
    logger.error("error while Creating Job Posts",e);
throw  new RuntimeException("error while Creating Job Posts",e);
}
    }
    @Override
    public ApiResponse getJobPostsByUserId(Long userId) {
        try{
            logger.info("Create Job post ServiceImpl Request  userId-:{} ",userId);
            List<JobPost> Data = jobPostRepository.findByUserId(userId);
            logger.info("Create Job post ServiceImpl Response   Data-:{} ",Data);
        return new ApiResponse("Get All Job Posts By UserId Success",Data,200);
    }catch (Exception e){
            logger.error("error while Fetching job Post By User Id ", e);
            throw  new RuntimeException("error while Fetching job Post By User Id ", e);
        }
    }

    @Override
    public ApiResponse updateJobPost(Long id, JobPost updatedJobPost) {
        logger.info("update Job Postb post ServiceImpl Request  id-:{} JobPost:{} ",id,updatedJobPost);
        return jobPostRepository.findById(id)
                .map(jobPost -> {
                    jobPost.setCategory(updatedJobPost.getCategory());
                    jobPost.setDescription(updatedJobPost.getDescription());
                    jobPost.setDate(updatedJobPost.getDate());
                    jobPost.setSkills(updatedJobPost.getSkills());
                    jobPost.setLocation(updatedJobPost.getLocation());
                    jobPost.setBudget(updatedJobPost.getBudget());
                    jobPostRepository.save(jobPost);
                    return new ApiResponse("Job post updated successfully", jobPost,200);
                }).orElse(new ApiResponse("Job post not found", null,404));
    }

    @Override
    public ApiResponse deleteJobPost(Long id) {
        logger.info("JJob post deleted request ");
        if (jobPostRepository.existsById(id)) {
            jobPostRepository.deleteById(id);
            return new ApiResponse("Job post deleted successfully", null,200);
        } else {
            return new ApiResponse("Job post not found", null,404);
        }
    }

    @Override
    public ApiResponse getJobPostById(Long id) {
        logger.info("Retrieving job post with ID {}", id);
        Optional<JobPost> jobPost = jobPostRepository.findById(id);
        if (jobPost.isPresent()) {
            logger.info("Found job post with ID {}", id);
        } else {
            logger.warn("No job post found with ID {}", id);
        }
        return new ApiResponse("getJobPostById Success",jobPost,200);
    }

    @Override
    public ApiResponse GetJobPostReportDetails(Long userId) {
        logger.info("GetJobPostReportDetails-request Started",userId);
        List<JobPost> data = jobPostRepository.findByUserId(userId);
        logger.info("GetJobPostReportDetails-request Started :{}",data);
        Map<String, Integer> categoryCount = new HashMap<>();
        Map<String, Integer> stateCount = new HashMap<>();
        int totalJobPostCount = data.size();
        for (JobPost job : data) {
            String category = job.getCategory();
            categoryCount.put(category, categoryCount.getOrDefault(category, 0) + 1);

            String state = job.getHiredLabour().getStatus();
            stateCount.put(state, stateCount.getOrDefault(state, 0) + 1);
        }
        // Populate JobReportDTO
        JobReportDTO reportDTO = new JobReportDTO();
        reportDTO.setTotalJobPostCount(totalJobPostCount);
        reportDTO.setTotalCategoryCount(categoryCount.size());
        reportDTO.setCategoryCount(categoryCount);
        reportDTO.setStateCount(stateCount);

        return new ApiResponse<>("getReport Details Success", reportDTO, 200);
    }


}
