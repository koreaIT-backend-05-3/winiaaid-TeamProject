package com.project.winiaaid.web.dto.repair;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressResponseDto {
    private String postalCode;
    private String mainAddress;
    private String detailAddress;
    private int totalCount;
}
