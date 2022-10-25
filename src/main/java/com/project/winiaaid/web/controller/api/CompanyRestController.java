package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.service.company.CompanyService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.company.ReadCompanyResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductCategoryResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/company")
public class CompanyRestController {

    private final CompanyService companyService;

    @GetMapping("/list")
    public ResponseEntity<?> getCompanyList() {
        List<ReadCompanyResponseDto> companyList = null;

        try {
            companyList = companyService.getCompanyList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "load companyList fail", companyList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "load companyList success", companyList));
    }
}