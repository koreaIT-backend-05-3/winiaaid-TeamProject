package com.project.winiaaid.domain.board;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardRepository {
	public int insertBoard(Board board) throws Exception;
	public int insertBoardFile(List<BoardFile> file_list) throws Exception;
	public List<Board> findBoardListByUserCode(Map<String, Object> config_map) throws Exception;
	public Board findBoardByBoardCode(int board_code) throws Exception;
}
