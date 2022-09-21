package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.service.productV2.ProductServiceV2;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductNumberInfoResponseDto;
import com.project.winiaaid.web.dto.productV2.ReadModelNumberInfoResponseDto;
import com.project.winiaaid.web.dto.productV2.ReadProductResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/product")
public class ProductRestControllerV2 {

    private final ProductServiceV2 productServiceV2;

    @GetMapping("/list/category/{company}/{type}/{code}")
    public ResponseEntity<?> getDetailProductListByType(@PathVariable String company, @PathVariable String type, @PathVariable int code) {
        List<?> productDetailList = null;

        try {
            productDetailList = productServiceV2.getProductDetailInfoList(company, type, code);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "load productList fail", productDetailList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "load productList success", productDetailList));
    }

    @GetMapping("/list/model/number/info")
    public ResponseEntity<?> getProductModelNumberInfo() {
        List<ReadModelNumberInfoResponseDto> modelNumberInfoObjectList = null;

        try {
            modelNumberInfoObjectList = productServiceV2.getProductNumberInfoList();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "load modelNumberInfoList fail", modelNumberInfoObjectList));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "load modelNumberInfoList success", modelNumberInfoObjectList));
    }
}