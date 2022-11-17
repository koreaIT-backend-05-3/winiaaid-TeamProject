package com.project.winiaaid.util;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import com.project.winiaaid.config.S3Config;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final S3Config s3Config;
    private final ResourceLoader resourceLoader;
    private final AmazonS3Client amazonS3Client;
    private String preFix = "winiaaid-images/";

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
        String tempFileName = null;
        ObjectMetadata objectMetadata = null;
        InputStream inputStream = null;

        tempFileName = preFix + customPath + getTempFileName(file);
        log.info("tempFileName: {}", tempFileName);

        objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());

        inputStream = file.getInputStream();

        return URLDecoder.decode(putS3File(inputStream, objectMetadata, tempFileName), "UTF-8");
    }

    @Override
    public void createSolutionFileByFileAndPath(List<MultipartFile> fileList, List<String> tempFileNameList, String customPath) throws IOException {
        ObjectMetadata objectMetadata = null;
        InputStream inputStream = null;

        for(int i = 0; i < fileList.size(); i++) {
            try {
                objectMetadata = new ObjectMetadata();
                objectMetadata.setContentLength(fileList.get(i).getSize());
                objectMetadata.setContentType(fileList.get(i).getContentType());

                inputStream = fileList.get(i).getInputStream();

                putS3File(inputStream, objectMetadata, preFix + customPath + tempFileNameList.get(i));

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void deleteFileByFileNameAndPath(String fileName, String customPath) throws IOException {
        deleteS3File(preFix + customPath + fileName);

    }

    @Override
    public void deleteTempFolderByPath(String customPath) throws IOException {
        List<String> fileNameList = new ArrayList<>();
        ListObjectsRequest listObjectsRequest = new ListObjectsRequest();
        listObjectsRequest.setBucketName(s3Config.getBucket());
        listObjectsRequest.setPrefix(preFix + customPath);

        ObjectListing s3Object;
        do {
            s3Object = amazonS3Client.listObjects(listObjectsRequest);
//            log.info("s3Object: {}", s3Object);
//            log.info("s3Object.getObjectSummaries: {}", s3Object.getObjectSummaries());
//            log.info("s3Object.getObjectSummaries.get(0): {}", s3Object.getObjectSummaries().get(0));

            for(S3ObjectSummary s3ObjectSummary : s3Object.getObjectSummaries()) {
                fileNameList.add(s3ObjectSummary.getKey());
            }
        } while (s3Object.isTruncated());

        log.info("fileNameList: {}", fileNameList);


        deleteS3File(fileNameList);
        deleteS3File(preFix + customPath);
    }

    @Override
    public String getFilePathByAWS(String customPath, String fileName) throws Exception {
        return amazonS3Client.getUrl(s3Config.getBucket(), preFix + fileName).toString();
    }

    private String getTempFileName(MultipartFile file) {
        return UUID.randomUUID().toString().replaceAll("-", "") + "_" + file.getOriginalFilename();
    }

    private String putS3File(InputStream inputStream, ObjectMetadata objectMetadata, String tempFileName) {
        amazonS3Client.putObject(new PutObjectRequest(s3Config.getBucket(), tempFileName, inputStream, objectMetadata));
//                .withCannedAcl(CannedAccessControlList.PublicReadWrite));

        return amazonS3Client.getUrl(s3Config.getBucket(), tempFileName).toString();
    }

    private void deleteS3File(String fileName) {
        log.info("deleteS3File: {}", fileName);
        amazonS3Client.deleteObject(new DeleteObjectRequest(s3Config.getBucket(), fileName));
    }

    private void deleteS3File(List<String> fileNameList) {
        log.info("deleteS3File: {}", fileNameList);
        fileNameList.forEach(fileName -> amazonS3Client.deleteObject(new DeleteObjectRequest(s3Config.getBucket(), fileName)));
    }
}