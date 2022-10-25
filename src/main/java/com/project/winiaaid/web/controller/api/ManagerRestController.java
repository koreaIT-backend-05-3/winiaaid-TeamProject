package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.service.manager.ManagerService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.manager.AddProductRequestDto;
import com.project.winiaaid.web.dto.manager.DeleteProductRequestDto;
import com.project.winiaaid.web.dto.manager.InsertTroubleSymptomOfProductRequestDto;
import com.project.winiaaid.web.dto.manager.UpdateProductRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/manager")
@RequiredArgsConstructor
public class ManagerRestController {

    private final ManagerService managerService;

    @Log
    @PostMapping("/{registrationType}")
    public ResponseEntity<?> addProductDetail(@PathVariable String registrationType, AddProductRequestDto addProductRequestDto) {
        boolean status = false;

        try {
            status = managerService.insertProduct(registrationType, addProductRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to register new product", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "New Product Registration Successful", status));
    }

    @Log
    @PutMapping("/product/{keyCode}")
    public ResponseEntity<?> modifyProductInformation(@PathVariable int keyCode, UpdateProductRequestDto updateProductRequestDto) {
        boolean status = false;

        try {
            status = managerService.updateProduct(keyCode, updateProductRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Product update failed", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Product update successful", status));

    }

    @Log
    @DeleteMapping("/product/{productType}/{keyCode}")
    public ResponseEntity<?> deleteProductInformation(@PathVariable String productType, @PathVariable int keyCode, @RequestBody DeleteProductRequestDto deleteProductRequestDto) {
        boolean status = false;

        try {
            status = managerService.deleteProduct(productType, keyCode, deleteProductRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Product update failed", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Product update successful", status));

    }

    @Log
    @CacheEvict(value = "trouble", allEntries = true)
    @PostMapping("/trouble-symptom")
    public ResponseEntity<?> addTroubleSymptom(@RequestBody Map<Object, String> troubleSymptomMap) {
        boolean status = false;

        try {
            status = managerService.insertTroubleSymptom(troubleSymptomMap.get("troubleSymptom"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to add trouble symptom", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Add trouble symptom successfully", status));
    }

    @Log
    @CacheEvict(value = "trouble", allEntries = true)
    @PostMapping("/product-category/trouble-symptom")
    public ResponseEntity<?> insertTroubleSymptomOfProduct(@RequestBody InsertTroubleSymptomOfProductRequestDto insertTroubleSymptomOfProductRequestDto) {
        boolean status = false;

        try {
            status = managerService.insertTroubleSymptomOfProduct(insertTroubleSymptomOfProductRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to add trouble symptom for the product", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful addition of trouble symptom for the product", status));

    }

    @Log
    @CacheEvict(value = "trouble", allEntries = true)
    @DeleteMapping("/product-category/trouble-symptom")
    public ResponseEntity<?> deleteTroubleSymptomOfProduct(@RequestBody Map<Object, List<Integer>> troubleSymptomIdMap) {
        boolean status = false;

        try {
            status = managerService.deleteTroubleSymptomOfProduct(troubleSymptomIdMap.get("troubleSymptomIdList"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to clear trouble symptom of product", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful deletion of product trouble symptom", status));
    }

    @Log
    @CacheEvict(value = "trouble", allEntries = true)
    @DeleteMapping("/trouble-symptom/{troubleSymptomCode}")
    public ResponseEntity<?> deleteTroubleSymptomByTroubleSymptomCode(@PathVariable int troubleSymptomCode) {
        boolean status = false;

        try {
            status = managerService.deleteTroubleSymptomByTroubleSymptomCode(troubleSymptomCode);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failure to clear trouble symptom", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Trouble Symptom Deletion Successful", status));
    }
}