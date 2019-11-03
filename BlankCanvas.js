function whenLoaded(){

  const svg = d3.select('svg');
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  svg.attr('width',width)
  .attr('height',height)
  svg.append('rect')
  .attr('width',width)
  .attr('height',height)
  .attr('rx',40)
}

window.onload = whenLoaded;

