package com.example.demo.controllerClass;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.JwtRequest;
import com.example.demo.model.JwtResponse;
import com.example.demo.model.JwtUtil;
import com.example.demo.model.User;
import com.example.demo.repo.UserRepository;
import com.example.demo.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class usersController {
	@Autowired
    private UserService service;
	
	@Autowired
	JwtUtil jwtUtil;
	

    @GetMapping("/users")
    public List<User> getUsers() {
        return (List<User>) service.getUsers();
    }

    @PostMapping("/save") 
    public User saveUser(@RequestBody User user) { 
    	
         return service.saveUser(user);
    }   
    
    @GetMapping("findById/{id}")  
    public User findByID(@PathVariable("id") Long id,User user) {  
        return service.getById(id).get();
        
    }  

    @GetMapping("authenticate/{email}/{password}")  
    public JwtResponse authenticate(@PathVariable("email") String email,@PathVariable("password") String password, User user) {  
        String token=jwtUtil.generateJwt(service.authenticateUser(email,password));
        JwtResponse jwtResponse=new JwtResponse();
        jwtResponse.setJwtToken(token);
        jwtResponse.setUser(service.authenticateUser(email,password));
    	return jwtResponse;
    }  
	
    @DeleteMapping("delete/{id}")  
    public void deleteById(@PathVariable("id") Long id,User user) {  
    	service.deleteUser(user);
    } 
}
