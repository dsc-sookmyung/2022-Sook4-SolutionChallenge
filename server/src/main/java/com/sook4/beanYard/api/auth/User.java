package com.sook4.beanYard.api.auth;

import com.sook4.beanYard.api.entity.donate.Donate;
import com.sook4.beanYard.api.enums.UserType;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USER")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USER_SEQ")
    private Long userSeq;

    private String userName;

    private String password;

    private String email;

    private double lat;

    private double lon;

    private String locateName;

    private String cafeName;

    @NotNull
    @Enumerated(EnumType.STRING)
    private UserType userType;

    @OneToMany(mappedBy = "donateUser")
    private List<Donate> userDonates;

    public User(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }
}
