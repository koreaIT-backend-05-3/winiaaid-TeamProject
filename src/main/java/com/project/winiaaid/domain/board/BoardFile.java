package com.project.winiaaid.domain.board;

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
	
}
