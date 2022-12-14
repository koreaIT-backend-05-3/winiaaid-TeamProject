package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.CompanyCheck;
import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.handler.aop.annotation.UriCheck;
import com.project.winiaaid.service.solution.SolutionService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.solution.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/solution")
@Slf4j
@RequiredArgsConstructor
public class SolutionRestController {

    private final SolutionService solutionService;

    @GetMapping("/{company}/{boardType}/list")
    @CompanyCheck
    @UriCheck
    public ResponseEntity<?> getAllSolutionListByCompany(@PathVariable String company, @PathVariable String boardType, ReadSolutionRequestDto readSolutionRequestDto) {
        List<ReadSolutionResponseDto> solutionList = null;

        try {
            solutionList = solutionService.getAllSolutionListByCompanyAndKeyword(company, boardType, readSolutionRequestDto);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution", solutionList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load Solution Successful", solutionList));
    }

    @Log
    @UriCheck
    @GetMapping("/{boardType}/list")
    public ResponseEntity<?> getSolutionListByKeyCode(@PathVariable String boardType, ReadSolutionRequestDto readSolutionRequestDto) {
        List<ReadSolutionResponseDto> solutionList = null;

        try {
            solutionList = solutionService.getSolutionListByKeyCodeAndKeyword(boardType, readSolutionRequestDto);

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

    @Cacheable(value = "solutionTypeList")
    @GetMapping("/type/list")
    public ResponseEntity<?> getAllSolutionTypeList() {
        List<ReadSolutionTypeResponseDto> readSolutionTypeResponseDto = null;

        try {
            readSolutionTypeResponseDto = solutionService.getAllSolutionTypeList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution type list", readSolutionTypeResponseDto));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load solution type list successful", readSolutionTypeResponseDto));
    }

    @Log
    @Cacheable(value = "solutionTitleList")
    @GetMapping("/{boardType}/title/list")
    public ResponseEntity<?> getSolutionTitleListBySolutionBoard(@PathVariable String boardType, @RequestParam String productCode, @RequestParam boolean notInclude) {
        List<ReadSolutionTitleResponseDto> readSolutionTitleResponseDtoList = null;

        try {
            readSolutionTitleResponseDtoList = solutionService.getSolutionTitleListBySolutionBoard(boardType, productCode, notInclude);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution title", readSolutionTitleResponseDtoList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load solution title successful", readSolutionTitleResponseDtoList));
    }


    @PutMapping("/increase/view-count/{solutionBoardCode}")
    public ResponseEntity<?> increaseInViewsBySolutionBoardCode(@PathVariable int solutionBoardCode) {
        boolean status = false;

        try {
            status = solutionService.updateViewCountBySolutionBoardCode(solutionBoardCode);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to increase view count", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful increase in views", status));
    }
}