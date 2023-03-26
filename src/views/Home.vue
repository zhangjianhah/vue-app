<template>
  <a-layout class="layout" >
    
    <div style=" width: 100%; background-color: white;">
        <Top />
      </div>

    <a-layout-content style="padding: 0 50px;margin-top: 25px;">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        
        <CarouselDiv />
        <div>
          <a-row>
            <a-col :span="6">
              <TabTag />
            </a-col>
            <a-col :span="18">
              <Right />
            </a-col>
          </a-row>
        </div>
        
        
      
      </div>
      
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      123456
    </a-layout-footer>
  </a-layout>
</template>
<script>



import { defineComponent, ref } from 'vue';
import CarouselDiv from "./CarouselDiv.vue";
import TabTag from "./TabTag.vue";
import Right from "./Right.vue";
import Top from "./Top.vue";


export default defineComponent({


  components: {
    CarouselDiv,TabTag,Right,Top
  },

  setup() {
    return {
      selectedKeys: ref(['2']),
    };
  },
});
</script>
<style>

#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  color: #fff;
  background: #7dbcea;
}
.kk{
  background: #7dbcea;
}
</style>