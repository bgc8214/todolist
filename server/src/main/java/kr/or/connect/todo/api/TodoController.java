package kr.or.connect.todo.api;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.service.TodoService;

//REST 로 주소를 지정하겠다
@RestController
// prefix 지정
@RequestMapping("/api/todos")
public class TodoController {

	private final TodoService service;

	@Autowired
	public TodoController(TodoService service) {
		this.service = service;
	}

	@GetMapping
	Collection<Todo> readTodoList() {
		System.out.println("Read All");
		return service.findAll();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	Todo createTodo(@RequestBody Todo Todo) {
		System.out.println("make : " + Todo);
		Todo newTodo = service.create(Todo);
		System.out.println("new : " + newTodo);
		return newTodo;
	}

}
