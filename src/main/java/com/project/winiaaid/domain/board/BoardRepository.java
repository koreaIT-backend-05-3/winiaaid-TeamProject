package com.project.winiaaid.domain.board;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardRepository {
	public int insertBoard(Board board) throws Exception;
	public int insertBoardFile(List<BoardFile> file_list) throws Exception;
	public BoardCode findBoardCode(Board board) throws Exception;
	public List<BoardTitle> findBoardListByBoardType(Map<String, Object> config_map) throws Exception;
	public Board findBoardByBoardCode(int board_code) throws Exception;
	public List<BoardFile> findBoardFileListByBoardCode(int board_code) throws Exception;
	public int updateBoardByBoardCode(Board board) throws Exception;
	public int deleteBoardByBoardCode(int board_code) throws Exception;
	public int deleteBoardFileByFileCode(List<Integer> delete_file_code_list) throws Exception;
}
