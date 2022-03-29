package com.sook4.beanYard.api.enums;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum DonateType {
    DIRECT("직접수거"),
    POST("택배");

    private String description;
}
