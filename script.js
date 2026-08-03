var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

MX = 64
MY = 33
cellSize = 30

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const width = canvas.width;
const height = canvas.height;

var totalFill = 0;

// Добавлено: переменные для хранения позиции мыши
var mouseX = 0;
var mouseY = 0;

var DEBUG = false;
var lastFrameTime = performance.now();
var fps = 0;
var frameCount = 0;
var fpsUpdateTime = performance.now();
var time = 0

var deltaTime = 0;

var map

var selectedObject = null;
var pipeSystem;

var rotDir = "up";

var dragging = false;
var lastX = 0, lastY = 0;
var camera = new Camera();



function LoadObjectsSprites() {
    Pipe.loadSprites();
    Pump.loadSprites();
    FluidGenerator.loadSprites();
    FluidCompressor.loadSprites();
    Drain.loadSprites();
    BeltTile.loadSprites();
}

function Start(){
    LoadObjectsSprites();
    
    map = new Map(ctx, MX, MY, cellSize);
    let a = new FluidGenerator(ctx, 0, 0);
    let c = new Pipe(ctx, 10, 0);
      
    c.consumptionRate = 0.03;

    a.currentFill = 10;

    map.set(0, 0, a);
    map.set(10, 0, c);

    pipeSystem = new PipeSystem(map);

    map.Start();
    requestAnimationFrame(Update);
}

function calcTime(){
    var now = performance.now();
    time = now / 1000; // seconds
    deltaTime = (now - lastFrameTime) / 1000; // seconds
    lastFrameTime = now;

    frameCount++;
    if (now - fpsUpdateTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        fpsUpdateTime = now;
    }
}

function Update() {
    calcTime();
    ctx.clearRect(0, 0, width, height);
    camera.Begin(ctx);
    
    map.Update();
    pipeSystem.Update();
    map.Draw();
    GameObject.DrawSelectedObjectInfo(ctx);
    camera.End(ctx);


    //draw FPS
    ctx.save();
    ctx.fillStyle = "black";
    ctx.font = "bold 12px Arial";
    if (DEBUG) {
        ctx.fillText(`FPS: ${fps}`, 10, 20);
        ctx.fillText(`Time: ${time.toFixed(2)}s`, 10, 40);
    }
    ctx.restore();

    requestAnimationFrame(Update);
}

function ScreenToWorld(x, y) {
    return{
        x: x / camera.zoom + camera.x,
        y: y / camera.zoom + camera.y
    }
}

function positionToGrid(x, y) {
    x = Math.floor(x / map.cellSize);
    y = Math.floor(y / map.cellSize);
    return {x: x, y: y};
}

canvas.addEventListener("mousemove", function(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    if(dragging){
        camera.x -= (e.clientX - lastX) / camera.zoom;
        camera.y -= (e.clientY - lastY) / camera.zoom;
    
        lastX = e.clientX;
        lastY = e.clientY;
    }

});

canvas.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

canvas.addEventListener("mousedown", function(e) {
    var worldPos = ScreenToWorld(mouseX, mouseY);
    var gridPos = positionToGrid(worldPos.x, worldPos.y);

    if (e.button === 0) {
        console.log("Левая кнопка: ", gridPos);
        if (GameObject.SELECTED_OBJECT) {
            GameObject.SELECTED_OBJECT.selected = false;
        }
        GameObject.SELECTED_OBJECT = map.get(gridPos.x, gridPos.y);
    }
    else if(e.button === 1) {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
    } else if (e.button === 2) {
        console.log("ПКМ нажата на: ", gridPos);
        let obj = new Pipe(ctx, gridPos.x, gridPos.y);
        map.set(gridPos.x, gridPos.y, obj);
    }
});

canvas.addEventListener("mouseup", function(e){
    if (e.button === 1) {
        dragging = false;
    }
});

canvas.addEventListener("wheel", function(e){
    e.preventDefault();
    
    const worldPosBeforeZoom = ScreenToWorld(mouseX, mouseY);

    if(e.deltaY < 0){
        camera.zoom *= 1.1;
    } else {
        camera.zoom /= 1.1;
    }

    const afterZoomWorldPos = ScreenToWorld(mouseX, mouseY);
    camera.x += worldPosBeforeZoom.x - afterZoomWorldPos.x;
    camera.y += worldPosBeforeZoom.y - afterZoomWorldPos.y;
});

document.addEventListener("keydown", function(e) {
    var worldPos = ScreenToWorld(mouseX, mouseY);
    var gridPos = positionToGrid(worldPos.x, worldPos.y);

    console.log("Нажата клавиша: ", e.key, " на клетке: ", gridPos);

    var rawCameraSpeed = 20; // Base speed
    var cameraSpeed = rawCameraSpeed / camera.zoom; // Adjust speed based on zoom
    if (e.key.toLowerCase() === "a"){
        camera.x -= cameraSpeed;
    }
    if (e.key.toLowerCase() === "d"){
        camera.x += cameraSpeed;
    }
    if (e.key.toLowerCase() === "w"){
        camera.y -= cameraSpeed;
    }
    if (e.key.toLowerCase() === "s"){
        camera.y += cameraSpeed;
    }



    if (e.key === "1"){
        let newFluidGenerator = new FluidGenerator(ctx, gridPos.x, gridPos.y);
        newFluidGenerator.fluidType = "oil"; // Set the fluid type to oil
        map.set(gridPos.x, gridPos.y, newFluidGenerator);
    }
    if (e.key === "2"){
        let newFluidGenerator = new FluidGenerator(ctx, gridPos.x, gridPos.y);
        newFluidGenerator.fluidType = "water"; // Set the fluid type to water
        map.set(gridPos.x, gridPos.y, newFluidGenerator);
    }
    if (e.key === "3"){
        let newPipe = new Drain(ctx, gridPos.x, gridPos.y);
        map.set(gridPos.x, gridPos.y, newPipe);
    }
    if (e.key === "4"){
        let newPump = new Pump(ctx, gridPos.x, gridPos.y, rotDir);
        map.set(gridPos.x, gridPos.y, newPump);
    }
    if (e.key === "5"){
        let newFluidCompressor = new FluidCompressor(ctx, gridPos.x, gridPos.y);
        map.set(gridPos.x, gridPos.y, newFluidCompressor);
    }
    if (e.key.toLowerCase() === "c"){
        let newBeltTitle = new BeltTile(ctx, gridPos.x, gridPos.y, rotDir);
        newBeltTitle.item = new BeltItem(0, 0, 10,"#f00");
        map.set(gridPos.x, gridPos.y, newBeltTitle);
    }
    if (e.key.toLowerCase() === "v"){
        let newBeltTitle = new BeltTile(ctx, gridPos.x, gridPos.y, rotDir);
        newBeltTitle.item = new BeltItem(0, 0, 15, "rgb(0, 89, 255)");
        map.set(gridPos.x, gridPos.y, newBeltTitle);
    }
    if (e.key.toLowerCase() === "b"){
        let newBeltTitle = new BeltTile(ctx, gridPos.x, gridPos.y, rotDir);
        map.set(gridPos.x, gridPos.y, newBeltTitle);
    }
    if (e.key === "Delete"){
        map.deleteGameObject(gridPos.x, gridPos.y);
    }
    if (e.key.toLowerCase() === "r"){
        let obj = map.get(gridPos.x, gridPos.y);
        if (obj instanceof GameObject){
            obj.Rotate();
        }else{
            if (rotDir === "up") rotDir = "right";
            else if (rotDir === "right") rotDir = "down";
            else if (rotDir === "down") rotDir = "left";
            else if (rotDir === "left") rotDir = "up";
        }
    }
    if (e.key.toLowerCase() === "`"){
        DEBUG = !DEBUG;
    }
});

Start();