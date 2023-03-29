<template>
    <div>
        <div>
            <template>
                <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk" zIndex=99999 mask="false"
                         maskClosable=false bodyStyle="{'z-index': '9999'}">
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </a-modal>
            </template>
        </div>


        <div>
            <template>
                <a-modal v-model:open="uploadShowFlag" title="Basic Modal" @ok="saveUploadWord" @cancel="cancelUploadWord" zIndex=99999 mask="false"
                         maskClosable=false bodyStyle="{'z-index': '9999'}">
                    <input type="file" @change="uploadWord" id="wordButton">
                    <div id="wordText" style="height: 300px;overflow: auto"></div>
                </a-modal>
            </template>
        </div>

        <div class="mavonEditor">
            <mavon-editor v-model="content"
                          :toolbars="toolbars"
                          @imgAdd="imgAdd"
                          :subfield=true
                          ref="md"
                          style="height: 100%;"
            >


                <!-- 左工具栏前加入自定义按钮 -->
                <template v-slot:left-toolbar-after>
                    <button
                            type="button"
                            class="ext_toolbar"
                            @click="videoLink"
                            aria-hidden="true"
                            title="上传视频"
                    >

                        <PlaySquareOutlined/>
                    </button>



                    <button
                            type="button"
                            class="ext_toolbar"
                            @click="wordShow"
                            aria-hidden="true"
                            title="上传Word"
                    >

                        <FileWordOutlined/>
                    </button>
                </template>

            </mavon-editor>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import mammoth from 'mammoth';

    import {defineComponent, ref} from 'vue';
    import {PlaySquareOutlined,FileWordOutlined} from '@ant-design/icons-vue';

    export default defineComponent({

        components: {
            PlaySquareOutlined,FileWordOutlined
        },

        setup() {
            const open = ref(false);
            const uploadShowFlag = ref(false);
            const md = ref();
            const toolbars = {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）



                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            };
            const uploadWordOptions = {
                convertImage: mammoth.images.imgElement(function (image) {
                    return image.read("base64").then(function (imageBuffer) {
                        var fileName = Date.parse(new Date());

                        switch (image.contentType) {
                            case "image/png":
                                fileName += ".png";
                                break;
                            case "image/jpg":
                                fileName += ".jpg";
                                break
                            case "image/jpeg":
                                fileName += ".jpeg";
                                break;
                            case "image/gif":
                                fileName += ".gif";
                                break;
                            default:
                                console.log("不支持的图片格式");
                                return;
                        }
                        var form = new FormData();
                        form.append('editormd-image-file', base64ToBlob(imageBuffer, image.contentType), fileName);


                        return {
                            // src: axios("http://127.0.0.1:8081/upload", form, function (ret) {
                            //     if (ret.success == 1) {
                            //         //return ret.url;
                            //         //cm.replaceSelection("![](" + ret.url  + ")");
                            //     }
                            //     console.log(ret.message);
                            // })
                            src:""
                        };

                    });
                })
            };
            const  convertToHtml = (file) => {
                return new Promise((resolve) => {
                    let res = mammoth.convertToHtml({ arrayBuffer: file },uploadWordOptions)
                        .then((result) => {
                            resolve(result.value);
                        })
                        .done();
                    return res;
                });
            };
            const base64ToBlob = (base64, mime) => {
                mime = mime || "";
                const sliceSize = 1024;
                const byteChars = window.atob(base64);
                const byteArrays = [];
                for (
                    let offset = 0, len = byteChars.length;
                    offset < len;
                    offset += sliceSize) {
                    const slice = byteChars.slice(offset, offset + sliceSize);

                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    const byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                return new Blob(byteArrays, {
                    type: mime
                });
            }

            const showModal = () => {
                open.value = true;
            };
            const handleOk = e => {
                console.log(e);
                open.value = false;
            };

            const wordShow = e => {
                console.log(e);
                if(uploadShowFlag.value == false){
                    uploadShowFlag.value = true;
                }else{
                    uploadShowFlag.value = false;
                }

            };


            // 绑定@imgAdd event
            const imgAdd = (pos, $file) => {
                // 第一步.将图片上传到服务器.
                var formdata = new FormData();
                formdata.append('image', $file);
                axios({
                    url: 'http://127.0.0.1:8081/upload',
                    method: 'post',
                    data: formdata,
                    headers: {'Content-Type': 'multipart/form-data'},
                }).then((url) => {
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    /**
                     * $vm 指为mavonEditor实例，可以通过如下两种方式获取
                     * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
                     * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
                     */
                    //  $vm.$img2Url(pos, url);

                    console.log(url)
                    console.log(md.value)
                    console.log(pos)
                    // this.$refs.md.$img2Url(pos, url);
                    md.value.$img2Url(pos, 'http://localhost:8081/image/1.jpg');
                })
            };

            // 格式化视频链接并插入到文本域的函数
            const videoLink = () => {
                var v = "<video src='http://localhost:8081/image/123.mp4' controls='controls' height='200'></video>";


                // 获取文本域中当前光标起始位置、结束位置以及滚动条位置（滚动条位置我认为没有必要，如有需要可以自己取消注释）
                let textarea = document.getElementsByClassName("auto-textarea-input")[0];
                let posStart = textarea.selectionStart;
                let posEnd = textarea.selectionEnd;
                // let posScroll = document.getElementsByClassName("v-note-edit")[0].scrollTop;
                // 获取文本域中未选中的的前半部分和后半部分，以被选中内容起始和结束位置做分割点
                let subStart = md.value.d_value.substring(0, posStart);
                let subEnd = md.value.d_value.substring(posEnd, md.value.d_value.length);
                // 拼接并替换文本域内容
                md.value.d_value = subStart + '\n' + v + '\n' + subEnd;


            }

            const uploadWord = (event) =>{

                const file = event.target.files[0];
                let promise = convertToHtml(file);
                promise.then(text =>{
                    console.log(text)
                    document.getElementById("wordText").innerHTML = text;
                });
            }

            const  cancelUploadWord = () => {
                document.getElementById("wordText").innerHTML = "";
                uploadShowFlag.value = false;
                document.getElementById("wordButton").value = '';
            }

            const  saveUploadWord = () =>{
                let textarea = document.getElementById("wordText").outerHTML;
                md.value.d_value = md.value.d_value + '\n' + textarea;
                cancelUploadWord();
            }

            return {
                open,uploadShowFlag,wordShow,uploadWordOptions,convertToHtml,cancelUploadWord,saveUploadWord,
                md,
                toolbars,
                showModal,
                handleOk,
                imgAdd,
                videoLink,
                uploadWord,
            };
        },
    });

</script>

<style scoped>
    .mavonEditor {
        width: 100%;
        height: 600px;
    }

    .ext_toolbar {
        border: none;
        background: rgba(0, 0, 0, 0)
    }

</style>