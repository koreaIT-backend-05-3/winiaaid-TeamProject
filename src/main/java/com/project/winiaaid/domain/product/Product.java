package com.project.winiaaid.domain.product;

import com.project.winiaaid.web.dto.Product.ReadProductCategoryResponseDto;
import com.project.winiaaid.web.dto.Product.ReadProductDetailResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
	private int product_category_code;
	private String product_category_name;
	private int integrated_flag;
	private String product_group_category_name;
	private int group_flag;
	private int product_group;

	private int product_code;
	private String product_detail_name;

	private LocalDateTime create_date;
	private LocalDateTime update_date;

	public ReadProductCategoryResponseDto toReadProductCategoryResponseDto() {
		return ReadProductCategoryResponseDto.builder()
				.categoryCode(product_category_code)
				.categoryName(product_category_name != null ? product_category_name : product_group_category_name)
				.productGroup(product_group)
				.groupFlag(group_flag == 1 ? true : false)
				.build();
	}

	public ReadProductDetailResponseDto toReadProductDetailResponseDto() {
		return ReadProductDetailResponseDto.builder()
				.categoryCode(product_category_code)
				.categoryName(product_category_name)
				.integratedFlag(integrated_flag == 1 ? true : false)
				.productCode(product_code)
				.productName(integrated_flag == 1 ? product_category_name : product_detail_name)
				.build();
	}
}