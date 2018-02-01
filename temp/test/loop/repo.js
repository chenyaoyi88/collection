const repo = [{
        "name": "移动端",
        "code": "m",
        "child": [{
            "name": "SPA前端",
            "code": "spa",
            "child": [{
                "name": "react框架",
                "code": "react",
                "url": "m.spa.react.git",
            }, {
                "name": "angular框架",
                "code": "angular",
                "url": "m.spa.angular.git",
            }, {
                "name": "vue框架",
                "code": "vue",
                "url": "m.spa.vue.git",
                "child": [{
                    "name": "cli",
                    "code": "vue-cli",
                    "url": "m.spa.vue.cli.git",
                    "child": []
                }]
            }]
        }, {
            "name": "单页活动",
            "code": "act",
            "child": [{
                "name": "抽奖",
                "code": "lottery",
                "url": "m.act.lottery.git",
            }, {
                "name": "普通",
                "code": "normal",
                "url": "m.act.normal.git",
            }]
        }]
    },
    {
        "name": "PC端",
        "code": "pc",
        "child": [{
            "name": "SPA前端",
            "code": "spa",
            "url": "pc.spa.git",
            "child": [{
                "name": "react框架",
                "code": "react",
                "url": "pc.spa.react.git",
            }, {
                "name": "angular框架",
                "code": "angular",
                "url": "pc.spa.angular.git",
            }, {
                "name": "vue框架",
                "code": "vue",
                "url": "pc.spa.vue.git",
            }]
        }, {
            "name": "单页活动",
            "code": "act",
            "url": "pc.act.git",
            "child": [{
                "name": "抽奖",
                "code": "lottery",
                "url": "pc.act.lottery.git",
            }]
        }]
    },
    {
        "name": "APP端",
        "code": "app",
        "child": [{
            "name": "rn",
            "code": "rn",
            "url": "app.rn.git",
        }, {
            "name": "weex",
            "code": "weex",
            "url": "app.weex.git",
        }, {
            "name": "mui",
            "code": "mui",
            "url": "app.mui.git",
        }]
    }
];