package com.sook4.beanYard.api.repository.donate;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sook4.beanYard.api.dto.DonateSearchCondition;
import com.sook4.beanYard.api.entity.donate.Donate;
import com.sook4.beanYard.api.enums.DonateStatus;
import com.sook4.beanYard.api.enums.DonateType;
import com.sook4.beanYard.utils.PagingUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import static com.sook4.beanYard.api.entity.donate.QDonate.donate;

@Repository
public class DonateRepositoryImpl implements DonateRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    private final PagingUtil pagingUtil;

    public DonateRepositoryImpl(JPAQueryFactory jpaQueryFactory, PagingUtil pagingUtil) {
        this.jpaQueryFactory = jpaQueryFactory;
        this.pagingUtil = pagingUtil;
    }

    @Override
    public Page<Donate> search(DonateSearchCondition condition, Pageable pageable) {
        JPQLQuery<Donate> query = jpaQueryFactory       // 1)
                .selectFrom(donate)
                .where(
                        donateSeqEq(condition.getDonateSeq()),
                        userSeqEq(condition.getUserSeq()),
                        donateStatus(condition.getDonateStatus()),
                        donateTypeEq(condition.getDonateType())
                );
        return pagingUtil.getPageImpl(pageable, query, Donate.class);
    }
    private BooleanExpression donateSeqEq(Long donate_id) {
        return donate_id != null ? donate.donateSeq.eq(donate_id) : null;
    }

    private BooleanExpression userSeqEq(Long user_id) {
        return user_id != null ? donate.donateUser.userSeq.eq(user_id) : null;
    }

    private BooleanExpression donateTypeEq(DonateType donateType) {
        return donateType != null ? donate.donateType.eq(donateType) : null;
    }

    private BooleanExpression donateStatus(DonateStatus donateStatus) {
        return donateStatus != null ? donate.donateStatus.eq(donateStatus) : null;
    }
}
