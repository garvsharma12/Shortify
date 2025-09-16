package com.url.shortify.service;

import com.url.shortify.models.User;
import com.url.shortify.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private UserService userService;

    @BeforeEach
    void setUp() {
        passwordEncoder = Mockito.mock(PasswordEncoder.class);
        userRepository = Mockito.mock(UserRepository.class);
        userService = new UserService(passwordEncoder, userRepository, null, null);

        when(passwordEncoder.encode(any())).thenAnswer(inv -> "ENC:" + inv.getArgument(0));
    }

    @Test
    void registerUser_invalidEmail_throws() {
        User user = new User();
        user.setUsername("john");
        user.setEmail("invalid-email");
        user.setPassword("secret123");

        Executable call = () -> userService.registerUser(user);
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, call);
        assertEquals("Invalid email format", ex.getMessage());
    }

    @Test
    void registerUser_duplicateUsername_throws() {
        User user = new User();
        user.setUsername("john");
        user.setEmail("john@example.com");
        user.setPassword("secret123");

        when(userRepository.existsByUsername("john")).thenReturn(true);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> userService.registerUser(user));
        assertEquals("Username already in use", ex.getMessage());
    }

    @Test
    void registerUser_duplicateEmail_throws() {
        User user = new User();
        user.setUsername("john");
        user.setEmail("john@example.com");
        user.setPassword("secret123");

        when(userRepository.existsByUsername("john")).thenReturn(false);
        when(userRepository.existsByEmail("john@example.com")).thenReturn(true);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> userService.registerUser(user));
        assertEquals("Email already in use", ex.getMessage());
    }

    @Test
    void registerUser_success_encodesPasswordAndSaves() {
        User user = new User();
        user.setUsername("john");
        user.setEmail("john@example.com");
        user.setPassword("secret123");

        when(userRepository.existsByUsername("john")).thenReturn(false);
        when(userRepository.existsByEmail("john@example.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        User saved = userService.registerUser(user);
        assertNotNull(saved);
        assertEquals("john", saved.getUsername());
        assertEquals("john@example.com", saved.getEmail());
        assertTrue(saved.getPassword().startsWith("ENC:"));
    }
}
