package com.project.winiaaid.web.dto.auth;

import com.project.winiaaid.domain.user.UpdateUserPasswordEntity;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Data
public class UpdateUserPasswordRequestDto {
    private String userId;
    private String userPassword;

    public UpdateUserPasswordEntity toUpdateUserPasswordEntity() {
        return UpdateUserPasswordEntity.builder()
                .user_id(userId)
                .user_password(new BCryptPasswordEncoder().encode(userPassword))
                .build();
    }
}