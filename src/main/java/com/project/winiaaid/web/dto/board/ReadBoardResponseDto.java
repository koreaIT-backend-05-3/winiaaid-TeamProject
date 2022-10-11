package com.project.winiaaid.web.dto.board;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ReadBoardResponseDto {
	private int userCode;
	private String userName;
	private int companyCode;
	private String companyName;
	private String userEmail;
	private String mainPhoneNumber;
	private String authenticationNumber;
	private String boardTitle;
	private String boardContent;
	private String response;
	private int totalCount;
	private String createDate;
	private int progressStatus;
	private int responseFlag;
	private List<ReadBoardFileDto> fileList;
}

