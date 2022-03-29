package com.sook4.beanYard.api.dto;

import com.sook4.beanYard.api.enums.DonateStatus;
import com.sook4.beanYard.api.enums.DonateType;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class DonateSearchCondition {
    private Long donateSeq;

    private Long userSeq;

    private DonateStatus donateStatus;

    private DonateType donateType;
}
