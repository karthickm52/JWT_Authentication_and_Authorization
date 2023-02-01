package com.example.demo.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
	
	private String secret="This is secret";
	private static final int TOKEN_VALIDITY = 10;
	public String generateJwt(User user) {
		
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyy HH:mm:ss");  
		   LocalDateTime now = LocalDateTime.now();  
		   String sss=dtf.format(now);
		
		Map<String,Object> claims = new HashMap<String,Object>();
		claims.put("role", user.getRole());
		claims.put("id", user.getId());
		claims.put("email", user.getEmail());
		claims.put("name", user.getFirstname());
		String ss=Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY * 1000))
				.signWith(SignatureAlgorithm.HS512, secret)
				.compact();
		

		
		return ss;
		
	
	}
}
