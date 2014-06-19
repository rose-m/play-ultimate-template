name := "template"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  "play4jpa" %% "play4jpa" % "0.3-SNAPSHOT",
  "commons-codec" % "commons-codec" % "1.4",
  cache
)

javaOptions ++= Seq("-Xmx128M", "-Xmx512M", "-XX:MaxPermSize=512M")

play.Project.playJavaSettings
