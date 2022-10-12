package com.project.winiaaid.web.dto.company;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadCompanyResponseDto {
    private int companyCode;
    private String companyName;
}