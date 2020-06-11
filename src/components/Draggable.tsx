import React, { useState, useEffect, useRef, MouseEvent } from 'react';

interface Props {
  children: React.ReactNode;
}

const Draggable = ({ children }: Props) => {

  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`
    }
  }, [position]);

  const handleMouseMove = (e: MouseEvent) => {
    if (pressed) {
      setPosition({
        x: position.x + e.movementX,
        y: position.y + e.movementY,
      });
    }
  }

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
      <div ref={ref} style={{ display: 'inline-block' }}>
        {children}
      </div>
    </div>
  );
};

export default Draggable;
