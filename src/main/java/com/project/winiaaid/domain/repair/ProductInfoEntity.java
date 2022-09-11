package com.project.winiaaid.domain.repair;

import com.project.winiaaid.web.dto.repair.ProductInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductInfoEntity {
	private String repair_service_code;
    private int product_category_code;
    private String product_category_name;
    private int product_code;
    private String product_detail_name;
    private int model_code;
    private String model_number;
    private int trouble_code;
    private String trouble_symptom;
    private String description;
    private String company_name;

    public ProductInfoDto toProductInfoDto() {
        return ProductInfoDto.builder()
                .repairServiceCode(repair_service_code)
                .productCategoryName(product_category_name)
                .productDetailName(product_detail_name)
                .modelNumber(model_number)
                .troubleSymptom(trouble_symptom)
                .description(description)
                .CompanyName(company_name)
                .build();
    }
}