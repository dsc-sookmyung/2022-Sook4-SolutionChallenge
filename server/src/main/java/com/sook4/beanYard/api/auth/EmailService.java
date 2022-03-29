package com.sook4.beanYard.api.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {
    @Autowired
    JavaMailSender emailSender;

    @Async
    public void sendMail(String email, String code) throws MessagingException {
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, email);//보내는 대상
        message.setSubject("BeanYard 회원가입 이메일 인증");//제목

        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요 BeanYard 입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>아래 코드를 회원가입 창으로 돌아가 입력해주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다!<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= code+"</strong><div><br/> ";
        msgg+= "</div>";

        message.setText(msgg, "utf-8", "html");//내용

        System.out.println(message);

        try{//예외처리
            emailSender.send(message);
        }catch(MailException es) {
            es.printStackTrace();
            System.out.println("mail 오류");
            throw new IllegalArgumentException();
        }
    }
}
