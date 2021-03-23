package com.dora.petstore.service;

import com.dora.petstore.dto.User.RegisterParam;
import com.dora.petstore.dto.User.UpdateUserCommand;
import com.dora.petstore.dto.User.UpdateUserParam;
import com.dora.petstore.model.User;
import com.dora.petstore.repository.UserRepository;
import com.dora.petstore.security.EncryptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;


@Service
@Validated
public class UserService {
    private UserRepository userRepository;
    private String defaultImage;
    private EncryptService encryptService;

    @Autowired
    public UserService(
            UserRepository userRepository,
            @Value("${image.default}") String defaultImage,
            EncryptService encryptService
    ) {
        this.userRepository = userRepository;
        this.defaultImage = defaultImage;
        this.encryptService = encryptService;
    }

    public User createUser(@Valid RegisterParam registerParam) {
        User user =
                new User(
                        registerParam.getUsername(),
                        encryptService.encrypt(registerParam.getPassword()),
                        defaultImage
                );
        userRepository.save(user);
        return user;
    }

    public void updateUser(@Valid UpdateUserCommand command) {
        User user = command.getTargetUser();
        UpdateUserParam updateUserParam = command.getParam();
        user.update(
                updateUserParam.getUsername(),
                updateUserParam.getAvatar(),
                updateUserParam.getPassword()
        );
        userRepository.save(user);
    }
}