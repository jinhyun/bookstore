package com.bookstore.board.service;

import com.bookstore.board.dao.BoardCommentDao;
import com.bookstore.board.domain.BoardComment;
import com.bookstore.user.domain.User;
import com.bookstore.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BoardCommentService {
    @Autowired
    private BoardCommentDao boardCommentDao;

    @Autowired
    private UserService userService;

    public BoardComment createBoardComment(BoardComment boardComment, User loginUser) {
        if (loginUser == null || loginUser.getUserUid() < 1) {
            throw new IllegalArgumentException("LoginUser must not be null");
        }

        boardComment.setBoardCommentUserUid(loginUser.getUserUid());
        boardComment.setBoardCommentUserName(loginUser.getName());

        int savedRow = boardCommentDao.createBoardComment(boardComment);

        if (boardComment.getBoardCommentUid() < 1) {
            throw new NullPointerException("boardCommentUid is not found");
        }

        return boardComment;
    }

    public List<BoardComment> getBoardCommentsByBoardUid(int boardUid) {
        if (boardUid < 1) {
            throw new IllegalArgumentException("boardUid must not be null");
        }

        return boardCommentDao.getBoardCommentsByBoardUid(boardUid);
    }

    public BoardComment updateBoardComment(BoardComment boardComment) {
        if (boardComment.getBoardCommentUid() < 1 || boardComment.getBoardCommentContents().equals("")) {
            throw new IllegalArgumentException("boardUid, boardCommentContents must not be null");
        }

        int updatedRow = boardCommentDao.updateBoardComment(boardComment);

        if (boardComment.getBoardCommentUid() < 1) {
            throw new NullPointerException("boardCommentUid is not found");
        }

        return boardComment;
    }

    public BoardComment deleteBoardComment(BoardComment boardComment) {
        if (boardComment.getBoardCommentUid() < 1) {
            throw new IllegalArgumentException("boardCommentUid must not be null");
        }

        int deletedRow = boardCommentDao.deleteBoardComment(boardComment);

        return boardComment;
    }

    public int deleteBoardCommentByBoardUid(int boardUid) {
        if (boardUid < 1) {
            throw new IllegalArgumentException("boardUid must not be null");
        }

        return boardCommentDao.deleteBoardCommentByBoardUid(boardUid);
    }
}
