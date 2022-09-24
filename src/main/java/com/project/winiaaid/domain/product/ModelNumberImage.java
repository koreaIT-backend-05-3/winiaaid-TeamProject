package com.project.winiaaid.domain.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModelNumberImage {
    private String model_category_image_name;

    public ModelNumberImageDto toModelNumberImageDto() {
        return ModelNumberImageDto.builder()
                .modelCategoryImageName(model_category_image_name)
                .build();
    }
}