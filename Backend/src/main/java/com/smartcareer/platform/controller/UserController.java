package com.smartcareer.platform.controller;

import com.smartcareer.platform.entity.User;
import com.smartcareer.platform.service.UserService;
import com.smartcareer.platform.security.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    // ✅ Declare variables ONCE at top
    private final UserService userService;
    private final JwtUtil jwtUtil;

    // ✅ Correct constructor
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Backend is running");
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user){
        try {
            User created = userService.createUser(user);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("error", "Email already exists"));
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

        Optional<User> user = userService.login(email, password);

        if(user.isPresent()){
            String token = jwtUtil.generateToken(email);

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "id", user.get().getId(),
                    "name", user.get().getName()
            ));
        }

        return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
    }
}