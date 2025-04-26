package ru.miro.user_service.exception;

public class QrCodeNotFoundException extends RuntimeException {

    public QrCodeNotFoundException(String hash) {
        super("The qr-code with this hash" + hash + " is not found");
    }

}
