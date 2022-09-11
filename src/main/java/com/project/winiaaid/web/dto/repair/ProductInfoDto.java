package com.project.winiaaid.web.dto.repair;

import com.project.winiaaid.domain.repair.ProductInfoEntity;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ProductInfoDto {
    private String repairServiceCode;
    private int productCategoryCode;
    private String productCategoryName;
    private int productCode;
    private String productDetailName;
    private int modelCode;
    private String modelNumber;
    private int troubleCode;
    private String troubleSymptom;
    private String description;
    private String CompanyName;

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
