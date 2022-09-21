package com.project.winiaaid.service.board;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.winiaaid.domain.board.Board;
import com.project.winiaaid.domain.board.BoardFile;
import com.project.winiaaid.domain.board.BoardRepository;
import com.project.winiaaid.web.dto.board.CreateBoardRequestDto;
import com.project.winiaaid.web.dto.board.ReadBoardResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class BoardServiceImpl implements BoardService {
	private final BoardRepository boardRepository;
	@Value("${file.path}")
	private String filePath;
	
	@Override
	public String insertBoard(CreateBoardRequestDto createBoardRequestDto) throws Exception {
		int status = 0;
		Board board = createBoardRequestDto.toBoardEntity();
		List<BoardFile> fileList = null;
		status = boardRepository.insertBoard(board);
		if(status != 0 && createBoardRequestDto.getFiles() != null) {
			fileList = new ArrayList<>();
			for(MultipartFile file : createBoardRequestDto.getFiles()) {
				
				if(!file.getOriginalFilename().isBlank()) {
					String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + "_" + file.getOriginalFilename();

					Path path = Paths.get(filePath, "file-images/" + tempFileName);
					
//					mkdirs는 파일을 생성해주는 기능
					File f = new File(filePath + "file-images");
					
					if (!f.exists()) {
						f.mkdirs();
					}
					
					Files.write(path, file.getBytes());
					
					fileList.add(BoardFile.builder()
							.board_code(board.getBoard_code())
							.file_name(tempFileName)
							.build());
				}
				
			}
			boardRepository.insertBoardFile(fileList);
		}
		return board.getBoard_code();
		
	}

	@Override
	public List<ReadBoardResponseDto> getBoardListByUserCode(int userCode) throws Exception {
		List<Board>boardEntityList=null;
		List<ReadBoardResponseDto>boardDtoList=null;
		Map<String, Object> configMap = new HashMap<String, Object>();
		
		configMap.put("user_code", userCode);
		boardEntityList=boardRepository.findBoardListByUserCode(configMap);
		
		if(boardEntityList.size()!=0 && boardEntityList != null) {
			boardDtoList = boardEntityList.stream()
					.map(Board::toBoardResponseDto)
					.collect(Collectors.toList());
			
		}
		return boardDtoList;
	}
}
