package com.project.winiaaid.web.dto.recall;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class RecallServiceResponseDto {
	private String serviceCode;
	private String serviceTypeName;
	private String modelNumber;
	private String requestDate;
	private String progressStatus;
	private int note;
	private String userName;
	private String mainPhoneNumber;
	private String subPhoneNumber;
	private String address;
}
