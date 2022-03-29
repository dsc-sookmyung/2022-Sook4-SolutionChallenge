package com.sook4.beanYard.api.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserType {
    USER("사용자"),
    ADMIN("관리자");

    private String description;
}
