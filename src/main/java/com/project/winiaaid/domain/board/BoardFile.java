package com.project.winiaaid.domain.board;

import com.project.winiaaid.web.dto.board.ReadBoardFileDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardFile {
	private int file_code;
	private String file_name;
	private String board_code;

	public ReadBoardFileDto toReadBoardFileDto() {
		return ReadBoardFileDto.builder()
				.fileCode(file_code)
                .originalFileName(file_name.substring(file_name.indexOf("_") + 1))
                .tempFileName(file_name)
                .build();
	}
}