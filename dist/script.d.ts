declare const canvas: HTMLCanvasElement;
declare const inventoryUI: HTMLElement;
declare const ctx: CanvasRenderingContext2D & {
    webkitImageSmoothingEnabled?: boolean;
    mozImageSmoothingEnabled?: boolean;
    msImageSmoothingEnabled?: boolean;
};
declare const MX = 64;
declare const MY = 33;
declare const cellSize = 30;
declare const width: number;
declare const height: number;
declare var totalFill: number;
declare var mouseX: number;
declare var mouseY: number;
declare var DEBUG: boolean;
declare var lastFrameTime: number;
declare var fps: number;
declare var frameCount: number;
declare var fpsUpdateTime: number;
declare var time: number;
declare var deltaTime: number;
declare let map: any;
declare let selectedObject: any;
declare let pipeSystem: any;
declare var rotDir: string;
declare var dragging: boolean;
declare var lastX: number, lastY: number;
declare var camera: Camera;
declare function LoadObjectsSprites(): void;
declare function Start(): void;
declare function calcTime(): void;
declare function Update(): void;
declare function ScreenToWorld(x: number, y: number): {
    x: number;
    y: number;
};
declare function positionToGrid(x: number, y: number): {
    x: number;
    y: number;
};
//# sourceMappingURL=script.d.ts.map