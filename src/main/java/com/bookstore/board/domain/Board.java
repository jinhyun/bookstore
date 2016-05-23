package com.bookstore.board.domain;

import java.util.Date;

public class Board {
    private int boardUid;
    private String subject;
    private String contents;
    private String author;
    private Date regDate;

    public int getBoardUid() {
        return boardUid;
    }

    public void setBoardUid(int boardUid) {
        this.boardUid = boardUid;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Date getRegDate() {
        return regDate;
    }

    public void setRegDate(Date regDate) {
        this.regDate = regDate;
    }
}
