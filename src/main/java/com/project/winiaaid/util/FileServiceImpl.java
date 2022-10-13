package com.project.winiaaid.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    @Value("${file.path}")
    private String filePath;

    @Override
    public boolean checkUploadFileListIsBlank(List<MultipartFile> fileList) throws Exception {
        for(MultipartFile file : fileList) {
            if(!file.getOriginalFilename().isBlank()) {
                return false;
            }
        }

        return true;
    }

    @Override
    public String createFileByFileAndPath(MultipartFile file, String customPath) throws IOException {
        String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + "_" + file.getOriginalFilename();

        Path path = Paths.get(filePath + customPath + "/" + tempFileName);


        File f = new File(filePath + customPath);

        if(!f.exists()) {
            f.mkdirs();
        }

        Files.write(path, file.getBytes());

        return tempFileName;
    }

    @Override
    public void deleteFileByFileNameAndPath(String fileName, String customPath) throws IOException {
        Path path = Paths.get(filePath + customPath + "/" + fileName);

        File f = new File(filePath + customPath);

        if(f.exists()) {
            Files.delete(path);
        }
    }
}