package ru.miro.user_service.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {

    @Id
    @Column(name = "userId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "firstName")
    @NotNull(message = "The first name shouldn't be empty")
    @Size(min = 2, max = 100, message = "The length of the first name should be from 2 to 100 characters")
    private String firstName;

    @Column(name = "surname")
    @NotNull(message = "The surname shouldn't be empty")
    @Size(min = 2, max = 100, message = "The length of the surname should be from 2 to 100 characters")
    private String surname;

    @Column(name = "email", unique = true)
    @NotNull(message = "The email shouldn't be empty")
    @Email(message = "The email should be match the format (example: ivan_ivanov@gmail.com)")
    private String email;

    @Column(name = "password")
    @NotNull(message = "The password shouldn't be empty")
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "qrCodeHash", unique = true)
    private String qrCodeHash;

    private Long createdAt;
    private Long updatedAt;

}
