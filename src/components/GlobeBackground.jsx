import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

export default function GlobeBackground() {
  const globeRef = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Load GeoJSON data for political boundaries
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
      });
  }, []);

  useEffect(() => {
    let animationFrameId;
    let autoRotation = 0;

    const animate = () => {
      autoRotation += 0.1; // slow continuous rotation
      
      if (globeRef.current) {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = false;
          controls.enableZoom = false;
        }

        // Calculate scroll-based rotation
        const scrollRotation = window.scrollY * 0.05;
        
        // Combine auto rotation and scroll rotation
        const totalRotation = autoRotation + scrollRotation;
        setRotation(totalRotation);
        
        // Update globe point of view
        globeRef.current.pointOfView({ 
          lat: 15, // slight tilt
          lng: totalRotation,
          altitude: 2.2 // zoom level
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -30%)',
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none',
      opacity: 0.8,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Globe
        ref={globeRef}
        width={1200}
        height={1200}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#00e3fd"
        atmosphereAltitude={0.15}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        polygonsData={countries.features}
        polygonAltitude={0.01}
        polygonCapColor={() => 'rgba(0, 0, 0, 0)'}
        polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
        polygonStrokeColor={() => '#00e3fd'}
        polygonsTransitionDuration={300}
      />
    </div>
  );
}
