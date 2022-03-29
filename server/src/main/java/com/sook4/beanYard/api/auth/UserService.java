package com.sook4.beanYard.api.auth;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;

    public Optional<UserCredentials> saveUser(UserCredentials userCredentials) {
        userCredentials.setPassword(passwordEncoder.encode(userCredentials.getPassword()));
        User savedUser = userRepository.save(modelMapper.map(userCredentials, User.class));

        return Optional.of(modelMapper.map(savedUser, UserCredentials.class));
    }

    public Optional<UserCredentials> getUser(String email) {
        Optional<User> byUserName = userRepository.findByEmail(email);
        return byUserName.map(user -> Optional.of(modelMapper.map(user, UserCredentials.class))).orElse(null);
    }

    public List<UserCredentials> getUsers() {
        List<User> all = userRepository.findAll();
        List<UserCredentials> categoryDtos =
                all.stream().map(user -> {
                    return modelMapper.map(user, UserCredentials.class);
                }).collect(Collectors.toList());

        return categoryDtos;
    }

    public Optional<UserCredentials> updateUser(UserCredentials userCredentials) {

        User user = userRepository.findById(userCredentials.getUserSeq()).get();

        // 만약 수정 기능 있으면 추가
        if (userCredentials.getUserName() != null) {
            user.setUserName(userCredentials.getUserName());
        }
        if (userCredentials.getUserType() != null) {
            user.setUserType(userCredentials.getUserType());
        }
        if (userCredentials.getCafeName() != null) {
            user.setCafeName(userCredentials.getCafeName());
        }
        if (userCredentials.getLat() != 0) {
            user.setLat(userCredentials.getLat());
        }
        if (userCredentials.getLon() != 0) {
            user.setLon(userCredentials.getLon());
        }
        if (userCredentials.getLocateName() != null) {
            user.setLocateName(userCredentials.getLocateName());
        }

        userRepository.saveAndFlush(user);

        return Optional.of(modelMapper.map(user, UserCredentials.class));
    }

}
