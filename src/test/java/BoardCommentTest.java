import com.bookstore.Application;
import com.bookstore.board.domain.BoardComment;
import com.bookstore.board.service.BoardCommentService;
import com.bookstore.mock.CreateMockBoardComments;
import com.bookstore.mock.CreateMockBoards;
import com.bookstore.user.domain.User;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import java.util.*;

import org.junit.runner.RunWith;
import org.junit.*;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

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

            int savedRow = boardCommentService.createBoardComment(boardComment, loginUser);
            assertThat(boardComment.getBoardCommentUid(), is(notNullValue()));
            assertThat(boardComment.getBoardCommentUid(), is(not(0)));
            totalSavedRod++;
        }

        assertThat(totalSavedRod, is(2));
    }
}
