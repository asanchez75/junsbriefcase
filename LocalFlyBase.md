# Install Postgres #

The installation is very straightforward. But before creating the flybase database, the /etc/postgresql/8.4/main/postgresql.conf file must be edited, by adding the following lines:

```
local   all         all                               password
host     all     all    127.0.0.1/32    password
host     all     all    ::1/128         password
```

Then restart the server:
```
/etc/init.d/postgresql-8.4 restart
```

Then in the system console (not the psql console), run the following command:
```
 sudo -u postgres createuser -D -A -P testuser
 sudo -u postgres createdb -E UTF-8 -O testuser testdb
```

To test this works, run
```
psql -U testuser  -d testdb
```

When load the flybase dumps, run the following command:
```
cat FB2009_10.sql.gz.00 FB2009_10.sql.gz.01 | gunzip | psql -U testuser -d testdb
```