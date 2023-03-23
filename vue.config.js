// vue.config.js for less-loader@6.2.0
module.exports = {
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    // If you are using less-loader@5 please spread the lessOptions to options directly
                    modifyVars: {
                        'layout-sider-background': '#02528d',
                        'layout-header-background': '#fff',
                        'menu-dark-bg': '#02528d',
                        'menu-dark-submenu-bg': '#02528d',
                        'menu-dark-item-active-bg': '#003c68',
                        'menu-dark-item-hover-bg': '#003c68',
                        'menu-inline-toplevel-item-height': '48px',
                        'btn-primary-bg': '#003c68',
                        'menu-item-height': '48px',
                        'menu-item-vertical-margin': '0px',
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
};