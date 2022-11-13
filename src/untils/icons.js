/**
 * 生成elementUI动态icon
 * 首先把他们加载出来
 * 再用<component :is="iconList[item.icon]" class="icons"></component>
 * 这里的:is的值是组件，而不是字符串
 */


import {
    VideoPlay,
    Setting,
    Location,
    User,
    HomeFilled,
    SuccessFilled,
    StarFilled,
    GoodsFilled,
} from "@element-plus/icons-vue";
export default {
    setting:Setting,
    location:Location,
    user:User,
    'video-play':VideoPlay,
    's-home':HomeFilled,
    success:SuccessFilled,
    'star-on':StarFilled,
    's-goods':GoodsFilled,
}