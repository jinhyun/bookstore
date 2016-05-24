package com.bookstore.board.dao;

import com.bookstore.board.domain.BoardComment;
import com.bookstore.board.mapper.BoardCommentMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BoardCommentDao implements BoardCommentMapper {
    @Autowired
    private SqlSession sqlSession;

    @Override
    public int createBoardComment(BoardComment boardComment) {
        return sqlSession.insert("saveBoardComment", boardComment);
    }
}
