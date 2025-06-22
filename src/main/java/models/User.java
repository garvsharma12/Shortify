package models;

import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String username;
    private String role = "USER_ROLE";

}
