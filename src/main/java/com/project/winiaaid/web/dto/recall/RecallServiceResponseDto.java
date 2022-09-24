package com.project.winiaaid.web.dto.recall;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class RecallServiceResponseDto {
	private String recallCode;
	private String serviceType;
	private String modelName;
	private String requestDate;
	private String progressStatus;
	private int note;
	private String userName;
	private String mainPhoneNumber;
	private String subPhoneNumber;
	private String address;
}
