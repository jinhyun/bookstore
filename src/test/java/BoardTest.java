import com.bookstore.Application;
import com.bookstore.board.domain.Board;
import com.bookstore.board.service.BoardService;
import com.bookstore.mock.CreateMockBoards;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import org.junit.*;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
public class BoardTest {
    @Autowired
    private BoardService boardService;

    @Autowired
    private CreateMockBoards createMockBoards;

    private List<Board> boards;

    @Before
    public void setUp() {
        boards = createMockBoards.getMockBoards();
    }

    @Test
    public void saveBoard() {
        int totalSavedRow = 0;

        for (Board board : boards) {
            int savedRow = boardService.saveBoard(board);
            totalSavedRow++;
            assertThat(savedRow, is(1));
            assertThat(board.getBoardUid(), notNullValue());
            assertThat(board.getBoardUid(), not(0));
        }
        assertThat(totalSavedRow, is(3));
    }

    @Test
    public void getAllBoards() {
//        for (Board board : boards) {
//            int savedRow = boardService.saveBoard(board);
//        }

        List<Board> boards = boardService.getAllBoards();
        assertThat(boards.size(), is(3));
        assertThat(boards.get(0).getBoardAuthor(), notNullValue());
        assertThat(boards.get(1).getBoardAuthor(), notNullValue());
        assertThat(boards.get(2).getBoardAuthor(), notNullValue());
    }
}
