package com.bookstore.board.service;

import com.bookstore.board.dao.BoardDao;
import com.bookstore.board.domain.Board;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class BoardService {
    @Autowired
    private BoardDao boardDao;

    public List<Board> getAllBoards() {
        return boardDao.getAllBoards();
    }

    public int saveBoard(Board board) {
        return boardDao.saveBoard(board);
    }
}