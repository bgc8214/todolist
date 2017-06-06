package kr.or.connect.todo.domain;

import java.util.Date;

public class Todo {
	private Integer id;
	private String todo;
	private Integer completed;
	private Date date;
	
	
	
	public Todo(String todo, Integer completed) {
		super();
		this.todo = todo;
		this.completed = completed;
	}
	public Todo() {
		super();
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTodo() {
		return todo;
	}
	public void setTodo(String todo) {
		this.todo = todo;
	}
	public Integer isCompleted() {
		return completed;
	}
	public void setCompleted(Integer completed) {
		this.completed = completed;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	@Override
	public String toString() {
		return "Todo [id=" + id + ", todo=" + todo + ", completed=" + completed + ", date=" + date + "]";
	}
}
