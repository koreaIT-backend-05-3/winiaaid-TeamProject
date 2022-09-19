package com.project.winiaaid.domain.board;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BoardFile {
	private int file_code;
	private String file_name;
	private String board_code;
	
}
