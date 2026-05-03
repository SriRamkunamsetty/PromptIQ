import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function AttentionGraph({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    
    containerRef.current.innerHTML = '';
    const width = containerRef.current.clientWidth;
    const height = 200;

    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('overflow', 'hidden');

    const nodes = [
      { id: 'Intent', r: 15, x: width/4, y: height/2 },
      { id: 'Tone', r: 10, x: width/2, y: height/3 },
      { id: 'Constraints', r: 12, x: width*0.75, y: height/2 },
      { id: 'Conflict', r: 20, x: width/2, y: height*0.7 },
    ];

    const links = [
      { source: 0, target: 1 },
      { source: 1, target: 2 },
      { source: 0, target: 3 },
      { source: 2, target: 3 },
    ];

    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', 'rgba(255,255,255,0.2)');

    const linkPaths = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', 'rgba(255,255,255,0.1)')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrow)');

    const nodeGroups = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g');

    const circles = nodeGroups.append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => d.id === 'Conflict' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(45, 212, 191, 0.4)')
      .attr('stroke', d => d.id === 'Conflict' ? '#ef4444' : '#2dd4bf')
      .attr('stroke-width', 2);

    const labels = nodeGroups.append('text')
      .text(d => d.id)
      .attr('font-size', '10px')
      .attr('font-family', 'monospace')
      .attr('fill', '#fff')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.r + 12);

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).distance(80))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', () => {
        linkPaths
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        nodeGroups
          .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
      });

    return () => {
      simulation.stop();
    };
  }, [active]);

  return (
    <div className="w-full relative min-h-[200px]">
       {!active ? (
         <div className="absolute inset-0 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
           <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Awaiting Data</span>
         </div>
       ) : (
         <div ref={containerRef} className="absolute inset-0 bg-background/50 rounded-xl border border-white/5" />
       )}
    </div>
  );
}
