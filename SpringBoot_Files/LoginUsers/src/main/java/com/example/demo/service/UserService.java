package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository repo;
	

	public User saveUser(User user) {
		return repo.save(user);
		
	}

	public List<User> getUsers() {
		List<User> users = (List<User>) repo.findAll();
		return users;
	}
	
	public Optional<User> getById(Long Id) {
		return repo.findById(Id);
	}

	public User authenticateUser(String email,String password) {
		return repo.findByEmailAndPassword(email,password);
	}

	public void deleteUser(User user) {
		repo.delete(user);
	}
	
	
}
