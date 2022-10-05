package com.project.winiaaid.util;

import com.project.winiaaid.domain.board.Board;
import com.project.winiaaid.domain.recall.RecallUserInfoEntity;
import com.project.winiaaid.domain.repair.RepairUserInfoEntity;
import com.project.winiaaid.domain.requestInfo.UserInfoEntity;
import com.project.winiaaid.domain.service.ServiceRepository;
import com.project.winiaaid.handler.aop.annotation.Log;
import com.project.winiaaid.web.dto.recall.RecallUserInfoDto;
import com.project.winiaaid.web.dto.repair.RepairUserInfoDto;
import com.project.winiaaid.web.dto.requestInfo.UserInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ServiceRepository serviceRepository;

    @Override
    public void setServiceTypeNonMemberUserCode(UserInfoEntity userInfo) throws Exception {
        int nonMemberUserCode = getNonMemberUserCode("service");

        if(userInfo.getClass().equals(RecallUserInfoEntity.class)) {
            ((RecallUserInfoEntity) userInfo).setUser_code(nonMemberUserCode);
        }else {
            ((RepairUserInfoEntity) userInfo).setUser_code(nonMemberUserCode);
        }
    }

    @Override
    public void setBoardTypeNonMemberUserCode(Board board) throws Exception {
        int nonMemberUserCode = getNonMemberUserCode("board");

        board.setUser_code(nonMemberUserCode);
    }

    @Override
    public boolean isNonMemberRequest(int userCode) {
        log.info("userCode: {}", userCode);
        try {
            return userCode == 0;
        }catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    @Log
    @Override
    public void sendServiceCode(String serviceCode, String mainPhoneNumber) {
        String api_key = "NCSYBCCGHSKJIZQ0";
        String api_secret = "KLB6FXIOFLTVGJKZQ1AMTALHO6BOLGCD";
        Message coolsms = new Message(api_key, api_secret);


        HashMap<String, String> params = new HashMap<String, String>();
        params.put("to", mainPhoneNumber);	// 수신전화번호
        params.put("from", "010-4966-3160");	// 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
        params.put("type", "SMS");
        params.put("text", "접수번호: " + serviceCode);
        params.put("app_version", "test app 1.2"); // application name and version

        log.info("check: {}", params);
        try {
            JSONObject obj = (JSONObject) coolsms.send(params);
            log.info(obj.toString());
        } catch (CoolsmsException e) {
            log.info(e.getMessage());
            log.info("error Code: ", e.getCode());
        }
    }

    private int getNonMemberUserCode(String type) throws Exception {
        return serviceRepository.findNonMemberUserCode(type);
    }

}