package com.project.winiaaid.web.dto.repair;

import com.project.winiaaid.domain.repair.ProductInfoEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductInfoDto {
    private String serviceCode;
    private String productGroupName;
    private int productCategoryCode;
    private String productCategoryName;
    private int productCode;
    private String productDetailName;
    private int modelCode;
    private String modelNumber;
    private int troubleCode;
    private String troubleSymptom;
    private String description;
    private int companyCode;
    private String companyName;
    private boolean sameProductFlag;

    public ProductInfoEntity toProductInfoEntity() {
        return ProductInfoEntity.builder()
                .service_code(serviceCode)
                .temp_service_code(createTempServiceCode())
                .product_category_code(productCategoryCode)
                .product_code(productCode)
                .model_code(modelCode)
                .trouble_code(troubleCode)
                .description(description)
                .same_product_flag(sameProductFlag)
                .build();
    }

    private int createTempServiceCode() {
        LocalDateTime nowDate = LocalDateTime.now();
        int year = nowDate.getYear();
        int month = nowDate.getMonthValue();
        int day = nowDate.getDayOfMonth();
        String tempServiceCode = null;

        tempServiceCode = productCode + "0" + (year + month + day);

        return Integer.parseInt(tempServiceCode);
    }
}
