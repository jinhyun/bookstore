package com.bookstore.user.dao;

import com.bookstore.user.domain.User;
import com.bookstore.user.mapper.UserMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserDao implements UserMapper{
    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<User> findAllUser() {
        return sqlSession.selectList("findAllUser");
    }

    @Override
    public int saveUser(User user) {
        return sqlSession.insert("saveUser", user);
    }

    @Override
    public User findUserByUserUid(int userUid) {
        return sqlSession.selectOne("findUserByUserUid", userUid);
    }

    @Override
    public User findUserByEmail(String email) {
        return sqlSession.selectOne("findUserByEmail", email);
    }

    @Override
    public User findLoginUserByEmail(String email) {
        return sqlSession.selectOne("findLoginUserByEmail", email);
    }

    @Override
    public int updateUser(User user) {
        return sqlSession.update("updateUser", user);
    }

    @Override
    public int deleteUser(int userUid) {
        return sqlSession.delete("deleteUser", userUid);
    }
}
