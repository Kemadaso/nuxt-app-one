
db.createUser({user: "dev001", pwd: "3653328", roles:[{role: "userAdminAnyDatabase", db: "admin"}]})


db.createUser({user: "dev001", pwd: "3653328", roles:[{role: "read", db: "user-data"}, {role:"readWrite", db: "exampleDB"}]})


db.createUser({user: "dev001", pwd: "3653328", roles:[{role:"readWrite", db: "exampleDB"}]})



mongo -u dev001 -p --authenticationDatabase admin



mongo "mongodb://dev001:3653328@localhost/exampleDB?authSource=admin"
mongo "mongodb://dev001:3653328@localhost/aburrido?authSource=admin"
mongo "mongodb://username:password@localhost/DBNAME?authSource=admin"


db # name of the current database\
use dbname # switch to database


show collections
show tables
db.getCollectionNames()

show databases
show dbs

use <db>    // Switch current database to <db>. The mongo shell variable db is set to the current database.
show collections    //Print a list of all collections for current database.
show users  //Print a list of users for current database.
show roles  //Print a list of all roles, both user-defined and built-in, for the current database.



# to kill proccess

pkill firefox or killall firefox





How to benchmark an HTTP/HTTPS service using AB (Apache Benchmark) command line tool
```
ab -n 20000 -c 150 http://misite.com/

bombardier -c 125 -n 20000 http://misite.com/
ab -n 20000 -c 800 http://localhost:5000/test/model

```