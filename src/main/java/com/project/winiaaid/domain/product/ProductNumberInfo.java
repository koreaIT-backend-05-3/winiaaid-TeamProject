package com.project.winiaaid.domain.product;

import com.project.winiaaid.web.dto.product.ProductNumberInfoObjectDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductNumberInfo {
    private int model_category_code;
    private String model_category_name;
    private String model_number_categoty_info;
    private String model_category_number_info_detail;
    private String model_image_category_name;

    public ProductNumberInfoObjectDto toProductNumberInfoObjectDtoDto() {
        return ProductNumberInfoObjectDto.builder()
                .modelCategoryCode(model_category_code)
                .modelCategoryName(model_category_name)
                .modelNumberCategoryInfo(model_number_categoty_info)
                .modelCategoryNumberInfoDetail(model_category_number_info_detail)
                .modelImageCategoryName(model_image_category_name)
                .build();
    }
}