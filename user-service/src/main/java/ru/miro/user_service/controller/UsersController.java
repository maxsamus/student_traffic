package ru.miro.user_service.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.miro.user_service.dto.UserDTO;
import ru.miro.user_service.exception.UserNotCreatedException;
import ru.miro.user_service.mapper.UserMapper;
import ru.miro.user_service.model.User;
import ru.miro.user_service.service.QrCodeService;
import ru.miro.user_service.service.UsersService;
import ru.miro.user_service.util.UserDTOValidator;
import ru.miro.user_service.model.Role;

import java.awt.image.BufferedImage;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;
    private final UserDTOValidator userDTOValidator;
    private final QrCodeService qrCodeService;
    private final UserMapper userMapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<User> getUsers() {
        return usersService.findAll();
    }

    @GetMapping("/get-user-by-id/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User getUser(@PathVariable("id") long id) {
        return usersService.findOne(id);
    }

    @GetMapping("/get-user-by-email/{email}")
    @ResponseStatus(HttpStatus.OK)
    public User getUserByEmail(@PathVariable("email") String email) {
        return usersService.findOne(email);
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public HttpStatus createUser(@RequestBody @Valid UserDTO userDTO, BindingResult bindingResult) {
        userDTOValidator.validate(userDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder();
            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError error : errors) {
                errorMessage
                        .append(error.getField())
                        .append(" - ")
                        .append(error.getDefaultMessage())
                        .append("; ");
            }

            throw new UserNotCreatedException(errorMessage.toString());
        }

        usersService.save(userDTO);
        return HttpStatus.CREATED;
    }

    @PatchMapping("/{id}/update")
    @ResponseStatus(HttpStatus.OK)
    public HttpStatus updateUser(@PathVariable("id") long id,
                                 @RequestBody UserDTO userDTO) {
        usersService.update(id, userDTO);
        return HttpStatus.OK;
    }

    @DeleteMapping("/{id}/delete")
    @ResponseStatus(HttpStatus.OK)
    public HttpStatus deleteUser(@PathVariable("id") long id) {
        usersService.delete(id);
        return HttpStatus.OK;
    }

    @PatchMapping("/{id}/change-role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDTO> changeUserRole(
            @PathVariable Long id,
            @RequestParam Role newRole) {

        UserDTO updatedUser = usersService.changeRole(id, newRole);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping(value = "/{userId}/qr-code", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<BufferedImage>  getUserQrCode(@PathVariable Long userId) throws Exception {
        User user = usersService.findOne(userId);

        if (user.getQrCodeHash() == null) {
            String qrContent = qrCodeService.generateUniqueQrContent(userId);
            user.setQrCodeHash(qrContent);
            usersService.update(userId, userMapper.toDTO(user));
        }

        BufferedImage qrImage = qrCodeService.generateQrCodeImage(user.getQrCodeHash());

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=user_" + userId + "-qr.png")
                .body(qrImage);
    }

    @GetMapping("/verify-qr/{qrContent}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> verifyQrCode(@PathVariable String qrContent) {
        User user = usersService.findByQrCodeHash(qrContent);

        return ResponseEntity.ok(Map.of(
                "status", "VALID",
                "user", userMapper.toDTO(user),
                "message", "QR код подтвержден"
        ));
    }

}
