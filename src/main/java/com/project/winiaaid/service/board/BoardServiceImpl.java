package com.project.winiaaid.service.board;

import com.project.winiaaid.domain.board.*;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.web.dto.board.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
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

		if(status != 0 && !checkUploadFileIsBlank(createBoardRequestDto.getFiles())) {
			fileList = new ArrayList<>();
			for(MultipartFile file : createBoardRequestDto.getFiles()) {
				
				if(!file.getOriginalFilename().isBlank()) {
					String tempFileName = createFileByFileAndPath(file, "board-files");
					
					fileList.add(
							buildBoardFileList(boardEntity.getBoard_code(), tempFileName)
					);
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

		configMap = configMapper.setReadBoardConfigMap(userCode, readBoardRequestDto);

		log.info("configMap: {}", configMap);
		log.info("keyword: {}", configMap.get("keyword"));

		boardEntityList = boardRepository.findBoardListByBoardTypeAndKeyword(configMap);
		
		if(boardEntityList.size() != 0 && boardEntityList != null) {
			boardDtoList = boardEntityList.stream()
					.map(BoardTitle::toReadBoardTitleResponseDto)
					.collect(Collectors.toList());
			
		}
		return boardDtoList;
	}

	@Override
	public ReadBoardResponseDto getBoardByBoardCode(String boardCode) throws Exception {
		Board boardEntity = null;
		ReadBoardResponseDto boardDto = null;

		boardEntity = boardRepository.findBoardByBoardCode(boardCode);

		if(boardEntity != null) {
			boardDto = boardEntity.toBoardResponseDto();
		}
		return boardDto;
	}

	@Override
	public boolean updateBoardByBoardCode(String boardCode, UpdateBoardReqeustDto updateBoardReqeustDto) throws Exception {
		boolean status = false;
		Board boardEntity = updateBoardReqeustDto.toBoardEntity();
		boardEntity.setBoard_code(boardCode);

		status = boardRepository.updateBoardByBoardCode(boardEntity) > 0;

		if(status && updateBoardReqeustDto.getDeleteFileCode().size() != 0) {
			boardRepository.deleteBoardFileByFileCode(updateBoardReqeustDto.getDeleteFileCode());

			for(String fileName : updateBoardReqeustDto.getDeleteTempFileName()) {
				deleteFileByFileNameAndPath(fileName, "board-files");

			}
		}

		if(status && !checkUploadFileIsBlank(updateBoardReqeustDto.getFiles())) {
			List<BoardFile> fileList = new ArrayList<BoardFile>();
			for(MultipartFile file : updateBoardReqeustDto.getFiles()) {
				if(!file.getOriginalFilename().isBlank()) {
					String tempFileName = createFileByFileAndPath(file, "board-files");

					fileList.add(
							buildBoardFileList(boardEntity.getBoard_code(), tempFileName)
					);
				}
			}
			boardRepository.insertBoardFile(fileList);
		}

		return status;
	}

	@Override
	public boolean deleteBoardByBoardCode(int boardCode) throws Exception {
		List<BoardFile>fileList = null;
		
		fileList = boardRepository.findBoardFileListByBoardCode(boardCode);
		System.out.println(fileList);
		
		if(fileList.size() != 0) {
			for(BoardFile fileName:fileList) {
				deleteFileByFileNameAndPath(fileName.getFile_name(), "board-files");

			}
		}
		return boardRepository.deleteBoardByBoardCode(boardCode) > 0;
	}

	private boolean checkUploadFileIsBlank(List<MultipartFile> fileList) {
		for(MultipartFile file : fileList) {
			if(!file.getOriginalFilename().isBlank()) {
				return false;
			}
		}
		return true;
	}

	private String createFileByFileAndPath(MultipartFile file, String customPath) throws IOException {
		String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + "_" + file.getOriginalFilename();

		Path path = Paths.get(filePath + customPath + "/" + tempFileName);

		File f = new File(filePath + customPath);

		if(!f.exists()) {
			f.mkdirs();
		}

		Files.write(path, file.getBytes());

		return tempFileName;
	}

	private BoardFile buildBoardFileList(String boardCode, String tempFileName) {
		return BoardFile.builder()
				.board_code(boardCode)
				.file_name(tempFileName)
				.build();
	}

	private void deleteFileByFileNameAndPath(String fileName, String customPath) throws IOException {
		Path path = Paths.get(filePath + customPath + "/" + fileName);

		File f = new File(filePath + customPath);

		if(f.exists()) {
			Files.delete(path);
		}
	}
}