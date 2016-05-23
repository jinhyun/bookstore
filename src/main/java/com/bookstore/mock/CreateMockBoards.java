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
        first.setSubject("채식주의자");
        first.setContents("한강 연작소설 2016 맨부커상 인터내셔널 수상");
        first.setAuthor("한강");
        first.setRegDate(new Date());
        boards.add(first);

        Board second = new Board();
        second.setSubject("종의 기");
        second.setContents("[7년의밤] 정유정 작가 3년만의 신작");
        second.setAuthor("정유정");
        second.setRegDate(new Date());
        boards.add(second);

        Board third = new Board();
        third.setSubject("완벽하지 않은 것들에 대한 사랑");
        third.setContents("혜민스님 4년 만의 신작! 나를 아껴주는 따스한 이야기");
        third.setAuthor("혜민");
        third.setRegDate(new Date());
        boards.add(third);

        Board fourth = new Board();
        fourth.setSubject("못 참는 아이 욱하는 부모");
        fourth.setContents("‘욱’하셨나요? 오은영멘토의 감정조절육아");
        fourth.setAuthor("오은영");
        fourth.setRegDate(new Date());
        boards.add(fourth);

        Board fifth = new Board();
        fifth.setSubject("사피엔스");
        fifth.setContents("인류 문명화에 대한 거대한 서사! 이제 우리는 무엇을 인간이라고 할 것인가");
        fifth.setAuthor("유발 하라리");
        fifth.setRegDate(new Date());
        boards.add(fifth);

        for(int i=6; i<=20; i++){
            Board boardData = new Board();
            String conStrI = Integer.toString(i) + Integer.toString(i) + Integer.toString(i) + Integer.toString(i) + Integer.toString(i);
            boardData.setSubject("subject: " + conStrI);
            boardData.setContents("content: " + conStrI);
            boardData.setAuthor("author: " + conStrI);
            boardData.setRegDate(new Date());
            boards.add(boardData);
        }

        return boards;
    }
}
