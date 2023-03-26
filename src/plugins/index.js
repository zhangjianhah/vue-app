import router from "@/router";

//按照需求引入antd
import { Button, Layout, Menu, Breadcrumb, Carousel, Tabs, Row, Col, List, Avatar, Space, Input, Modal } from "ant-design-vue";

//引入图标
import { HomeOutlined } from '@ant-design/icons-vue';


//引入mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'



/**
 * 插件集合
 * @type {import("vue").Plugins[]}
 */
const plugins = [router, Button, Layout, Menu, Breadcrumb,
    Carousel, Tabs, Row, Col, List, Avatar, Space, Input, Modal,

    HomeOutlined,


    mavonEditor,
];




/**
 * 批量注册插件
 * @param {import("vue").App} app
 */
export const usePlugins = app =>
    plugins.forEach(app.use, app)

