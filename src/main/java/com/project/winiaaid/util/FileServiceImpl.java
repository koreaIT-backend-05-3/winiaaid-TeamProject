package com.project.winiaaid.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
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
        String tempFileName = getTempFileName(file);

        Path path = getPath(customPath, tempFileName);

        makeDirectory(customPath);

        Files.write(path, file.getBytes());

        return tempFileName;
    }

    @Override
    public List<String> createFileByFileAndPath(List<MultipartFile> fileList, String customPath) throws IOException {
        List<String> fileNameList = new ArrayList<>();
        fileList.forEach(file -> {
            String tempFileName = getTempFileName(file);

            try {
                Path path = getPath(customPath, tempFileName);

                makeDirectory(customPath);

                Files.write(path, file.getBytes());

                fileNameList.add(tempFileName);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        return fileNameList;
    }

    @Override
    public void deleteFileByFileNameAndPath(String fileName, String customPath) throws IOException {
        Path path = Paths.get(filePath + customPath + "/" + fileName);

        File f = new File(path.toString());

        if(f.exists()) {
            Files.delete(path);
        }
    }

    @Override
    public void deleteTempFolderByPath(String customPath) throws IOException {
        Path path = Paths.get(filePath + customPath);
        File f = new File(filePath + customPath);

        if(f.exists()) {
            for(File deleteFile : f.listFiles()) {
                deleteFile.delete();
            }

            if(f.listFiles().length == 0 && f.isDirectory()) {
                Files.deleteIfExists(path);
            }
        }
    }

    private String getTempFileName(MultipartFile file) {
        return UUID.randomUUID().toString().replaceAll("-", "") + "_" + file.getOriginalFilename();
    }

    private Path getPath(String customPath, String tempFileName) throws IOException {
        return Paths.get(filePath + customPath + "/" + tempFileName);
    }

    private void makeDirectory(String customPath) throws IOException {
        File f = new File(filePath + customPath);

        if(!f.exists()) {
            f.mkdirs();
        }
    }
}