/*
 * Copyright (c) 2014 Michael Rose
 */

package utils;

import org.apache.commons.codec.binary.Base64;
import play.Play;

import java.security.SecureRandom;
import java.util.Random;

/**
 * Created by rosem on 03.03.14.
 */
public class Functions {

    private static final Random rand = new SecureRandom();

    private static final Base64 base64 = new Base64(0, new byte[0], true);

    public static void isTestOrDevOrFail() {
        if (!isTestOrDev()) {
            throw new IllegalStateException("Manipulation only allowed during test or development");
        }
    }

    public static boolean isTestOrDev() {
        return Play.isTest() || Play.isDev();
    }

    public static String generateUrlSafeSecureRandom32() {
        byte[] next = new byte[24];
        rand.nextBytes(next);
        return base64.encodeToString(next);
    }
}
