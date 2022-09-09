package com.project.winiaaid.domain.product;

import com.project.winiaaid.web.dto.product.ReadProductCategoryResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductDetailResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
	private int product_category_code;
	private String product_category_name;
	private String product_group_category_name;
	private int group_flag;
	private int product_group;

	private int product_code;
	private String product_detail_name;

	private String product_main_category_image;
	private String product_main_image;
	private String product_detail_image;

	private LocalDateTime create_date;
	private LocalDateTime update_date;

	public ReadProductCategoryResponseDto toReadProductCategoryResponseDto() {
		return ReadProductCategoryResponseDto.builder()
				.categoryCode(product_category_code)
				.categoryName(product_category_name != null ? product_category_name : product_group_category_name)
				.productGroup(product_group)
				.groupFlag(group_flag == 1 ? true : false)
				.productMainCategoryImage(product_main_category_image)
				.build();
	}

	public ReadProductDetailResponseDto toReadProductDetailResponseDto() {
		return ReadProductDetailResponseDto.builder()
				.categoryCode(product_category_code)
				.categoryName(product_category_name)
				.productCode(product_code)
				.productName(product_detail_name == null ? product_category_name : product_detail_name)
				.productMainImage(product_main_image)
				.productDetailImage(product_detail_image == null ? product_main_image : product_detail_image)
				.build();
	}
}