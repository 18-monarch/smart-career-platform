package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.User;
import com.smartcareer.platform.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Backend is running");
    }

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user){
        System.out.println("Registration attempt for email: " + user.getEmail());
        try {
            User created = userService.createUser(user);
            System.out.println("User created successfully: " + created.getEmail());
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            System.err.println("Registration failed for " + user.getEmail() + ": " + e.getMessage());
            return ResponseEntity.status(400).body(Map.of("error", "Email already exists or invalid data"));
        }
    }

    @GetMapping
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials){
        String email = credentials.get("email");
        String password = credentials.get("password");
        System.out.println("Login attempt for email: [" + email + "]");
        
        Optional<User> user = userService.login(email, password);
        if(user.isPresent()){
            System.out.println("Login success for: " + email);
            return ResponseEntity.ok(Map.of(
                "id", user.get().getId(),
                "name", user.get().getName(),
                "email", user.get().getEmail()
            ));
        } else {
            System.out.println("Login failed: Invalid credentials for " + email);
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        }
    }
}