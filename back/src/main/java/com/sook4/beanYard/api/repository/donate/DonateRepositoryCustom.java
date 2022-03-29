package com.sook4.beanYard.api.repository.donate;

import com.sook4.beanYard.api.dto.DonateSearchCondition;
import com.sook4.beanYard.api.entity.donate.Donate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DonateRepositoryCustom {
    Page<Donate> search(DonateSearchCondition condition, Pageable pageable);
}
