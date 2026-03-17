package com.smartcareer.platform.service;

import com.smartcareer.platform.entity.User;
import com.smartcareer.platform.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public Optional<User> login(String email, String password){
        return userRepository.findByEmail(email)
                .filter(u -> u.getPassword().equals(password));
    }
}