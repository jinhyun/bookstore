package com.bookstore.mock;

import com.bookstore.board.domain.BoardComment;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CreateMockBoardComments {
    public List<BoardComment> getMockBoardComments() {
        List<BoardComment> boardComments = new ArrayList();

        BoardComment first = new BoardComment();
        first.setBoardCommentContents("국민카드(10% 할인,할인쿠폰,5만원이상 결제시,8천원한도)");
        first.setBoardCommentRegDate(new Date());
        first.setBoardCommentUserName("IronMan");
        first.setBoardCommentUserUid(1);
        boardComments.add(first);


        BoardComment second = new BoardComment();
        second.setBoardCommentContents("예스24하나카드(40% 할인,월한도1만원)");
        second.setBoardCommentRegDate(new Date());
        second.setBoardCommentUserName("CaptainAmerica");
        second.setBoardCommentUserUid(2);
        boardComments.add(second);

        return boardComments;
    }
}
