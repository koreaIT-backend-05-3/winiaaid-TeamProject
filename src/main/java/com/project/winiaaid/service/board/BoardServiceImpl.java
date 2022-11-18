package com.project.winiaaid.service.board;

import com.project.winiaaid.domain.board.*;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.util.FileService;
import com.project.winiaaid.util.UserService;
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
	private final UserService userService;
	private final ConfigMap configMapper;
	private final FileService fileService;

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

		if(boardEntity.isNon_member_flag()) {
			userService.setBoardTypeNonMemberUserCode(boardEntity);
		}

		boardEntity.setBoard_code(boardCodeEntity.getBoard_code());
		boardEntity.setId2(boardCodeEntity.getId2());

		status = boardRepository.insertBoard(boardEntity);

		if(status != 0 && !fileService.checkUploadFileListIsBlank(createBoardRequestDto.getFiles())) {
			fileList = new ArrayList<>();
			for(MultipartFile file : createBoardRequestDto.getFiles()) {
				
				if(!file.getOriginalFilename().isBlank()) {
					String tempFileName = fileService.createFileByFileAndPath(file, "winiaaid-images/board-files/");
					
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
	public List<ReadBoardTitleResponseDto> getMemberBoardListByBoardType(ReadBoardRequestDto readBoardRequestDto) throws Exception {
		List<BoardTitle> boardEntityList = null;
		List<ReadBoardTitleResponseDto> boardDtoList = null;
		Map<String, Object> configMap = null;

		configMap = configMapper.setMemberReadBoardConfigMap(readBoardRequestDto);

		boardEntityList = boardRepository.findMemberBoardListByBoardTypeAndKeyword(configMap);

		if (boardEntityList.size() != 0 && boardEntityList != null) {
			boardDtoList = toChangeReadBoardTitleResponseDtoList(boardEntityList);

		}
		return boardDtoList;
	}

	@Override
	public List<ReadBoardTitleResponseDto> getNonMemberBoardListByAuthenticationNumber(ReadBoardRequestDto readBoardRequestDto) throws Exception {
		List<BoardTitle>boardEntityList = null;
		List<ReadBoardTitleResponseDto>boardDtoList = null;
		Map<String, Object> configMap = null;

		configMap = configMapper.setNonMemberReadBoardConfigMap(readBoardRequestDto);

		log.info("configMap: {}", configMap);

		boardEntityList = boardRepository.findNonMemeberBoardListByAuthenticationNumberAndKeyword(configMap);

		if(boardEntityList.size() != 0 && boardEntityList != null) {
			boardDtoList = toChangeReadBoardTitleResponseDtoList(boardEntityList);

		}
		return boardDtoList;
	}

	@Override
	public ReadBoardResponseDto getBoardByBoardCode(String viewType, String boardCode, ReadBoardRequestDto readBoardRequestDto) throws Exception {
		Board boardEntity = null;
		ReadBoardResponseDto boardDto = null;
		Map<String, Object> configMap = null;

		configMap = configMapper.setReadBoardDetailHistoryConfigMap(viewType, boardCode, readBoardRequestDto);

		boardEntity = boardRepository.findBoardByBoardCode(configMap);

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
				fileService.deleteFileByFileNameAndPath(fileName, "winiaaid-images/board-files/");

			}
		}

		if(status && !fileService.checkUploadFileListIsBlank(updateBoardReqeustDto.getFiles())) {
			List<BoardFile> fileList = new ArrayList<BoardFile>();
			for(MultipartFile file : updateBoardReqeustDto.getFiles()) {
				if(!file.getOriginalFilename().isBlank()) {
					String tempFileName = fileService.createFileByFileAndPath(file, "winiaaid-images/board-files/");

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
		
		if(fileList.size() != 0) {
			for(BoardFile fileName:fileList) {
				fileService.deleteFileByFileNameAndPath(fileName.getFile_name(), "winiaaid-images/board-files/");

			}
		}
		return boardRepository.deleteBoardByBoardCode(boardCode) > 0;
	}

	private BoardFile buildBoardFileList(String boardCode, String tempFileName) {
		return BoardFile.builder()
				.board_code(boardCode)
				.file_name(tempFileName)
				.build();
	}

	private List<ReadBoardTitleResponseDto> toChangeReadBoardTitleResponseDtoList(List<BoardTitle> boardTitleList) {
		return boardTitleList.stream()
				.map(BoardTitle::toReadBoardTitleResponseDto)
				.collect(Collectors.toList());
	}

}