function whenLoaded() {
const svg = d3.select('svg');

const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);
const radiusScale = d3.scaleSqrt()
const radiusValue = d => d.properties['2018']

const g = svg.append('g');

const colorLegendG = svg.append('g')
    .attr('transform', `translate(40,310)`);

g.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));

svg.call(d3.zoom().on('zoom', () => {
  g.attr('transform', d3.event.transform);
}));

const populationFormat = d3.format(',');

loadAndProcessData().then(countries => {
  const sizeScale = d3.scaleSqrt()
  .domain([0,d3.max(countries.features,radiusValue)])
  .range([0,20])



  g.selectAll('path').data(countries.features)
    .enter().append('path')
      .attr('class', 'country')
      .attr('d', pathGenerator)
      .attr('fill', d => d.properties['2018'] ? 'grey' : 'red')
    .append('title')
      .text(d => isNaN(radiusValue(d)) ? 'Missing': [
        d.properties['Region, subregion, country or area *'],
        populationFormat(radiusValue(d))
      ].join(': ') );

      countries.featuresWithPopulation.forEach(d => {
        d.properties.projected = projection(d3.geoCentroid(d));
      })

      g.selectAll('circle').data(countries.featuresWithPopulation)
      .enter().append('circle')
        .attr('class', 'country-circle')
        .attr('cx',d => d.properties.projected[0])
        .attr('cy',d => d.properties.projected[1])
        .attr('r',d => sizeScale(radiusValue(d)));

        g.append('g')
        .attr('transform',`translate(115,100)`)
        .call(sizeLegend,{
          sizeScale,
          spacing:50,
          textOffset:10,
          numTicks:5,
          tickFormat:populationFormat
        })
        .append('text')
        .text('population')
        .attr('y',-50)
        .attr('class','legend-title')
  
});
}

window.onload = whenLoaded;
