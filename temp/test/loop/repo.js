const repo = [{
        "type": "list",
        "message": "请选择平台类型",
        "name": "plaform",
        "text": "平台",
        "child": [{
                "name": "mobile",
                "text": "移动端",
                "child": [{
                    "name": "spa",
                    "text": "单页应用框架",
                    "child": [{
                        "name": "react",
                        "text": "react框架",
                        "url": "m.spa.react.git"
                    }, {
                        "name": "angular",
                        "text": "angular框架",
                        "url": "m.spa.angular.git"
                    }, {
                        "name": "vue",
                        "text": "vue框架",
                        "url": "m.spa.vue.git",
                        "child": [{
                            "name": "cli",
                            "text": "vue-cli",
                            "url": "m.spa.vue.cli.git",
                            "child": []
                        }]
                    }]
                }, {
                    "name": "act",
                    "text": "活动",
                    "child": [{
                        "name": "normal",
                        "text": "普通",
                        "url": "m.act.normal.git"
                    }, {
                        "name": "lottery",
                        "text": "抽奖",
                        "url": "m.act.lottery.git"
                    }]
                }]
            },
            {
                "name": "pc",
                "text": "PC端",
                "child": [{
                    "name": "spa",
                    "text": "单页应用框架",
                    "url": "pc.spa.git",
                    "child": [{
                        "name": "react",
                        "text": "react框架",
                        "url": "pc.spa.react.git"
                    }, {
                        "name": "angular",
                        "text": "angular框架",
                        "url": "pc.spa.angular.git"
                    }, {
                        "name": "vue",
                        "text": "vue框架",
                        "url": "pc.spa.vue.git"
                    }]
                }, {
                    "name": "act",
                    "text": "活动",
                    "url": "pc.act.git",
                    "child": [{
                        "name": "lottery",
                        "text": "抽奖",
                        "url": "pc.act.lottery.git"
                    }]
                }]
            },
            {
                "name": "app",
                "text": "APP端",
                "child": [{
                    "name": "RN",
                    "text": "RN框架",
                    "url": "app.rn.git"
                }, {
                    "name": "weex",
                    "text": "weex框架",
                    "url": "app.weex.git"
                }, {
                    "name": "mui",
                    "text": "mui框架",
                    "url": "app.mui.git"
                }]
            }
        ]
    },
    {
        "type": "input",
        "name": "appName",
        "message": "请输入项目名"
    },
    {
        "type": "input",
        "name": "author",
        "message": "请输入作者名"
    }
];