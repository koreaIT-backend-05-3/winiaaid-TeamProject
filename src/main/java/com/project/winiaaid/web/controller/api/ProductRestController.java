package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.service.Product.ProductService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.Product.ReadProductCategoryResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/product")
public class ProductRestController {

    private final ProductService productService;

    @GetMapping("/list/category")
    public ResponseEntity<?> getMainCategoryListByType() {
        List<ReadProductCategoryResponseDto> productCategoryList = null;

        try {
            productCategoryList = productService.getProductMainCategoryList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "load categoryList fail", productCategoryList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "load categoryList success", productCategoryList));
    }
}