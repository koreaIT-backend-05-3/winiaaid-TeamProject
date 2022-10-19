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
    private boolean top_category_flag;
    private String product_main_image;

    private int key_code;
    private int product_key_code;
    private String original_product_name;
    private boolean product_group_modify_flag;
    private boolean main_category_flag;
    private boolean product_detail_update_flag;
}