package com.project.winiaaid.web.dto.manager;

import com.project.winiaaid.domain.manager.ManagerProduct;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AddProductRequestDto {
    private int productCategoryCode;
    private String productDetailName;

    private MultipartFile productImage;

    private String productCategoryName;
    private int companyCode;
    private int productGroupCode;
    private boolean mainGroupFlag;


    public ManagerProduct toManagerProductEntity(String productImage, String registrationType) {
        return ManagerProduct.builder()
                .product_category_code(getProductCategoryCode())
                .product_detail_name(getProductDetailName())
                .product_detail_image(productImage)
                .product_category_name(productCategoryName)
                .company_code(companyCode)
                .product_group_code(productGroupCode)
                .main_group_flag(mainGroupFlag ? 1 : 0)
                .product_main_image(productImage)
                .registrationType(registrationType)
                .build();
    }
}