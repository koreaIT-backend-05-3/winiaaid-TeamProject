package com.project.winiaaid.domain.board;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Builder;
import lombok.Data;
@Builder
@Data
public class Board {
	private String board_code;
	private String temp_board_code;
	private int board_type;
	private int user_code;
	private String name;
	private String email;
	private String main_phone_number;
	private int company_code;
	private int response_flag;
	private String progress_status;
	private String board_title;
	private String board_content;
	private List<String> files;
	
	
}
