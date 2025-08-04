# TypeScript 类型支持

本项目现在支持 TypeScript 类型提示！这将为您提供更好的开发体验，包括自动补全、类型检查和错误提示。

## 安装

```bash
npm install leaflet-rotate-xiaoai
npm install --save-dev @types/leaflet
```

## TypeScript 配置

确保您的 `tsconfig.json` 包含以下配置：

```json
{
    "compilerOptions": {
        "target": "ES2015",
        "module": "ES2015",
        "lib": ["ES2015", "DOM"],
        "moduleResolution": "node",
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true
    }
}
```

## 基本使用

```typescript
import * as L from "leaflet";
import "leaflet-rotate-xiaoai";

// 创建支持旋转的地图
const map: L.Map = L.map("map", {
    center: [51.505, -0.09],
    zoom: 13,
    rotate: true, // 启用旋转功能
    bearing: 0, // 初始方向角
    rotateControl: true, // 启用旋转控件
    touchRotate: true, // 启用触摸旋转
    shiftKeyRotate: true, // 启用Shift键旋转
    compassBearing: false, // 禁用指南针跟随
});

// 添加瓦片图层
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
```

## 旋转控件

```typescript
// 自定义旋转控件选项
const rotateControl = new L.Control.Rotate({
    position: "topright",
    closeOnZeroBearing: false,
});
map.addControl(rotateControl);

// 或使用工厂函数
const rotateControl2 = L.control.rotate({
    position: "topleft",
    closeOnZeroBearing: true,
});
```

## 地图方法

```typescript
// 设置方向角
map.setBearing(45);

// 获取当前方向角
const bearing: number = map.getBearing();

// 旋转到指定角度（带动画）
map.rotateTo(90, {
    animate: true,
    duration: 1,
});
```

## 处理器控制

```typescript
// 触摸旋转处理器
map.touchRotate.enable();
map.touchRotate.disable();
const isEnabled: boolean = map.touchRotate.enabled();

// 指南针方向处理器
map.compassBearing.enable();
map.compassBearing.disable();

// Shift键旋转处理器
map.shiftKeyRotate.enable();
map.shiftKeyRotate.disable();
```

## 事件监听

```typescript
// 监听旋转事件
map.on("rotate", (e: L.LeafletEvent) => {
    console.log("地图正在旋转，当前角度:", map.getBearing());
});

map.on("rotatestart", () => {
    console.log("开始旋转");
});

map.on("rotateend", () => {
    console.log("旋转结束");
});
```

## 类型定义概览

### Control.RotateOptions

-   `closeOnZeroBearing?: boolean` - 在方向角为 0 时是否关闭控件

### Map 扩展方法

-   `setBearing(bearing: number)` - 设置地图方向角
-   `getBearing(): number` - 获取当前方向角
-   `rotateTo(bearing: number, options?: PanOptions)` - 旋转到指定角度

### Map 扩展属性

-   `rotateControl?: Control.Rotate` - 旋转控件实例
-   `touchRotate: Map.TouchRotate` - 触摸旋转处理器
-   `compassBearing: Map.CompassBearing` - 指南针方向处理器
-   `shiftKeyRotate: Map.ShiftKeyRotate` - Shift 键旋转处理器

### MapOptions 扩展

-   `rotate?: boolean` - 是否启用旋转功能
-   `bearing?: number` - 初始方向角
-   `rotateControl?: boolean | Control.RotateOptions` - 旋转控件配置
-   `touchRotate?: boolean` - 是否启用触摸旋转
-   `shiftKeyRotate?: boolean` - 是否启用 Shift 键旋转
-   `compassBearing?: boolean` - 是否启用指南针跟随

## 注意事项

1. 确保在导入 Leaflet 后导入本库
2. 所有的旋转角度都以度为单位
3. 类型定义会自动扩展 Leaflet 的原有类型
4. 建议启用 TypeScript 的严格模式以获得更好的类型检查

## 错误排查

如果遇到类型错误，请检查：

1. 是否正确安装了 `@types/leaflet`
2. 是否在正确的位置导入了本库
3. TypeScript 配置是否正确
4. 是否使用了最新版本的类型定义
