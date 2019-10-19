
function setbkrd() {
  const svg = d3.select("svg");

  window.height = svg.attr("height");
  
  const makeFruit = type => ({type});

  const fruits = d3.range(5)
  .map(() => makeFruit('apple'));

  fruitBowl(svg,{fruits});

  setTimeout(()=> {
    fruits.pop();
    fruitBowl(svg,{fruits});
  },1000)

  setTimeout(()=> {
    fruits[2].type = 'lemon';
    fruitBowl(svg,{fruits});
  },2000)
}

window.onload = setbkrd;
