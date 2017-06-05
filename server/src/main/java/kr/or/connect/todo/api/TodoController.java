package kr.or.connect.todo.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//REST 로 주소를 지정하겠다
@RestController
public class TodoController {

	@GetMapping("/hello")
	String hello(){
		return  "Hello World";
	}
}
