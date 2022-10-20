package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.domain.file.ProductImage;
import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.service.manager.ManagerService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.manager.AddProductRequestDto;
import com.project.winiaaid.web.dto.manager.DeleteProductRequestDto;
import com.project.winiaaid.web.dto.manager.UpdateProductRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}