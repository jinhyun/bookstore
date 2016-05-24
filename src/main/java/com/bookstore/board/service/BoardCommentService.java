package com.bookstore.board.service;

import com.bookstore.board.dao.BoardCommentDao;
import com.bookstore.board.domain.BoardComment;
import com.bookstore.user.domain.User;
import com.bookstore.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class BoardCommentService {
    @Autowired
    private BoardCommentDao boardCommentDao;

    @Autowired
    private UserService userService;

    public int createBoardComment(BoardComment boardComment, User loginUser) {
        if (loginUser == null || loginUser.getUserUid() < 1) {
            throw new IllegalArgumentException("LoginUser must not be null");
        }

        boardComment.setBoardCommentUserUid(loginUser.getUserUid());
        boardComment.setBoardCommentUserName(loginUser.getName());
        boardComment.setBoardCommentRegDate(new Date());

        return boardCommentDao.createBoardComment(boardComment);
    }
}
