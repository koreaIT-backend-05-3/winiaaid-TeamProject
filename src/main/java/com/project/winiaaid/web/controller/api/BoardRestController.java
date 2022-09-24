package com.project.winiaaid.web.controller.api;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.winiaaid.service.board.BoardService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.board.CreateBoardRequestDto;
import com.project.winiaaid.web.dto.board.ReadBoardResponseDto;

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
	@GetMapping("/list/user/{userCode}")
	public ResponseEntity<?> getBoardListByUserCode(@PathVariable int userCode){
		List<ReadBoardResponseDto> boardList = null;
		try {
			boardList = boardService.getBoardListByUserCode(userCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Post Creation failed", boardList));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Post Creation Successfull", boardList));
	}
	@GetMapping("/{boardCode}")
	public ResponseEntity<?> getBoardByBoardCode(@PathVariable int boardCode){
		ReadBoardResponseDto boardDto = null;
		try {
			boardDto = boardService.getBoardByBoardCode(boardCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Load Board failed", boardDto));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Load Board Successfull", boardDto));
	}
}