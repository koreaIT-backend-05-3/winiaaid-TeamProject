package com.project.winiaaid.web.dto.board;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.project.winiaaid.domain.board.Board;

import lombok.Data;

@Data
public class CreateBoardRequestDto {
	private int userCode;
	private int boardTypeCode;
	private String userName;
	private String email;
	private String mainPhoneNumber;
	private int companyCode;
	private int responseFlag;
	private String progressStatus;
	private String boardTitle;
	private String boardContent;
	private List<MultipartFile> files;

	public Board toBoardEntity() {
		return Board.builder()
				.temp_board_code(setTempBoardCode())
				.user_code(userCode)
				.board_type_code(boardTypeCode)
				.user_name(userName)
				.user_email(email)
				.main_phone_number(mainPhoneNumber)
				.company_code(companyCode)
				.response_flag(responseFlag)
				.progress_status(1)
				.board_title(boardTitle)
				.board_content(boardContent)
				.build();
	}
	
	public String setTempBoardCode() {
		LocalDateTime nowDate = LocalDateTime.now();
		
		int year = nowDate.getYear();
		int month = nowDate.getMonthValue();
		int day = nowDate.getDayOfMonth();
		
		return boardTypeCode + "0" + (year + month + day);
	}
}
