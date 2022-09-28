package com.project.winiaaid.domain.board;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.project.winiaaid.web.dto.board.ReadBoardResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Board {
	private String board_code;
	private String temp_board_code;
	private int board_type;
	private int user_code;
	private String user_name;
	private String email;
	private String main_phone_number;
	private int company_code;
	private int response_flag;
	private String progress_status;
	private String board_title;
	private String board_content;
	private List<String> files;
	private List<BoardFile> file_list;
	private int total_count;
	private LocalDateTime create_date;
	
	public ReadBoardResponseDto toBoardResponseDto() {
		return ReadBoardResponseDto.builder()
				.userName(user_name)
				.companyCode(company_code)
				.boardTitle(board_title)
				.boardContent(board_content)
				.totalCount(total_count)
				.createDate(create_date)
				.build();
	}
	
	
}
