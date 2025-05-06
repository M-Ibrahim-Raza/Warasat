import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const SiblingsNodes = ({siblingsData}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 1000;
    const height = 500;

    // Create the tree layout
    const treeLayout = d3.tree().size([width, height - 100]);

    // Create hierarchy from the tree data
    const root = d3.hierarchy(siblingsData);
    treeLayout(root);

    // Select the svg element and set its dimensions
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Create link
      svg.selectAll('.link')
      .data(root.links())
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y+250)
      .attr('x2', d => d.target.x)
      .attr('y2', d =>{
        if (d.target.data.name === "Wife" || d.target.data.name === "Husband"){
          return d.target.y-70
        }else{
          return d.target.y-130
        }
      })
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2);



    // Create nodes
    const nodes = svg.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => {
        if (d.data.name === "Deceased") {
          return `translate(${d.x - 60},${d.y + 220})`
        } else if (d.data.name === "Wife" || d.data.name === "Husband"){
          return `translate(${d.x - 60},${d.y - 70})`
        }
        else {
          return `translate(${d.x - 60},${d.y - 130})`
        }
      });


    nodes.append('rect')
      .attr('width', 120)  // Set width of the rectangle
      .attr('height', 50)  // Set height of the rectangle
      .attr('rx', 15)  // Round the corners of the rectangle (radius)
      .attr('ry', 15)  // Round the corners of the rectangle (radius)
      .attr('fill', '#02615E')  // Set the fill color
      .attr('stroke', '#032945')  // Set the stroke color
      .attr('stroke-width', 2);  // Set the stroke width


    nodes.append('text')
      .attr('dy', d => d.data.name === "Deceased" ? 30 : 20)
      .attr('dx', 60)
      .attr('text-anchor', 'middle')
      .attr('fill', '#edfff2')  // Set the text color
      .style('font-size', '0.75rem')
      .text(d => d.data.name)
      ;

    nodes.append('text')
      .attr('dy', 40)
      .attr('dx', 60)
      .attr('text-anchor', 'middle')
      .attr('fill', '#edfff2')  // Set the text color
      .style('font-size', '0.75rem')
      .text(d => d.data.share !== undefined ? `${d.data.share} %` : '');  // Conditional text based on whether share is defined



  }, []);

  return (
      <svg ref={svgRef} />
  );
};

export default SiblingsNodes;
