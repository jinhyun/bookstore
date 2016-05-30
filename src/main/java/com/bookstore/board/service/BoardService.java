package com.bookstore.board.service;

import com.bookstore.board.dao.BoardDao;
import com.bookstore.board.domain.Board;
import com.bookstore.user.domain.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class BoardService {
    @Autowired
    private BoardDao boardDao;

    @Autowired
    private BoardCommentService boardCommentService;

    public List<Board> getAllBoards() {
        return boardDao.getAllBoards();
    }

    public boolean isExistLoginUserforDev() {
        if (SecurityContextHolder.getContext().getAuthentication() == null){
            return false;

        } else {
            return true;
        }
    }

    public int saveBoard(Board board) {
        if(isExistLoginUserforDev()) {  // TODO: for dev
            board.setBoardRegUserUid(CurrentUser.getCurrentUser().getUserUid());
            board.setBoardRegUserName(CurrentUser.getCurrentUser().getName());
        }
        return boardDao.saveBoard(board);
    }

    public Board getBoardByBoardUid(int boardUid) {
        return boardDao.getBoardByBoardUid(boardUid);
    }

    public int updateBoard(Board board) {
        if (board.getBoardUid() < 1) {
            throw new NullPointerException("BoardUid is not found");
        }

        board.setBoardRegUserUid(CurrentUser.getCurrentUser().getUserUid());
        board.setBoardRegUserName(CurrentUser.getCurrentUser().getName());

        return boardDao.updateBoard(board);
    }

    public int deleteBoard(Board board) {
        if (board.getBoardUid() < 1) {
            throw new NullPointerException("BoardUid is not found");
        }

        int deletedRows = boardCommentService.deleteBoardCommentByBoardUid(board.getBoardUid());
        return boardDao.deleteBoard(board);
    }
}
