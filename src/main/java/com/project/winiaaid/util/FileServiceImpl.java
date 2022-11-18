package com.project.winiaaid.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    @Value("${file.path}")
    private String filePath;

    @Override
    public boolean checkUploadFileListIsBlank(List<MultipartFile> fileList) throws Exception {
        for (MultipartFile file : fileList) {
            if (!file.getOriginalFilename().isBlank()) {
                return false;
            }
        }

        return true;
    }

    @Override
    public String createFileByFileAndPath(MultipartFile file, String customPath) throws IOException {
        Path tempPath = null;
        String tempPathName = customPath + getTempFileName(file);

        tempPath = Paths.get(filePath + tempPathName);

        makeDirectory(filePath + customPath);

        Files.write(tempPath, file.getBytes());

        return tempPathName;
    }

    @Override
    public void createSolutionFileByFileAndPath(List<MultipartFile> fileList, List<String> tempFileNameList, String customPath) throws IOException {
        for (int i = 0; i < fileList.size(); i++) {
            try {
                Path path = Paths.get(filePath + customPath, tempFileNameList.get(i));

                makeDirectory(filePath + customPath);

                Files.write(path, fileList.get(i).getBytes());

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void deleteFileByFileNameAndPath(String fileName, String customPath) throws IOException {
        Path path = Paths.get(filePath + customPath + fileName);

        File f = new File(path.toString());

        if (f.exists()) {
            Files.delete(path);
        }
    }

    @Override
    public void deleteTempFolderByPath(String customPath) throws IOException {
        Path path = Paths.get(filePath + customPath);
        File f = new File(path.toString());

        if (f.exists()) {
            for (File deleteFile : f.listFiles()) {
                deleteFile.delete();
            }

            if (f.listFiles().length == 0 && f.isDirectory()) {
                Files.deleteIfExists(path);
            }
        }
    }

    private String getTempFileName(MultipartFile file) {
        return UUID.randomUUID().toString().replaceAll("-", "") + "_" + file.getOriginalFilename();
    }

    private void makeDirectory(String customPath) throws IOException {
        File file = new File(customPath);
        if (!file.exists()) {
            file.mkdirs();
        }
    }
}