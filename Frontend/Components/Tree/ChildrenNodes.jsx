import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ChildrenNodes = ({ childrenData }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 850;
    const height = 500;

    // Create the tree layout
    const treeLayout = d3.tree().size([width, height - 100]);

    // Create hierarchy from the tree data
    const root = d3.hierarchy(childrenData);
    treeLayout(root);

    // Select the svg element and set its dimensions
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // console.log(root.height)
    // console.log(root.children[0].children.length)
    
    let buffer=0
    if (root.children && root.children.length==2 && root.children[0].children && root.children[0].children.length==2){
    buffer=-61
    }

    if (root.height === 2) {

      // Create links
      svg.selectAll('.link')
        .data(root.links())
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('x1', d => d.source.x+buffer)
        .attr('y1', d => {
          // Apply offset based on the source node's name
          if (d.source.data.name === "Deceased") {
            return d.source.y + 70; // Standard offset for other nodes
          } else {
            return d.source.y + 30; // Standard offset for other nodes
          }
        }
        )
        .attr('x2', d => d.target.x+buffer)
        .attr('y2', d => {
          // Apply offset based on the target node's name
          if (d.target.depth == 2) {
            return d.target.y - 60; // Standard offset for other nodes
          }
          return d.target.y - 10; // Standard offset for other nodes
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
            return `translate(${d.x - 60+buffer},${d.y + 20})`
          } else if (d.depth === 2) {
            return `translate(${d.x - 60+buffer},${d.y - 60})`
          }
          else {
            return `translate(${d.x - 60+buffer},${d.y - 20})`
          }
        });

      // Add rectangle
      nodes.append('rect')
        .attr('width', 120)  // Set width of the rectangle
        .attr('height', 50)  // Set height of the rectangle
        .attr('rx', 15)  // Round the corners of the rectangle (radius)
        .attr('ry', 15)  // Round the corners of the rectangle (radius)
        .attr('fill', '#02615E')  // Set the fill color
        .attr('stroke', '#032945')  // Set the stroke color
        .attr('stroke-width', 2);  // Set the stroke width

      // Add relation
      nodes.append('text')
        .attr('dy', d => d.data.name === "Deceased" ? 30 : 20)
        .attr('dx', 60)
        .attr('text-anchor', 'middle')
        .attr('fill', '#edfff2')  // Set the text color
        .style('font-size', '0.75rem')
        .text(d => d.data.name)
        ;

      // Add share
      nodes.append('text')
        .attr('dy', 40)
        .attr('dx', 60)
        .attr('text-anchor', 'middle')
        .attr('fill', '#edfff2')  // Set the text color
        .style('font-size', '0.75rem')
        .text(d => d.data.share !== undefined ? `${d.data.share} %` : '');  // Conditional text based on whether share is defined
    }
     else {

      // Create links
      svg.selectAll('.link')
        .data(root.links())
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('x1', d => d.source.x)
        .attr('y1', d => {
            return d.source.y + 70; // Standard offset for other nodes
        }
        )
        .attr('x2', d => d.target.x)
        .attr('y2', d => {
          // Apply offset based on the target node's name
          return d.target.y - 220; // Standard offset for other nodes
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
            return `translate(${d.x - 60},${d.y + 20})`
          }
          else {
            return `translate(${d.x - 60},${d.y-220})`
          }
        });

      // Add rectangle
      nodes.append('rect')
        .attr('width', 120)  // Set width of the rectangle
        .attr('height', 50)  // Set height of the rectangle
        .attr('rx', 15)  // Round the corners of the rectangle (radius)
        .attr('ry', 15)  // Round the corners of the rectangle (radius)
        .attr('fill', '#02615E')  // Set the fill color
        .attr('stroke', '#032945')  // Set the stroke color
        .attr('stroke-width', 2);  // Set the stroke width

      // Add relation
      nodes.append('text')
        .attr('dy', d => d.data.name === "Deceased" ? 30 : 20)
        .attr('dx', 60)
        .attr('text-anchor', 'middle')
        .attr('fill', '#edfff2')  // Set the text color
        .style('font-size', '0.75rem')
        .text(d => d.data.name)
        ;

      // Add share
      nodes.append('text')
        .attr('dy', 40)
        .attr('dx', 60)
        .attr('text-anchor', 'middle')
        .attr('fill', '#edfff2')  // Set the text color
        .style('font-size', '0.75rem')
        .text(d => d.data.share !== undefined ? `${d.data.share} %` : '');  // Conditional text based on whether share is defined

    }
  }, []);

  return (
      <svg ref={svgRef} />
  );
};

export default ChildrenNodes;
