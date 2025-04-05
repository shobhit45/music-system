import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare";

const LensflareAnimation = () => {
  const containerRef = useRef();

  useEffect(() => {
    let container, camera, scene, renderer, lights = [];
    const clock = new THREE.Clock();

    const init = () => {
      container = containerRef.current;

      // Camera
      camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 15000);
      camera.position.z = 250;

      // Scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      // Lensflare
      const textureLoader = new THREE.TextureLoader();
      const textureFlare0 = textureLoader.load("/textures/lensflare/lensflare0.png");
      const textureFlare3 = textureLoader.load("/textures/lensflare/lensflare3.png");

      const addLight = (h, s, l, x, y, z) => {
        const light = new THREE.PointLight(0xffffff, 1.5, 2000);
        light.color.setHSL(h, s, l);
        light.position.set(x, y, z);
        scene.add(light);

        const lensflare = new Lensflare();
        lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, light.color));
        lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
        lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
        lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
        light.add(lensflare);

        lights.push(light); // Store the light for animation
      };

      addLight(0.55, 0.9, 0.5, 5000, 0, -1000);
      addLight(0.08, 0.8, 0.5, 0, 0, -1000);
      addLight(0.995, 0.5, 0.9, 5000, 5000, -1000);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      const animate = () => {
        const delta = clock.getDelta();

        // Animate lights dynamically
        lights.forEach((light, index) => {
          light.position.x = Math.sin(clock.elapsedTime + index) * 5000;
          light.position.y = Math.cos(clock.elapsedTime + index) * 5000;
        });

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();
    };

    init();

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
};

export default LensflareAnimation;