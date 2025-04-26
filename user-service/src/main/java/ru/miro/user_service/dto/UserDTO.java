package ru.miro.user_service.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import ru.miro.user_service.model.Role;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO implements Serializable {

    @NotNull(message = "The first name shouldn't be empty")
    @Size(min = 2, max = 100, message = "The length of the first name should be from 2 to 100 characters")
    private String firstName;

    @NotNull(message = "The surname shouldn't be empty")
    @Size(min = 2, max = 100, message = "The length of the surname should be from 2 to 100 characters")
    private String surname;

    @NotNull(message = "The email shouldn't be empty")
    @Email(message = "The email should be match the format (example: ivan_ivanov@gmail.com)")
    private String email;

    @NotNull(message = "The password shouldn't be empty")
    private String password;

    private String qrCodeHash;

    private Role role;

}
