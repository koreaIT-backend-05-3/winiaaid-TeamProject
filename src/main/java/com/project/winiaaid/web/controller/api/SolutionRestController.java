package com.project.winiaaid.web.controller.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.winiaaid.handler.aop.annotation.CompanyCheck;
import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.handler.aop.annotation.UriCheck;
import com.project.winiaaid.service.solution.SolutionService;
import com.project.winiaaid.util.CreateObjectMapper;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionDetailResponseDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionKeywordRequestDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/solution")
@Slf4j
@RequiredArgsConstructor
public class SolutionRestController {

    private final SolutionService solutionService;

    @Log
    @GetMapping("/list/{company}")
    @CompanyCheck
    @UriCheck
    public ResponseEntity<?> getAllSolutionListByCompany(@PathVariable String company, @RequestParam Map<String, Object> parametersMap) {
        List<ReadSolutionResponseDto> solutionList = null;
        ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto = null;

        ObjectMapper mapper = CreateObjectMapper.getInstance().getMapper();
        readSolutionKeywordRequestDto = mapper.convertValue(parametersMap, ReadSolutionKeywordRequestDto.class);

        try {
            solutionList = solutionService.getAllSolutionListByCompanyAndKeyword(company, readSolutionKeywordRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution", solutionList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load Solution Successful", solutionList));
    }

    @Log
    @GetMapping("/list/{company}/{codeType}/{code}")
    @CompanyCheck
    @UriCheck
    public ResponseEntity<?> getSolutionListByKeyCode(@PathVariable String company, @PathVariable String codeType, @PathVariable int code, @RequestParam Map<String, Object> parametersMap) {
        List<ReadSolutionResponseDto> solutionList = null;
        ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto = null;

        ObjectMapper mapper = CreateObjectMapper.getInstance().getMapper();
        readSolutionKeywordRequestDto = mapper.convertValue(parametersMap, ReadSolutionKeywordRequestDto.class);

        try {
            if(codeType.equals("product-category-code")) {
                solutionList = solutionService.getSolutionListByProductCategoryCodeAndKeyword(code, readSolutionKeywordRequestDto);
            }else if(codeType.equals("product-code")){
                solutionList = solutionService.getSolutionListByProductCodeAndKeyword(code, readSolutionKeywordRequestDto);
            }else {
                solutionList = solutionService.getSolutionListByProductGroupCodeAndKeyword(code, company, readSolutionKeywordRequestDto);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution", solutionList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load Solution Successful", solutionList));
    }

    @Log
    @GetMapping("/list/{company}/search")
    @CompanyCheck
    @UriCheck
    public ResponseEntity<?> getAllSolutionListByCompanyAndKeyword(@PathVariable String company, @RequestParam Map<String, Object> parametersMap) {
        List<ReadSolutionResponseDto> solutionList = null;
        ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto = null;

        ObjectMapper mapper = CreateObjectMapper.getInstance().getMapper();
        readSolutionKeywordRequestDto = mapper.convertValue(parametersMap, ReadSolutionKeywordRequestDto.class);

        log.info("test1: {}", readSolutionKeywordRequestDto);
        try {
            solutionList = solutionService.getAllSolutionListByCompanyAndKeyword(company, readSolutionKeywordRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution", solutionList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load Solution Successful", solutionList));
    }

    @Log
    @GetMapping("/list/{company}/{codeType}/{code}/search")
    @CompanyCheck
    @UriCheck
    public ResponseEntity<?> getSolutionListByKeyCodeAndKeyword(@PathVariable String company, @PathVariable String codeType, @PathVariable int code, @RequestParam Map<String, Object> parametersMap) {
        List<ReadSolutionResponseDto> solutionList = null;
        ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto = null;

        ObjectMapper mapper = CreateObjectMapper.getInstance().getMapper();
        readSolutionKeywordRequestDto = mapper.convertValue(parametersMap, ReadSolutionKeywordRequestDto.class);

        try {
            if(codeType.equals("product-category-code")) {
                solutionList = solutionService.getSolutionListByProductCategoryCodeAndKeyword(code, readSolutionKeywordRequestDto);
            }else if(codeType.equals("product-code")){
                solutionList = solutionService.getSolutionListByProductCodeAndKeyword(code, readSolutionKeywordRequestDto);
            }else {
                solutionList = solutionService.getSolutionListByProductGroupCodeAndKeyword(code, company, readSolutionKeywordRequestDto);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution", solutionList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load Solution Successful", solutionList));
    }

    @GetMapping("/detail/{solutionBoardCode}")
    public ResponseEntity<?> getSolutionDetailBySolutionBoardCode(@PathVariable int solutionBoardCode) {
        ReadSolutionDetailResponseDto solutionDetail = null;

        try {
            solutionDetail = solutionService.getSolutionDetailBySolutionBoardCode(solutionBoardCode);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution detail", solutionDetail));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load solution detail successful", solutionDetail));
    }
}