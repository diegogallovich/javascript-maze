const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;

// Variables
const bodyElement = document.querySelector('body');
bodyElement.style.height = '100vh';
bodyElement.style.width = '100vw';

let width = bodyElement.clientWidth;
let height = bodyElement.clientHeight;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    height,
    wireframes: false,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);

// Walls
const leftCenterPoint = [0, height / 2];
const rightCenterPoint = [width, height / 2];
const topCenterPoint = [width / 2, 0];
const bottomCenterPoint = [width / 2, height];

const wallThickness = 40;

const wallConfig = {
  isStatic: true,
};

const walls = [
  Bodies.rectangle(...topCenterPoint, width, wallThickness, wallConfig),
  Bodies.rectangle(...bottomCenterPoint, width, wallThickness, wallConfig),
  Bodies.rectangle(...rightCenterPoint, wallThickness, height, wallConfig),
  Bodies.rectangle(...leftCenterPoint, wallThickness, height, wallConfig),
];

World.add(world, walls);

// Random Shapes
for (let i = 0; i < 90; i++) {
  let randomFloat = Math.random();

  let randomX = Math.floor(Math.random() * width);
  let randomY = Math.floor(Math.random() * height);

  if (randomFloat > 0.5) {
    World.add(world, Bodies.rectangle(randomX, randomY, 50, 50));
  } else {
    World.add(world, Bodies.circle(randomX, randomY, 35));
  }
}
