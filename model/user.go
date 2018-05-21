// model 是专门提供Restfull接口的路由请求处理handler
// 可以使用gorm等ORM工具来处理。为了代码简洁，这里使用原生sql处理。
// 用户数据处理
package model

import (
	"database/sql"
	"log"
)

type User struct {
	Uid      int    `json:"uid" form:"uid"`
	NickName string `json:"nick" form:"nick"`
	Summary  string `json:"summary" form:"summary"`
}

func (u *User) GetUser(uid int64) (usr User, err error) {

	users := User{}
	client := NewRedis()

	val, err := client.Get("user:" + string(uid)).Result()
	if err != nil {
		log.Println("GetUser from cache error:", val, err)
	}

	dbw := NewDb()

	defer dbw.Db.Close()

	var summary sql.NullString
	var nickename sql.NullString
	var id int

	//单行查询
	err = dbw.Db.
		QueryRow("select uid,nickename,summary from t_user where uid = ?", uid).
		Scan(&id, &nickename, &summary)

	if err != nil {
		log.Printf("Query data error: %v\n", err)
		return users, err
	}
	if !nickename.Valid {
		nickename.String = ""
	}
	if !summary.Valid {
		summary.String = ""
	}
	users = User{Uid: id, NickName: nickename.String, Summary: summary.String}
	return users, nil

}
