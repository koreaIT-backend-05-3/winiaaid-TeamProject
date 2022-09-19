package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.CompanyCheck;
import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.handler.aop.annotation.UriCheck;
import com.project.winiaaid.service.solution.SolutionService;
import com.project.winiaaid.web.dto.CustomResponseDto;
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

    @Log
    @GetMapping("/list/product-code/{productCode}")
    @UriCheck
    public ResponseEntity<?> getSolutionByProductCode(@PathVariable int productCode, @RequestParam("board-type") String boardType, @RequestParam("solution-type") int solutionType) {
        List<ReadSolutionResponseDto> solutionList = null;

        try {
            solutionList = solutionService.getSolutionListByProductCode(productCode, boardType, solutionType);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution", solutionList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load Solution Successful", solutionList));
    }

    @GetMapping("/list/{company}")
    @CompanyCheck
    @UriCheck
    public ResponseEntity<?> getAllSolutionListByCompany(@PathVariable String company, @RequestParam("board-type") String boardType) {
        List<ReadSolutionResponseDto> solutionList = null;

        try {
            solutionList = solutionService.getAllSolutionListByCompany(company, boardType);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution", solutionList));
        }
        log.info("들어옴");

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load Solution Successful", solutionList));
    }
}