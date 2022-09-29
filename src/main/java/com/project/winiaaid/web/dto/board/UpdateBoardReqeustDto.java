package com.project.winiaaid.web.dto.board;

import com.project.winiaaid.domain.board.Board;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class UpdateBoardReqeustDto {
    private int userCode;
    private int boardTypeCode;
    private String userName;
    private String email;
    private String mainPhoneNumber;
    private int companyCode;
    private int responseFlag;
    private String boardTitle;
    private String boardContent;

    private List<MultipartFile> files;
    private List<Integer> deleteFileCode;
    private List<String> deleteTempFileName;

    public Board toBoardEntity() {
        return Board.builder()
                .board_type_code(boardTypeCode)
                .user_name(userName)
                .user_email(email)
                .main_phone_number(mainPhoneNumber)
                .company_code(companyCode)
                .response_flag(responseFlag)
                .board_title(boardTitle)
                .board_content(boardContent)
                .build();
    }
}