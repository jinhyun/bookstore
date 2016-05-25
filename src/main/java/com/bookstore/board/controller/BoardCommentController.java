package com.bookstore.board.controller;

import com.bookstore.board.domain.BoardComment;
import com.bookstore.board.service.BoardCommentService;
import com.bookstore.user.domain.CurrentUser;
import com.bookstore.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
public class BoardCommentController {
    @Autowired
    private BoardCommentService boardCommentService;

    @RequestMapping(value = "/boardComment/create", method = RequestMethod.POST)
    public @ResponseBody BoardComment createBoardComment(@RequestBody BoardComment boardComment) {
        User loginUser = CurrentUser.getCurrentUser();

        return boardCommentService.createBoardComment(boardComment, loginUser);
    }

    @RequestMapping(value = "/boardComments/{boardUid}", method = RequestMethod.GET)
    public @ResponseBody List<BoardComment> getBoardComments(@PathVariable int boardUid) {
        return boardCommentService.getBoardCommentsByBoardUid(boardUid);
    }

    @RequestMapping(value = "/boardComment/update", method = RequestMethod.POST)
    public @ResponseBody BoardComment updateBoardComment(@RequestBody BoardComment boardComment) {
        return boardCommentService.updateBoardComment(boardComment);
    }
}
