package com.project.winiaaid.web.dto.auth;




import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.project.winiaaid.domain.user.User;

import lombok.Data;

@Data
public class SignupRequestDto {
	
	private int usercode;
	private String name;
	private String username;
	private String password;
	private String email;
	private int gender;
	private String birth;
	private int postal_code;
	private String mainaddress;
	private String subaddress;
	private String mainphonenumber;
	private String subphnoenumber;
	private int emailflag;
	private int mailflag;
	private int smsflag;
	
	
	@AssertTrue(message = "아이디 중복확인이 되지 않았습니다.")
	private boolean checkUsernameFlag;
	

	public User toEntity() {
		return User.builder()
				.user_code(usercode)
				.user_name(name)
				.user_id(username)
				.user_password(new BCryptPasswordEncoder().encode(password))
				.user_email(email)
				.user_roles("ROLE_USER")
				.user_gender(gender)
				.user_birth(birth)
				.postal_code(postal_code)
				.main_address(mainaddress)
				.sub_address(subaddress)
				.main_phonenumber(mainphonenumber)
				.sub_phonenumber(subphnoenumber)
				.email_recieve_flag(emailflag)
				.mail_recieve_flag(mailflag)
				.sms_recieve_flag(smsflag)
				.build();
	}
}
