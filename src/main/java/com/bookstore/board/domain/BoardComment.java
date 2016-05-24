package com.bookstore.board.domain;

import java.util.Date;

public class BoardComment {
    private int boardCommentUid;
    private String boardCommentContents;
    private int boardCommentUserUid;
    private String boardCommentUserName;
    private Date boardCommentRegDate;

    public int getBoardCommentUid() {
        return boardCommentUid;
    }

    public void setBoardCommentUid(int boardCommentUid) {
        this.boardCommentUid = boardCommentUid;
    }

    public String getBoardCommentContents() {
        return boardCommentContents;
    }

    public void setBoardCommentContents(String boardCommentContents) {
        this.boardCommentContents = boardCommentContents;
    }

    public int getBoardCommentUserUid() {
        return boardCommentUserUid;
    }

    public void setBoardCommentUserUid(int boardCommentUserUid) {
        this.boardCommentUserUid = boardCommentUserUid;
    }

    public String getBoardCommentUserName() {
        return boardCommentUserName;
    }

    public void setBoardCommentUserName(String boardCommentUserName) {
        this.boardCommentUserName = boardCommentUserName;
    }

    public Date getBoardCommentRegDate() {
        return boardCommentRegDate;
    }

    public void setBoardCommentRegDate(Date boardCommentRegDate) {
        this.boardCommentRegDate = boardCommentRegDate;
    }
}