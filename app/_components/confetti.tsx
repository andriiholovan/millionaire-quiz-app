'use client';

import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

function Confetti() {
  return (
    <>
      <Fireworks
        autorun={{
          speed: 1,
          duration: 1000,
        }}
        decorateOptions={() => ({
          origin: { x: 0, y: 1 },
          angle: 70,
          particleCount: 200,
          startVelocity: 120,
        })}
      />
      <Fireworks
        autorun={{
          speed: 1,
          duration: 1000,
          delay: 500,
        }}
        decorateOptions={() => ({
          origin: { x: 1, y: 1 },
          angle: 110,
          particleCount: 200,
          startVelocity: 120,
        })}
      />
    </>
  );
}

export default Confetti;
