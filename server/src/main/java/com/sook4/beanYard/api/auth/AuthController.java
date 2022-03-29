package com.sook4.beanYard.api.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;
import java.util.Random;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;

    private final EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<UserCredentials> newUser(@RequestBody @Validated UserCredentials userCredentials, Errors errors){
        if(errors.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }

        Optional<UserCredentials> optionalUserDto = userService.saveUser(userCredentials);

        return  optionalUserDto.map(user -> ResponseEntity.status(HttpStatus.CREATED).body(user)).orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PostMapping("/email")
    public ResponseEntity<String> email (@RequestBody @Validated UserCredentials userCredentials, Errors errors) throws MessagingException {
        if(errors.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }
        Optional<UserCredentials> user = userService.getUser(userCredentials.getEmail());
        // 유저가 이미 존재할 때
        if (user != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        String code = createKey();

        System.out.println(userCredentials.getEmail());

        // 이메일 인증
        emailService.sendMail(userCredentials.getEmail(), code);

        return  ResponseEntity.status(HttpStatus.CREATED).body(code);
    }

    @GetMapping("/logout")
    private void logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }

        return key.toString();
    }
}
