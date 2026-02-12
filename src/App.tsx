"use client";
import { useState, useEffect, useRef } from "react";

import introVideo from "./assets/intro.mp4";
import img1 from "./assets/angry.jpeg";
import img2 from "./assets/angry2.jpeg";
import img3 from "./assets/img1.jpeg";
import img4 from "./assets/img2.jpeg";
import img5 from "./assets/img3.jpeg";
import img6 from "./assets/img4.jpeg";
import img7 from "./assets/img5.jpeg";
import img8 from "./assets/img6.jpeg";
import lovimg from "./assets/love.jpeg";
import flower from "./assets/flower.jpg";

import romantic from "./assets/romantic.mp3";
import angry from "./assets/angry.mp3";
import best from "./assets/best_part.mp3";

const topMedia = [
  { type: "video", src: introVideo },
  { type: "image", src: img1 },
  { type: "image", src: img2 },
  { type: "image", src: img3 },
  { type: "image", src: img4 },
  { type: "image", src: img5 },
  { type: "image", src: img6 },
  { type: "image", src: img7 },
  { type: "image", src: img8 },
];

type Flower = {
  top: string;
  left: string;
  rotate: string;
  speed: number;
  sway: number;
};

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [topMediaIndex, setTopMediaIndex] = useState(0);
  const [flowerPositions, setFlowerPositions] = useState<Flower[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicStarted = useRef(false);

  const yesButtonSize = 16 + noCount * 18;

  // 🎵 START ROMANTIC ON FIRST INTERACTION (100% working)
  useEffect(() => {
    const startMusic = () => {
      if (musicStarted.current) return;
      musicStarted.current = true;

      if (audioRef.current) {
        audioRef.current.src = romantic;
        audioRef.current.loop = true;
        audioRef.current.volume = 1;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

      document.removeEventListener("click", startMusic);
      document.removeEventListener("mousemove", startMusic);
      document.removeEventListener("touchstart", startMusic);
    };

    document.addEventListener("click", startMusic);
    document.addEventListener("mousemove", startMusic);
    document.addEventListener("touchstart", startMusic);

    return () => {
      document.removeEventListener("click", startMusic);
      document.removeEventListener("mousemove", startMusic);
      document.removeEventListener("touchstart", startMusic);
    };
  }, []);

  // ❌ NO CLICK
  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    setTopMediaIndex((prev) => (prev + 1) % topMedia.length);

    if (audioRef.current) {
      audioRef.current.src = angry;
      audioRef.current.loop = false;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  // ✅ YES CLICK
  const handleYesClick = () => {
    setYesPressed(true);

    if (audioRef.current) {
      audioRef.current.src = best;
      audioRef.current.loop = true;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const getNoButtonText = () => {
    const phrases = [
      "NO",
      "Sachiiii😔",
      "Kassam🙄",
      "Bhetlas hai😡",
      "Yes click gara😘",
      "Please🙏",
      "Mero babyyyy❤️",
      "I am dead",
      "Ghost speaking",
      "Pretty please",
      "Last chance 😭"
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // 🌸 flowers generate
  useEffect(() => {
    const positions: Flower[] = [];
    for (let i = 0; i < 80; i++) {
      const top = Math.random() * 100 + "%";
      const left = Math.random() * 100 + "%";
      const rotate = Math.floor(Math.random() * 360) + "deg";
      const speed = 20 + Math.random() * 40;
      const sway = 10 + Math.random() * 20;
      positions.push({ top, left, rotate, speed, sway });
    }
    setFlowerPositions(positions);
  }, []);

  return (
    <div className="relative flex h-screen items-center justify-center bg-pink-50 overflow-hidden">

      {/* AUDIO PLAYER */}
      <audio ref={audioRef} />

      {/* FLOWERS */}
      {flowerPositions.map((pos, i) => (
        <img
          key={i}
          src={flower}
          className="absolute w-24 opacity-60"
          style={{
            top: pos.top,
            left: pos.left,
            transform: `rotate(${pos.rotate})`,
            pointerEvents: "none",
            animation: `float-${i} ${pos.speed}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      <style>
        {flowerPositions.map(
          (pos, i) => `
            @keyframes float-${i} {
              0% { transform: rotate(${pos.rotate}) translateY(0); }
              50% { transform: rotate(${pos.rotate}) translateY(20px) translateX(${pos.sway}px); }
              100% { transform: rotate(${pos.rotate}) translateY(0); }
            }
          `
        ).join("\n")}
      </style>

      {/* MAIN */}
      <div className="relative z-10 flex flex-col items-center">

        {yesPressed ? (
          <>
            <img src={lovimg} className="h-[200px] mb-4"/>
            <div className="text-4xl font-bold text-center">
              I love youuuuu 😘😘😘
            </div>
          </>
        ) : (
          <>
            {topMedia[topMediaIndex].type === "video" ? (
              <video className="h-[200px]" src={topMedia[topMediaIndex].src} autoPlay loop muted />
            ) : (
              <img className="h-[200px]" src={topMedia[topMediaIndex].src}/>
            )}

            <h1 className="text-5xl my-6 text-center">
              Will you be my Valentine? 🌹
            </h1>

            <div className="flex gap-4">
              <button
                onClick={handleYesClick}
                className="bg-green-500 text-white px-6 py-3 rounded font-bold"
                style={{
                  fontSize: yesButtonSize,
                  transform: `scale(${1 + noCount * 0.12})`,
                }}
              >
                Yes
              </button>

              <button
                onClick={handleNoClick}
                className="bg-red-500 text-white px-6 py-3 rounded font-bold"
              >
                {getNoButtonText()}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
