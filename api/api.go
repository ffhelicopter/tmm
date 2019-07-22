// api 是专门提供RESTful接口的路由请求处理handler
// 除了GET方法，也支持POST,PUT,DELETE,OPTION等常用的restful方法

package api

import (
	"net/http"

	"github.com/ffhelicopter/tmm/model"
	"github.com/gin-gonic/gin"
)

func GetUser(c *gin.Context) {
	//CORS 局部CORS，可在路由中设置全局的CORS
	c.Writer.Header().Add("Access-Control-Allow-Origin", "*")
	c.Next()

	//一：
	//v1.GET("/user/:id/*action", api.GetUser)
	//冒号:加上一个参数名组成路由参数。可以使用c.Params的方法读取其值。注意请求末尾不能加"/"，不能匹配
	//除了:，gin还提供了*号处理参数，*号能匹配的规则就更多。
	//"/user/:id/*action" 这里最基本的访问是/user/111/。注意末尾有"/"
	// 取*后参数 action := c.Param("action")

	//二：
	//web提供的服务通常是client和server的交互。其中客户端向服务器发送请求，除了路由参数，
	//其他的参数无非两种，查询字符串query string和报文体body参数。
	//所谓query string，即路由用，用?以后连接的key1=value2&key2=value2的形式的参数。
	//当然这个key-value是经过urlencode编码。

	//三：
	//query string,对于参数的处理，经常会出现参数不存在的情况，提供默认值处理：
	//firstname := c.DefaultQuery("firstname", "Guest")
	//lastname := c.Query("lastname")
	//注意默认值是指参数没有出现在url中，如果出现但没有值，则为空字符串。

	//四：
	//body http的报文体传输数据就比query string稍微复杂一点，常见的格式就有四种。
	//例如application/json，application/x-www-form-urlencoded, application/xml和multipart/form-data。
	//后面一个主要用于图片上传。json格式的很好理解，urlencode其实也不难，无非就是把query string的内容，
	//放到了body体里，同样也需要urlencode。默认情况下，c.PostFROM解析的是x-www-form-urlencoded或
	//from-data的参数。
	// message := c.PostForm("message")
	//nick := c.DefaultPostForm("nick", "anonymous")
	//post方法也提供了处理默认参数的情况。同理，如果参数不存在，将会得到空字串。

	//五：
	/*
		//嵌套的json，只要嵌套gin.H就可以了。
		   c.JSON(http.StatusOK, gin.H{
		               "status":  gin.H{
		                   "status_code": http.StatusOK,
		                   "status":      "ok",
		               },
		               "message": message,
		               "nick":    nick,
		           })
	*/
	//uid := c.Param("id")

	users := &model.User{}
	us, _ := users.GetUser(int64(1100000))

	c.JSON(http.StatusOK, us)

	//六：
	//发送数据给服务端，并不是post方法才行，put方法一样也可以。
	//同时querystring和body也不是分开的，两个同时发送也可以。
	/*
		router.PUT("/post", func(c *gin.Context) {
			id := c.Query("id")
			page := c.DefaultQuery("page", "0")
			name := c.PostForm("name")
			message := c.PostForm("message")
			fmt.Printf("id: %s; page: %s; name: %s; message: %s \n", id, page, name, message)
			c.JSON(http.StatusOK, gin.H{
				"status_code": http.StatusOK,
			})
		})
	*/

	//七：
	//参数绑定
	//我们已经见识了x-www-form-urlencoded类型的参数处理，现在越来越多的应用习惯使用JSON来通信，
	//也就是无论返回的response还是提交的request，其content-type类型都是application/json的格式。
	//而对于一些旧的web表单页还是x-www-form-urlencoded的形式，这就需要我们的服务器能改hold住这多种
	//content-type的参数了。
	//可以看到，结构体中，设置了binding标签的字段（username和passwd），如果没传会抛错误。非banding的字段（age），
	//对于客户端没有传，User结构会用零值填充。对于User结构没有的参数，会自动被忽略。
	//这里结构体如内嵌将不能正常bind，一句话要bind就不要使用内嵌
	/*
	   package main

	   type User struct {
	   	Username string `form:"username" json:"username" binding:"required"`
	   	Passwd   string `form:"passwd" json:"passwd" bdinding:"required"`
	   	Age      int    `form:"age" json:"age"`
	   }

	   func main() {
	   	router := gin.Default()
	   	router.POST("/login", func(c *gin.Context) {
	   		var user User
	   		var err error
	   		contentType := c.Request.Header.Get("Content-Type")
	   		switch contentType {
	   		case "application/json":
	   			err = c.BindJSON(&user)
	   		case "application/x-www-form-urlencoded":
	   			err = c.BindWith(&user, binding.Form)
	   		}
	   		if err != nil {
	   			fmt.Println(err)
	   			log.Fatal(err)
	   		}
	   		c.JSON(http.StatusOK, gin.H{
	   			"user":   user.Username,
	   			"passwd": user.Passwd,
	   			"age":    user.Age,
	   		})
	   	})
	   }
	*/

	//
	//当然，gin还提供了更加高级方法，c.Bind，它会更加content-type自动推断是bind表单还是json的参数。
	/*
		router.POST("/login", func(c *gin.Context) {
			var user User
			err := c.Bind(&user)
			if err != nil {
				fmt.Println(err)
				log.Fatal(err)
			}
			c.JSON(http.StatusOK, gin.H{
				"username": user.Username,
				"passwd":   user.Passwd, "age": user.Age,
			})
		})
	*/

	// c.ShouldBind c.ShouldBindBodyWith 这两个消耗c.Request.Body。 他们也可以使用，但不能多次调用。
	// 由于c.ShouldBindBodyWith在bind前会存储body到context，性能有影响，但是只对于
	// JSON, XML, MsgPack, ProtoBuf格式。
	// Query, Form, FormPost, FormMultipart 等格式，可以多次调用，性能也不受影响。
	/*
		if errA := c.ShouldBindBodyWith(&objA, binding.JSON); errA == nil {
		  c.String(http.StatusOK, `the body should be formA`)
		  // At this time, it reuses body stored in the context.
		} else if errB := c.ShouldBindBodyWith(&objB, binding.JSON); errB == nil {
		  c.String(http.StatusOK, `the body should be formB JSON`)
		  // And it can accepts other formats
		} else if errB2 := c.ShouldBindBodyWith(&objB, binding.XML); errB2 == nil {
		  c.String(http.StatusOK, `the body should be formB XML`)
		} else {
		  ...
		}
	*/

	//九：
	//多格式渲染
	//既然请求可以使用不同的content-type，响应也如此。通常响应会有html，text，plain，json和xml等。
	//gin提供了很优雅的渲染方法。主要有c.String， c.JSON，c.HTML，c.XML。

	//十：
	//重定向
	//c.Redirect(http.StatusMovedPermanently, "https://google.com")

	//十一：
	// 异步 gin里可以借助协程实现异步任务。因为涉及异步过程，请求的上下文需要copy到异步的上下文，并且这个上下文是只读的。
	// 某些情况下非常有用，后面会看到这方面的应用
	/*
		cCp := c.Copy()
		go func() {
			time.Sleep(5 * time.Second)
			log.Println("Done! in path" + cCp.Request.URL.Path)
		}()
	*/

}
