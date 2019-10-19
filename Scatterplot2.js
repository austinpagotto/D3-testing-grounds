
function whenLoaded(){

    const svg = d3.select('svg');

    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const render = data => {
        const xValue = d => d.mpg
        const yValue = d => d.horsepower
        const margin = {top:40,right:20,bottom:80,left:150}
        const innerWidth = width - margin.left - margin.right;
        const innerHeight= height - margin.top - margin.bottom;
        const circleRadius = 10;
        const xAxisLabel = 'MPG';
        const yAxisLabel = 'Horsepower'

        const xScale = d3.scaleLinear()
        .domain(d3.extent(data,xValue))
        .range([0,innerWidth])
        .nice();

        
        const yScale = d3.scaleLinear()
        .domain(d3.extent(data,yValue))
        .range([0,innerHeight])
        .nice();
        

        const g = svg.append('g')
        .attr('transform',`translate(${margin.left},${margin.top})`)

        // const xAxisTickFormat = number => d3.format('.3s')(number).replace('G','B');


        const xAxis = d3.axisBottom(xScale)
        // .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight)
        .tickPadding(20);

        const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth);

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

        g.selectAll('circle').data(data)
        .enter()
        .append('circle')
        .attr('cy',d => yScale(yValue(d)))
        .attr('cx',d => xScale(xValue(d)))
        .attr('r',circleRadius)


        g.append('text')
        .attr('class','title')
        .text('Horsepower and MPG')
        .attr('y',-10)
        .attr('x',innerWidth/4)
    };

    d3.csv('https://vizhub.com/curran/datasets/auto-mpg.csv').then(data => {
        data.forEach(d => {
            d.mpg = +d.mpg;
            d.cylinders = +d.cylinders;
            d.displacement = +d.displacement;
            d.horsepower = +d.horsepower;
            d.weight = +d.weight;
            d.acceleration = +d.acceleration;
            d.year = +d.year;
        });
        render(data);
    })
}

window.onload = whenLoaded;
