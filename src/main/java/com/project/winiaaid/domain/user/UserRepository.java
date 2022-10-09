package com.project.winiaaid.domain.user;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface UserRepository {
	public int insertUserMst(User user) throws Exception;
	public int insertUserDtl(User user) throws Exception;
	public User findUserByUserId(String username) throws Exception;
	public User findUserInfoByMainPhoneNumberOrUserId(Map<String, Object> config_map) throws Exception;
	public int updateUserPasswordByUserId(UpdateUserPasswordEntity updateUserPasswordEntity) throws Exception;
	
}