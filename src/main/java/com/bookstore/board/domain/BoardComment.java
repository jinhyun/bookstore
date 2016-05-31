package com.bookstore.board.domain;

public class BoardComment {
    private int boardCommentUid;
    private String boardCommentContents;
    private int boardCommentUserUid;
    private String boardCommentUserName;
    private String boardCommentRegDate;
    private int boardUid;

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

    public String getBoardCommentRegDate() {
        return boardCommentRegDate;
    }

    public void setBoardCommentRegDate(String boardCommentRegDate) {
        this.boardCommentRegDate = boardCommentRegDate;
    }

    public int getBoardUid() {
        return boardUid;
    }

    public void setBoardUid(int boardUid) {
        this.boardUid = boardUid;
    }
}
