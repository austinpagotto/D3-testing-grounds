
function whenLoaded(){

    const svg = d3.select('svg');

    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const render = data => {
        const xValue = d => d.year
        const yValue = d => d.population
        const margin = {top:40,right:20,bottom:80,left:150}
        const innerWidth = width - margin.left - margin.right;
        const innerHeight= height - margin.top - margin.bottom;
        const circleRadius = 5;
        const xAxisLabel = 'Time';
        const yAxisLabel = 'Population'

        const xScale = d3.scaleTime()
        .domain(d3.extent(data,xValue))
        .range([0,innerWidth]);
        // .nice();
        

        
        const yScale = d3.scaleLinear()
        .domain([0,d3.max(data,yValue)])
        .range([innerHeight,0])
        .nice();
        
        

        const g = svg.append('g')
        .attr('transform',`translate(${margin.left},${margin.top})`)

        // const xAxisTickFormat = number => d3.format('.3s')(number).replace('G','B');


        const xAxis = d3.axisBottom(xScale)
        // .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight)
        .ticks(7)
        .tickPadding(20);

        const yAxisTickFormat = number => d3.format('.1s')(number).replace('G','B');

        const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat(yAxisTickFormat);

        const yAxisG = g.append('g')
        .call(yAxis);

        yAxisG.selectAll('.domain')
        .remove();

        yAxisG.append('text')
        .attr('class','axis-label')
        .attr('y',-50)
        .attr('x',-innerHeight/2)
        .attr('fill','black')
        .attr('transform','rotate(-90)')
        .style('text-anchor','middle')
        .text(yAxisLabel)

        const xAxisG = g.append('g')
        .call(xAxis)
        .attr('transform',`translate(0,${innerHeight})`);

        xAxisG.selectAll('.domain').remove();

        xAxisG.append('text')
        .attr('class','axis-label')
        .attr('y',50)
        .attr('x',innerWidth/2)
        .attr('fill','black')
        .text(xAxisLabel)

        const areaGenerator = d3.area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue(d)))
        .curve(d3.curveBasis)

        g.append('path')
        .attr('class','line-path')
        .attr('d',areaGenerator(data))

        // g.selectAll('circle').data(data)
        // .enter()
        // .append('circle')
        // .attr('cy',d => yScale(yValue(d)))
        // .attr('cx',d => xScale(xValue(d)))
        // .attr('r',circleRadius)


        svg.append('text')
        .attr('class','title')
        .text('World Population')
        .attr('y',25)
        .attr('x',width/2)
    };

    d3.csv('https://vizhub.com/curran/datasets/world-population-by-year-2015.csv')
    .then(data => {
        console.log(data)
        data.forEach(d => {
            d.population = +d.population;
            d.year = new Date(d.year);
        });
        render(data);
    })
}

window.onload = whenLoaded;
