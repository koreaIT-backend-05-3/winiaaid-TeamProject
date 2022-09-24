package com.project.winiaaid.web.controller.api;

import java.util.List;

import com.project.winiaaid.handler.aop.annotation.CompanyCheck;
import com.project.winiaaid.handler.aop.annotation.UriCheck;
import com.project.winiaaid.web.dto.productV2.ReadModelNumberInfoResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.winiaaid.service.product.ProductService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductCategoryResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductModelResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductNumberInfoResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductTroubleResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/product")
public class ProductRestController {

    private final ProductService productService;


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

    @CompanyCheck
    @UriCheck
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
        List<ReadModelNumberInfoResponseDto> productNumberInfoObjectList = null;

        try {
            productNumberInfoObjectList = productService.getProductNumberInfoList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "load modelNumberInfoList fail", productNumberInfoObjectList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "load modelNumberInfoList success", productNumberInfoObjectList));
    }

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

    @GetMapping("/model/list/{modelName}")
    public ResponseEntity<?> getProductModelByModelName(@PathVariable String modelName, @RequestParam int code) {
        List<ReadProductModelResponseDto> productModelList = null;

        try {
            productModelList = productService.getProductModelInfoList(code, modelName);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "load modelName fail", productModelList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "load modelName success", productModelList));
    }
}