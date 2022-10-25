package com.project.winiaaid.web.dto.product;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadProductTroubleResponseDto {
    private int id;
    private int troubleCode;
    private String troubleSymptom;
}