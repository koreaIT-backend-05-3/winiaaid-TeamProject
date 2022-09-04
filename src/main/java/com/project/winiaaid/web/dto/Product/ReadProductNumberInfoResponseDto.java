package com.project.winiaaid.web.dto.Product;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReadProductNumberInfoResponseDto {
    private int modelCode;
    private String modelName;
    private String modelNumberInfo;
    private String modelNumberInfoDetail;
    private String modelImageName;
}