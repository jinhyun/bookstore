import com.bookstore.Application;
import com.bookstore.board.domain.BoardComment;
import com.bookstore.board.service.BoardCommentService;
import com.bookstore.mock.CreateMockBoardComments;
import com.bookstore.user.domain.User;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import java.util.*;

import org.junit.*;

import static org.junit.Assert.*;
import static org.hamcrest.Matchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
public class BoardCommentTest {
    @Autowired
    CreateMockBoardComments createMockBoardComments;

    @Autowired
    private BoardCommentService boardCommentService;

    @Test
    public void createBoardComment() {
        List<BoardComment> boardComments = createMockBoardComments.getMockBoardComments();

        int totalSavedRod = 0;
        for(BoardComment boardComment : boardComments) {
            User loginUser = new User();
            loginUser.setUserUid(1);
            loginUser.setName("aaaa");

            BoardComment savedBoardComment = boardCommentService.createBoardComment(boardComment, loginUser);
            assertThat(savedBoardComment.getBoardCommentUid(), is(notNullValue()));
            assertThat(savedBoardComment.getBoardCommentUid(), is(not(0)));
            totalSavedRod++;
        }

        assertThat(totalSavedRod, is(2));
    }

    @Test
    public void getBoardComments() {
        createMockBoardComments.createBoardComments(createMockBoardComments.getMockBoardComments());

        List<BoardComment> boardComments = boardCommentService.getBoardCommentsByBoardUid(1);
        assertThat(boardComments.size(), is(2));
    }

    @Test
    public void updateBoardComment() {
        BoardComment boardComment = new BoardComment();
        boardComment.setBoardCommentUid(1);
        boardComment.setBoardCommentContents("애타는 마음 - 울랄라세션 아이유");

        BoardComment updatedBoardComment = boardCommentService.updateBoardComment(boardComment);
        assertThat(updatedBoardComment.getBoardCommentUid(), is(1));
        assertThat(updatedBoardComment.getBoardCommentContents(), is("애타는 마음 - 울랄라세션 아이유"));
    }
}
