const colorScale = d3.scaleOrdinal()
.domain(['apple','lemon'])
.range(['#c11d1d','#eae600']);

const radiusScale = d3.scaleOrdinal()
.domain(['apple','lemon'])
.range(['50','30']);

// const xPosition = (d,i)=> i *120 + 60;
const fruitBowl = (selection,{fruits}) => {

  const groups = selection.selectAll('g')
  .data(fruits,d => d.id);

 const groupsEnter =  groups.enter().append('g');
  groupsEnter.merge(groups)
  .attr('transform',(d,i) => `translate(${i *180 + 100},${height/2})`);
    groups.exit().remove();

    groupsEnter.append('circle')
    .merge(groups.select('circle'))
      .attr('fill',d => colorScale(d.type))
      .attr('r',d => radiusScale(d.type));

      groupsEnter.append('text')
      .merge(groups.select('text'))
      .text(d => d.type)
      .attr('y',120);
  }