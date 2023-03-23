<template>
    <div style="height: 60px; text-align: center;">


        <div>
          <a-row>
            <a-col :span="4">
                
            </a-col>
            <a-col :span="14">
                <div>
                    <a-input-search
        v-model:value="value"
        placeholder="input search text"
        enter-button
        @search="onSearch"
      />
                </div>
      
            </a-col>
            <a-col :span="6" style="float: right;text-align: right;">
                <a-avatar src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
                <span style="padding-left: 10px;padding-right: 18px;">张健</span>
                <a-button type="primary" >退出</a-button>
            </a-col>
          </a-row>
        </div>
    </div>
  </template>
  <script>
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    setup() {
      const value = ref('');
      const onSearch = searchValue => {
        console.log('use value', searchValue);
        console.log('or use this.value', value.value);
      };
      return {
        value,
        onSearch,
      };
    },
  });
  </script>