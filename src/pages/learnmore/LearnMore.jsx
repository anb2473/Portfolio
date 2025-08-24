import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import discussionPoints from '../../data/discussionPoints';
import './LearnMore.css';

// Helper component to render HTML content safely
const HtmlContent = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

const LearnMore = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);
  const progressBarRef = useRef(null);
  const mountRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  // 3D Animation setup
  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl) return;

    // === Scene / Camera / Renderer ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mountEl.clientWidth / mountEl.clientHeight,
      0.1,
      500
    );
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    // Set canvas styles
    const canvas = renderer.domElement;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    
    mountEl.appendChild(canvas);
    mountEl.appendChild(renderer.domElement);

    // === Points / Flock parameters ===
    const NUM_POINTS = 60;
    const SPACE = 200;
    const MIN_DIST = 40;
    const MAX_DIST = 70;
    const SPEED = 0.2;

    // Initialize points
    const points = [];
    const velocities = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      points.push(new THREE.Vector3(
        (Math.random() - 0.5) * SPACE * 2,
        (Math.random() - 0.5) * SPACE * 2,
        (Math.random() - 0.5) * SPACE * 2
      ));
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * SPEED,
        (Math.random() - 0.5) * SPEED,
        (Math.random() - 0.5) * SPEED
      ));
    }

    // Create line geometry
    const linePositions = new Float32Array(NUM_POINTS * NUM_POINTS * 6);
    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // Flocking parameters
    const CENTER_FORCE = 0.00002;
    const REPULSION = 0.08;
    const ATTRACTION = 0.0002;
    const DAMPING = 0.92;

    const updatePoints = () => {
      for (let i = 0; i < NUM_POINTS; i++) {
        const p = points[i];
        const v = velocities[i];
        let move = new THREE.Vector3();

        for (let j = 0; j < NUM_POINTS; j++) {
          if (i === j) continue;
          const other = points[j];
          const dir = new THREE.Vector3().subVectors(other, p);
          const dist = dir.length();

          if (dist < MIN_DIST) {
            // repulsion: stronger if too close
            dir.normalize().multiplyScalar(-REPULSION / dist);
            move.add(dir);
          } else if (dist < MAX_DIST) {
            // attraction: gentle
            dir.normalize().multiplyScalar(ATTRACTION);
            move.add(dir);
          }
        }

        // gentle centering force to keep swarm in view
        move.add(p.clone().multiplyScalar(-CENTER_FORCE));

        // Add random wander
        const wander = new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1
        );
        move.add(wander);

        // update velocity
        v.add(move);
        v.multiplyScalar(DAMPING);

        // update position
        p.add(v);
      }

      // Update lines
      const positions = linesGeometry.attributes.position.array;
      let index = 0;
      
      for (let i = 0; i < NUM_POINTS; i++) {
        const p1 = points[i];
        for (let j = i + 1; j < NUM_POINTS; j++) {
          const p2 = points[j];
          const dist = p1.distanceTo(p2);
          
          if (dist < MAX_DIST) {
            positions[index++] = p1.x;
            positions[index++] = p1.y;
            positions[index++] = p1.z;
            positions[index++] = p2.x;
            positions[index++] = p2.y;
            positions[index++] = p2.z;
          } else {
            index += 6;
          }
        }
      }
      
      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.setDrawRange(0, index / 3);
    };

    // Animation loop
    let animationFrameId;
    const animate = () => {
      updatePoints();
      
      // Rotate camera slowly for 3D feel (same as home.jsx)
      camera.position.x = Math.sin(Date.now() * 0.0002) * 120;
      camera.position.z = Math.cos(Date.now() * 0.0002) * 120;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mountEl.clientWidth / mountEl.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountEl.contains(renderer.domElement)) {
        mountEl.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Scroll effect with animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class for animation
            entry.target.classList.add('visible');
            
            // Update active index for progress bar
            const index = sectionRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        threshold: 0.1, // Lower threshold for earlier trigger
        rootMargin: '0px 0px -100px 0px' // Start animation slightly before section is in view
      }
    );

    // Observe all sections
    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate progress percentage based on scroll position
  const progressPercentage = (activeIndex / (discussionPoints.length - 1)) * 100;

  return (
    <div className="learn-more-container">
      <div className="learnmore-root" ref={mountRef} />
      <div className="learn-more-content">
        <div className="progress-container" ref={progressBarRef}>
          <div className="progress-line" style={{
            '--progress': `${progressPercentage}%`
          }}></div>
          {discussionPoints.map((point, index) => (
            <div
              key={point.id}
              className={`progress-dot ${index > activeIndex ? 'active' : ''}`}
              onClick={() => scrollToSection(index)}
            >
              <div className="dot-tooltip">{point.title}</div>
            </div>
          ))}
        </div>

        <div className="sections-container">
            {discussionPoints.map((point, index) => (
            <section
                key={point.id}
                ref={el => sectionRefs.current[index] = el}
                className={`section ${index === 0 ? 'visible' : ''}`}
                style={{
                  transitionDelay: `${index * 0.1}s`
                }}
            >
                <div className="content">
                  <div className="section-card">
                    <h2>{point.title}</h2>
                    <div className="content-text">
                      <HtmlContent content={point.content.replace(/\n/g, '')} />
                    </div>
                  </div>
                </div>
                {point.image && (
                <div className="image-container">
                    <img 
                    src={`/images/${point.image}`} 
                    alt={point.title} 
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                    />
                </div>
                )}
            </section>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
