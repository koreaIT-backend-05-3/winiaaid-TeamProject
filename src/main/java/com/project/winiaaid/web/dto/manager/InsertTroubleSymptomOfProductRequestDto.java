package com.project.winiaaid.web.dto.manager;

import com.project.winiaaid.domain.manager.ManagerTroubleSymptom;
import lombok.Data;

import java.util.List;

@Data
public class InsertTroubleSymptomOfProductRequestDto {
    private int productCategoryCode;
    private List<Integer> troubleSymptomCodeList;

    public ManagerTroubleSymptom toManagerProductEntity() {
        return ManagerTroubleSymptom.builder()
                .product_category_code(productCategoryCode)
                .trouble_symptom_code_list(troubleSymptomCodeList)
                .build();
    }
}