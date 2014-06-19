/*
 * Copyright (c) 2014 Michael Rose
 */

package core;

import play.Application;
import play.GlobalSettings;
import play.Logger;
import play.Play;

/**
 * Created by rosem on 19.02.14.
 */
public class Global extends GlobalSettings {

    @Override
    public void onStart(Application application) {
        if (Play.isDev()) {
            Logger.info("Loading default fixtures...");
            Fixtures fixtures = new Fixtures();
            fixtures.init();
            fixtures.load();
            Logger.info("Default fixture loading finished.");
        }
    }

    @Override
    public void onStop(Application application) {
    }
}
