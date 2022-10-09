package com.project.winiaaid.domain.product;

import com.project.winiaaid.web.dto.product.ReadProductCategoryResponseDto;
import com.project.winiaaid.web.dto.product.ReadProductResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
	private int product_category_code;
	private String product_category_name;
	private String product_group_category_name;
	private int group_flag;
	private int product_group_code;
	private String product_main_category_image;
	private String product_main_image;
	private List<ProductDetail> product_detail_list;
	private LocalDateTime create_date;
	private LocalDateTime update_date;

	public ReadProductCategoryResponseDto toReadProductCategoryResponseDto() {
		return ReadProductCategoryResponseDto.builder()
				.productCategoryCode(product_category_code)
				.productCategoryName(product_category_name != null ? product_category_name : product_group_category_name)
				.productGroupCode(product_group_code)
				.groupFlag(group_flag == 1 ? true : false)
				.productMainCategoryImage(product_main_category_image)
				.build();
	}

	public ReadProductResponseDto toReadProductResponseDto() {
		return ReadProductResponseDto.builder()
				.productCategoryCode(product_category_code)
				.productCategoryName(product_category_name)
				.productGroupCategoryName(product_group_category_name)
				.groupFlag(group_flag)
				.productGroupCode(product_group_code)
				.productMainCategoryImage(product_main_category_image)
				.productMainImage(product_main_image)
				.productDetailList(product_detail_list.stream()
						.map(ProductDetail::toProductDetailDto)
						.collect(Collectors.toList()))
				.build();
	}
}