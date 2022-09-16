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
    private String repairServiceCode;
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
                .repair_service_code(repairServiceCode)
                .temp_repair_service_code(createTempRepairServiceCode())
                .product_category_code(productCategoryCode)
                .product_code(productCode)
                .model_code(modelCode)
                .trouble_code(troubleCode)
                .description(description)
                .same_product_flag(sameProductFlag)
                .build();
    }

    private int createTempRepairServiceCode() {
        LocalDateTime nowDate = LocalDateTime.now();
        int year = nowDate.getYear();
        int month = nowDate.getMonthValue();
        int day = nowDate.getDayOfMonth();
        String tempRepairServiceCode = null;

        tempRepairServiceCode = productCode + "0" + (year + month + day);

        return Integer.parseInt(tempRepairServiceCode);
    }
}
