<template>
  <div>
    <div>
      <div>
    <template>
    <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk"  zIndex=99999 mask="false" maskClosable=false bodyStyle="{'z-index': '9999'}">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
  </template>
  </div>
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
    class="videoLink"
    @click="videoLink"
    aria-hidden="true"
    title="上传视频"
  >

  <PlaySquareOutlined />
</button>
</template>
    
  </mavon-editor>
</div>

  </div>
</template>

<script>
import axios from 'axios'

import { defineComponent,ref } from 'vue';
import { PlaySquareOutlined } from '@ant-design/icons-vue';

export default defineComponent({

  components: {
    PlaySquareOutlined,
  },

setup() {
  const open = ref(false);
  const md =ref();
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
  const showModal = () => {
    open.value = true;
  };
  const handleOk = e => {
    console.log(e);
    open.value = false;
  };


  // 绑定@imgAdd event
  const imgAdd = (pos, $file) =>{
          // 第一步.将图片上传到服务器.
         var formdata = new FormData();
         formdata.append('image', $file);
         axios({
             url: 'http://127.0.0.1:8081/upload',
             method: 'post',
             data: formdata,
             headers: { 'Content-Type': 'multipart/form-data' },
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
      let subEnd = md.value.d_value.substring(posEnd,  md.value.d_value.length);
      // 拼接并替换文本域内容
      md.value.d_value = subStart + '\n' + v + '\n' + subEnd;

      

    }

  return {
    open,
    md,
    toolbars,
    showModal,
    handleOk,
    imgAdd,
    videoLink,
  };
},
});

</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 600px;
}
.videoLink{
  border:none;
  background:rgba(0,0,0,0)
}

</style>