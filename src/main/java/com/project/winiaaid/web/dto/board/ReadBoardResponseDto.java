package com.project.winiaaid.web.dto.board;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReadBoardResponseDto {
	private String userName;
	private String companyName;
	private String boardTitle;
	private String boardContent;
	private int totalCount;
	private String createDate;
	private List<ReadBoardFileDto> fileList;
}
