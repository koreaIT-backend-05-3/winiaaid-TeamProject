package com.project.winiaaid.domain.user;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String username;
	private String password;
	private String email;
	private String roles;
	

	public List<String> getUserRoles() {
		if(roles == null || roles.isBlank()) {
			return new ArrayList<String>();
		}
		
		return Arrays.asList(roles.replaceAll("", "").split(","));
	}
}