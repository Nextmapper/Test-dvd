const app = new PIXI.Application({
  resizeTo:window,
  backgroundColor: 0x000000,
})
document.body.appendChild(app.view);

const dvdtex = PIXI.Texture.from("images/dvd.png");
const bgtex = PIXI.Texture.from("images/bg.jpg");
const filter = new PIXI.filters.ColorMatrixFilter();
let bg = new PIXI.Graphics();
let scale1 = 1;
let scale2 = 1;

//Проверка и установка разрешения
if((1920/app.screen.width)<=(1080/app.screen.height)){
  scale1 = 1920/app.screen.width;
} else{
  scale1 = 1080/app.screen.height;
}
if((app.screen.width/1920)>=(app.screen.height/1080)){
  scale2 = app.screen.width/1920;
} else{
  scale2 = app.screen.height/1080;
}

bg.beginTextureFill( bgtex );
bg.drawRect(0,0,(app.screen.width*scale1),(app.screen.height*scale1));
bg.endFill();
bg.scale.x = scale2;
bg.scale.y = scale2;
bg.x = 0;
bg.y = 0;
app.stage.addChild( bg );

//Граница из 4 квадратов
let bdown = new PIXI.Graphics();
bdown.beginFill(0x000000);
bdown.drawRect(0,0,app.screen.width,1);
bdown.endFill();
bdown.x = 0;
bdown.y = app.screen.height;
app.stage.addChild( bdown );

let btop = new PIXI.Graphics();
btop.beginFill(0x000000);
btop.drawRect(0,0,app.screen.width,1);
btop.endFill();
btop.x = 0;
btop.y = 0;
app.stage.addChild( btop );

let bleft = new PIXI.Graphics();
bleft.beginFill(0x000000);
bleft.drawRect(0,0,1,app.screen.height);
bleft.endFill();
bleft.x = 0;
bleft.y = 0;
app.stage.addChild( bleft );

let bright = new PIXI.Graphics();
bright.beginFill(0x000000);
bright.drawRect(0,0,1,app.screen.height);
bright.endFill();
bright.x = app.screen.width;
bright.y = 0;
app.stage.addChild( bright );

//логотип
let dvd = new PIXI.Graphics();
dvd.beginTextureFill( dvdtex );
dvd.drawRect(0,0,400,176);
dvd.endFill();
dvd.interactive = true;
dvd.on('pointerdown', function(){
  rand = Math.floor(Math.random() * 100);
  const { matrix } = filter;
  matrix[1] = Math.sin(count+rand) * 3;
  matrix[2] = Math.cos(count+rand);
  matrix[3] = Math.cos(count+rand) * 1.5;
  matrix[4] = Math.sin((count+rand) / 3) * 2;
  matrix[5] = Math.sin((count+rand) / 2);
  matrix[6] = Math.sin((count+rand) / 4);
});
dvd.x = 0;
dvd.y = 0;
app.stage.addChild( dvd );
dvd.filters = [filter];

let y = 2;
let x = 2;
let count = 0;
let rand = Math.floor(Math.random() * 100);

app.ticker.add( (delta) => {
  dvd.x += x;
  dvd.y += y;
  count += 0.1;
  const { matrix } = filter;
  if (hitTestRectangle(dvd, bdown)||hitTestRectangle(dvd, btop)) {
    y = -y;
    rand = Math.floor(Math.random() * 100);
    matrix[1] = Math.sin(count+rand) * 3;
    matrix[2] = Math.cos(count+rand);
    matrix[3] = Math.cos(count+rand) * 1.5;
    matrix[4] = Math.sin((count+rand) / 3) * 2;
    matrix[5] = Math.sin((count+rand) / 2);
    matrix[6] = Math.sin((count+rand) / 4);
  }
  if (hitTestRectangle(dvd, bleft)||hitTestRectangle(dvd, bright)) {
    x = -x;
    rand = Math.floor(Math.random() * 100);
    matrix[1] = Math.sin(count+rand) * 3;
    matrix[2] = Math.cos(count+rand);
    matrix[3] = Math.cos(count+rand) * 1.5;
    matrix[4] = Math.sin((count+rand) / 3) * 2;
    matrix[5] = Math.sin((count+rand) / 2);
    matrix[6] = Math.sin((count+rand) / 4);
  }
});
//функция коллизии
function hitTestRectangle(r1, r2) {

  //Calculate `centerX` and `centerY` properties on the sprites
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Calculate the `halfWidth` and `halfHeight` properties of the sprites
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Create a `collision` variable that will tell us
  //if a collision is occurring
  let collision = false;

  //Check whether the shapes of the sprites are overlapping. If they
  //are, set `collision` to `true`
  if (Math.abs(r1.centerX - r2.centerX) < r1.halfWidth + r2.halfWidth
  && Math.abs(r1.centerY - r2.centerY) < r1.halfHeight + r2.halfHeight) {
    collision = true;
  }

  //Return the value of `collision` back to the main program
  return collision;
}
