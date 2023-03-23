import router from "@/router";

//按照需求引入antd
import { Button, Layout, Menu, Breadcrumb, Carousel, Tabs, Row, Col, List, Avatar, Space, Input } from "ant-design-vue";




/**
 * 插件集合
 * @type {import("vue").Plugins[]}
 */
const plugins = [router, Button, Layout, Menu, Breadcrumb, Carousel, Tabs, Row, Col, List, Avatar, Space, Input];




/**
 * 批量注册插件
 * @param {import("vue").App} app
 */
export const usePlugins = app =>
    plugins.forEach(app.use, app)

