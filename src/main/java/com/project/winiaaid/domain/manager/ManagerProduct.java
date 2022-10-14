package com.project.winiaaid.domain.manager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagerProduct {
    private int new_product_category_code;

    private String registrationType;

    private int product_category_code;
    private String product_detail_name;
    private String product_detail_image;

    private int product_group_code;
    private String product_category_name;
    private int company_code;
    private int main_group_flag;
    private String product_main_image;
}