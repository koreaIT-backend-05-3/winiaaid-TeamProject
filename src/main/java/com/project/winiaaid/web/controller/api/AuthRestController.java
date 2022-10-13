package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.handler.aop.annotation.ValidationCheck;
import com.project.winiaaid.service.auth.AuthService;
import com.project.winiaaid.service.auth.PrincipalDetails;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.auth.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthRestController {

    private final AuthService authService;

    @ValidationCheck
    @PostMapping("signup")
    public ResponseEntity<?> signupUser(@RequestBody @Valid SignupRequestDto signupRequestDto, BindingResult bindingResult) {
        boolean status = false;

        try {
            status = authService.signup(signupRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CustomResponseDto<>(1, "Member registration failed", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Member registration successful", status));
    }

    @ValidationCheck
    @GetMapping("/signup/validation/user-id")
    public ResponseEntity<?> checkUserId(@Valid UsernameCheckRequestDto usernameCheckRequestDto, BindingResult bindingResult) {
        boolean status = false;

        try {
            status = authService.checkUserId(usernameCheckRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CustomResponseDto<>(1, "Duplicate ID check failed", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "ID duplicated check completed", status));
    }

    @GetMapping("/phone/{phoneNumber}")
    public ResponseEntity<?> authenticationUserPhone(@PathVariable String phoneNumber) {
        String randomAuthenticationNumber = null;

        try {
            randomAuthenticationNumber = authService.getRandomAuthenticationNumber(phoneNumber);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CustomResponseDto<>(1, "Failed to load authentication number", randomAuthenticationNumber));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful loading of authentication number", randomAuthenticationNumber));
    }

    @GetMapping("principal")
    public ResponseEntity<?> getPrincipal(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        if(principalDetails == null) {
            return ResponseEntity.ok(new CustomResponseDto<>(1, "Load user information successfully", null));
        }

            return ResponseEntity.ok(new CustomResponseDto<>(1, "Load user information successfully", principalDetails.getUser().toReadUserResponseDto()));
    }

    @Log
    @GetMapping("/{requestType}")
    public ResponseEntity<?> getPrincipal(@PathVariable String requestType, AuthenticationUserRequestDto authenticationUserRequestDto) {
        AuthenticationUserResponseDto authenticationUserResponseDto = null;

        try {
            authenticationUserResponseDto = authService.getUserInfoByRequestType(requestType, authenticationUserRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load user information", authenticationUserResponseDto));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Load user information successfully", authenticationUserResponseDto));
    }

    @PutMapping("/password")
    public ResponseEntity<?> updateTempUserPasswordByUserId(@RequestBody UpdateUserPasswordRequestDto updateUserPasswordRequestDto) {
        boolean status = false;

        try {
            status = authService.updateTempUserPasswordByUserId(updateUserPasswordRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Temporary password change failed", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Temporary password change successful", status));
    }

    @ValidationCheck
    @Log
    @PutMapping("/user/{userCode}")
    public ResponseEntity<?> updateUserInfoByUserCode(@RequestBody @Valid UpdateUserInfoRequestDto updateUserInfoRequestDto, BindingResult bindingResult) {
        boolean status = false;

        try {
            status = authService.updateUserInfoByUserCode(updateUserInfoRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to modify user information", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "User information modification successful", status));
    }

    @DeleteMapping("/user/{userCode}")
    public ResponseEntity<?> deleteUserByUserCode(@PathVariable int userCode) {
        boolean status = false;

        try {
            status = authService.deleteUserByUserCode(userCode);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to withdraw membership", status));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successful withdrawal of membership", status));
    }

}