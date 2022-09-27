package com.project.winiaaid.web.controller.api;


import java.util.List;
import java.util.Map;

import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.util.CustomObjectMapper;
import com.project.winiaaid.web.dto.board.ReadBoardRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
	private final CustomObjectMapper customObjectMapper;


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
	@GetMapping("/list")
	public ResponseEntity<?> getBoardListByBoardType(@RequestParam Map<String, Object> parametersMap){
		List<ReadBoardResponseDto> boardList = null;
		ReadBoardRequestDto readBoardRequestDto = null;

		readBoardRequestDto = customObjectMapper.createReadBoardRequestDtoByObjectMapper(parametersMap);

		try {
			boardList = boardService.getBoardListByBoardType(readBoardRequestDto);
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
	@DeleteMapping("/{boardCode}")
	public ResponseEntity<?> deleteBoardByBoardCode(@PathVariable int boardCode){
		boolean status = false;
		
		try {
			status = boardService.deleteBoardByBoardCode(boardCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Load Board failed", status));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Load Board Successfull", status));
	}
	
	
}