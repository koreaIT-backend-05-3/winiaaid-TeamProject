package com.project.winiaaid.service.board;

import java.util.List;

import com.project.winiaaid.web.dto.board.CreateBoardRequestDto;
import com.project.winiaaid.web.dto.board.ReadBoardResponseDto;

public interface BoardService {
	public String insertBoard(CreateBoardRequestDto createBoardRequestDto) throws Exception;
	public List<ReadBoardResponseDto> getBoardListByUserCode(int userCode) throws Exception;
	
}
