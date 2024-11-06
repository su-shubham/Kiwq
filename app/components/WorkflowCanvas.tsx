import { useEffect, useRef } from "react";

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  status: "pending" | "active" | "complete";
}

interface Edge {
  from: string;
  to: string;
}

const nodes: Node[] = [
  { id: "detection", x: 100, y: 150, label: "Initial Detection", status: "complete" },
  { id: "analysis", x: 300, y: 150, label: "Analysis", status: "active" },
  { id: "results", x: 500, y: 150, label: "Results", status: "pending" },
  { id: "mitigation", x: 700, y: 150, label: "Mitigation", status: "pending" },
];

const edges: Edge[] = [
  { from: "detection", to: "analysis" },
  { from: "analysis", to: "results" },
  { from: "results", to: "mitigation" },
];

export default function WorkflowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawNode = (node: Node) => {
      ctx.beginPath();
      ctx.fillStyle = getNodeColor(node.status);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 2;
      ctx.roundRect(node.x - 60, node.y - 30, 120, 60, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#fff";
      ctx.font = "14px Inter";
      ctx.textAlign = "center";
      ctx.fillText(node.label, node.x, node.y);

      if (node.status === "active") {
        drawPulse(ctx, node);
      }
    };

    const drawEdge = (edge: Edge) => {
      const from = nodes.find((n) => n.id === edge.from);
      const to = nodes.find((n) => n.id === edge.to);
      if (!from || !to) return;

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 2;
      ctx.moveTo(from.x + 60, from.y);
      ctx.lineTo(to.x - 60, to.y);
      ctx.stroke();

      // Draw arrow
      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      ctx.beginPath();
      ctx.moveTo(to.x - 70, to.y);
      ctx.lineTo(to.x - 80, to.y - 5);
      ctx.lineTo(to.x - 80, to.y + 5);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      ctx.fill();
    };

    const drawPulse = (ctx: CanvasRenderingContext2D, node: Node) => {
      const time = Date.now() / 1000;
      const scale = 1 + 0.1 * Math.sin(time * 4);
      
      ctx.save();
      ctx.translate(node.x, node.y);
      ctx.scale(scale, scale);
      ctx.translate(-node.x, -node.y);
      
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.roundRect(node.x - 65, node.y - 35, 130, 70, 10);
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      edges.forEach(drawEdge);
      nodes.forEach(drawNode);
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={300}
      className="w-full h-[300px] rounded-xl bg-gray-900/50"
    />
  );
}

function getNodeColor(status: Node["status"]) {
  switch (status) {
    case "complete":
      return "rgba(34, 197, 94, 0.2)";
    case "active":
      return "rgba(59, 130, 246, 0.2)";
    case "pending":
      return "rgba(107, 114, 128, 0.2)";
  }
}