package com.project.winiaaid.service.auth;

import com.project.winiaaid.domain.user.User;
import com.project.winiaaid.domain.user.UserRepository;
import com.project.winiaaid.util.ConfigMap;
import com.project.winiaaid.web.dto.auth.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepository;
    private final ConfigMap configMapper;

    @Value("${coolsms.apiKey}")
    private String apiKey;

    @Value("${coolsms.apiSecret}")
    private String apiSecret;

	@Override
	public boolean signup(SignupRequestDto signupRequestDto) throws Exception {
        int status = 0;
        User userentity = signupRequestDto.toUserEntity();
        status = userRepository.insertUserMst(userentity);

        if(status != 0) {
            status += userRepository.insertUserDtl(userentity);
        }
		return status == 2;
	}

    @Override
    public boolean checkUserId(UsernameCheckRequestDto usernameCheckReqDto) throws Exception {
        return userRepository.findUserByUserId(usernameCheckReqDto.getUserId()) == null;
    }

    @Override
    public String getRandomAuthenticationNumber(String phoneNumber) throws Exception {
        Message coolsms = new Message(apiKey, apiSecret);

        String randomAuthenticationNumber = createRandomAuthenticationNumber();

        HashMap<String, String> params = new HashMap<String, String>();
        params.put("to", phoneNumber);	// 수신전화번호
        params.put("from", "010-4966-3160");	// 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
        params.put("type", "SMS");
        params.put("text", "인증번호는 [" + randomAuthenticationNumber + "] 입니다.");
        params.put("app_version", "test app 1.2"); // application name and version

//        try {
//            JSONObject obj = (JSONObject) coolsms.send(params);
//            log.info(obj.toString());
//        } catch (CoolsmsException e) {
//            log.info(e.getMessage());
//            log.info("error Code: ", e.getCode());
//        }

        return randomAuthenticationNumber;
    }


    @Override
    public AuthenticationUserResponseDto getUserInfoByRequestType(String requestType, AuthenticationUserRequestDto authenticationUserRequestDto) throws Exception {
        User userEntity = null;
        AuthenticationUserResponseDto authenticationUserResponseDto = null;
        Map<String, Object> configMap = null;

        configMap = configMapper.setReadUserInfoConfigMap(requestType, authenticationUserRequestDto);

        userEntity = userRepository.findUserInfoByMainPhoneNumberOrUserId(configMap);

        if(userEntity != null) {
            authenticationUserResponseDto = userEntity.toAuthenticationUserResponseDto();
        }

        return authenticationUserResponseDto;
    }

    @Override
    public boolean updateTempUserPasswordByUserId(UpdateUserPasswordRequestDto updateUserPasswordRequestDto) throws Exception {
        return userRepository.updateUserPasswordByUserId(updateUserPasswordRequestDto.toUpdateUserPasswordEntity()) > 0;
    }

    @Override
    public boolean updateUserInfoByUserCode(UpdateUserInfoRequestDto updateUserInfoRequestDto) throws Exception {
        return userRepository.updateUserInfoByUserCode(updateUserInfoRequestDto.toUserEntity()) > 0;
    }

    @Override
    public boolean deleteUserByUserCode(int userCode) throws Exception {
        return userRepository.deleteUserByUserCode(userCode) > 0;
    }

    private String createRandomAuthenticationNumber() {
        Random random = new Random();
        String randomNumber = "";
        for(int i = 0; i < 6; i++) {
            randomNumber += Integer.toString(random.nextInt(10));

        }
        log.info(randomNumber);
        return randomNumber;
    }
}