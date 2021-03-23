package com.dora.petstore.controller;

import com.dora.petstore.dto.User.RegisterParam;
import com.dora.petstore.dto.User.UserData;
import com.dora.petstore.dto.User.UserWithToken;
import com.dora.petstore.exception.InvalidAuthenticationException;
import com.dora.petstore.model.User;
import com.dora.petstore.repository.UserRepository;
import com.dora.petstore.security.DefaultJWTService;
import com.dora.petstore.security.EncryptService;
import com.dora.petstore.service.UserService;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.*;

@RestController
public class UserController {
    private UserRepository userRepository;
    private EncryptService encryptService;
    private DefaultJWTService jwtService;
    private UserService userService;

    @Autowired
    public UserController (
            UserRepository userRepository,
            EncryptService encryptService,
            DefaultJWTService jwtService,
            UserService userService
    ) {
        this.userRepository = userRepository;
        this.encryptService = encryptService;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @RequestMapping(path = "/users", method = RequestMethod.GET)
    public ResponseEntity findAll() {
        List<User> users = userRepository.findAll();
        List<UserData> usersData = new ArrayList<UserData>();
        for (User user : users) {
            usersData.add(new UserData(user.getUsername(), user.getAvatar()));
        }
        return ResponseEntity.ok(usersData);
    }

    @RequestMapping(path = "/users", method = RequestMethod.POST)
    public ResponseEntity createUser(@Valid @RequestBody RegisterParam registerParam) {
        User user = userService.createUser(registerParam);
        UserData userData = new UserData(user.getUsername(), user.getAvatar());
        return ResponseEntity.status(201)
                .body(userResponse(new UserWithToken(userData, jwtService.toToken(user))));
    }

    @RequestMapping(path = "/users/login", method = RequestMethod.POST)
    public ResponseEntity userLogin(@Valid @RequestBody LoginParam loginParam) {
        Optional<User> optional = userRepository.findByUsername(loginParam.getUsername());
        if (optional.isPresent() && encryptService.check(optional.get().getPassword(), loginParam.getPassword())) {
            UserData userData = new UserData(optional.get().getUsername(), optional.get().getAvatar());
            return ResponseEntity.ok(
                    userResponse(new UserWithToken(userData, jwtService.toToken(optional.get())))
            );
        } else {
            throw new InvalidAuthenticationException();
        }
    }

    private Map<String, Object> userResponse(UserWithToken userWithToken) {
        return new HashMap<String, Object>() {
            {
                put("user", userWithToken);
            }
        };
    }
}

@Getter
@JsonRootName("user")
@NoArgsConstructor
class LoginParam {
    @NotBlank(message = "can't be empty")
    private String username;

    @NotBlank(message = "can't be empty")
    private String password;
}
