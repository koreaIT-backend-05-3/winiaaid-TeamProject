package com.project.winiaaid.domain.board;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardRepository {
	public int insertBoard(Board board) throws Exception;
	public int insertBoardFile(List<BoardFile> file_list) throws Exception;
}
