package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.stream.Stream;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepository;
import com.example.demo.service.UserService;



@SpringBootTest
class LoginUsersApplicationTests {

	@Autowired(required=true)
	private UserService service;

	@MockBean
	private UserRepository repository;
	
	@Test
	public void getAllUsersTest() {
		when(repository.findAll()).thenReturn(Stream
				.of(new User(1,"kkk","user","abc@gmail.com","male","123456","9791427101"),
				new User(2,"kkk","user","abcd@gmail.com","male","123456","9791427101"))
				.collect(Collectors.toList()));
		assertEquals(2,service.getUsers().size());
	}

	@Test
	public void getUserbyEmailTest() {
		String email = "abc@gmail.com";
		String password ="123456";
		User user = new User(1,"kkk","user","abc@gmail.com","male","123456","9791427101");
		when(repository.findByEmailAndPassword(email,password)).thenReturn(user);
		assertEquals(user, service.authenticateUser(email,password));
	}

	@Test
	public void saveUserTest() {
		User user = new User(1,"kkk","user","abc@gmail.com","male","123456","9791427101");
		when(repository.save(user)).thenReturn(user);
		assertEquals(user, service.saveUser(user));
	}
	@Test
	public void deleteUserTest() {
		User user = new User(1,"kkk","user","abc@gmail.com","male","123456","9791427101");
	
		service.deleteUser(user);
		verify(repository, times(1)).delete(user);
	}

}
