package com.bookstore.board.domain;

public class Board {
    private int boardUid;
    private String boardSubject;
    private String boardContents;
    private String boardAuthor;
    private String boardRegDate;
    private int boardRegUserUid;
    private String boardRegUserName;

    public int getBoardUid() {
        return boardUid;
    }

    public void setBoardUid(int boardUid) {
        this.boardUid = boardUid;
    }

    public String getBoardSubject() {
        return boardSubject;
    }

    public void setBoardSubject(String boardSubject) {
        this.boardSubject = boardSubject;
    }

    public String getBoardContents() {
        return boardContents;
    }

    public void setBoardContents(String boardContents) {
        this.boardContents = boardContents;
    }

    public String getBoardAuthor() {
        return boardAuthor;
    }

    public void setBoardAuthor(String boardAuthor) {
        this.boardAuthor = boardAuthor;
    }

    public String getBoardRegDate() {
        return boardRegDate;
    }

    public void setBoardRegDate(String boardRegDate) {
        this.boardRegDate = boardRegDate;
    }

    public int getBoardRegUserUid() {
        return boardRegUserUid;
    }

    public void setBoardRegUserUid(int boardRegUserUid) {
        this.boardRegUserUid = boardRegUserUid;
    }

    public String getBoardRegUserName() {
        return boardRegUserName;
    }

    public void setBoardRegUserName(String boardRegUserName) {
        this.boardRegUserName = boardRegUserName;
    }
}
