package edu.eci.tdse.service;

import edu.eci.tdse.model.User;
import edu.eci.tdse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(String username, String rawPassword) {
        String hashedPassword = passwordEncoder.encode(rawPassword);
        User user = new User(username, hashedPassword);
        return userRepository.save(user);
    }

    public boolean validateUser(String username, String rawPassword) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            return passwordEncoder.matches(rawPassword, userOpt.get().getPassword());
        }
        return false;
    }
}