package com.sook4.beanYard.api.service.donate;

import com.sook4.beanYard.api.auth.UserRepository;
import com.sook4.beanYard.api.dto.DonateDto;
import com.sook4.beanYard.api.dto.DonateSearchCondition;
import com.sook4.beanYard.api.entity.donate.Donate;
import com.sook4.beanYard.api.repository.donate.DonateRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DonateService {
    private final DonateRepository donateRepository;

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;


    public Optional<DonateDto> addDonate(DonateDto donateDto) {
        Donate map = modelMapper.map(donateDto, Donate.class);
        map.setCreatedAt(LocalDateTime.now());

        Donate savedDonate = donateRepository.save(map);

        return Optional.of(modelMapper.map(savedDonate, DonateDto.class));
    }

    public Page<DonateDto> search(DonateSearchCondition condition, Pageable pageable) {
        Page<Donate> search = donateRepository.search(condition, pageable);

        List<DonateDto> donateDtos = search.stream().map(donate -> modelMapper.map(donate, DonateDto.class)).collect(Collectors.toList());

        return new PageImpl<>(donateDtos, pageable, search.getTotalElements());
    }

    public Optional<DonateDto> updateDonate(DonateDto donateDto) {

        Donate donate = donateRepository.findById(donateDto.getDonateSeq()).get();

        // 만약 수정 기능 있으면 추가
        if (donateDto.getDonateType() != null) {
            donate.setDonateType(donateDto.getDonateType());
        }
        if (donateDto.getDonateStatus() != null) {
            donate.setDonateStatus(donateDto.getDonateStatus());
        }
        if (donateDto.getAmount() != null) {
            donate.setAmount(donateDto.getAmount());
        }
        if (donateDto.getTime() != null) {
            donate.setTime(donateDto.getTime());
        }
        if (donateDto.getMessage() != null) {
            donate.setMessage(donateDto.getMessage());
        }

        donateRepository.saveAndFlush(donate);

        return Optional.of(modelMapper.map(donate, DonateDto.class));
    }
}
