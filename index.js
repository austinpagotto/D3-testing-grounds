function setbkrd() {
  const svg = d3.select("svg");

  const height = svg.attr("height");
  const width = svg.attr("width");
  const eyeSpacing = 100;
  const eyeHeight = 80;

  const circle = svg
    .append("circle")
    .attr("r", 225)
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("fill", "yellow")
    .attr("stroke", "black");

  const leftEye = svg
    .append("circle")
    .attr("r", 20)
    .attr("cx", width / 2 - eyeSpacing)
    .attr("cy", height / 2 - eyeHeight)
    .attr("fill", "black");

  const RightEye = svg
    .append("circle")
    .attr("r", 20)
    .attr("cx", width / 2 + eyeSpacing)
    .attr("cy", height / 2 - eyeHeight)
    .attr("fill", "black");

  const leftEyebrow = svg
    .append("rect")
    .attr("x", width / 2 - eyeSpacing - 25)
    .attr("y", height / 2 - eyeHeight - 50)
    .attr("fill", "black")
    .attr("width", 60)
    .attr("height", 20)
    .transition()
    .duration(2000)
    .attr("y", height / 2 - eyeHeight - 80)
    .transition()
    .duration(2000)
    .attr("y", height / 2 - eyeHeight - 50);


  const rightEyebrow = svg
    .append("rect")
    .attr("x", width / 2 + eyeSpacing - 25)
    .attr("y", height / 2 - eyeHeight - 50)
    .attr("fill", "black")
    .attr("width", 60)
    .attr("height", 20)
    .transition()
    .duration(2000)
    .attr("y", height / 2 - eyeHeight - 80)
    .transition()
    .duration(2000)
    .attr("y", height / 2 - eyeHeight - 50);

  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 1.8})`);

  const arc = d3.arc();
  const mouth = g.append("path").attr(
    "d",
    arc({
      innerRadius: 80,
      outerRadius: 100,
      startAngle: Math.PI / 2,
      endAngle: (Math.PI * 3) / 2
    })
  );
}

window.onload = setbkrd;
