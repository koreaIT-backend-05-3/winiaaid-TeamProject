package com.project.winiaaid.util;

import com.project.winiaaid.domain.board.Board;
import com.project.winiaaid.domain.recall.RecallUserInfoEntity;
import com.project.winiaaid.domain.repair.RepairUserInfoEntity;
import com.project.winiaaid.domain.requestInfo.UserInfoEntity;
import com.project.winiaaid.domain.service.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

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


    private int getNonMemberUserCode(String type) throws Exception {
        return serviceRepository.findNonMemberUserCode(type);
    }
}