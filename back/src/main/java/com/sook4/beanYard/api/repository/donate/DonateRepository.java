package com.sook4.beanYard.api.repository.donate;

import com.sook4.beanYard.api.entity.donate.Donate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonateRepository extends JpaRepository<Donate, Long>, DonateRepositoryCustom {
}
