package com.project.winiaaid.web.controller.api;

import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.handler.aop.annotation.ValidationCheck;
import com.project.winiaaid.service.auth.AuthService;
import com.project.winiaaid.service.auth.PrincipalDetails;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.auth.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthRestController {

    private final AuthService authService;

    @ValidationCheck
    @PostMapping("/signup")
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

    @Log
    @PostMapping("/save/user-id")
    public ResponseEntity<?> signupUser(@RequestBody Map<String, Object> parametersMap, HttpServletRequest request, HttpServletResponse response) {
        try {
            if((Boolean) parametersMap.get("saveIdInputFlag")) {
                saveUserIdToCookie((String)parametersMap.get("userId"), response);

            }else {
                removeCookie(response);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new CustomResponseDto<>(1, "Failed to save to ID cookie", false));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Saved in ID cookie successfully", true));
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

    @GetMapping("/principal")
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

    @Log
    @GetMapping("/user-id")
    public ResponseEntity<?> getUserId(HttpServletRequest request) {
        String userId = null;

        try {
            userId = getUserIdInCookie(request);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Failed to load ID", userId));
        }

        return ResponseEntity.ok(new CustomResponseDto<>(1, "Successfully loaded ID", userId));
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

    private void saveUserIdToCookie(String userId, HttpServletResponse response) throws Exception {
        Cookie cookie = new Cookie("userId", userId);
        cookie.setPath("/api/v1/auth/user-id");
        cookie.setMaxAge(60 * 60 * 24);
        response.addCookie(cookie);
    }

    private void removeCookie(HttpServletResponse response) throws Exception {
        Cookie cookie = new Cookie("userId", null);
        cookie.setPath("/api/v1/auth/user-id");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    private String getUserIdInCookie(HttpServletRequest request) throws Exception {
        List<String> cookieValueList = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("userId"))
                .map(Cookie::getValue)
                .collect(Collectors.toList());

        return cookieValueList.isEmpty() ? null : cookieValueList.get(0);
    }

}