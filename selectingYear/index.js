function whenLoaded(){


const svg = d3.select('svg');
const colorLegendG = svg.append('g');
const lineChartG = svg.append('g')

const width = +svg.attr('width');
const height = +svg.attr('height');

let selectedYear = 2018;
// const lastYValue = d => yValue(d.values[d.values.length-1]);

let data;
const setSelectedYear = year => {
  selectedYear = year;
  render();
}

const render = () => {
  const colorValue = d => d.name;
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  const yValue = d => d.population;

  const lastYValue = d => yValue(d.values[d.values.length-1]);

  const nested = d3.nest()
  .key(colorValue)
  .entries(data)
  .sort((a,b)=>d3.descending(lastYValue(a),lastYValue(b)));

  colorScale.domain(nested.map(d=>d.key));

  lineChartG.call(lineChart,{
    colorScale,
    colorValue,
    yValue,
    title:'Population Over time by Region',
    xValue: d=>d.year,
    xAxisLabel:'Time',
    circleRadius:6,
    yAxisLabel:'Population',
    margin:{ top: 60, right: 280, bottom: 88, left: 105 },
    width,
    height,
    data,
    nested,
    selectedYear,
    setSelectedYear
  });
  

      colorLegendG
      .attr('transform',`translate(700,150)`)
      .call(colorLegend,{
          colorScale,
          circleRadius:10,
          spacing:50,
          textOffset:20
      })
};

loadAndProcessData()
.then((loadedData) => {
  data = loadedData;
  render();
});



}

window.onload = whenLoaded;