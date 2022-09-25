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
    private int id2;
	private String service_code;
    private int temp_service_code;
    private String product_group_name;
    private int product_category_code;
    private String product_category_name;
    private int product_code;
    private String product_detail_name;
    private int model_code;
    private String model_number;
    private int trouble_code;
    private String trouble_symptom;
    private String description;
    private int company_code;
    private String company_name;
    private boolean same_product_flag;

    public ProductInfoDto toProductInfoDto() {
        return ProductInfoDto.builder()
                .serviceCode(service_code)
                .productGroupName(product_group_name)
                .productCategoryName(product_category_name)
                .productDetailName(product_detail_name)
                .modelNumber(model_number)
                .troubleCode(trouble_code)
                .troubleSymptom(trouble_symptom)
                .description(description)
                .companyCode(company_code)
                .companyName(company_name)
                .build();
    }
}