package com.project.winiaaid.web.dto.product;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProductNumberInfoObjectDto {
    private int modelCode;
    private String modelName;
    private String modelNumberInfo;
    private String modelNumberInfoDetail;
    private String modelImageName;
}