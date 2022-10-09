package com.project.winiaaid.domain.product;

import com.project.winiaaid.web.dto.product.ReadModelNumberInfoResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModelNumberInfo {
    private int product_category_code;
    private String product_category_name;
    private String product_category_number_info;
    private String product_category_number_info_detail;
    private List<ModelNumberImage> product_number_image_list;

    public ReadModelNumberInfoResponseDto toReadModelNumberInfoResponseDto() {
        return ReadModelNumberInfoResponseDto.builder()
                .modelCategoryCode(product_category_code)
                .modelCategoryName(product_category_name)
                .modelCategoryNumberInfo(product_category_number_info)
                .modelCategoryNumberInfoDetail(product_category_number_info_detail)
                .modelNumberImageDtoList(product_number_image_list.stream()
                        .map(ModelNumberImage::toModelNumberImageDto)
                        .collect(Collectors.toList()))
                .build();
    }
}