package com.bookstore.mock;

import com.bookstore.board.domain.BoardComment;
import com.bookstore.board.service.BoardCommentService;
import com.bookstore.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CreateMockBoardComments {
    @Autowired
    BoardCommentService boardCommentService;

    @PostConstruct
    public void setup() {
        createBoardComments(getMockBoardComments());
    }

    public List<BoardComment> getMockBoardComments() {
        List<BoardComment> boardComments = new ArrayList();

        BoardComment first = new BoardComment();
        first.setBoardCommentContents("국민카드(10% 할인,할인쿠폰,5만원이상 결제시,8천원한도)");
        first.setBoardCommentUserName("IronMan");
        first.setBoardCommentUserUid(1);
        first.setBoardUid(1);
        boardComments.add(first);

        BoardComment second = new BoardComment();
        second.setBoardCommentContents("예스24하나카드(40% 할인,월한도1만원)");
        second.setBoardCommentUserName("CaptainAmerica");
        second.setBoardCommentUserUid(2);
        second.setBoardUid(1);
        boardComments.add(second);

        BoardComment third = new BoardComment();
        third.setBoardCommentContents("멋져요");
        third.setBoardCommentUserName("IronMan");
        third.setBoardCommentUserUid(1);
        third.setBoardUid(1);
        boardComments.add(third);

        BoardComment fourth = new BoardComment();
        fourth.setBoardCommentContents("축하합니다");
        fourth.setBoardCommentUserName("IronMan");
        fourth.setBoardCommentUserUid(1);
        fourth.setBoardUid(1);
        boardComments.add(fourth);

        return boardComments;
    }

    public void createBoardComments(List<BoardComment> boardComments) {
        for (BoardComment boardComment : boardComments){
            User loginUser = new User();
            loginUser.setUserUid(boardComment.getBoardCommentUserUid());
            loginUser.setName(boardComment.getBoardCommentUserName());

            boardCommentService.createBoardComment(boardComment, loginUser);
        }
    }
}
