"use client";
import React, { useEffect, useRef } from "react";

interface MousePosition {
  msX: number;
  msY: number;
  updms: (n: { x: number; y: number }) => void;
}

interface Point {
  x: number;
  y: number;
  z: number;
  xPos: number;
  yPos: number;
  updPos: (x: number, y: number, z: number) => void;
}

interface Line {
  x: number;
  y: number;
  ang: number;
  ang_: number;
  s: number;
  sz: number;
  ease: number;
  draw: ($: CanvasRenderingContext2D, tx: number, ty: number) => void;
}

interface CanvasAnimationProps {
  speed?: number;
  colors?: string[];
}

const CanvasAnimation: React.FC<CanvasAnimationProps> = ({
  speed = 0.03,
  colors = [
    "hsla(0, 0%,25%, 1)",
    "hsla(0,0%,15%, 1)",
    "hsla(0,0%,10%, 1)",
    "hsla(0, 0%,5%,1)",
  ],
}) => {
  // const colorInputs = useRef<HTMLFormElement | null>(null);
  // useEffect(() => {
  //   function hslaToHex(h: number, s: number, l: number): string {
  //     l /= 100;
  //     const chroma = (1 - Math.abs(2 * l - 1)) * (s / 100);
  //     const x = chroma * (1 - Math.abs((h / 60) % 2 - 1));
  //     const m = l - chroma / 2;

  //     let r = 0,
  //       g = 0,
  //       b = 0;

  //     if (h >= 0 && h < 60) {
  //       r = chroma;
  //       g = x;
  //       b = 0;
  //     } else if (h >= 60 && h < 120) {
  //       r = x;
  //       g = chroma;
  //       b = 0;
  //     } else if (h >= 120 && h < 180) {
  //       r = 0;
  //       g = chroma;
  //       b = x;
  //     } else if (h >= 180 && h < 240) {
  //       r = 0;
  //       g = x;
  //       b = chroma;
  //     } else if (h >= 240 && h < 300) {
  //       r = x;
  //       g = 0;
  //       b = chroma;
  //     } else if (h >= 300 && h < 360) {
  //       r = chroma;
  //       g = 0;
  //       b = x;
  //     }

  //     // Normalize to 0-255 and convert to hexadecimal
  //     r = Math.round((r + m) * 255);
  //     g = Math.round((g + m) * 255);
  //     b = Math.round((b + m) * 255);

  //     return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  //   }

  //   function parseHslaToHex(hsla: string): string {
  //     const match = hsla.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%,\s*(\d*\.?\d+)\)/);
  //     if (match) {
  //       const [, h, s, l] = match.map(Number);
  //       return hslaToHex(h, s, l);
  //     }
  //     return "#000000"; // Default to black if parsing fails
  //   }

  //   if (colorInputs.current) {
  //     const hexColors = colors.map(parseHslaToHex);
  //     colorInputs.current.color0.value = hexColors[0];
  //     colorInputs.current.color1.value = hexColors[1];
  //     colorInputs.current.color2.value = hexColors[2];
  //     colorInputs.current.color3.value = hexColors[3];
  //   }
  // });
  // const onColorChangeHandler = () => {
  //   if (colorInputs.current) {
  //     colors = [
  //       colorInputs.current.color0.value,
  //       colorInputs.current.color1.value,
  //       colorInputs.current.color2.value,
  //       colorInputs.current.color3.value,
  //     ];
  //   }
  // };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const arr: Line[] = [];
  const pts: Point[] = [];
  const s = 5,
    num = 100,
    f = -900;

  let w: number, h: number;
  let vel_x: number, vel_y: number;
  let cnt = 0;
  // let ms: MousePosition;
  const ms = useRef<MousePosition >({
    msX: 0,
  msY: 0,
  updms: (n: { x: number; y: number }) => {
    ms.current.msX = n.x;
    ms.current.msY = n.y;
  },
  })

  const rad = Math.PI / 180;

  // Helper functions
  const rnd = (min: number, max: number) => min + Math.random() * (max - min);

  class Ln {
    x: number;
    y: number;
    ang: number;
    ang_: number;
    s: number;
    sz: number;
    ease: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.ang = 45;
      this.ang_ = 45;
      this.s = 0.9;
      this.sz = rnd(2, 80);
      this.ease = Math.random();
    }

    draw($: CanvasRenderingContext2D, tx: number, ty: number) {
      this.x += (tx - this.x) * this.ease;
      this.y += (ty - this.y) * this.ease;
      this.s += (s - this.s) * 0.005;
      const s_ = this.s * 0.05;
      // const radi = this.ang * rad;
      const radi_ = this.ang_ * rad;
      const l3 = s_ * Math.cos(radi_);
      const l4 = s_ * Math.sin(radi_);
      this.ang += 0.33 * speed;
      if (this.ang >= 360) this.ang = 0;
      this.ang_ -= 0.33 * speed;
      if (this.ang_ <= 0) this.ang_ = 360;
      const x3 = this.x + l3;
      const y3 = this.y - l4;
      const g = $.createRadialGradient(x3, y3, 0, x3, y3, this.sz);
      g.addColorStop(0, colors[0]);
      g.addColorStop(0.5, colors[1]);
      g.addColorStop(0.8, colors[2]);
      g.addColorStop(1, colors[3]);
      $.beginPath();
      $.fillStyle = g;
      $.arc(x3, y3, this.sz, 0, Math.PI * 2);
      $.fill();
    }
  }

  class Pt {
    x: number;
    y: number;
    z: number;
    xPos: number;
    yPos: number;

    constructor(x: number, y: number, z: number) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.xPos = w * 0.5;
      this.yPos = h * 0.5;
    }

    updPos(x: number, y: number, z: number) {
      this.x = x;
      this.y = y;
      this.z = z;
      const sc = f / (f + this.z);
      this.xPos = vel_x + this.x * sc;
      this.yPos = vel_y + this.y * sc;
    }
  }

  const setCanvasSize = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d");
    if (context) {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      vel_x = w * 0.5;
      vel_y = h * 0.5;
    }
  };

  const handleResize = () => {
    if (canvasRef.current) {
      setCanvasSize(canvasRef.current);
    }
  };

  const initPoints = () => {
    for (let i = 0; i < num; i++) {
      const x = w * 2 * Math.random() - w;
      const y = h * 2 * Math.random() - h;
      const z = Math.random() * 3000 - 1000;
      const p = new Pt(x, y, z);
      pts[i] = p;
    }
  };

  const initLines = () => {
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const l = new Ln(p.xPos, p.yPos);
      arr[i] = l;
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const $ = canvas.getContext("2d");
      if ($) {
        $.clearRect(0, 0, w, h);

        // Update points with normalized mouse interaction
        const angY = ((ms.current.msX - vel_x) / w) * 0.05 * speed; // Normalize by width
        const angX = ((ms.current.msY - vel_y) / h) * 0.03 * speed; // Normalize by height
        const cosY = Math.cos(angY);
        const sinY = Math.sin(angY);
        const cosX = Math.cos(angX);
        const sinX = Math.sin(angX);

        pts.forEach((p) => {
          const x1 = p.x * cosY - p.z * sinY;
          const z1 = p.z * cosY + p.x * sinY;
          const y1 = p.y * cosX - z1 * sinX;
          const z2 = z1 * cosX + p.y * sinX;
          p.updPos(x1, y1, z2);
        });

        // Draw lines
        for (let i = 0; i < cnt; i++) {
          const l = arr[i];
          const p = pts[i];
          l.draw($, p.xPos, p.yPos);
        }

        cnt += 5;
        if (cnt >= arr.length) cnt = arr.length;
      }
    }

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      setCanvasSize(canvas);

      ms.current = {
        msX: vel_x,
        msY: vel_y,
        updms: (n) => {
          ms.current.msX = n.x;
          ms.current.msY = n.y;
        },
      };

      initPoints();
      initLines();
      animate();

      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", (e) =>{
        ms.current.updms({ x: e.screenX, y: e.screenY })
      });
      window.addEventListener("touchmove", (e) => {
        ms.current.updms({ x: e.touches[0].pageX, y: e.touches[0].pageY });
      });

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  },);

  return (
    <>
      {/* <form className="fixed" ref={colorInputs} onChange={onColorChangeHandler}>
        <input type="color" name="color0" id="" />
        <input type="color" name="color1" id="" />
        <input type="color" name="color2" id="" />
        <input type="color" name="color3" id="" />
      </form> */}
      <canvas
        className="fixed w-screen h-screen "
        ref={canvasRef}
        style={{ display: "block", zIndex: "-1" }}
      />
    </>
  );
};

export default CanvasAnimation;
