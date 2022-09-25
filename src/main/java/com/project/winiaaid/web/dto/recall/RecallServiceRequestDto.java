package com.project.winiaaid.web.dto.recall;

import com.project.winiaaid.domain.recall.Recall;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RecallServiceRequestDto {
	private int modelCode;
	private String modelNumber;
	private String userName;
	private String mainPhoneNumber;
	private String subPhoneNumber;
	private String postalCode;
    private String mainAddress;
    private String detailAddress;
    
    public Recall toRecallEntity() {
    	return Recall.builder()
    				.temp_service_code(createTempServiceCode())
					.model_code(modelCode)
    				.model_number(modelNumber)
    				.user_name(userName)
    				.main_phone_number(mainPhoneNumber)
    				.sub_phone_number(subPhoneNumber)
    				.postal_code(postalCode)
    				.main_address(mainAddress)
    				.detail_address(detailAddress)
    				.build();
    }
    
    private String createTempServiceCode() {
		LocalDateTime nowDate = LocalDateTime.now();
		int year = nowDate.getYear();
		int month = nowDate.getMonthValue();
		int day = nowDate.getDayOfMonth();

		String tempServiceCode = null;

		tempServiceCode = modelCode + "0" + (year + month + day);

    	return tempServiceCode;
    }
}
