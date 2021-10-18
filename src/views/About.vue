<template>
  <div class="about">
    <a-button @click="hello">123</a-button>
    <h1>This is an about page</h1>
  </div>
</template>

<script>
 import { getAction } from '@/api/manage'
export default{
  name: 'About',
  methods:{
    hello(){
      console.log(123)
      var url = "/video/list";
      var param = {name:'1'}
      getAction(url,param);
    }
  }
}
</script>
