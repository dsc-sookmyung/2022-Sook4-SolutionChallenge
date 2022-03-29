package com.sook4.beanYard.api.auth;

import com.sook4.beanYard.api.enums.UserType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCredentials {
    private Long userSeq;

    private String email;

    private String userName;

    private String password;

    private double lat;

    private double lon;

    private String locateName;

    private String cafeName;

    private UserType userType;
}
