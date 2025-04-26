package ru.miro.user_service.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QrCodeService {

    private static final String QR_CODE_PREFIX = "USER_";
    private static final int QR_CODE_SIZE = 300;

    public BufferedImage generateQrCodeImage(String qrContent) throws WriterException, IOException {
        QRCodeWriter writer = new QRCodeWriter();
        BitMatrix bitMatrix = writer.encode(qrContent, BarcodeFormat.QR_CODE, QR_CODE_SIZE, QR_CODE_SIZE);

        return MatrixToImageWriter.toBufferedImage(bitMatrix);
    }

    public String generateUniqueQrContent(Long userId) {
        return QR_CODE_PREFIX + userId + "_" + UUID.randomUUID();
    }

}
