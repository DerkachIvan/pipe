var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

MX = 30
MY = 30
cellSize = 30

canvas.width = MX * cellSize;
canvas.height = MY * cellSize;
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

function LoadObjectsSprites() {
    Pipe.loadSprites();
    Pump.loadSprites();
    FluidGenerator.loadSprites();
}

function Start(){
    LoadObjectsSprites();
    
    map = new Map(ctx, MX, MY, cellSize);
    let a = new Pipe(ctx, 0, 0);
    let c = new Pipe(ctx, 10, 0);
      
    a.productionRate = 0.05;
    c.consumptionRate = 0.03;

    a.capacity = 10;
    a.currentFill = 10;

    map.set(0, 0, a);
    map.set(10, 0, c);

    pipeSystem = new PipeSystem(map);

    map.Start();
    setInterval(Update, 1000 / 140); // 140 FPS
}

function Update() {
    totalFill = 0;
    calcTime();
    ctx.clearRect(0, 0, width, height);

    map.Update();
    pipeSystem.Update();
    map.Draw();
    GameObject.DrawSelectedObjectInfo(ctx);
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

function positionToGrid(x, y) {
    x = Math.floor(x / (width / MX));
    y = Math.floor(y / (height / MY));
    return {x: x, y: y};
}

canvas.addEventListener("mousemove", function(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

canvas.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

canvas.addEventListener("mousedown", function(e) {
    var gridPos = positionToGrid(mouseX, mouseY);
    if (e.button === 0) {
        console.log("Левая кнопка: ", gridPos);
        GameObject.SELECTED_OBJECT = map.get(gridPos.x, gridPos.y);
            

    } else if (e.button === 2) {
        console.log("ПКМ нажата на: ", gridPos);
        let obj = new Pipe(ctx, gridPos.x, gridPos.y);
        map.set(gridPos.x, gridPos.y, obj);
    }
});

document.addEventListener("keydown", function(e) {
    var gridPos = positionToGrid(mouseX, mouseY);
    console.log("Нажата клавиша: ", e.key, " на клетке: ", gridPos);
    if (e.key === "1"){
        //system.Update();
    }
    if (e.key === "2"){
        let newFluidGenerator = new FluidGenerator(ctx, gridPos.x, gridPos.y);
        map.set(gridPos.x, gridPos.y, newFluidGenerator);
    }
    if (e.key === "3"){
        let newPipe = new Pipe(ctx, gridPos.x, gridPos.y);
        newPipe.isOutput = true
        
        newPipe.capacity = 1;
        newPipe.consumptionRate = 0.03;
        map.set(gridPos.x, gridPos.y, newPipe);
    }
    if (e.key === "4"){
        let newPump = new Pump(ctx, gridPos.x, gridPos.y, "down");

        map.set(gridPos.x, gridPos.y, newPump);
    }
    if (e.key === "Delete"){
        map.deleteGameObject(gridPos.x, gridPos.y);
    }
    if (e.key.toLowerCase() === "r"){
        let obj = map.get(gridPos.x, gridPos.y);
        if (obj instanceof GameObject){
            obj.Rotate();
        }
    }
    if (e.key.toLowerCase() === "d"){
        DEBUG = !DEBUG;
    }
});

Start();