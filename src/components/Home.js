import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import { Html, useGLTF } from '@react-three/drei';
import { Section } from './Section';

// page state
import state from './state';

// interception observer
import { useInView } from 'react-intersection-observer';

const Model = ({ path }) => {
  const gltf = useGLTF(path, true);
  return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />;
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {/* <directionalLight position={[0, 10, 0]} intensity={1} /> */}
      <spotLight intensity={1} position={[1000, 0, 0]} />
    </>
  );
};

const HtmlContent = ({ domContent, children, modelPath, positionY, bgColor }) => {
  const ref = useRef();

  const [refItem, inView] = useInView({
    threshold: 0,
  });

  useFrame(() => (ref.current.rotation.y += 0.01));

  useEffect(() => {
    inView && (document.body.style.backgroundColor = bgColor);
  }, [inView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, -35, 0]}>
          <Model path={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className="view" ref={refItem}></div>
          <div className="container">{children}</div>
        </Html>
      </group>
    </Section>
  );
};

export default function Home() {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (event) => (state.top.current = event.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <Canvas colorManagement camera={{ position: [0, 0, 120], fov: 70 }}>
        <Lights />
        <Suspense fallback={null}>
          <HtmlContent
            domContent={domContent}
            modelPath="/armchairYellow.gltf"
            positionY={250}
            bgColor={'#f15946'}
          >
            <h1 className="title">Yellow</h1>
          </HtmlContent>

          <HtmlContent
            domContent={domContent}
            modelPath="/armChairGreen.gltf"
            positionY={0}
            bgColor={'#571ec1'}
          >
            <h1 className="title">Green</h1>
          </HtmlContent>
          <HtmlContent
            domContent={domContent}
            modelPath="/armChairGray.gltf"
            positionY={-250}
            bgColor={'#636567'}
          >
            <h1 className="title">Gray</h1>
          </HtmlContent>
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: 'sticky', top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.sections * 100}vh` }}></div>
        <div></div>
      </div>
    </>
  );
}
