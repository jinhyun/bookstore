package com.bookstore.mock;

import com.bookstore.board.domain.Board;
import com.bookstore.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class CreateMockBoards {
    @Autowired
    BoardService boardService;

    @PostConstruct
    public void setup() {
        saveBoards();
    }

    public void saveBoards() {
        for (Board board : getMockBoards()) {
            boardService.saveBoard(board);
        }
    }

    public List<Board> getMockBoards() {
        List<Board> boards = new ArrayList<Board>();
        Board first = new Board();
        first.setBoardSubject("채식주의자");
        first.setBoardContents("한강 연작소설 2016 맨부커상 인터내셔널 수상");
        first.setBoardAuthor("한강");
        first.setBoardRegUserUid(1);
        first.setBoardRegUserName("IronMan");
        boards.add(first);

        Board second = new Board();
        second.setBoardSubject("종의 기");
        second.setBoardContents("[7년의밤] 정유정 작가 3년만의 신작");
        second.setBoardAuthor("정유정");
        second.setBoardRegUserUid(1);
        second.setBoardRegUserName("IronMan");
        boards.add(second);

        Board third = new Board();
        third.setBoardSubject("완벽하지 않은 것들에 대한 사랑");
        third.setBoardContents("혜민스님 4년 만의 신작! 나를 아껴주는 따스한 이야기");
        third.setBoardAuthor("혜민");
        third.setBoardRegUserUid(1);
        third.setBoardRegUserName("IronMan");
        boards.add(third);

        Board fourth = new Board();
        fourth.setBoardSubject("못 참는 아이 욱하는 부모");
        fourth.setBoardContents("‘욱’하셨나요? 오은영멘토의 감정조절육아");
        fourth.setBoardAuthor("오은영");
        fourth.setBoardRegUserUid(1);
        fourth.setBoardRegUserName("IronMan");
        boards.add(fourth);

        Board fifth = new Board();
        fifth.setBoardSubject("사피엔스");
        fifth.setBoardContents("인류 문명화에 대한 거대한 서사! 이제 우리는 무엇을 인간이라고 할 것인가");
        fifth.setBoardAuthor("유발 하라리");
        fifth.setBoardRegUserUid(1);
        fifth.setBoardRegUserName("IronMan");
        boards.add(fifth);

        for(int i=6; i<=20; i++){
            Board boardData = new Board();
            String conStrI = Integer.toString(i) + Integer.toString(i) + Integer.toString(i) + Integer.toString(i) + Integer.toString(i);
            boardData.setBoardSubject("subject: " + conStrI);
            boardData.setBoardContents("content: " + conStrI);
            boardData.setBoardAuthor("author: " + conStrI);
            boardData.setBoardRegUserUid(2);
            boardData.setBoardRegUserName("CaptainAmerica");
            boards.add(boardData);
        }

        return boards;
    }
}
