package com.sook4.beanYard.api.controller.donate;

import com.sook4.beanYard.api.dto.DonateDto;
import com.sook4.beanYard.api.dto.DonateSearchCondition;
import com.sook4.beanYard.api.enums.DonateStatus;
import com.sook4.beanYard.api.service.donate.DonateService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/donate")
@RequiredArgsConstructor
public class DonateController {
    private final DonateService donateService;

    @GetMapping
    public ResponseEntity<Page<DonateDto>> search(DonateSearchCondition condition, Pageable pageable) {

        Page<DonateDto> donateDtoPage = donateService.search(condition, pageable);

        if (donateDtoPage.hasContent()) {
            return ResponseEntity.status(HttpStatus.OK).body(donateDtoPage);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping
    public ResponseEntity<DonateDto> newDonate(@RequestBody @Validated DonateDto donateDto, Errors errors){
        if(errors.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }

        Optional<DonateDto> optionalDonateDto = donateService.addDonate(donateDto);

        return  optionalDonateDto.map(donate -> ResponseEntity.status(HttpStatus.CREATED).body(donate)).orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping
    public ResponseEntity<DonateDto> updateDonate(@RequestBody @Validated DonateDto donateDto, Errors errors){
        if(errors.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }

        Optional<DonateDto> updateDonate = donateService.updateDonate(donateDto);

        return  updateDonate.map(donate -> ResponseEntity.status(HttpStatus.OK).body(donate)).orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/{farmer_id}")
    public ResponseEntity<AtomicLong> getTotalCoffeeAmount(@PathVariable("farmer_id") Long farmer_id) {
        AtomicLong total_coffee_amount = new AtomicLong();

        DonateSearchCondition donateSearchCondition = new DonateSearchCondition();
        donateSearchCondition.setUserSeq(farmer_id);
        donateSearchCondition.setDonateStatus(DonateStatus.COMPLETE);

        donateService.search(donateSearchCondition, Pageable.unpaged()).forEach(donateDto -> {
            total_coffee_amount.addAndGet(donateDto.getAmount());
        });
        return ResponseEntity.status(HttpStatus.OK).body(total_coffee_amount);
    }

    @GetMapping("/all")
    public ResponseEntity<AtomicLong> getTotalCoffeeAmountOfAll() {
        AtomicLong total_coffee_amount_of_all = new AtomicLong();

        DonateSearchCondition donateSearchCondition = new DonateSearchCondition();
        donateSearchCondition.setDonateStatus(DonateStatus.COMPLETE);

        donateService.search(donateSearchCondition, Pageable.unpaged()).forEach(donateDto -> {
            total_coffee_amount_of_all.addAndGet(donateDto.getAmount());
        });
        return ResponseEntity.status(HttpStatus.OK).body(total_coffee_amount_of_all);
    }
}
