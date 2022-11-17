package com.project.winiaaid.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileService {
    public boolean checkUploadFileListIsBlank(List<MultipartFile> fileList) throws Exception;
    public String createFileByFileAndPath(MultipartFile file, String customPath) throws IOException;
    public void createSolutionFileByFileAndPath(List<MultipartFile> file, List<String> tempFileNameList, String customPath) throws IOException;
    public void deleteFileByFileNameAndPath(String fileName, String customPath) throws IOException;
    public void deleteTempFolderByPath(String customPath) throws IOException;

    public String getFilePathByAWS(String customPath, String fileName) throws Exception;
}