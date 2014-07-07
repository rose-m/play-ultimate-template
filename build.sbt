import play.Project._

name := "template"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaCore,
  javaJdbc,
  javaJpa.exclude("org.hibernate.javax.persistence", "hibernate-jpa-2.0-api"),
  "org.hibernate" % "hibernate-entitymanager" % "4.3.5.Final",
  "commons-codec" % "commons-codec" % "1.4",
  cache
)

javaOptions ++= Seq("-Xmx128M", "-Xmx512M", "-XX:MaxPermSize=512M")

play.Project.playJavaSettings
