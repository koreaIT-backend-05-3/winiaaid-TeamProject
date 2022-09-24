package com.project.winiaaid.domain.productV2;

import com.project.winiaaid.web.dto.productV2.ReadModelNumberInfoResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModelNumberInfo {
    private int model_category_code;
    private String model_category_name;
    private String model_number_category_info;
    private String model_category_number_info_detail;
    private List<ModelNumberImage> model_number_image_list;

    public ReadModelNumberInfoResponseDto toReadModelNumberInfoResponseDto() {
        return ReadModelNumberInfoResponseDto.builder()
                .modelCategoryCode(model_category_code)
                .modelCategoryName(model_category_name)
                .modelNumberCategoryInfo(model_number_category_info)
                .modelCategoryNumberInfoDetail(model_category_number_info_detail)
                .modelNumberImageDtoList(model_number_image_list.stream()
                        .map(ModelNumberImage::toModelNumberImageDto)
                        .collect(Collectors.toList()))
                .build();
    }
}