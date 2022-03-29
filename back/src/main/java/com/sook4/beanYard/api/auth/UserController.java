package com.sook4.beanYard.api.auth;

import com.sook4.beanYard.api.dto.DonateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // get user
    @GetMapping()
    public ResponseEntity<UserCredentials>  getUser(@RequestParam("userName") String userName) {

        Optional<UserCredentials> optionalUserDto = userService.getUser(userName);

        return optionalUserDto.map(userCredentials -> ResponseEntity.status(HttpStatus.OK).body(userCredentials)).orElseGet(() -> ResponseEntity.noContent().build());
    }

    // get user count
    @GetMapping("/count")
    public ResponseEntity<Integer>  getUsers() {

        return ResponseEntity.status(HttpStatus.OK).body(userService.getUsers().size());
    }

    // put user
    @PutMapping
    public ResponseEntity<UserCredentials> updateUser(@RequestBody @Validated UserCredentials userCredentials, Errors errors){
        if(errors.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }

        Optional<UserCredentials> optionalUserCredentials = userService.updateUser(userCredentials);

        return  optionalUserCredentials.map(user -> ResponseEntity.status(HttpStatus.OK).body(user)).orElseGet(() -> ResponseEntity.badRequest().build());
    }
}
