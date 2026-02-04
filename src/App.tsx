"use client";
import { useState } from "react";
import introVideo from "./assets/intro.mp4"; // Your video
import img1 from "./assets/angry.jpeg";
import img2 from "./assets/angry2.jpeg";
import img3 from "./assets/img1.jpeg";
import img4 from "./assets/img2.jpeg";
import img5 from "./assets/img3.jpeg";
import img6 from "./assets/img4.jpeg";
import img7 from "./assets/img5.jpeg";
import img8 from "./assets/img6.jpeg";
import lovimg from "./assets/love.jpeg";


//import lovimg from "./assets/love.jpeg";

// Array of media (video + images)
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

  // YES button grows when NO is clicked
  const yesButtonSize = 16 + noCount * 18;

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    setTopMediaIndex((prev) => (prev + 1) % topMedia.length); // cycle top media
  };

  const getNoButtonText = () => {
    const phrases = [
      "NO",
      "SAchiiiiiii😔😔😔😔",
      "Kassammm🙄🙄🙄🙄",
      "Bhetlas hai fuchhi😡😡😡😡",
      "YEs click gara bbbbb😘😘😘😘😘",
      "Ghuchuk ma tuchuk hola🙏🏻🙏🏻🙏🏻🙏🏻",
      "Ass jasto chhito yes click han🍑🍑🍑🍑",
      "Mero babyyyyy❤️❤️❤️❤️❤️",
      "But :*(",
      "I am going to die",
      "Yep im dead",
      "ok ur talking to nathan's ghost",
      "please babe",
      ":((((",
      "PRETTY PLEASE",
      "Estoy muerto",
      "No :(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center">
      {yesPressed ? (
        <>
          <img
            src={lovimg}
            className="h-[200px] w-auto mb-4 object-contain"
            alt="love"
          />
          <div className="my-4 text-4xl font-bold">
            Chuppppaaaa!!! I love you my kanchuuuuuuu😘😘😘😘😘 ;))
          </div>
        </>
      ) : (
        <>
          {/* Top media that changes on NO click */}
          {topMedia[topMediaIndex].type === "video" ? (
  <video
    className="h-[200px] w-auto mb-4 object-contain"
    src={topMedia[topMediaIndex].src}
    autoPlay
    loop
    muted           // ✅ required for autoplay on mobile
    playsInline     // ✅ prevents fullscreen hijack on iOS
    preload="auto"  // optional but recommended
  />
) : (
  <img
    className="h-[200px] w-auto mb-4 object-contain"
    src={topMedia[topMediaIndex].src}
    alt="top media"
  />
)}


          <h1 className="my-4 text-4xl">Will you be my Valentine?</h1>

          <div className="flex items-center">
            {/* YES BUTTON */}
            <button
              onClick={() => setYesPressed(true)}
              className="mr-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 transition-all duration-300"
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
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              {getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
