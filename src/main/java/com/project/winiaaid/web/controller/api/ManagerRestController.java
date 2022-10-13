package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.service.manager.ManagerService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.manager.AddProductRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}