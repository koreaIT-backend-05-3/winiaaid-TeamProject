package com.project.winiaaid.service.auth;


import org.springframework.stereotype.Service;

import com.project.winiaaid.domain.user.UserRepository;
import com.project.winiaaid.web.dto.auth.UsernameCheckRequestDto;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Random;

import lombok.RequiredArgsConstructor;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepository;
	
	
	@Override
	public boolean checkUsername(UsernameCheckRequestDto usernameCheckReqDto) throws Exception {
		
		return userRepository.findUserByUsername(usernameCheckReqDto.getUsername()) == null;
	}

	@Override
	public boolean signup() throws Exception{
		return false;
	}

    @Override
    public String getRandomAuthenticationNumber(String phoneNumber) throws Exception {
        String api_key = "NCSYBCCGHSKJIZQ0";
        String api_secret = "KLB6FXIOFLTVGJKZQ1AMTALHO6BOLGCD";
        Message coolsms = new Message(api_key, api_secret);

        String randomAuthenticationNumber = createRandomAuthenticationNumber();

        HashMap<String, String> params = new HashMap<String, String>();
        params.put("to", phoneNumber);	// 수신전화번호
        params.put("from", "010-4966-3160");	// 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
        params.put("type", "SMS");
        params.put("text", randomAuthenticationNumber);
        params.put("app_version", "test app 1.2"); // application name and version

        try {
            JSONObject obj = (JSONObject) coolsms.send(params);
            log.info(obj.toString());
        } catch (CoolsmsException e) {
            log.info(e.getMessage());
            log.info("error Code: ", e.getCode());
        }

        return randomAuthenticationNumber;
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