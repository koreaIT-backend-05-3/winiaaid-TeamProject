package com.project.winiaaid.domain.repair;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoEntity {
    private int user_code;
    private String user_name;
    private String email;
    private String main_phone_number;
    private String sub_phone_number;
    private int postal_code;
    private String main_address;
    private String detail_address;
}
