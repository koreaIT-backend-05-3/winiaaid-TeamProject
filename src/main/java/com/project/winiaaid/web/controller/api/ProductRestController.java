package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.service.Product.ProductService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.Product.ReadProductCategoryResponseDto;
import com.project.winiaaid.web.dto.Product.ReadProductNumberInfoResponseDto;
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

    @GetMapping("/list/category/{company}")
    public ResponseEntity<?> getMainCategoryList(@PathVariable String company) {
        List<ReadProductCategoryResponseDto> productCategoryList = null;

        try {
            productCategoryList = productService.getProductMainCategoryList(company);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "load categoryList fail", productCategoryList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "load categoryList success", productCategoryList));
    }

    @GetMapping("/list/category/{company}/{type}/{code}")
    public ResponseEntity<?> getDetailProductListByType(@PathVariable String company, @PathVariable String type, @PathVariable int code) {
        List<?> productDetailList = null;

        try {
            productDetailList = productService.getProductDetailInfoList(company, type, code);
            System.out.println(productDetailList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "load productList fail", productDetailList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "load productList success", productDetailList));
    }

    @GetMapping("/list/model/number/info")
    public ResponseEntity<?> getProductModelNumberInfo() {
        List<ReadProductNumberInfoResponseDto> productNumberInfoObjectList = null;

        try {
            productNumberInfoObjectList = productService.getProductNumberInfoList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "load modelNumberInfoList fail", productNumberInfoObjectList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "load modelNumberInfoList success", productNumberInfoObjectList));
    }
}