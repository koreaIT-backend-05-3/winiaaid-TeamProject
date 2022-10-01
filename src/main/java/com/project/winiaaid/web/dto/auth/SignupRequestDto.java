package com.project.winiaaid.web.dto.auth;

import com.project.winiaaid.domain.user.User;
import lombok.Data;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class SignupRequestDto {

	@NotBlank
	private String userName;

	@NotBlank
	@Pattern(regexp = "^[\\w\\d]{4,10}$", message = "한글만 입력 가능합니다.")
	private String userId;

	@NotBlank
	@Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^+=])[A-Za-z0-9!@#$%^+=]{8,10}$", message = "※영문+숫자+특수문자의 8~10자 이내 ※ 패스워드에 사용 가능한 특수문자 : ! @ # $ % ^ + =")
	private String userPassword;

	@NotBlank
	@Pattern(regexp = "^[A-Za-z0-9]+@[A-Za-z0-9]+.com$", message = "이메일 형식을 지켜주세요.")
	private String userEmail;

	private int userGender;

	@NotBlank
	private String userBirth;

	private int birthType;

	@NotBlank
	private String postalCode;

	@NotBlank
	private String mainAddress;

	@NotBlank
	private String detailAddress;

	@NotBlank
	private String mainPhoneNumber;

	private String subPhoneNumber;
	private boolean emailReceiveFlag;
	private boolean mailReceiveFlag;
	private boolean smsReceiveFlag;

	private String staffCompany;
	private String employeeNumber;

	@AssertTrue(message = "아이디 중복확인이 되지 않았습니다.")
	private boolean checkUserIdFlag;
	

	public User toEntity() {
		return User.builder()
				.user_name(userName)
				.user_id(userId)
				.user_password(new BCryptPasswordEncoder().encode(userPassword))
				.user_email(userEmail)
				.user_roles("ROLE_USER")
				.user_gender(userGender)
				.user_birth(userBirth)
				.birth_type(birthType)
				.postal_code(postalCode)
				.main_address(mainAddress)
				.detail_address(detailAddress)
				.main_phone_number(mainPhoneNumber)
				.sub_phone_number(subPhoneNumber)
				.email_recieve_flag(emailReceiveFlag ? 1 : 0)
				.sms_recieve_flag(smsReceiveFlag ? 1 : 0)
				.mail_recieve_flag(mailReceiveFlag ? 1 : 0)
				.staff_company(staffCompany)
				.employee_number(employeeNumber)
				.build();
	}
}
