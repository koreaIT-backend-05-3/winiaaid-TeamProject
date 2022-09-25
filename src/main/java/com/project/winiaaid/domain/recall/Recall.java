package com.project.winiaaid.domain.recall;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.project.winiaaid.web.dto.recall.RecallServiceResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Recall {
	private int id2;
	private String service_code;
	private String temp_service_code;
	private int model_code;
	private int service_type_code;
	private String service_type_name;
	private String model_number;
	private LocalDateTime request_date;
	private String progress_status;
	private int note;
	
	private int user_code;
    private String user_name;
    private String main_phone_number;
    private String sub_phone_number;
    private String postal_code;
    private String main_address;
    private String detail_address;
    
    public RecallServiceResponseDto toRecallServiceResponseDto() {
    	return RecallServiceResponseDto.builder()
    			.serviceCode(service_code)
    			.serviceTypeName(service_type_name)
    			.modelNumber(model_number)
    			.requestDate(request_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
    			.progressStatus(progress_status)
    			.note(note)
    			.userName(user_name)
    			.mainPhoneNumber(main_phone_number)
    			.subPhoneNumber(sub_phone_number)
    			.address(main_address + " " + detail_address)
    			.build();
    }
}
