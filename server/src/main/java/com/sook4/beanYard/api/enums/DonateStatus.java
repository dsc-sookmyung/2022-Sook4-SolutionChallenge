package com.sook4.beanYard.api.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum DonateStatus {
    WAIT("대기"),
    COMPLETE("완료"),
    REJ_DISTANCE("거절_거리"),
    REJ_TIME("거절_시간"),
    REJ_AMOUNT("거절_양");

    private String description;
}
