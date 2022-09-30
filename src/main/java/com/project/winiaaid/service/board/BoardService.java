package com.project.winiaaid.service.board;

import java.util.List;

import com.project.winiaaid.web.dto.board.*;

public interface BoardService {
	public String insertBoard(CreateBoardRequestDto createBoardRequestDto) throws Exception;
	public List<ReadBoardTitleResponseDto> getBoardListByBoardType(ReadBoardRequestDto readBoardRequestDto) throws Exception;
	public ReadBoardResponseDto getBoardByBoardCode(String boardCode) throws Exception;
	public boolean updateBoardByBoardCode(String boardCode, UpdateBoardReqeustDto updateBoardReqeustDto) throws Exception;
	public boolean deleteBoardByBoardCode(int boardCode) throws Exception;
}