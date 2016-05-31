package com.bookstore.board.mapper;

import com.bookstore.board.domain.BoardComment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardCommentMapper {
    int createBoardComment(BoardComment boardComment);

    List<BoardComment> getBoardCommentsByBoardUid(int boardUid);

    int updateBoardComment(BoardComment boardComment);

    int deleteBoardComment(BoardComment boardComment);

    int deleteBoardCommentByBoardUid(int boardUid);

    BoardComment getBoardCommentByBoardCommentUid(int boardCommentUid);
}
