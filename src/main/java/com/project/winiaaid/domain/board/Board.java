package com.project.winiaaid.domain.board;

import com.project.winiaaid.web.dto.board.ReadBoardResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Board {
	private int id2;
	private String board_code;
	private String temp_board_code;
	private int board_type_code;

	private String board_title;
	private String board_content;
	private List<BoardFile> file_list;

	private int user_code;
	private String user_name;
	private String email;
	private String main_phone_number;

	private int company_code;
	private String company_name;

	private int response_flag;
	private int progress_status;
	private LocalDateTime create_date;
	
	public ReadBoardResponseDto toBoardResponseDto() {
		return ReadBoardResponseDto.builder()
				.userName(user_name)
				.companyName(company_name)
				.boardTitle(board_title)
				.boardContent(board_content)
				.createDate(create_date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
				.fileList(file_list != null ? file_list.stream()
						.map(BoardFile::toReadBoardFileDto)
						.collect(Collectors.toList()) : null)
				.build();
	}
	
	
}
