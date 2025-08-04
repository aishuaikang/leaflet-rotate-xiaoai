import * as L from "leaflet";

declare module "leaflet" {
    namespace Control {
        interface RotateOptions extends ControlOptions {
            /**
             * 在方向角为 0 时是否关闭控件
             * @default true
             */
            closeOnZeroBearing?: boolean;
        }

        /**
         * 用于地图旋转的三态控件，状态包括：
         * - Locked (默认状态，锁定)
         * - Unlocked (解锁，用户可以捏合旋转)
         * - Follow (跟随设备方向旋转，如果可用)
         */
        class Rotate extends Control {
            options: RotateOptions;

            constructor(options?: RotateOptions);

            /**
             * 添加控件到地图
             */
            onAdd(map: Map): HTMLElement;

            /**
             * 从地图移除控件
             */
            onRemove(map: Map): void;

            /**
             * 处理鼠标按下事件
             */
            private _handleMouseDown(e: MouseEvent): void;

            /**
             * 处理鼠标释放事件
             */
            private _handleMouseUp(e: MouseEvent): void;

            /**
             * 处理鼠标拖拽事件
             */
            private _handleMouseDrag(e: MouseEvent): void;

            /**
             * 循环切换状态
             */
            private _cycleState(ev: Event): void;

            /**
             * 重新设置样式
             */
            private _restyle(): void;

            // 私有属性
            private _container: HTMLElement;
            private _arrow: HTMLElement;
            private _link: HTMLAnchorElement;
            private _follow: boolean;
            private _canFollow: boolean;
            private dragging: boolean;
            private dragstartX: number;
            private dragstartY: number;
        }
    }

    namespace control {
        /**
         * 创建旋转控件的工厂函数
         */
        function rotate(options?: Control.RotateOptions): Control.Rotate;
    }

    /**
     * 触摸旋转处理器 - 在触摸设备上通过双指旋转手势旋转地图
     */
    class TouchRotate extends Handler {
        constructor(map: L.Map);
    }

    /**
     * 指南针方向处理器 - 根据智能手机的指南针旋转地图
     */
    class CompassBearing extends Handler {
        constructor(map: L.Map);

        /**
         * 设备方向事件名称
         */
        private __deviceOrientationEvent: string;

        /**
         * 节流处理的设备方向事件处理器
         */
        private _throttled: (e: DeviceOrientationEvent) => void;

        /**
         * 设备方向变化事件处理器
         */
        private _onDeviceOrientation(e: DeviceOrientationEvent): void;
    }

    /**
     * 触摸手势处理器
     */
    class TouchGestures extends Handler {
        /**
         * 是否启用旋转手势
         */
        rotate: boolean;

        /**
         * 是否启用缩放手势
         */
        zoom: boolean;
    }

    /**
     * Shift键旋转处理器 - 按住Shift键时通过鼠标移动旋转地图
     */
    class ShiftKeyRotate extends Handler {
        constructor(map: L.Map);
    }

    /**
     * 容器变化处理器
     */
    class ContainerMutation extends Handler {
        constructor(map: L.Map);
    }

    // /**
    //  * 触摸缩放处理器的旋转扩展
    //  */
    // class TouchZoom extends Handler {
    //     constructor(map: L.Map);
    // }

    interface MapOptions {
        /**
         * 是否启用旋转控件
         * @default true
         */
        rotateControl?: boolean | Control.RotateOptions;

        /**
         * 是否启用旋转功能
         * @default false
         */
        rotate?: boolean;

        /**
         * 初始方向角（以度为单位）
         * @default 0
         */
        bearing?: number;

        // /**
        //  * 是否可以通过双指旋转手势旋转地图
        //  * @default false
        //  */
        // touchRotate?: boolean;

        // /**
        //  * 是否启用触摸手势
        //  * @default false
        //  */
        // touchGestures?: boolean;

        // /**
        //  * 是否启用Shift键旋转
        //  * @default true
        //  */
        // shiftKeyRotate?: boolean;

        // /**
        //  * 是否启用指南针方向跟随
        //  * @default false
        //  */
        // compassBearing?: boolean;
    }

    interface Map {
        /**
         * 旋转控件实例
         */
        rotateControl?: Control.Rotate;

        // /**
        //  * 触摸旋转处理器
        //  */
        // touchRotate: TouchRotate;

        // /**
        //  * 指南针方向处理器
        //  */
        // compassBearing: CompassBearing;

        // /**
        //  * 触摸手势处理器
        //  */
        // touchGestures: TouchGestures;

        // /**
        //  * Shift键旋转处理器
        //  */
        // shiftKeyRotate: ShiftKeyRotate;

        /**
         * 容器变化处理器
         */
        containerMutation: ContainerMutation;

        /**
         * 旋转状态标志
         */
        _rotate: boolean;

        /**
         * 设置地图的方向角
         * @param bearing 方向角（以度为单位）
         */
        setBearing(bearing: number): this;

        /**
         * 获取地图的当前方向角
         * @returns 当前方向角（以度为单位）
         */
        getBearing(): number;

        /**
         * 旋转地图到指定方向角
         * @param bearing 目标方向角（以度为单位）
         * @param options 旋转选项
         */
        rotateTo(bearing: number, options?: PanOptions): this;

        /**
         * 以指定点为中心旋转地图
         * @param bearing 目标方向角（以度为单位）
         * @param origin 旋转中心点
         * @param options 旋转选项
         */
        rotateAroundPoint(
            bearing: number,
            origin: LatLng,
            options?: PanOptions
        ): this;
    }

    namespace DomUtil {
        /**
         * 为元素应用旋转变换
         * @param element 要旋转的DOM元素
         * @param deg 旋转角度（以度为单位）
         * @param point 旋转中心点（可选）
         */
        function rotate(element: HTMLElement, deg: number, point?: Point): void;

        /**
         * 获取元素的旋转角度
         * @param element DOM元素
         * @returns 旋转角度（以度为单位）
         */
        function getRotation(element: HTMLElement): number;
    }

    // 事件类型扩展
    interface LeafletEventHandlerFnMap {
        /**
         * 地图旋转时触发
         */
        rotate: LeafletEventHandlerFn;

        /**
         * 地图旋转开始时触发
         */
        rotatestart: LeafletEventHandlerFn;

        /**
         * 地图旋转结束时触发
         */
        rotateend: LeafletEventHandlerFn;
    }

    interface MapEventHandlerFnMap {
        /**
         * 地图旋转时触发
         */
        rotate: LeafletEventHandlerFn;

        /**
         * 地图旋转开始时触发
         */
        rotatestart: LeafletEventHandlerFn;

        /**
         * 地图旋转结束时触发
         */
        rotateend: LeafletEventHandlerFn;
    }
}

export {};
