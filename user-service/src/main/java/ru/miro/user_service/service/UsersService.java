package ru.miro.user_service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.miro.user_service.dto.UserDTO;
import ru.miro.user_service.exception.QrCodeNotFoundException;
import ru.miro.user_service.exception.UserNotFoundException;
import ru.miro.user_service.mapper.UserMapper;
import ru.miro.user_service.model.Role;
import ru.miro.user_service.model.User;
import ru.miro.user_service.repository.UsersRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UsersService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public List<User> findAll() {
        return usersRepository.findAll();
    }

    public User findOne(long userId) {
        return usersRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));
    }

    public User findOne(String email) {
        return usersRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
    }

    public User findByQrCodeHash(String qrCodeHash) {
        return usersRepository.findByQrCodeHash(qrCodeHash).orElseThrow(() -> new QrCodeNotFoundException(qrCodeHash));
    }

    @Transactional
    public void save(UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);
        enrichCreatedUser(user);

        usersRepository.save(user);
    }

    @Transactional
    public void update(long id, UserDTO userDTO) {
        Optional<User> user = usersRepository.findById(id);

        if (user.isEmpty()) {
            throw new UserNotFoundException(id);
        }

        User updatedUser = userMapper.updateFromDto(userDTO, user.get());
        enrichUpdatedUser(updatedUser);

        usersRepository.save(updatedUser);
    }

    @Transactional
    public void delete(long id) {
        if (usersRepository.findById(id).isEmpty()) {
            throw new UserNotFoundException(id);
        }

        usersRepository.deleteById(id);
    }

    public UserDTO changeRole(Long userId, Role newRole) {
        User user = usersRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        user.setRole(newRole);
        return userMapper.toDTO(usersRepository.save(user));
    }

    /**
     * Replace password by encrypted password, set role User and add createdAt, updatedAt timestamp
     * for a user, which is being created
     * @param user
     */
    private void enrichCreatedUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        user.setCreatedAt(System.currentTimeMillis());
        user.setUpdatedAt(System.currentTimeMillis());
    }

    /**
     * Set updatedAt for a refreshed user
     * @param user
     */
    private void enrichUpdatedUser(User user) {
        user.setUpdatedAt(System.currentTimeMillis());
    }

}
