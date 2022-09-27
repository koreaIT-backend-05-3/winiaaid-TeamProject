package com.project.winiaaid.service.board;

import java.util.List;

import com.project.winiaaid.web.dto.board.CreateBoardRequestDto;
import com.project.winiaaid.web.dto.board.ReadBoardRequestDto;
import com.project.winiaaid.web.dto.board.ReadBoardResponseDto;

public interface BoardService {
	public String insertBoard(CreateBoardRequestDto createBoardRequestDto) throws Exception;
	public List<ReadBoardResponseDto> getBoardListByBoardType(ReadBoardRequestDto readBoardRequestDto) throws Exception;
	public ReadBoardResponseDto getBoardByBoardCode(int boardCode) throws Exception;
	public boolean deleteBoardByBoardCode(int boardCode) throws Exception;
	
}
