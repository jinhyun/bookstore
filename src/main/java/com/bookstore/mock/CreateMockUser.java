package com.bookstore.mock;

import com.bookstore.user.domain.User;
import com.bookstore.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

@Service
@Transactional
public class CreateMockUser {
    @Autowired
    private UserService userService;

    @PostConstruct
    public void setup() {
        createUser();
    }

    public void createUser() {
        BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();

        User ironMan = new User();
        ironMan.setEmail("IronMan@bookstore.com");
        ironMan.setName("IronMan");
        ironMan.setPassword(crypt.encode("1234"));
        ironMan.setRole("USER");
        userService.saveUser(ironMan);

        User captainAmerica = new User();
        captainAmerica.setEmail("CaptainAmerica@bookstore.com");
        captainAmerica.setName("CaptainAmerica");
        captainAmerica.setPassword(crypt.encode("1234"));
        captainAmerica.setRole("USER");
        userService.saveUser(captainAmerica);
    }
}
