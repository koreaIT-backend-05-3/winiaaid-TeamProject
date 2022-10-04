package com.project.winiaaid.util;

import com.project.winiaaid.domain.board.Board;
import com.project.winiaaid.domain.requestInfo.UserInfoEntity;

public interface UserService {
    public void setServiceTypeNonMemberUserCode(UserInfoEntity userInfo) throws Exception;
    public void setBoardTypeNonMemberUserCode(Board board) throws Exception;
    public boolean isNonMemberRequest(int userCode);
    public void sendServiceCode(String serviceCode, String mainPhoneNumber);
}