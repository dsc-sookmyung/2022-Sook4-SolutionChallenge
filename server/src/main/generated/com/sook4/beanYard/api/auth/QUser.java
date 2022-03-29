package com.sook4.beanYard.api.auth;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = -1182381256L;

    public static final QUser user = new QUser("user");

    public final StringPath cafeName = createString("cafeName");

    public final StringPath email = createString("email");

    public final NumberPath<Double> lat = createNumber("lat", Double.class);

    public final StringPath locateName = createString("locateName");

    public final NumberPath<Double> lon = createNumber("lon", Double.class);

    public final StringPath password = createString("password");

    public final ListPath<com.sook4.beanYard.api.entity.donate.Donate, com.sook4.beanYard.api.entity.donate.QDonate> userDonates = this.<com.sook4.beanYard.api.entity.donate.Donate, com.sook4.beanYard.api.entity.donate.QDonate>createList("userDonates", com.sook4.beanYard.api.entity.donate.Donate.class, com.sook4.beanYard.api.entity.donate.QDonate.class, PathInits.DIRECT2);

    public final StringPath userName = createString("userName");

    public final NumberPath<Long> userSeq = createNumber("userSeq", Long.class);

    public final EnumPath<com.sook4.beanYard.api.enums.UserType> userType = createEnum("userType", com.sook4.beanYard.api.enums.UserType.class);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

