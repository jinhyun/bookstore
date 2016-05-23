package com.bookstore.board.mapper;

import com.bookstore.board.domain.Board;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    public int saveBoard(Board board);

    List<Board> getAllBoards();
}
