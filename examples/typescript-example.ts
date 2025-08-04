/**
 * TypeScript 使用示例
 * 展示如何在 TypeScript 项目中使用 leaflet-rotate
 */

import * as L from "leaflet";
import "leaflet-rotate-xiaoai";

// 创建地图实例，启用旋转功能
const map: L.Map = L.map("map", {
    center: [51.505, -0.09],
    zoom: 13,
    rotate: true, // 启用旋转功能
    bearing: 0, // 初始方向角
    rotateControl: {
        // 旋转控件选项
        closeOnZeroBearing: true,
    },
});

// 添加瓦片图层
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
}).addTo(map);

// 手动创建旋转控件
const rotateControl = L.control.rotate({
    position: "topright",
    closeOnZeroBearing: false,
});
map.addControl(rotateControl);

// 设置地图方向角
map.setBearing(45);

// 获取当前方向角
const currentBearing: number = map.getBearing();
console.log("当前方向角:", currentBearing);

// 旋转到指定角度
map.rotateTo(90, {
    animate: true,
    duration: 1,
});

// 监听旋转事件
map.on("rotate", () => {
    console.log("地图正在旋转，当前角度:", map.getBearing());
});

map.on("rotatestart", () => {
    console.log("开始旋转");
});

map.on("rotateend", () => {
    console.log("旋转结束");
});

// 控制触摸旋转
if (map.touchRotate.enabled()) {
    map.touchRotate.disable();
} else {
    map.touchRotate.enable();
}

// 控制指南针跟随
if (map.compassBearing.enabled()) {
    map.compassBearing.disable();
} else {
    map.compassBearing.enable();
}

// 添加标记点
const marker: L.Marker = L.marker([51.5, -0.09]).addTo(map);
marker.bindPopup("这是一个可旋转的地图!").openPopup();
