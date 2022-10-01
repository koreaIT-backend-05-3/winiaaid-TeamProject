package com.project.winiaaid.domain.user;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	
	private int user_code; //회원 pk
	private String user_name; //회원이름
	private String user_id; //회원 아이디
	private String user_password; //패스워드
	private String user_email; //이메일
	private String user_roles;
	private int user_gender;
	private String user_birth;
	private String user_address;
	private int postal_code;
	private String main_address;
	private String sub_address;
	private String main_phonenumber;
	private String sub_phonenumber;
	private int mail_recieve_flag;
	private int email_recieve_flag;
	private int sms_recieve_flag;
	private LocalDateTime create_date;
	
	

	public List<String> getUserRoles() {
		if(user_roles == null || user_roles.isBlank()) {
			return new ArrayList<String>();
		}
		
		return Arrays.asList(user_roles.replaceAll("", "").split(","));
	}
}