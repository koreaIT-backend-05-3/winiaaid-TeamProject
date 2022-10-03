package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.CompanyCheck;
import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.handler.aop.annotation.UriCheck;
import com.project.winiaaid.service.solution.SolutionService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionDetailResponseDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionKeywordRequestDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public ResponseEntity<?> getAllSolutionListByCompany(@PathVariable String company, @PathVariable String boardType, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) {
        List<ReadSolutionResponseDto> solutionList = null;

        try {
            solutionList = solutionService.getAllSolutionListByCompanyAndKeyword(company, boardType, readSolutionKeywordRequestDto);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution", solutionList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load Solution Successful", solutionList));
    }

    @GetMapping("/{boardType}/list")
    @CompanyCheck
    @UriCheck
    public ResponseEntity<?> getSolutionListByKeyCode(@PathVariable String boardType, ReadSolutionKeywordRequestDto readSolutionKeywordRequestDto) {
        List<ReadSolutionResponseDto> solutionList = null;

        try {
            solutionList = solutionService.getSolutionListByProductCategoryCodeAndKeyword(boardType, readSolutionKeywordRequestDto);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution", solutionList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load Solution Successful", solutionList));
    }

    @UriCheck
    @GetMapping("/{boardType}/detail/{solutionBoardCode}")
    public ResponseEntity<?> getSolutionDetailBySolutionBoardCode(@PathVariable String boardType, @PathVariable int solutionBoardCode) {
        ReadSolutionDetailResponseDto solutionDetail = null;

        try {
            solutionDetail = solutionService.getSolutionDetailBySolutionBoardCode(boardType, solutionBoardCode);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution detail", solutionDetail));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load solution detail successful", solutionDetail));
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