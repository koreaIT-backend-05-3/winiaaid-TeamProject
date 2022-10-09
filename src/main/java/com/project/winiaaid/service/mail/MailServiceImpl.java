package com.project.winiaaid.service.mail;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService{

    private final JavaMailSender mailSender;

    @Override
    public String sendMail(String email) throws Exception {
        SimpleMailMessage message = new SimpleMailMessage();
        String randomPassword = createRandomPassword();
        message.setTo(email);
        message.setFrom("dhmkhk47@naver.com");
        message.setSubject("임시 비밀번호입니다.");
        message.setText("임시 비밀번호: " + randomPassword);

        mailSender.send(message);

        return randomPassword;
    }

    private String createRandomPassword() {
        return RandomStringUtils.randomAlphanumeric(9) + "!";
    }
}