<template>
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      style="width: 256px"
      mode="vertical"
      @click="handleClick"
    >
      <a-menu-item key="1">
        <template #icon>
          <MailOutlined />
        </template>
        二次开发
      </a-menu-item>
      <a-menu-item key="2">
        <template #icon>
          <CalendarOutlined />
        </template>
        问题汇总
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Foundation</template>
        <a-menu-item key="3">Option 3</a-menu-item>
        <a-menu-item key="4">Option 4</a-menu-item>
        <a-sub-menu key="sub1-2" title="Submenu">
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #icon>
          <SettingOutlined />
        </template>
        <template #title>PLM</template>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
      </a-sub-menu>

      <a-menu-item key="2">
        <template #icon>
          <CalendarOutlined />
        </template>
        KES
      </a-menu-item>

      <a-menu-item key="2">
        <template #icon>
          <CalendarOutlined />
        </template>
        IDS
      </a-menu-item>

    </a-menu>
  </template>
  <script>
  import { defineComponent, reactive, toRefs } from 'vue';
  import { MailOutlined, CalendarOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    components: {
      MailOutlined,
      CalendarOutlined,
      AppstoreOutlined,
      SettingOutlined,
    },
    setup() {
      const state = reactive({
        selectedKeys: [],
        openKeys: [],
      });
      const handleClick = menuInfo => {
        console.log('click ', menuInfo);
      };
      return {
        ...toRefs(state),
        handleClick,
      };
    },
  });
  </script>