package com.project.winiaaid.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {
	public int insertUserMst(User user) throws Exception;
	public int insertUserDtl(User user) throws Exception;
	public User findUserByUsername(String username) throws Exception;
	
}