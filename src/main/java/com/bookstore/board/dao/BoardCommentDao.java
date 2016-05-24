package com.bookstore.board.dao;

import com.bookstore.board.domain.BoardComment;
import com.bookstore.board.mapper.BoardCommentMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BoardCommentDao implements BoardCommentMapper {
    @Autowired
    private SqlSession sqlSession;

    @Override
    public int createBoardComment(BoardComment boardComment) {
        return sqlSession.insert("saveBoardComment", boardComment);
    }

    @Override
    public List<BoardComment> getBoardCommentsByBoardUid(int boardUid) {
        return sqlSession.selectList("findBoardCommentsByBoardUid", boardUid);
    }
}
