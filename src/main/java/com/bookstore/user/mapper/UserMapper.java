package com.bookstore.user.mapper;

import com.bookstore.user.domain.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.*;

@Mapper
public interface UserMapper {
    /**
     * 사용자 목록을 조회한다.
     * @return
     */
    public List<User> findAllUser();

    /**
     * 사용자를 저장한다.
     * @param user
     * @return
     */
    public int saveUser(User user);

    /**
     * uid로 사용자를 조회한다.
     * @param userUid
     * @return
     */
    User findUserByUserUid(int userUid);

    /**
     * 이메일로 사용자를 조회한다.
     * @param email
     * @return
     */
    User findUserByEmail(String email);

    /**
     * 로그인 사용자를 정보를 조회한다.
     * @param email
     * @return
     */
    User findLoginUserByEmail(String email);

    /**
     * 사용자를 수정한다.
     * @param user
     * @return 수정한 개수
     */
    int updateUser(User user);

    /**
     * 사용자를 삭제한다.
     * @param userUid
     * @return 수정한 개수
     */
    int deleteUser(int userUid);
}
