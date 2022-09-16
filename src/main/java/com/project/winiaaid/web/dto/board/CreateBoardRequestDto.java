package com.project.winiaaid.web.dto.board;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
//데이터가 여기 안에 다 담겨진다
public class CreateBoardRequestDto {
	private int usercode;
	private String name;
	private String email;
	private String mainPhoneNumber;
	private int companyCode;
	private int responseFlag;
	private String boardTitle;
	private String boardContent;
	private List<MultipartFile> files;
}
