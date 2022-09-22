package com.project.winiaaid.web.dto.board;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadBoardResponseDto {
	private String userName;
	private int companyCode;
	private String boardTitle;
	private String boardContent;
	private int totalCount;
	private LocalDateTime createDate;
}
