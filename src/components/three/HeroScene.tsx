"use client";

/**
 * Home hero 3D scene: the Watwa mark as a water-glass hexagonal prism with
 * the teal W suspended inside, two engineered hex rings orbiting it, bubbles
 * rising through the frame and a rippling field of water points below.
 *
 * No network assets: lighting comes from in-scene Lightformers, so the scene
 * renders offline and never waits on an HDR download. The render loop stops
 * while the hero is off screen, and reduced-motion users get a single still
 * frame.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { W_POINTS } from "@/components/ui/Logo";

/** Matches --color-canvas, so the canvas edge is invisible against the page. */
const CANVAS = "#f7fbfc";
const TEAL = "#0b84a5";
const AQUA = "#4fd1e8";
/** What the glass "sees" behind itself: a pale aqua, so the prism reads as clear water on the light page. */
const GLASS_BACKDROP = new THREE.Color("#bfe9f3");

function useWGeometry() {
  return useMemo(() => {
    const s = 0.021;
    const shape = new THREE.Shape(W_POINTS.map(([x, y]) => new THREE.Vector2((x - 50) * s, -(y - 59.6) * s)));
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.02,
      bevelSegments: 3,
    });
    geo.center();
    return geo;
  }, []);
}

function Mark({ quality }: { quality: "high" | "low" }) {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const wGeo = useWGeometry();

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.5);
    const targetY = state.pointer.x * 0.45 + scroll * 1.2;
    const targetX = -state.pointer.y * 0.25 + scroll * 0.25;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, scroll * 0.9, 4, delta);
    if (ringA.current) ringA.current.rotation.z += delta * 0.18;
    if (ringB.current) {
      ringB.current.rotation.z -= delta * 0.12;
      ringB.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.35;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        {/* Glass hexagonal prism: a 6-sided cylinder turned to face the camera, pointy-top like the logo. */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.62, 6, 1]} />
          <MeshTransmissionMaterial
            backside
            samples={quality === "high" ? 8 : 3}
            resolution={quality === "high" ? 1024 : 384}
            thickness={0.9}
            roughness={0.04}
            ior={1.33}
            chromaticAberration={0.08}
            anisotropicBlur={0.2}
            distortion={0.25}
            distortionScale={0.4}
            temporalDistortion={0.08}
            color="#e8fbff"
            background={GLASS_BACKDROP}
          />
        </mesh>
        <mesh geometry={wGeo}>
          <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={0.15} metalness={0.2} roughness={0.3} />
        </mesh>
      </Float>

      <mesh ref={ringA} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[2.25, 0.012, 8, 6]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh ref={ringB} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[2.7, 0.006, 8, 6]} />
        <meshBasicMaterial color="#e08a1e" transparent opacity={0.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Seeded PRNG (mulberry32) so bubble layout is deterministic and render stays pure. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Bubbles({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const seeds = useMemo(() => {
    const random = seeded(7);
    return Array.from({ length: count }, () => ({
        x: 0.5 + random() * 6.5,
        y: (random() - 0.5) * 9,
        z: -random() * 6 + 1,
        speed: 0.15 + random() * 0.45,
        size: 0.008 + random() * 0.028,
        wobble: random() * Math.PI * 2,
      }));
  }, [count]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime;
    seeds.forEach((b, i) => {
      b.y += b.speed * delta;
      if (b.y > 4.8) b.y = -4.8;
      dummy.position.set(b.x + Math.sin(t * 0.8 + b.wobble) * 0.12, b.y, b.z);
      dummy.scale.setScalar(b.size);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial color={AQUA} emissive={TEAL} emissiveIntensity={0.2} roughness={0.1} transparent opacity={0.5} />
    </instancedMesh>
  );
}

const waterVertex = /* glsl */ `
  uniform float uTime;
  varying float vHeight;
  varying float vFade;
  void main() {
    vec3 p = position;
    float h = sin(p.x * 0.9 + uTime * 0.9) * 0.18
            + sin(p.y * 1.3 + uTime * 0.6) * 0.12
            + sin((p.x + p.y) * 0.5 - uTime * 0.4) * 0.15;
    p.z += h;
    vHeight = h;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vFade = smoothstep(-16.0, -3.0, mv.z) * smoothstep(0.0, -3.0, mv.z);
    gl_PointSize = 2.4 * (6.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const waterFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vHeight;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    vec3 c = mix(uColorA, uColorB, smoothstep(-0.3, 0.35, vHeight));
    gl_FragColor = vec4(c, (1.0 - d * 2.0) * vFade * 0.75);
  }
`;

function WaterField() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => new THREE.PlaneGeometry(26, 14, 150, 80), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(TEAL) },
      uColorB: { value: new THREE.Color(AQUA) },
    }),
    [],
  );
  useFrame((_, delta) => {
    if (material.current) material.current.uniforms.uTime.value += delta;
  });
  return (
    <points geometry={geometry} rotation={[-Math.PI / 2.15, 0, 0]} position={[0, -2.6, -3]}>
      <shaderMaterial
        ref={material}
        vertexShader={waterVertex}
        fragmentShader={waterFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // Client-only component (loaded with ssr: false), so window is available here.
  const [reduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [quality] = useState<"high" | "low">(() =>
    window.innerWidth < 768 || navigator.hardwareConcurrency <= 4 ? "low" : "high",
  );

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    if (wrapper.current) io.observe(wrapper.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0">
      <Canvas
        dpr={quality === "high" ? [1, 1.75] : [1, 1.25]}
        camera={{ position: [0, 0, 7.2], fov: 40 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
        aria-hidden="true"
      >
        <color attach="background" args={[CANVAS]} />
        <fog attach="fog" args={[CANVAS, 8, 18]} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-4, -2, 2]} intensity={10} color={AQUA} distance={10} />
        <pointLight position={[4, 2, -2]} intensity={10} color="#f29f38" distance={9} />

        <group position={[quality === "high" ? 2.1 : 0, quality === "high" ? 0.1 : 0.9, 0]} scale={quality === "high" ? 0.82 : 0.62}>
          <Mark quality={quality} />
        </group>
        <Bubbles count={quality === "high" ? 140 : 60} />
        <WaterField />

        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={6} position={[0, 4, -6]} scale={[12, 4, 1]} color="#bdeff8" />
          <Lightformer form="rect" intensity={2} position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} color={AQUA} />
          <Lightformer form="ring" intensity={5} position={[5, 2, 3]} scale={2} color="#ffd9a8" />
        </Environment>
      </Canvas>
    </div>
  );
}
