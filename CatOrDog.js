let mobilenet;

let cat;
let dog;
let i;
let possibleCatImages = [];
let possibleDogImages = [];
let animal;

function preload(){
  for (i=1; i<100;i++){
    possibleCatImages[i] = loadImage(`data/cats/cat(${i}).jpg`);
    possibleDogImages[i] = loadImage(`data/dogs/dog(${i}).jpg`);
  }
}

function setup(){
  mobilenet = ml5.imageClassifier('MobileNet');
}

function getResults(error, results){
  if (error){
    console.error(error);
  }
  else{
    console.log(results);
    let result1Name = results[0].label;
    let result1Prob = Math.floor(results[0].confidence*100);
    fill (0);
    textSize(60);
    text(result1Name, 10, height - 100);
    createP(result1Name);
    createP(result1Prob + "% probability");
  }
}

function mouseClicked(){
  randomSet = Math.floor(Math.random()*2)+1;
  index = Math.floor(Math.random()*100)+1;
  if(randomSet === 1){
  image(possibleDogImages[index],0,0,100,100);
  animal = possibleDogImages[index];
  mobilenet.predict(animal,getResults);
  removeElements();
  }
  else{
    image(possibleCatImages[index],0,0,100,100);
    animal = possibleCatImages[index];
    mobilenet.predict(animal,getResults);
    removeElements();
  }
  
}
