package com.project.winiaaid.domain.repair;

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
    private int product_code;
    private int model_code;
    private int trouble_code;
    private String description;
}