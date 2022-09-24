package com.project.winiaaid.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {
	public int insertUser(User user) throws Exception ;
	public User findUserByUsername(String username) throws Exception;
	public User findUserByEmail(String email) throws Exception;

}