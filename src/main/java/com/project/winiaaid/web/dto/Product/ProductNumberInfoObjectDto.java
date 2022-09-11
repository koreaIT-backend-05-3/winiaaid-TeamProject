package com.project.winiaaid.web.dto.product;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProductNumberInfoObjectDto {
    private int modelCategoryCode;
    private String modelCategoryName;
    private String modelNumberCategoryInfo;
    private String modelCategoryNumberInfoDetail;
    private String modelImageCategoryName;
}