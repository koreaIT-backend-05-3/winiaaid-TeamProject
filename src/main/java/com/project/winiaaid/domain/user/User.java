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
	private int user_code;
	private String user_name;
	private String user_id;
	private String user_password;
	private String user_email;
	private String user_roles;
	private int user_gender;
	private String user_birth;
	private int birth_type;
	private String user_address;
	private String postal_code;
	private String main_address;
	private String detail_address;
	private String main_phone_number;
	private String sub_phone_number;
	private int mail_recieve_flag;
	private int email_recieve_flag;
	private int sms_recieve_flag;
	private String staff_company;
	private String employee_number;
	private LocalDateTime create_date;
	
	

	public List<String> getUserRoles() {
		if(user_roles == null || user_roles.isBlank()) {
			return new ArrayList<String>();
		}
		
		return Arrays.asList(user_roles.replaceAll("", "").split(","));
	}
}