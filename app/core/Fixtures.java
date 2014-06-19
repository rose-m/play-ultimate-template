/*
 * Copyright (c) 2014 Michael Rose
 */

package core;

import com.play4jpa.fixy.Fixy;
import com.play4jpa.fixy.JpaFixyBuilder;
import play.Logger;
import play.Play;
import play.db.jpa.JPA;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.util.ArrayList;
import java.util.List;

import static utils.Functions.isTestOrDevOrFail;

/**
 * Created by rosem on 07.03.14.
 */
public class Fixtures {

    private EntityManager em;

    private EntityTransaction tx;

    private List<String> fixtures;

    public static String[] pathsForFixtureNames(List<String> names) {
        List<String> fixtureNames = new ArrayList<>();
        for (String name : names) {
            fixtureNames.add("fixtures/" + name + ".yaml");
        }
        return fixtureNames.toArray(new String[0]);
    }

    public void init() {
        isTestOrDevOrFail();
        fixtures = Play.application().configuration().getStringList("fixtures");
    }

    public void load() {
        if (fixtures == null || fixtures.size() == 0) {
            Logger.debug("No fixtures to load");
            return;
        }

        Logger.debug("Loading fixtures");
        openTransaction();
        Fixy fixy = new JpaFixyBuilder(JPA.em()).build();
        fixy.load(pathsForFixtureNames(fixtures));
        closeTransaction();
        Logger.debug("Fixtures loaded successfully.");
    }

    protected void openTransaction() {
        em = JPA.em("default");
        if (em == null) {
            Logger.error("Could not get JPA EntityManager");
        } else {
            Logger.debug("Found entity manager: {}", em);
        }

        JPA.bindForCurrentThread(em);
        tx = em.getTransaction();
        tx.begin();
        Logger.debug("Opened transaction");
    }

    protected void closeTransaction() {
        if (tx != null) {
            if (tx.isActive()) {
                if (tx.getRollbackOnly()) {
                    tx.rollback();
                } else {
                    tx.commit();
                }
            }

        }
        JPA.bindForCurrentThread(null);
        if (em != null) {
            em.close();
        }
        Logger.debug("Closed transaction");
    }

}
