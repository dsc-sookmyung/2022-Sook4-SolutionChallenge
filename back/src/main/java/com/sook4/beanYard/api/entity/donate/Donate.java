package com.sook4.beanYard.api.entity.donate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sook4.beanYard.api.auth.User;
import com.sook4.beanYard.api.enums.DonateStatus;
import com.sook4.beanYard.api.enums.DonateType;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "DONATE")
public class Donate {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DONATE_SEQ")
    private Long donateSeq;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime time;

    private Long amount;

    private String cafeName;

    private double lat;

    private double lon;

    private String locateName;

    private String message;

    @NotNull
    @Enumerated(EnumType.STRING)
    private DonateType donateType;

    @NotNull
    @Enumerated(EnumType.STRING)
    private DonateStatus donateStatus;

    @NotNull
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.MERGE})
    @JoinColumn(name = "USER_SEQ", referencedColumnName = "user_seq")
    private User donateUser;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
}
