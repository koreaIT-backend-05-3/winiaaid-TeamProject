package com.project.winiaaid.service.auth;

public interface AuthService {
    public String getRandomAuthenticationNumber(String phoneNumber) throws Exception;
}