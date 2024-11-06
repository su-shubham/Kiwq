import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface Node {
  id: string;
  type: 'honeypot' | 'attacker' | 'connection';
  position: [number, number, number];
  connections: string[];
}

const nodes: Node[] = [
  { id: 'hp1', type: 'honeypot', position: [0, 0, 0], connections: ['att1'] },
  { id: 'hp2', type: 'honeypot', position: [2, 0, 2], connections: ['att2'] },
  { id: 'att1', type: 'attacker', position: [-2, 0, -2], connections: ['hp1'] },
  { id: 'att2', type: 'attacker', position: [4, 0, -2], connections: ['hp2'] },
];

export default function NetworkTopology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Grid
    const grid = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    scene.add(grid);

    // Nodes
    const nodeGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const honeypotMaterial = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
    const attackerMaterial = new THREE.MeshBasicMaterial({ color: 0xef4444 });

    nodes.forEach(node => {
      const material = node.type === 'honeypot' ? honeypotMaterial : attackerMaterial;
      const mesh = new THREE.Mesh(nodeGeometry, material);
      mesh.position.set(...node.position);
      scene.add(mesh);

      // Add connections
      node.connections.forEach(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (target) {
          const points = [];
          points.push(new THREE.Vector3(...node.position));
          points.push(new THREE.Vector3(...target.position));

          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({
            color: 0x00ff00,
            opacity: 0.5,
            transparent: true,
          });
          const line = new THREE.Line(geometry, material);
          scene.add(line);
        }
      });
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[400px] rounded-xl overflow-hidden" />
  );
}