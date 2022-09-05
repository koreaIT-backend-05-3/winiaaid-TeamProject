package com.project.winiaaid.domain.product;

import com.project.winiaaid.web.dto.Product.ProductNumberInfoObjectDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductNumberInfo {
    private int model_code;
    private String model_name;
    private String model_number_info;
    private String model_number_info_detail;
    private String model_image_name;

    public ProductNumberInfoObjectDto toProductNumberInfoObjectDtoDto() {
        return ProductNumberInfoObjectDto.builder()
                .modelCode(model_code)
                .modelName(model_name)
                .modelNumberInfo(model_number_info)
                .modelNumberInfoDetail(model_number_info_detail)
                .modelImageName(model_image_name)
                .build();
    }
}