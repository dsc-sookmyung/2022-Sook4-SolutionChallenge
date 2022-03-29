package com.sook4.beanYard.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sook4.beanYard.api.enums.DonateStatus;
import com.sook4.beanYard.api.enums.DonateType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DonateDto {
    private Long donateSeq;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime time;

    private Long amount;

    private String message;

    private DonateType donateType;

    private double lat;

    private double lon;

    private String locateName;

    private String cafeName;

    private DonateStatus donateStatus;

    private Long userSeq;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
}
