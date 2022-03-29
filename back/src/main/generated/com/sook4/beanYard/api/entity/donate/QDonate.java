package com.sook4.beanYard.api.entity.donate;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDonate is a Querydsl query type for Donate
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDonate extends EntityPathBase<Donate> {

    private static final long serialVersionUID = 1536779004L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDonate donate = new QDonate("donate");

    public final NumberPath<Long> amount = createNumber("amount", Long.class);

    public final StringPath cafeName = createString("cafeName");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> donateSeq = createNumber("donateSeq", Long.class);

    public final EnumPath<com.sook4.beanYard.api.enums.DonateStatus> donateStatus = createEnum("donateStatus", com.sook4.beanYard.api.enums.DonateStatus.class);

    public final EnumPath<com.sook4.beanYard.api.enums.DonateType> donateType = createEnum("donateType", com.sook4.beanYard.api.enums.DonateType.class);

    public final com.sook4.beanYard.api.auth.QUser donateUser;

    public final NumberPath<Double> lat = createNumber("lat", Double.class);

    public final StringPath locateName = createString("locateName");

    public final NumberPath<Double> lon = createNumber("lon", Double.class);

    public final StringPath message = createString("message");

    public final DateTimePath<java.time.LocalDateTime> time = createDateTime("time", java.time.LocalDateTime.class);

    public QDonate(String variable) {
        this(Donate.class, forVariable(variable), INITS);
    }

    public QDonate(Path<? extends Donate> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDonate(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDonate(PathMetadata metadata, PathInits inits) {
        this(Donate.class, metadata, inits);
    }

    public QDonate(Class<? extends Donate> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.donateUser = inits.isInitialized("donateUser") ? new com.sook4.beanYard.api.auth.QUser(forProperty("donateUser")) : null;
    }

}

