let screenSize = [400, 400]; // the canvas size is set here
let tilemap;
let tilemapSize = [8, 8]; // the tilemap size is set here
let selected = 0;

function setup() {
  tilemap = new Tilemap([0, 0], [400, 400], tilemapSize, loadImage("assets/tilemap.png"), []); // Use the name of the image you're using
  // Example for how you might load the assets
  for (let i = 0; i < 20; i++)
    for (let j = 0; j < 20; j++)
      tilemap.tiles.push([j * 64 + 1, i * 64 + 1, 63, 63])
  createCanvas(screenSize[0], screenSize[1]);
}

function draw() {
  background(0);
  tilemap.display();
  let iconSize = 50;
  if (selected != 0)
    image(tilemap.img,
         mouseX - iconSize / 2,
         mouseY - iconSize / 2,
         iconSize,
         iconSize,
         tilemap.tiles[selected - 1][0],
         tilemap.tiles[selected - 1][1],
         tilemap.tiles[selected - 1][2],
         tilemap.tiles[selected - 1][3]);
}

function mouseClicked() {
  op = [Math.floor(mouseX * tilemap.res[0] / screenSize[0]), Math.floor(mouseY * tilemap.res[1] / screenSize[1])];
  if (op[0] < 0 || op[0] >= tilemap.res[0])
    return;
  if (op[1] < 0 || op[1] >= tilemap.res[1])
    return;
  tilemap.tilemap[op[0]][op[1]] = selected;
}

function keyPressed() {
  switch (keyCode) {
    case 81: // q to go back 1
      selected--;
      break;
    case 69: // e to go forward 1
      selected++;
      break
    case 87: // w to export to console where you can copy it
      console.log(JSON.stringify(tilemap.tilemap));
      break;
    case 83: // press s to select a specific tile
      selected = Number(prompt("Enter the tile you want: "))
      break;
  }
  selected %= tilemap.tiles.length;
}
