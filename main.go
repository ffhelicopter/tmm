// 原创多媒体内容发布，内容存储在IPFS上

package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/ffhelicopter/tmm/api"
	"github.com/ffhelicopter/tmm/handler"

	"github.com/gin-gonic/gin"
)

// 定义全局的CORS中间件
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Add("Access-Control-Allow-Origin", "*")
		c.Next()
	}
}

func main() {
	router := gin.Default()

	// 静态资源加载，本例为css,js以及资源图片
	router.StaticFS("/public", http.Dir("D:/goproject/src/github.com/ffhelicopter/tmm/website/static"))
	router.StaticFile("/favicon.ico", "./resources/favicon.ico")

	// 导入所有模板，多级目录结构需要这样写
	router.LoadHTMLGlob("website/tpl/*/*")
	// 也可以根据handler，实时导入模板。
	// 还可以在初始init()统一导入所有模板，避免访问量高发时服务器IO资源过高

	// website分组
	v := router.Group("/")
	{

		v.GET("/index.html", handler.IndexHandler)
		v.GET("/add.html", handler.AddHandler)
		v.POST("/postme.html", handler.PostmeHandler)
	}

	// 中间件 golang的net/http设计的一大特点就是特别容易构建中间件。
	// gin也提供了类似的中间件。需要注意的是中间件只对注册过的路由函数起作用。
	// 对于分组路由，嵌套使用中间件，可以限定中间件的作用范围。大致分为全局中间件，单个路由中间件和群组中间件。

	// 使用全局CORS中间件。
	// router.Use(Cors())
	// 即使是全局中间件，在use前的代码不受影响
	// 也可在handler中局部使用，见api.GetUser

	// 身份认证中间件，对于API，我们可以考虑JSON web tokens

	// API分组(RESTFULL)以及版本控制
	v1 := router.Group("/v1")
	{
		// 下面是群组中间的用法
		// v1.Use(Cors())

		// 单个中间件的用法
		// v1.GET("/user/:id/*action",Cors(), api.GetUser)

		v1.GET("/user/:id/*action", api.GetUser)
		// AJAX OPTIONS ，下面是有关OPTIONS用法的示例
		// v1.OPTIONS("/users", OptionsUser)      // POST
		// v1.OPTIONS("/users/:id", OptionsUser)  // PUT, DELETE
		/*
			// 对应的handler中增加处理
			func OptionsUser(c *gin.Context) {
			    c.Writer.Header().Set("Access-Control-Allow-Methods", "DELETE,POST,PUT")
			    c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			    c.Next()
				...
			}

		*/
	}

	// 前端走代理的话，不同分组可以考虑拆分为不同子域名

	// Listen and serve on 0.0.0.0:8080
	// router.Run(":80") 这样写就可以了，下面所有代码（go1.8+）是为了优雅处理重启等动作。可根据实际情况选择。

	srv := &http.Server{
		Addr:         ":80",
		Handler:      router,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	go func() {
		// service connections
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	// 优雅Shutdown（或重启）服务
	// 5秒后优雅Shutdown服务
	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt) //syscall.SIGKILL
	<-quit
	log.Println("Shutdown Server ...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server Shutdown:", err)
	}
	log.Println("Server exiting")

	// 1.fvbock/endless endless.ListenAndServe(":80", router) 能优雅restart or stop WEB服务
	// 2.http.ListenAndServe(":80", router) 直接使用http.ListenAndServe()，也可以gracehttp
	// 2.具体实现可以参考https://github.com/tabalt/gracehttp#demo
}
