import React, { useState, useEffect, useCallback } from "react";
import Color from "color";

import { Box, Portal, EventListener } from "@lib/components";

interface Position {
  x: number;
  y: number;
}

interface Origin extends Position {
  (): Position;
}

interface Velocity {
  dx: number;
  dy: number;
}

interface ParticleType {
  position: Position;
  velocity: Velocity;
  size: number;
  alpha: number;
  hue: number;
  saturation: number;
  value: number;
  resistance?: number;
  gravity?: number;
  shrink?: number;
  fade?: number;
}

const Particle = (position: Position) =>
  ({
    position,
    velocity: { dx: 0, dy: 0 },
    size: 2,
    alpha: 1,
    hue: 100,
    saturation: 100,
    value: 50,
  } as ParticleType);

Particle.exists = ({ alpha, size }: ParticleType) => {
  return alpha >= 0.1 && size >= 1;
};

Particle.update = (particle: ParticleType) => {
  const {
    position,
    velocity,
    size,
    alpha,
    resistance = 1,
    gravity = 0,
    shrink = 1,
    fade = 0,
  } = particle;

  return {
    ...particle,
    position: {
      x: position.x + velocity.dx,
      y: position.y + velocity.dy,
    },
    velocity: {
      dx: velocity.dx * resistance,
      dy: velocity.dy * resistance + gravity,
    },
    size: size * shrink,
    alpha: alpha - fade,
  };
};

Particle.explode = (particle: ParticleType) => {
  const count = Math.floor(10 * Math.random() + 80);

  return [...Array(count)].map(() => {
    const angle = 2 * Math.PI * Math.random();
    const speed = 15 * Math.cos((Math.random() * Math.PI) / 2);

    return {
      ...Particle(particle.position),
      velocity: { dx: speed * Math.cos(angle), dy: speed * Math.sin(angle) },
      size: 10,
      gravity: 0.2,
      resistance: 0.92,
      shrink: 0.05 * Math.random() + 0.93,
      hue: 10 * Math.floor((Math.random() * 360) / 10),
    };
  });
};

Particle.render = (
  particle: ParticleType,
  context: CanvasRenderingContext2D
) => {
  if (!Particle.exists(particle)) return;

  context.save();
  context.globalCompositeOperation = "lighter";
  context.fillStyle = String(
    Color.hsl(particle.hue, particle.saturation, particle.value).fade(
      1 - particle.alpha
    )
  );
  context.beginPath();
  context.arc(
    particle.position.x,
    particle.position.y,
    particle.size,
    0,
    2 * Math.PI,
    true
  );
  context.closePath();
  context.fill();
  context.restore();
};

export interface FireworksProps {
  origin: Origin;
  activator?: React.ReactNode;
  toggle?: boolean;
  count?: number;
  interval?: number;
}

export function Fireworks(props: FireworksProps) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [rockets, setRockets] = useState<ParticleType[]>([]);
  const [particles, setParticles] = useState<ParticleType[]>([]);

  const handleResize = useCallback(() => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, [canvas]);

  const draw = useCallback(() => {
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    let newParticles: ParticleType[] = [];

    setRockets((current) =>
      current.reduce((acc: ParticleType[], rocket: ParticleType) => {
        const updatedRocket = Particle.update(rocket);

        if (
          updatedRocket.position.y < (canvas.height ?? 0) / 5 ||
          Math.random() <= 0.01
        ) {
          newParticles = newParticles.concat(Particle.explode(rocket));
          return acc;
        } else {
          Particle.render(updatedRocket, context);
          return [...acc, updatedRocket];
        }
      }, [])
    );

    setParticles((current) =>
      current
        .concat(newParticles)
        .reduce((acc: ParticleType[], particle: ParticleType) => {
          const updatedParticle = Particle.update(particle);

          if (!Particle.exists(updatedParticle)) {
            return acc;
          } else {
            Particle.render(updatedParticle, context);
            return [...acc, updatedParticle];
          }
        }, [])
    );

    const id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, [canvas]);

  useEffect(() => handleResize(), [canvas]);
  useEffect(() => draw(), [canvas]);

  useEffect(() => {
    if (props.toggle === null) return;

    const rocketGenerator = () => {
      let origin;
      if (typeof props.origin === "function") {
        origin = props.origin();
      } else {
        origin = props.origin;
      }

      return {
        ...Particle(origin),
        velocity: { dx: 6 * Math.random() - 3, dy: -3 * Math.random() - 4 },
        size: 4,
        hue: 0,
        saturation: 0,
        value: 80,
      };
    };

    let iterations = 0;
    const id = setInterval(() => {
      if (iterations < (props.count ?? 3)) {
        iterations += 1;
        setRockets((current) => [...current, rocketGenerator()]);
      } else {
        clearInterval(id);
      }
    }, props.interval ?? 500);

    return () => clearInterval(id);
  }, [props.toggle]);

  return (
    <>
      {props.activator}
      <Portal id="fireworks">
        <Box absolute $fill css={{ pointerEvents: "none" }}>
          <canvas ref={setCanvas} />
        </Box>
        <EventListener event="resize" handler={handleResize} />
      </Portal>
    </>
  );
}
