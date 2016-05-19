import com.bookstore.Application;
import com.bookstore.user.dao.UserDao;
import com.bookstore.user.domain.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
public class UserCRUDTest {
    @Autowired
    UserDao userDao;

    /**
     * 사용자 저장
     */
    @Test
    public void saveUser() {
        User blackWidow = new User();
        blackWidow.setEmail("BlackWidow@bookstore.com");
        blackWidow.setName("BlackWidow");

        int savedRows = userDao.saveUser(blackWidow);

        assertThat(savedRows, is(1));
        assertThat(blackWidow.getUserUid(), is(3));
    }

    @Test
    public void saveUser_null() {
        User blackWidow = new User();
        blackWidow.setName("BlackWidow");

        int savedRows = userDao.saveUser(blackWidow);

        assertThat(savedRows, is(1));
        assertThat(blackWidow.getUserUid(), is(3));
        assertThat(blackWidow.getEmail(), is(nullValue()));
    }

    /**
     * 사용자 목록 조회
     */
    @Test
    public void findAllUser() {
        List<User> userList = userDao.findAllUser();

        assertThat(userList.size(), is(2));
        assertThat(userList.get(0).getName(), is("IronMan"));
        assertThat(userList.get(1).getName(), is("CaptainAmerica"));
    }

    /**
     * 사용자 조회
     */
    @Test
    public void findUserByUserUid() {
        int userUid = 1;
        User ironMan = userDao.findUserByUserUid(userUid);
        assertThat(ironMan.getUserUid(), is(1));
        assertThat(ironMan.getName(), is("IronMan"));
    }

    /**
     * 사용자 수정
     */
    @Test
    public void updateUser() {
        User ironMan = new User();
        ironMan.setUserUid(1);
        ironMan.setName("SuperIronMan");
        ironMan.setEmail("SuperIronMan@bookstore.com");

        int updatedRows = userDao.updateUser(ironMan);
        assertThat(updatedRows, is(1));
        assertThat(ironMan.getUserUid(), is(1));

        User superIronMan = userDao.findUserByUserUid(ironMan.getUserUid());
        assertThat(superIronMan.getName(), is("SuperIronMan"));
        assertThat(superIronMan.getEmail(), is("SuperIronMan@bookstore.com"));
        assertThat(superIronMan.getUserUid(), is(1));
    }

    /**
     * 사용자 삭제
     */
    @Test
    public void deleteUser() {
        int captainAmeriaUid = 2;

        int deleteRows = userDao.deleteUser(captainAmeriaUid);
        List<User> userList = userDao.findAllUser();

        assertThat(deleteRows, is(1));
        assertThat(userList.size(), is(1));
        assertThat(userList.get(0).getName(), is("IronMan"));
    }
}
