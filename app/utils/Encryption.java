/*
 * Copyright (c) 2014 Michael Rose
 */

package utils;

import com.google.common.base.Strings;
import org.apache.commons.codec.binary.Base64;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

/**
 * Created by rosem on 21.02.14.
 */
public class Encryption {

    public static final int SALT_BYTE_SIZE = 18;

    public static final String ALGORITHM = "SHA-512";

    public static final int DIGEST_ITERATIONS = 1000;

    private static final Random rand = new SecureRandom();

    private static final MessageDigest digester;

    static {
        try {
            digester = MessageDigest.getInstance(ALGORITHM);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("Could not initialize encryption digester");
        }
    }

    private static final Base64 base64 = new Base64(0, new byte[0]);

    public static String createSalt() {
        byte[] salt = new byte[SALT_BYTE_SIZE];
        rand.nextBytes(salt);
        return base64.encodeToString(salt);
    }

    public static String encryptPassword(String password, String salt) {
        if (Strings.isNullOrEmpty(password) || Strings.isNullOrEmpty(salt)) {
            throw new IllegalArgumentException("all parameters must be non-empty strings");
        }

        byte[] passwordBytes = password.getBytes();
        byte[] saltBytes = base64.decode(salt);
        byte[] saltAndPassword = appendBytes(saltBytes, passwordBytes);

        byte[] encrypted = saltAndPassword;
        for (int i = 0; i < DIGEST_ITERATIONS; i++) {
            encrypted = digester.digest(saltAndPassword);
        }

        return base64.encodeToString(encrypted);
    }

    public static byte[] appendBytes(byte[] first, byte[] second) {
        byte[] combined = new byte[first.length + second.length];
        System.arraycopy(first, 0, combined, 0, first.length);
        System.arraycopy(second, 0, combined, first.length, second.length);
        return combined;
    }

    public static boolean verifyPassword(String password, String hashed, String salt) {
        if (Strings.isNullOrEmpty(password) || Strings.isNullOrEmpty(hashed) || Strings.isNullOrEmpty(salt)) {
            throw new IllegalArgumentException("all parameters must be non-empty strings");
        }

        return hashed.equals(encryptPassword(password, salt));
    }
}
