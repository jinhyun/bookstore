package com.bookstore.board.controller;

import com.bookstore.board.domain.BoardComment;
import com.bookstore.board.service.BoardCommentService;
import com.bookstore.user.domain.CurrentUser;
import com.bookstore.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BoardCommentController {
    @Autowired
    private BoardCommentService boardCommentService;

    @RequestMapping(value = "/boardComment/create", method = RequestMethod.POST)
    public @ResponseBody BoardComment createBoardComment(@RequestBody BoardComment boardComment) {
        User loginUser = CurrentUser.getCurrentUser();
        boardCommentService.createBoardComment(boardComment, loginUser);

        return boardComment;
    }
}
