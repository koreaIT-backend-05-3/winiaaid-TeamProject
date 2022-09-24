package com.project.winiaaid.web.dto.recall;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.project.winiaaid.domain.recall.Recall;

import lombok.Data;

@Data
public class RecallServiceRequestDto {
	private String modelName;
	private String userName;
	private String mainPhoneNumber;
	private String subPhoneNumber;
	private String postalCode;
    private String mainAddress;
    private String detailAddress;
    
    public Recall toRecallEntity() {
    	return Recall.builder()
    				.recall_code(createRecallCode())
    				.model_name(modelName)
    				.user_name(userName)
    				.main_phone_number(mainPhoneNumber)
    				.sub_phone_number(subPhoneNumber)
    				.postal_code(postalCode)
    				.main_address(mainAddress)
    				.detail_address(detailAddress)
    				.build();
    }
    
    private String createRecallCode() {
    	String dfc = "DFC";
    	String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMddHHmmss"));
    	
    	return dfc + now;
    }
}
