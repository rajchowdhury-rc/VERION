import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CaseOption, FinishOption, StrapOption } from '../types';

interface VerionCanvasProps {
  mode?: 'hero' | 'interactive' | 'configurator' | 'craft';
  caseMaterial?: CaseOption;
  finish?: FinishOption;
  strap?: StrapOption;
  craftProgress?: number; // 0 (raw billet) to 1 (finished object)
  scrollProgress?: number; // 0 to 1
  className?: string;
  onHoverState?: (isHovering: boolean) => void;
  interactive?: boolean;
}

export const VerionCanvas: React.FC<VerionCanvasProps> = ({
  mode = 'hero',
  caseMaterial = 'titanium',
  finish = 'brushed',
  strap = 'graphite',
  craftProgress = 1,
  scrollProgress = 0,
  className = '',
  onHoverState,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const rawBilletRef = useRef<THREE.Mesh | null>(null);
  const finishedWatchRef = useRef<THREE.Group | null>(null);

  // Dynamic material references for configurator
  const caseMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const strapMaterialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const dialMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const sapphireMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);

  // Lights
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const fillLightRef = useRef<THREE.DirectionalLight | null>(null);

  // Mouse & Physics Inertia state
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const drag = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    rotX: 0,
    rotY: 0,
    targetRotX: 0,
    targetRotY: 0,
    velX: 0,
    velY: 0,
  });
  const zoom = useRef({ current: 4.8, target: 4.8 });
  const animFrameId = useRef<number | null>(null);

  // Material property generator based on case & finish
  const getCaseMaterialProps = (mat: CaseOption | string = 'titanium', fin: FinishOption | string = 'brushed') => {
    let color = 0x8a8c90; // Titanium grey
    let metalness = 0.92;
    let roughness = 0.28;
    let clearcoat = 0.2;

    if (mat === 'ceramic') {
      color = 0x18191c;
      metalness = 0.15;
      roughness = 0.18;
      clearcoat = 0.9;
    } else if (mat === 'obsidian') {
      color = 0x0f1012;
      metalness = 0.88;
      roughness = 0.22;
      clearcoat = 0.5;
    }

    if (fin === 'polished') {
      roughness = Math.max(0.06, roughness - 0.16);
      clearcoat = 0.9;
    } else if (fin === 'matte') {
      roughness = Math.min(0.65, roughness + 0.25);
      clearcoat = 0.05;
    }

    return { color, metalness, roughness, clearcoat };
  };

  const getStrapMaterialProps = (s: StrapOption | string = 'graphite') => {
    if (s === 'ivory') {
      return { color: 0xd8d4cb, roughness: 0.5, metalness: 0.05 };
    }
    if (s === 'carbon') {
      return { color: 0x121214, roughness: 0.42, metalness: 0.4 };
    }
    // graphite default
    return { color: 0x222326, roughness: 0.45, metalness: 0.15 };
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, mode === 'hero' ? 5.2 : 4.6);
    cameraRef.current = camera;

    // 2. Renderer with Film tone mapping & high-fps performance
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'mediump',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Studio Lighting (Refined luxury studio lighting)
    const ambientLight = new THREE.AmbientLight(0x222228, 1.1);
    scene.add(ambientLight);

    // Primary Softbox Key light (Warm-White studio light)
    const keyLight = new THREE.DirectionalLight(0xf5f3ee, 2.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    // Rim / Silhouette Light (Refined cool metallic edge)
    const rimLight = new THREE.DirectionalLight(0xb4c2d2, 3.4);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // Fill Light (Low angle subtle graphite bounce)
    const fillLight = new THREE.DirectionalLight(0x404248, 1.4);
    fillLight.position.set(0, -4, 3);
    scene.add(fillLight);
    fillLightRef.current = fillLight;

    // 4. Master Model Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    modelGroupRef.current = masterGroup;

    // 5. Build Finished VÉRION ONE Object
    const finishedGroup = new THREE.Group();
    finishedWatchRef.current = finishedGroup;
    masterGroup.add(finishedGroup);

    // Initial Material setups
    const caseProps = getCaseMaterialProps(caseMaterial, finish);
    const primaryCaseMaterial = new THREE.MeshPhysicalMaterial({
      color: caseProps.color,
      metalness: caseProps.metalness,
      roughness: caseProps.roughness,
      clearcoat: caseProps.clearcoat,
      reflectivity: 0.9,
    });
    caseMaterialsRef.current = [primaryCaseMaterial];

    // Main Architectural Chassis (Sculpted rounded octagonal bezel/case)
    const caseRadius = 1.35;
    const caseThickness = 0.38;
    const caseGeometry = new THREE.CylinderGeometry(
      caseRadius,
      caseRadius * 0.97,
      caseThickness,
      48,
      1,
      false
    );
    const caseMesh = new THREE.Mesh(caseGeometry, primaryCaseMaterial);
    caseMesh.castShadow = true;
    caseMesh.receiveShadow = true;
    finishedGroup.add(caseMesh);

    // Beveled Titanium Outer Ring
    const outerBezelGeo = new THREE.TorusGeometry(caseRadius * 0.98, 0.055, 24, 64);
    const outerBezelMesh = new THREE.Mesh(outerBezelGeo, primaryCaseMaterial);
    outerBezelMesh.rotation.x = Math.PI / 2;
    outerBezelMesh.position.y = caseThickness / 2;
    finishedGroup.add(outerBezelMesh);

    // Fine Knurled Tactile Crown at 3 o'clock
    const crownGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.18, 32);
    const crownMat = new THREE.MeshPhysicalMaterial({
      color: caseProps.color,
      metalness: 0.95,
      roughness: 0.35,
    });
    const crownMesh = new THREE.Mesh(crownGeo, crownMat);
    crownMesh.rotation.z = Math.PI / 2;
    crownMesh.position.set(caseRadius + 0.06, 0, 0);
    finishedGroup.add(crownMesh);

    // Dial Bed (Deep graphite ceramic plate)
    const dialMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c0c0e,
      roughness: 0.32,
      metalness: 0.1,
      clearcoat: 0.3,
    });
    dialMaterialRef.current = dialMat;
    const dialGeo = new THREE.CylinderGeometry(caseRadius * 0.88, caseRadius * 0.88, 0.08, 48);
    const dialMesh = new THREE.Mesh(dialGeo, dialMat);
    dialMesh.position.y = caseThickness / 2 - 0.02;
    finishedGroup.add(dialMesh);

    // Precision Concentric Micro-Tracks
    const trackGeo = new THREE.RingGeometry(caseRadius * 0.65, caseRadius * 0.82, 48);
    const trackMat = new THREE.MeshStandardMaterial({
      color: 0x18191c,
      roughness: 0.6,
      metalness: 0.3,
      side: THREE.DoubleSide,
    });
    const trackMesh = new THREE.Mesh(trackGeo, trackMat);
    trackMesh.rotation.x = -Math.PI / 2;
    trackMesh.position.y = caseThickness / 2 + 0.021;
    finishedGroup.add(trackMesh);

    // 12 Minimalist Titanium Indices
    const markerMat = new THREE.MeshStandardMaterial({
      color: 0xd8dadf,
      metalness: 0.95,
      roughness: 0.15,
    });
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const markerGeo = new THREE.BoxGeometry(0.024, 0.012, i % 3 === 0 ? 0.16 : 0.09);
      const marker = new THREE.Mesh(markerGeo, markerMat);
      const r = caseRadius * 0.76;
      marker.position.set(Math.cos(angle) * r, caseThickness / 2 + 0.025, Math.sin(angle) * r);
      marker.rotation.y = -angle + Math.PI / 2;
      finishedGroup.add(marker);
    }

    // Razor-Fine Minimalist Hands / Chrono Needle
    const hourHandGeo = new THREE.BoxGeometry(0.032, 0.015, 0.52);
    const minuteHandGeo = new THREE.BoxGeometry(0.022, 0.015, 0.82);
    const handMat = new THREE.MeshStandardMaterial({
      color: 0xf0f0f4,
      metalness: 0.9,
      roughness: 0.1,
    });
    const hourHand = new THREE.Mesh(hourHandGeo, handMat);
    hourHand.position.set(0, caseThickness / 2 + 0.035, 0.22);
    hourHand.rotation.y = 0.8;
    finishedGroup.add(hourHand);

    const minuteHand = new THREE.Mesh(minuteHandGeo, handMat);
    minuteHand.position.set(0, caseThickness / 2 + 0.04, -0.32);
    minuteHand.rotation.y = -1.4;
    finishedGroup.add(minuteHand);

    // Central Precision Pinion
    const centerPinGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.06, 24);
    const centerPin = new THREE.Mesh(centerPinGeo, handMat);
    centerPin.position.y = caseThickness / 2 + 0.04;
    finishedGroup.add(centerPin);

    // Sapphire Crystal Glass (Real IOR 1.77, soft specular highlights)
    const sapphireMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,
      opacity: 1,
      transparent: true,
      roughness: 0.04,
      ior: 1.77,
      specularIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });
    sapphireMaterialRef.current = sapphireMat;
    const sapphireGeo = new THREE.CylinderGeometry(
      caseRadius * 0.92,
      caseRadius * 0.92,
      0.06,
      48
    );
    const sapphireMesh = new THREE.Mesh(sapphireGeo, sapphireMat);
    sapphireMesh.position.y = caseThickness / 2 + 0.045;
    finishedGroup.add(sapphireMesh);

    // Sculptural Integrated Lug Mounts & Bracelet Segments
    const strapProps = getStrapMaterialProps(strap);
    const strapMat = new THREE.MeshPhysicalMaterial({
      color: strapProps.color,
      roughness: strapProps.roughness,
      metalness: strapProps.metalness,
      clearcoat: 0.1,
    });
    strapMaterialsRef.current = [strapMat];

    const createStrapHalf = (dir: 1 | -1) => {
      const halfGroup = new THREE.Group();
      const linkCount = 4;
      for (let i = 0; i < linkCount; i++) {
        const linkW = 1.6 - i * 0.08;
        const linkL = 0.42;
        const linkH = 0.22;
        const linkGeo = new THREE.BoxGeometry(linkW, linkH, linkL);
        const linkMesh = new THREE.Mesh(linkGeo, strapMat);
        const zOffset = (caseRadius * 0.94 + i * 0.4) * dir;
        const yOffset = -0.06 - i * 0.05;
        linkMesh.position.set(0, yOffset, zOffset);
        linkMesh.rotation.x = dir * (0.12 + i * 0.08);
        linkMesh.castShadow = true;
        halfGroup.add(linkMesh);
      }
      return halfGroup;
    };

    finishedGroup.add(createStrapHalf(1));
    finishedGroup.add(createStrapHalf(-1));

    // Subtle Ground Shadow Disc
    const shadowGeo = new THREE.CircleGeometry(2.4, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.3;
    masterGroup.add(shadowMesh);

    // 6. Build Raw Billet Mesh for Craft Transformation Mode
    const billetGeo = new THREE.BoxGeometry(2.6, 1.4, 2.6, 6, 6, 6);
    // Add realistic rough-cut machining tool marks
    const posAttr = billetGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const vz = posAttr.getZ(i);
      const noise = (Math.sin(vx * 10) + Math.cos(vz * 10)) * 0.02;
      posAttr.setXYZ(i, vx + noise, vy, vz + noise);
    }
    billetGeo.computeVertexNormals();

    const billetMat = new THREE.MeshStandardMaterial({
      color: 0x4a4d52,
      roughness: 0.85,
      metalness: 0.7,
      wireframe: false,
    });
    const rawBillet = new THREE.Mesh(billetGeo, billetMat);
    rawBillet.position.y = 0;
    rawBillet.visible = mode === 'craft';
    masterGroup.add(rawBillet);
    rawBilletRef.current = rawBillet;

    // Initial orientation based on mode
    if (mode === 'hero') {
      finishedGroup.rotation.set(0.65, -0.45, 0.2);
    } else if (mode === 'product' || mode === 'interactive') {
      finishedGroup.rotation.set(0.4, -0.3, 0);
    } else if (mode === 'configurator') {
      finishedGroup.rotation.set(0.5, -0.2, 0.05);
    }

    // 7. Event Listeners for Physical Mouse & Drag Inertia
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.current.targetX = x;
      mouse.current.targetY = y;

      if (drag.current.isDragging) {
        const deltaX = e.clientX - drag.current.startX;
        const deltaY = e.clientY - drag.current.startY;
        drag.current.targetRotY += deltaX * 0.007;
        drag.current.targetRotX += deltaY * 0.007;
        drag.current.startX = e.clientX;
        drag.current.startY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      drag.current.isDragging = true;
      drag.current.startX = e.clientX;
      drag.current.startY = e.clientY;
      drag.current.velX = 0;
      drag.current.velY = 0;
    };

    const handleMouseUp = () => {
      drag.current.isDragging = false;
    };

    // Touch support for mobile luxury view
    const handleTouchStart = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      drag.current.isDragging = true;
      drag.current.startX = e.touches[0].clientX;
      drag.current.startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!drag.current.isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - drag.current.startX;
      const deltaY = e.touches[0].clientY - drag.current.startY;
      drag.current.targetRotY += deltaX * 0.009;
      drag.current.targetRotX += deltaY * 0.009;
      drag.current.startX = e.touches[0].clientX;
      drag.current.startY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      drag.current.isDragging = false;
    };

    const handleMouseEnter = () => onHoverState?.(true);
    const handleMouseLeave = () => {
      onHoverState?.(false);
      drag.current.isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousemove', handleMouseMove);
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    domElement.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    domElement.addEventListener('mouseenter', handleMouseEnter);
    domElement.addEventListener('mouseleave', handleMouseLeave);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // 8. Physical Animation Render Loop with Intersection Observer to save GPU
    let clock = new THREE.Clock();
    let isVisible = true;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
          if (isVisible && !animFrameId.current) {
            animFrameId.current = requestAnimationFrame(animate);
          }
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const animate = () => {
      if (!isVisible) {
        animFrameId.current = null;
        return;
      }

      // Smooth mouse interpolation (gentle camera & lighting shift)
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Realistic Inertia for Drag Rotation
      drag.current.rotX += (drag.current.targetRotX - drag.current.rotX) * 0.08;
      drag.current.rotY += (drag.current.targetRotY - drag.current.rotY) * 0.08;

      // Fixed elegant camera framing without jarring zoom
      camera.position.z = mode === 'hero' ? 5.2 : 4.6;

      // Lighting subtly responds to mouse
      if (keyLightRef.current) {
        keyLightRef.current.position.x = 4 + mouse.current.x * 1.5;
        keyLightRef.current.position.y = 5 + mouse.current.y * 1.2;
      }

      // Handle orientation based on mode and scroll
      if (modelGroupRef.current) {
        if (mode === 'hero') {
          // Slow luxury floating rotation
          const slowTime = clock.getElapsedTime() * 0.25;
          const targetY = drag.current.rotY + mouse.current.x * 0.35 + slowTime;
          const targetX = drag.current.rotX - mouse.current.y * 0.25 + 0.45;
          modelGroupRef.current.rotation.y = targetY;
          modelGroupRef.current.rotation.x = targetX;
        } else if (mode === 'interactive' || mode === 'configurator') {
          // Responsive to drag and subtle mouse parallax
          modelGroupRef.current.rotation.y = drag.current.rotY + mouse.current.x * 0.2;
          modelGroupRef.current.rotation.x = drag.current.rotX - mouse.current.y * 0.18 + 0.4;
        } else if (mode === 'craft') {
          // Controlled by craftProgress scrubber
          modelGroupRef.current.rotation.y = clock.getElapsedTime() * 0.15 + drag.current.rotY;
          modelGroupRef.current.rotation.x = 0.35 + drag.current.rotX;
        }
      }

      renderer.render(scene, camera);
      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      domElement.removeEventListener('mousemove', handleMouseMove);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      domElement.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      domElement.removeEventListener('mouseenter', handleMouseEnter);
      domElement.removeEventListener('mouseleave', handleMouseLeave);
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      renderer.dispose();
    };
  }, [mode, interactive]);

  // Update materials when caseMaterial or finish changes
  useEffect(() => {
    const props = getCaseMaterialProps(caseMaterial, finish);
    caseMaterialsRef.current.forEach((mat) => {
      mat.color.setHex(props.color);
      mat.metalness = props.metalness;
      mat.roughness = props.roughness;
      mat.clearcoat = props.clearcoat;
      mat.needsUpdate = true;
    });
  }, [caseMaterial, finish]);

  // Update strap materials
  useEffect(() => {
    const props = getStrapMaterialProps(strap);
    strapMaterialsRef.current.forEach((mat) => {
      mat.color.setHex(props.color);
      mat.roughness = props.roughness;
      mat.metalness = props.metalness;
      mat.needsUpdate = true;
    });
  }, [strap]);

  // Update craft transformation progression
  useEffect(() => {
    if (mode === 'craft' && rawBilletRef.current && finishedWatchRef.current) {
      // Interpolate scale and visibility
      const p = Math.max(0, Math.min(1, craftProgress));
      // Billet chips away
      rawBilletRef.current.scale.set(1 - p * 0.8, 1 - p * 0.7, 1 - p * 0.8);
      (rawBilletRef.current.material as THREE.MeshStandardMaterial).opacity = 1 - p;
      (rawBilletRef.current.material as THREE.MeshStandardMaterial).transparent = true;
      rawBilletRef.current.visible = p < 0.98;

      // Finished watch emerges
      finishedWatchRef.current.scale.set(p, p, p);
      finishedWatchRef.current.position.y = (1 - p) * -0.5;
    }
  }, [craftProgress, mode]);

  // Update scroll progression in hero section
  useEffect(() => {
    if (mode === 'hero' && modelGroupRef.current) {
      // Smooth angle progression based on scrollProgress
      const targetZ = -0.5 + scrollProgress * 0.8;
      modelGroupRef.current.position.z = targetZ;
      modelGroupRef.current.position.y = (scrollProgress - 0.5) * -0.4;
    }
  }, [scrollProgress, mode]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none ${className}`}
    />
  );
};
