package kr.or.connect.todo.service;

import java.util.Collection;

import org.springframework.stereotype.Service;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

@Service
public class TodoService {
	private TodoDao dao;

	public TodoService(TodoDao dao) {
		this.dao = dao;
	}

	public Todo create(Todo todo) {
		Integer id = dao.insert(todo);
		todo.setId(id); 
		return todo;
	}

	public Collection<Todo> findAll() {
		return dao.selectAll();
	}
	
	public int deleteById(Integer id){
		int cnt = dao.deleteById(id);
		return cnt;
	}
	
	public int deleteByCompleted(Integer completed){
		int cnt = dao.deleteByCompleted(completed);
		return cnt;
	}
	
	public int updateOne(Todo todo){
		int cnt = dao.updateOne(todo);
		return cnt;
	}

}