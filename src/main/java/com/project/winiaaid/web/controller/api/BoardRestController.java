package com.project.winiaaid.web.controller.api;


import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.service.board.BoardService;
import com.project.winiaaid.util.CustomObjectMapper;
import com.project.winiaaid.web.dto.CustomResponseDto;
import com.project.winiaaid.web.dto.board.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import com.project.winiaaid.web.dto.board.CreateBoardRequestDto;
import com.project.winiaaid.web.dto.board.ReadBoardRequestDto;
import com.project.winiaaid.web.dto.board.ReadBoardResponseDto;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/board")
public class BoardRestController {

	@Value("${file.path}")
	private String filePath;

	private final BoardService boardService;

	@Log
	@PostMapping("/write")
	public ResponseEntity<?> writeBoard(CreateBoardRequestDto createBoardRequestDto){
		String boardCode = null;
		createBoardRequestDto.getFiles().forEach(file -> log.info("file: {}", file.getOriginalFilename()));
		try {
			boardCode = boardService.insertBoard(createBoardRequestDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok(new CustomResponseDto<>(1, "Post Creation failed", boardCode));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Post Creation Successfull", boardCode));
	}

	@Log
	@GetMapping("/{boardType}/list/user/{userCode}")
	public ResponseEntity<?> getBoardListByBoardType(ReadBoardRequestDto readBoardRequestDto){
		List<ReadBoardTitleResponseDto> boardList = null;

		try {
			boardList = boardService.getBoardListByBoardType(userCode, readBoardRequestDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Post Creation failed", boardList));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Post Creation Successfull", boardList));
	}

	@Log
	@GetMapping("/{boardCode}")
	public ResponseEntity<?> getBoardByBoardCode(@PathVariable String boardCode){
		ReadBoardResponseDto boardDto = null;

		try {
			boardDto = boardService.getBoardByBoardCode(boardCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Load Board failed", boardDto));
		}
		
		return ResponseEntity.ok(new CustomResponseDto<>(1, "Load Board Successfull", boardDto));
	}

	@GetMapping("/file/download/{fileName}")
	public ResponseEntity<?> downloadFile(@PathVariable String fileName) throws IOException {
		Path path = Paths.get(filePath + "board-files/" + fileName);
		String contentType = Files.probeContentType(path);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentDisposition(ContentDisposition.builder("attachment")
				.filename(fileName, StandardCharsets.UTF_8)
				.build());

		headers.add(HttpHeaders.CONTENT_TYPE, contentType);

		Resource resource = new InputStreamResource(Files.newInputStream(path));

		return ResponseEntity.ok().headers(headers).body(resource);
	}

	@Log
	@PutMapping("/{boardCode}")
	public ResponseEntity<?> modifyBoardByBoardCode(@PathVariable String boardCode, UpdateBoardReqeustDto updateBoardReqeustDto) {
		boolean status = false;
		try {
			status = boardService.updateBoardByBoardCode(boardCode, updateBoardReqeustDto);

			if(!status) {
				return ResponseEntity.badRequest().body(new CustomResponseDto<>(-1, "Board modification failed", status));
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CustomResponseDto<>(-1, "Board modification failed", status));
		}

		return ResponseEntity.ok(new CustomResponseDto<>(1, "Board modification successful", boardCode));
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