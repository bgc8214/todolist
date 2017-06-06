package kr.or.connect.todo.persistence;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.assertThat;

import java.util.Collection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.todo.domain.Todo;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class TodoDaoTest {

	@Autowired
	private TodoDao dao;

	@Test
	public void shouldSelectAll() {
		Collection<Todo> todoList = dao.selectAll();

		// null이 아닌 것을 확인
		assertThat(todoList.size(), is(notNullValue()));
	}
}
