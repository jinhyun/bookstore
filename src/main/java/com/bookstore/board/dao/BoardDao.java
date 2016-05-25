package com.bookstore.board.dao;

import com.bookstore.board.domain.Board;
import com.bookstore.board.mapper.BoardMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BoardDao implements BoardMapper{
    @Autowired
    private SqlSession sqlSession;

    @Override
    public int saveBoard(Board board) {
        return sqlSession.insert("saveBoard", board);
    }

    @Override
    public List<Board> getAllBoards() {
        return sqlSession.selectList("findAllBoards");
    }

    @Override
    public Board getBoardByBoardUid(int boardUid) {
        return sqlSession.selectOne("findByBoardUid", boardUid);
    }

    @Override
    public int updateBoard(Board board) {
        return sqlSession.update("updateBoard", board);
    }

    @Override
    public int deleteBoard(Board board) {
        return sqlSession.delete("deleteBoard", board);
    }
}
