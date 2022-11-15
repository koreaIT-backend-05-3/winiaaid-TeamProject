package com.project.winiaaid.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
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

    private final ResourceLoader resourceLoader;

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

        Resource resource = resourceLoader.getResource("classpath:static/" + customPath);

        log.info(">>>>>>>>>>>>. check: {}", resource);

        Path targetPath = getPath(customPath, tempFileName);
        Path srcPath = Paths.get(getChangeTargetPathToSrcPath(targetPath));

        makeDirectory(customPath);

        log.info(">>>>>>><MLKJsdfdsafdsaf {}", srcPath);
        Files.write(targetPath, file.getBytes());
        Files.write(srcPath, file.getBytes());

        return tempFileName;
    }

    @Override
    public void createSolutionFileByFileAndPath(List<MultipartFile> fileList, List<String> tempFileNameList, String customPath) throws IOException {
        for(int i = 0; i < fileList.size(); i++) {
            try {
                Path targetPath = getPath(customPath, tempFileNameList.get(i));
                Path srcPath = Paths.get(getChangeTargetPathToSrcPath(targetPath));

                makeDirectory(customPath);

                Files.write(targetPath, fileList.get(i).getBytes());
                Files.write(srcPath, fileList.get(i).getBytes());


            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void deleteFileByFileNameAndPath(String fileName, String customPath) throws IOException {
        String path = getClassPathUri();
        Path targetPath = Paths.get(path.substring(path.indexOf("/") + 1) + customPath + "/" + fileName);
        Path srcPath = Paths.get(getChangeTargetPathToSrcPath(targetPath));

        File f = new File(targetPath.toString());

        if(f.exists()) {
            Files.delete(targetPath);
        }

        f = new File(srcPath.toString());

        if(f.exists()) {
            Files.delete(srcPath);
        }
    }

    @Override
    public void deleteTempFolderByPath(String customPath) throws IOException {
        String tempPath = getClassPathUri();
        Path path = Paths.get(tempPath.substring(tempPath.indexOf("/") + 1) + customPath);
        File f = new File(path.toString());

        if(f.exists()) {
            for(File deleteFile : f.listFiles()) {
                deleteFile.delete();
            }

            if(f.listFiles().length == 0 && f.isDirectory()) {
                Files.deleteIfExists(path);
            }
        }

        path = Paths.get(getChangeTargetPathToSrcPath(path));
        f = new File(path.toString());

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
        String targetUri = getClassPathUri();
        String filePath = resourceLoader.getResource(targetUri + customPath + "/" + tempFileName).getURI().toString();
        return Paths.get(filePath.substring(filePath.indexOf("/") + 1));
    }

    private void makeDirectory(String customPath) throws IOException {
        Resource targetResource = resourceLoader.getResource(getClassPathUri() + "/" + customPath);

        if(!targetResource.exists()) {
            String tempPath = targetResource.getURI().toString().substring(targetResource.getURI().toString().indexOf("/") + 1);

            log.info(">>>>>>>>> {}", tempPath);
            File f = new File(tempPath);
            f.mkdirs();
        }

        Resource srcResource = resourceLoader.getResource(getChangeTargetResourceToSrcResource(targetResource));

        log.info(">>>>>>>tsdfasddsadsdsaf>> {}", srcResource);

        if(!srcResource.exists()) {
            String tempPath = srcResource.getURI().toString().substring(srcResource.getURI().toString().indexOf("/") + 1);

            log.info(">>>>>>>tsdfasddsadsdsaf>> {}", tempPath);
            File f = new File(tempPath);
            f.mkdirs();
        }
    }

    private String getClassPathUri() throws IOException {
        return resourceLoader.getResource("classpath:static").getURI().toString() + "/winiaaid-images/";
    }

    private String getChangeTargetPathToSrcPath(Path targetPath) throws IOException {
        String tempPath = targetPath.toString().replaceAll("\\\\", "/");
        return tempPath.replaceAll("target/classes/static", "src/main/resources/static");
    }

    private String getChangeTargetResourceToSrcResource(Resource resource) throws IOException {
        String tempPath = resource.getURI().toString().replaceAll("\\\\", "/");
        return tempPath.replaceAll("target/classes/static", "src/main/resources/static");
    }
}