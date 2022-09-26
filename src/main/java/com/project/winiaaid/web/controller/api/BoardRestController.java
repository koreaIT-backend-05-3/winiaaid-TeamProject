package com.project.winiaaid.web.controller.api;


import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.service.board.BoardService;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.board.CreateBoardRequestDto;
import com.project.winiaaid.web.dto.board.ReadBoardRequestDto;
import com.project.winiaaid.web.dto.board.ReadBoardResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/board")
public class BoardRestController {

	private final BoardService boardService;

	@PostMapping("/write")
	public ResponseEntity<?> writeBoard(CreateBoardRequestDto createBoardRequestDto){
		try {
			boardService.insertBoard(createBoardRequestDto);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Post Creation Successfull", null));
	}

	@Log
	@GetMapping("/list/user/{userCode}")
	public ResponseEntity<?> getBoardListByBoardType(@PathVariable int userCode, ReadBoardRequestDto readBoardRequestDto){
		List<ReadBoardResponseDto> boardList = null;

		try {
			boardList = boardService.getBoardListByBoardType(userCode, readBoardRequestDto);
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