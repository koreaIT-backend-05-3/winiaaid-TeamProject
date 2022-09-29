package com.project.winiaaid.web.dto.board;

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
}