package com.bookstore.board.controller;

import com.bookstore.board.domain.Board;
import com.bookstore.board.service.BoardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class BoardController {
    @Autowired
    private BoardService boardService;

    private static final Logger LOGGER = LoggerFactory.getLogger(BoardController.class);

    @RequestMapping(value = "/boards", method = RequestMethod.GET)
    public String getBoardsPage(Model model) {
        LOGGER.debug("get boards page");
        model.addAttribute("boards", boardService.getAllBoards());
        return "board/boards";
    }

    @RequestMapping(value = "/board/create", method = RequestMethod.GET)
    public String getBoardPage() {
        return "board/board_create";
    }

    @RequestMapping(value = "/board/create", method = RequestMethod.POST)
    public String createBoard(Board board) {
        int savedRow = boardService.saveBoard(board);
        return "redirect:/boards";
    }
}
