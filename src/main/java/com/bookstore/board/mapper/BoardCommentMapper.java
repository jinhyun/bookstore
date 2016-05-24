package com.bookstore.board.mapper;

import com.bookstore.board.domain.BoardComment;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardCommentMapper {
    int createBoardComment(BoardComment boardComment);
}
