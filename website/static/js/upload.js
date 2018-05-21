/**
 * Created by wangxin on 2016/11/10.
 */

var params = {
    fileInput: $("#uploadImg").get(0),
    // dragDrop: $("#fileDragArea").get(0),
    upButton: $("#upload-btn").get(0),
    url: $("#uploadForm").attr("action"),
    filter: function(files) {
        var arrFiles = [];
        for (var i = 0, file; file = files[i]; i++) {
            if (file.type.indexOf("image") == 0) {
                if (file.size >= 512000) {
                    alert('您这张"'+ file.name +'"图片大小过大，应小于500k');
                } else {
                    arrFiles.push(file);
                }
            } else {
                alert('文件"' + file.name + '"不是图片。');
            }
        }
        return arrFiles;
    },
    onSelect: function(files) {
        var html = '', i = 0;
        $(".preview").before('<div class="upload_loading"></div>');
        var funAppendImage = function() {
            file = files[i];
            if (file) {
                var reader = new FileReader()
                reader.onload = function(e) {
                    html = html + '<li id="data-'+ i +'" class="data-img" style="background-image: url(' + e.target.result + ')">' +
                        // '<p><strong>' + file.name + '</strong>'+
                        '<span class="upload-delete" data-index="'+ i +'">X</span>' +
                        // '<img id="uploadImage_' + i + '" src="' + e.target.result + '" class="upload_image" />'+
                        '<span id="uploadProgress-' + i + '" class="upload-progress"></span>' +
                        '</li>';

                    i++;
                    funAppendImage();
                }
                reader.readAsDataURL(file);
            } else {
                $(".preview").html(html);
                if (html) {
                    //删除方法
                    $(".upload-delete").click(function() {
                        IMGFILE.funDeleteFile(files[parseInt($(this).attr("data-index"))]);
                        return false;
                    });
                    //提交按钮显示
                    $("#fileSubmit").show();
                } else {
                    //提交按钮隐藏
                    $("#fileSubmit").hide();
                }
            }
        };
        funAppendImage();
    },
    onDelete: function(file) {
        $("#data-" + file.index).fadeOut();
    },
    onDragOver: function() {
        $(this).addClass("upload_drag_hover");
    },
    onDragLeave: function() {
        $(this).removeClass("upload_drag_hover");
    },
    onProgress: function(file, loaded, total) {
        var eleProgress = $("#uploadProgress-" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
        eleProgress.show().html(percent);
    },
    onSuccess: function(file, response) {
        $("#uploadInf").append("<p>上传成功，图片地址是：" + response + "</p>");
    },
    onFailure: function(file) {
        $("#uploadInf").append("<p>图片" + file.name + "上传失败！</p>");
        $("#uploadImage_" + file.index).css("opacity", 0.2);
    },
    onComplete: function() {
        //提交按钮隐藏
        $("#fileSubmit").hide();
        //file控件value置空
        $("#fileImage").val("");
        $("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
    }
};
IMGFILE = $.extend(IMGFILE, params);
IMGFILE.init();
