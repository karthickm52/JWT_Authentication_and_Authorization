package com.example.demo.repo;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.model.User;


public interface UserRepository extends  CrudRepository<User, Long>{
	
	User findByEmailAndPassword(String email,String password);

}
