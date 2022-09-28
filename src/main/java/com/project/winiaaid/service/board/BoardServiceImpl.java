package com.project.winiaaid.service.board;

import com.project.winiaaid.domain.board.*;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.web.dto.board.CreateBoardRequestDto;
import com.project.winiaaid.web.dto.board.ReadBoardRequestDto;
import com.project.winiaaid.web.dto.board.ReadBoardResponseDto;
import com.project.winiaaid.web.dto.board.ReadBoardTitleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
	private final BoardRepository boardRepository;
	private final ConfigMap configMapper;

	@Value("${file.path}")
	private String filePath;
	
	@Override
	public String insertBoard(CreateBoardRequestDto createBoardRequestDto) throws Exception {
		Board boardEntity = null;
		BoardCode boardCodeEntity = null;
		List<BoardFile> fileList = null;
		int status = 0;

		boardEntity = createBoardRequestDto.toBoardEntity();

		boardCodeEntity = boardRepository.findBoardCode(boardEntity);

		boardEntity.setBoard_code(boardCodeEntity.getBoard_code());
		boardEntity.setId2(boardCodeEntity.getId2());

		status = boardRepository.insertBoard(boardEntity);

		if(status != 0 && !createBoardRequestDto.getFiles().get(0).getOriginalFilename().isBlank()) {
			fileList = new ArrayList<>();
			for(MultipartFile file : createBoardRequestDto.getFiles()) {
				
				if(!file.getOriginalFilename().isBlank()) {
					String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + "_" + file.getOriginalFilename();

					Path path = Paths.get(filePath, "board-files/" + tempFileName);
					
//					mkdirs는 파일을 생성해주는 기능
					File f = new File(filePath + "board-files");
					
					if (!f.exists()) {
						f.mkdirs();
					}
					
					Files.write(path, file.getBytes());
					
					fileList.add(BoardFile.builder()
							.board_code(boardEntity.getBoard_code())
							.file_name(tempFileName)
							.build());
				}
				
			}
			boardRepository.insertBoardFile(fileList);
		}
		return boardEntity.getBoard_code();
		
	}

	@Override
	public List<ReadBoardTitleResponseDto> getBoardListByBoardType(ReadBoardRequestDto readBoardRequestDto) throws Exception {
		List<BoardTitle>boardEntityList = null;
		List<ReadBoardTitleResponseDto>boardDtoList = null;
		Map<String, Object> configMap = null;

		configMap = configMapper.setConfigMap(readBoardRequestDto);

		boardEntityList = boardRepository.findBoardListByBoardType(configMap);
		
		if(boardEntityList.size() != 0 && boardEntityList != null) {
			boardDtoList = boardEntityList.stream()
					.map(BoardTitle::toReadBoardTitleResponseDto)
					.collect(Collectors.toList());
			
		}
		return boardDtoList;
	}

	@Override
	public ReadBoardResponseDto getBoardByBoardCode(int boardCode) throws Exception {
		Board boardEntity = null;
		ReadBoardResponseDto boardDto = null;
		
		boardEntity = boardRepository.findBoardByBoardCode(boardCode);
		
		if(boardEntity != null) {
			boardDto = boardEntity.toBoardResponseDto();
		}
		return boardDto;
	}

	@Override
	public boolean deleteBoardByBoardCode(int boardCode) throws Exception {
		List<BoardFile>fileList = null;
		
		fileList = boardRepository.findBoardFileListByBoardCode(boardCode);
		System.out.println(fileList);
		
		if(fileList.size() != 0) {
			for(BoardFile fileName:fileList) {
				Path path = Paths.get(filePath, "board-files/" + fileName.getFile_name());
				
				File f = new File(path.toString());

				if(f.exists()) {
					Files.delete(path);
				}
				
			}
		}
		return boardRepository.deleteBoardByBoardCode(boardCode) > 0;
	}
}
