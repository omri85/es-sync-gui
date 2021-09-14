@echo off
@REM set LOGSTASH_FILE=%1
@REM echo %LOGSTASH_FILE%
@REM copy %LOGSTASH_FILE% logstash.conf

docker build -t logstash-postgres .
docker tag logstash-postgres omril/logstash-postgres
docker push omril/logstash-postgres