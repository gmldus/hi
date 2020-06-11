import React, { useState, useEffect, useRef, MouseEvent } from 'react';

interface Props {
  children: React.ReactNode;
}

const Draggable = ({ children }: Props) => {

  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [screen, setScreen] = useState({ width: window.innerWidth, height: window.innerHeight });
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
    }
  }, [position]);

  useEffect(() => {
    if (position.x + 100 > screen.width) {
      setPosition({ ...position, x: screen.width - 100 });
    }
    if (position.y + 100 > screen.height) {
      setPosition({ ...position, y: screen.height - 100 });
    }
  }, [screen]);

  const preventOverflow = (size: number, standard: number) => {
    if (size < 0) return 0;
    if (size > standard - 100) return standard - 100;
    return size;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (pressed) {
      setPosition({
        x: preventOverflow(position.x + e.movementX, screen.width),
        y: preventOverflow(position.y + e.movementY, screen.height),
      });
    }
  };

  const handleResize = () => {
    setScreen({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  return (
    <div
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
        margin: '0 auto',
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <div ref={ref} style={{ width: '100px', height: '100px' }}>
        {children}
      </div>
    </div>
  );
};

export default Draggable;
