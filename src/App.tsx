"use client";
import { useState, useEffect } from "react";
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

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [topMediaIndex, setTopMediaIndex] = useState(0);
  const [flowerPositions, setFlowerPositions] = useState([]);

  const yesButtonSize = 16 + noCount * 18;

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    setTopMediaIndex((prev) => (prev + 1) % topMedia.length);
  };

  const getNoButtonText = () => {
    const phrases = [
      "NO", "SAchiiiiiii😔😔😔😔", "Kassammm🙄🙄🙄🙄", "Bhetlas hai fuchhi😡😡😡😡",
      "YEs click gara bbbbb😘😘😘😘😘", "Ghuchuk ma tuchuk hola🙏🏻🙏🏻🙏🏻🙏🏻", "Ass jasto chhito yes click han🍑🍑🍑🍑",
      "Mero babyyyyy❤️❤️❤️❤️❤️", "But :*(", "I am going to die", "Yep im dead",
      "ok ur talking to nathan's ghost", "please babe", ":((((", "PRETTY PLEASE",
      "Estoy muerto", "No :("
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // Generate 100 random flower positions anywhere
  useEffect(() => {
    const positions = [];
    for (let i = 0; i < 100; i++) {
      const top = Math.random() * 100 + "%";
      const left = Math.random() * 100 + "%";
      const rotate = Math.floor(Math.random() * 360) + "deg";
      // Random speed and sway
      const speed = 20 + Math.random() * 40; // seconds for full animation
      const sway = 10 + Math.random() * 20; // degrees sway
      positions.push({ top, left, rotate, speed, sway });
    }
    setFlowerPositions(positions);
  }, []);

  return (
    <div className="relative -mt-16 flex h-screen items-center justify-center bg-pink-50 overflow-hidden">
      {/* Animated Flower images */}
      {flowerPositions.map((pos, i) => (
        <img
          key={i}
          src={flower}
          alt="flower"
          className="absolute w-32 h-32 opacity-60"
          style={{
            top: pos.top,
            left: pos.left,
            transform: `rotate(${pos.rotate})`,
            pointerEvents: "none",
            animation: `float-${i} ${pos.speed}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      {/* Add keyframe animations dynamically */}
      <style>
        {flowerPositions.map(
          (pos, i) => `
            @keyframes float-${i} {
              0% { transform: rotate(${pos.rotate}) translateY(0) translateX(0); }
              50% { transform: rotate(${pos.rotate}) translateY(20px) translateX(${pos.sway}px); }
              100% { transform: rotate(${pos.rotate}) translateY(0) translateX(0); }
            }
          `
        ).join("\n")}
      </style>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 md:px-0">
        {yesPressed ? (
          <>
            <img
              src={lovimg}
              className="h-[200px] w-auto mb-4 object-contain"
              alt="love"
            />
            <div className="my-4 text-4xl font-bold text-center">
              Chuppppaaaa!!! I love you my kanchuuuuuuu😘😘😘😘😘 ;))
            </div>
          </>
        ) : (
          <>
            {topMedia[topMediaIndex].type === "video" ? (
              <video
                className="h-[200px] w-auto mb-4 object-contain max-w-full"
                src={topMedia[topMediaIndex].src}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            ) : (
              <img
                className="h-[200px] w-auto mb-4 object-contain max-w-full"
                src={topMedia[topMediaIndex].src}
                alt="top media"
              />
            )}

            <h1 className="my-4 text-4xl sm:text-5xl md:text-6xl text-center">
              So bb..Will you be my Valentine?
            </h1>

            <div className="flex flex-col sm:flex-row items-center mt-4 gap-4">
              {/* YES BUTTON */}
              <button
                onClick={() => setYesPressed(true)}
                className="rounded bg-green-500 px-6 py-3 font-bold text-white hover:bg-green-700 transition-all duration-300"
                style={{
                  fontSize: yesButtonSize,
                  transform: `scale(${1 + noCount * 0.12})`,
                }}
              >
                Yes
              </button>

              {/* NO BUTTON */}
              <button
                onClick={handleNoClick}
                className="rounded bg-red-500 px-6 py-3 font-bold text-white hover:bg-red-700"
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
