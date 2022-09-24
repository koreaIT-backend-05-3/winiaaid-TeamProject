package com.project.winiaaid.domain.repair;

import com.project.winiaaid.web.dto.repair.AddressResponseDto;
import lombok.Data;

@Data
public class Address {
    private String postal_code;
    private String main_address;
    private String detail_address;
    private int total_count;

    public AddressResponseDto toAddressResponseDto() {
        return AddressResponseDto.builder()
                .postalCode(postal_code)
                .mainAddress(main_address)
                .detailAddress(detail_address)
                .totalCount(total_count)
                .build();
    }
}
