package com.bookstore.user.service;

import com.bookstore.user.dao.UserDao;
import com.bookstore.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    public UserDao userDao;

    public User getUserByEmail(String email) {
        return userDao.findUserByEmail(email);
    }

    public int saveUser(User user) {
        return userDao.saveUser(user);
    }

    public User getLoginUserByEmail(String email) {
        return userDao.findLoginUserByEmail(email);
    }
}
