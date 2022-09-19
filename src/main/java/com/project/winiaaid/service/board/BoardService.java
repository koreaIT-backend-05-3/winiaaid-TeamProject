package com.project.winiaaid.service.board;

import com.project.winiaaid.web.dto.board.CreateBoardRequestDto;

public interface BoardService {
	public String insertBoard(CreateBoardRequestDto createBoardRequestDto) throws Exception;
	
}
