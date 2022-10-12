package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.CompanyCheck;
import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.handler.aop.annotation.UriCheck;
import com.project.winiaaid.service.product.ProductService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.product.ReadModelNumberInfoResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductCategoryResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductModelResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductTroubleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/product")
public class ProductRestController {

    private final ProductService productService;

//    @Cacheable(value = "product", key = "#company")
    @CompanyCheck
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

//    @Cacheable(value = "product")
    @CompanyCheck
    @UriCheck
    @GetMapping("/list/category/{company}/{type}/{code}")
    public ResponseEntity<?> getDetailProductListByType(@PathVariable String company, @PathVariable String type, @PathVariable int code) {
        List<?> productDetailList = null;

        try {
            productDetailList = productService.getProductDetailInfoList(company, type, code);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "load productList fail", productDetailList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "load productList success", productDetailList));
    }

    @GetMapping("/list/model/number/info")
    public ResponseEntity<?> getProductModelNumberInfo() {
        List<ReadModelNumberInfoResponseDto> productNumberInfoObjectList = null;

        try {
            productNumberInfoObjectList = productService.getProductNumberInfoList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "load modelNumberInfoList fail", productNumberInfoObjectList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "load modelNumberInfoList success", productNumberInfoObjectList));
    }

    @Cacheable(value = "trouble", key = "#categoryCode")
    @GetMapping("/list/trouble/category/{categoryCode}")
    public ResponseEntity<?> getProductTroubleSymptomInfoList(@PathVariable int categoryCode) {
        List<ReadProductTroubleResponseDto> productTroubleResponseDtoList = null;

        try {
            productTroubleResponseDtoList = productService.getProductTroubleInfoList(categoryCode);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "load productTroubleSymptomInfoList fail", productTroubleResponseDtoList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "load productTroubleSymptomInfoList success", productTroubleResponseDtoList));
    }

    @Log
    @Cacheable(value = "model", key = "#modelName")
    @GetMapping("/model/list/{modelName}")
    public ResponseEntity<?> getProductModelByModelName(@PathVariable String modelName, @RequestParam String requestType, @RequestParam int code) {
        List<ReadProductModelResponseDto> productModelList = null;

        try {
            productModelList = productService.getProductModelInfoList(code, requestType, modelName);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "load modelName fail", productModelList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "load modelName success", productModelList));
    }
}