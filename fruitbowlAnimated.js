const colorScale = d3.scaleOrdinal()
.domain(['apple','lemon'])
.range(['#c11d1d','#eae600']);

const radiusScale = d3.scaleOrdinal()
.domain(['apple','lemon'])
.range(['50','30']);

// const xPosition = (d,i)=> i *120 + 60;
const fruitBowl = (selection,{fruits}) => {

  const bowl = selection.selectAll('rect')
  .data([null])
  .enter()
  .append('rect').attr('width',800)
  .attr('height',300)
  .attr('y',100)
  .attr('rx',300/2);

  const groups = selection.selectAll('g')
  .data(fruits,d => d.id);

 const groupsEnter =  groups.enter().append('g');
  groupsEnter.merge(groups)
  .attr('transform',(d,i) => `translate(${i *160 + 100},${height/2})`);
    groups.exit().remove();

    groupsEnter.append('circle')
    .merge(groups.select('circle'))
      .attr('fill',d => colorScale(d.type))
      .on('click',d => onClick(d.id))
    .transition().duration(1000)
      .attr('r',d => radiusScale(d.type))
      .attr('cx',0);

      groupsEnter.append('text')
      .merge(groups.select('text'))
      .text(d => d.type)
      .attr('y',120);
  }