function whenLoaded() {
  const svg = d3.select("svg");


  const choroplethMapG = svg.append("g");

  const colorLegendG = svg.append("g").attr("transform", `translate(30,300)`);



  const colorScale = d3.scaleOrdinal(d3.schemeSpectral[7]);
  const colorValue = d => d.properties.economy;

  let selectedColorValue;
  let features;

  const onClick = d => {
    selectedColorValue = d;
    render();
  };

  loadAndProcessData().then(countries => {
    features = countries.features;
    render();
  });

  const render = () => {
    colorScale
      .domain(features.map(colorValue))
      .domain(
        colorScale
          .domain()
          .sort()
          .reverse()
      )
      .range(d3.schemeSpectral[colorScale.domain().length]);

    colorLegendG.call(colorLegend, {
      colorScale,
      circleRadius: 10,
      spacing: 30,
      textOffset: 13,
      backgroundRectWidth: 250,
      onClick,
      selectedColorValue
    });

   choroplethMapG.call(choroplethMap,{
       features,
       colorScale,
       colorValue,
       selectedColorValue
   })
  };
}

window.onload = whenLoaded;
