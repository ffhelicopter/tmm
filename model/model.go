// 数据库初始化，建立连接
package model

import (
	"database/sql"

	"github.com/go-redis/redis"

	_ "github.com/go-sql-driver/mysql"
)

type DbWorker struct {
	dsn string
	Db  *sql.DB
}

func NewDb() DbWorker {
	dbw := DbWorker{dsn: "root:123456@tcp(localhost:3306)/media?charset=utf8mb4"}
	//支持下面几种DSN写法，具体看mysql服务端配置，常见为第2种
	//user@unix(/path/to/socket)/dbname?charset=utf8
	//user:password@tcp(localhost:5555)/dbname?charset=utf8
	//user:password@/dbname
	//user:password@tcp([de:ad:be:ef::ca:fe]:80)/dbname

	dbtemp, _ := sql.Open("mysql", dbw.dsn)
	dbw.Db = dbtemp
	return dbw
}

func NewRedis() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})
	return client
}
