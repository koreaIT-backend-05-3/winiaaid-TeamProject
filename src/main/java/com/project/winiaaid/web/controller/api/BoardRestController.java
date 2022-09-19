package com.project.winiaaid.web.controller.api;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.winiaaid.service.board.BoardService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.board.CreateBoardRequestDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/board")
public class BoardRestController {
	private final BoardService boardService;
//	포스트맵핑 - 게시글 생성
	@PostMapping("/write")
	public ResponseEntity<?> writeBoard(CreateBoardRequestDto createBoardRequestDto){
		try {
			boardService.insertBoard(createBoardRequestDto);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Post Creation Successfull", null));
	}
	
	
}
