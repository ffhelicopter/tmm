// 处理website站点路由请求的handler，考虑这里使用了模板，结合MVC使用的习惯，故以controller来命名。
// 当然，API也可以都放在这里处理，但为了结构清晰，不提倡这么做。
package handler

import (
	"net/http"

	"crypto/md5"
	"encoding/hex"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func IndexHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"Title": "作品欣赏",
	})
}

func AddHandler(c *gin.Context) {
	time := time.Now().Unix()
	h := md5.New()
	h.Write([]byte(strconv.FormatInt(time, 10)))
	token := hex.EncodeToString(h.Sum(nil))
	c.HTML(http.StatusOK, "add.html", gin.H{
		"Title": "添加作品",
		"token": token,
	})
}

func PostmeHandler(c *gin.Context) {
	// Set a lower memory limit for multipart forms (default is 32 MiB)
	// router.MaxMultipartMemory = 8 << 20  // 8 MiB
	// err := c.Request.ParseMultipartForm(200000)

	// Multipart form
	form, _ := c.MultipartForm()

	//intro := c.PostForm("intro")
	files := form.File["uploadImg[]"]

	if len(files) == 0 {
		c.String(http.StatusOK, "没有上传文件！")
		return
	}

	for _, file := range files {
		outputFilePath := "./website/photo/" + file.Filename
		// Upload the file to specific dst.
		//log.Println(outputFilePath)
		if err := c.SaveUploadedFile(file, outputFilePath); err != nil {
			c.String(http.StatusBadRequest, fmt.Sprintf("upload file err: %s", err.Error()))
			return
		}

	}

	// 存储到IPFS
	log.Println("IPFS")
	c.String(http.StatusOK, "上传成功！")

}
