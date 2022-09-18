package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.service.solution.SolutionService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.solution.ReadSolutionResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/solution")
@Slf4j
@RequiredArgsConstructor
public class SolutionRestController {

    private final SolutionService solutionService;

    @Log
    @GetMapping("/{type}/{productCode}")
    public ResponseEntity<?> getSolutionByProductCode(@PathVariable String type, @PathVariable int productCode) {
        List<ReadSolutionResponseDto> solutionList = null;

        try {
            solutionList = solutionService.getSolutionListByProductCode(productCode, type);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load solution", solutionList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load Solution Successful", solutionList));
    }
}