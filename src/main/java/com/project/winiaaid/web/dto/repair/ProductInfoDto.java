package com.project.winiaaid.web.dto.repair;

import com.project.winiaaid.domain.repair.ProductInfoEntity;
import lombok.Data;

import java.util.UUID;

@Data
public class ProductInfoDto {
    private int productCategoryCode;
    private int productCode;
    private int modelCode;
    private int troubleCode;
    private String description;

    public ProductInfoEntity toProductInfoEntity() {
        return ProductInfoEntity.builder()
                .repair_service_code(UUID.randomUUID().toString().replaceAll("-", ""))
                .product_category_code(productCategoryCode)
                .product_code(productCode)
                .model_code(modelCode)
                .trouble_code(troubleCode)
                .description(description)
                .build();
    }
}
