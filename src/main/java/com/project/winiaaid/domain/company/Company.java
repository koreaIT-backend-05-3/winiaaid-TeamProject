package com.project.winiaaid.domain.company;

import com.project.winiaaid.web.dto.company.ReadCompanyResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {
    private int company_code;
    private String company_name;

    public ReadCompanyResponseDto toReadCompanyResponseDto() {
        return ReadCompanyResponseDto.builder()
                .companyCode(company_code)
                .companyName(company_name)
                .build();
    }
}