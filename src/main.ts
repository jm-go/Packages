import "./style.scss";
import confetti, { Options } from "canvas-confetti";
import Colorthief from "colorthief";

const options: Options = {
  //   particleCount: 10,
  //   spread: 180,
  //   colors: ["#ee2fbe", "#abe2de", "#65ae3c"],
  particleCount: 180,
//   angle: 80,
//   spread: 190,
  colors: ["#7fbf7f", "#ffb4d9"],
  shapes: ["star", "circle"],
  angle: 100 + Math.random() * (200 - 100),
  spread: 100 + Math.random() * (200 - 100), 
};

//min + Math.random() * (max - min);

// confetti(options);

// Create new selector for the button
// const button = document.querySelector<HTMLButtonElement>(".button");
// if (!button) {
//   throw new Error("Issue with selector.");
// }

// // Add function to fire the confetti
// const fireConfetti = () => {
//   confetti(options);
// };

// // Add event listener for the button
// button.addEventListener("click", fireConfetti);

const confettiButton = document.querySelector(".button");
const dogImage = document.querySelector("#dog-image") as HTMLImageElement;

if (!confettiButton || !dogImage) {
  throw new Error("Issue with selectors");
}

//Create some types for colorthief package
type Color = [number, number, number];
type ColorThief = {
    getColor: (img: HTMLImageElement, quality?: number) => Color
    getPalette: (img: HTMLImageElement, colorCount?: number, quality?: number) => Color[];
}

const getRandomNumberInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const fireConfetti = () => {
  const confettiOptions: Options = {
    particleCount: getRandomNumberInRange(50, 100),
    angle: getRandomNumberInRange(55, 125),
    spread: getRandomNumberInRange(50, 70),
    origin: { y: 0.6 },
    colors: ["#ee2fbe", "#abe2de", "#65ae3c"],
  };

  confetti(confettiOptions);
};

const handleConfettiPress = () => {
  fireConfetti();
};


const colorthief : ColorThief = new Colorthief();
const onImageLoad = () => {
    const color = colorthief.getColor(dogImage);
    console.log(color);
}

// Check that the image is loaded properly
if (dogImage.complete) {
    onImageLoad()
} else {
    dogImage.addEventListener("load", onImageLoad);
}

confettiButton.addEventListener("click", handleConfettiPress);

//Challenge 1
const imageUrlInput = document.querySelector<HTMLInputElement>("#image-url");
const updateImageButton = document.querySelector<HTMLButtonElement>("#update-image");

if (!imageUrlInput || !updateImageButton) {
    throw new Error ("Issue with the selector.");
}

// Function to update the image source
const updateImageSource = () => {
  const newImageUrl = imageUrlInput.value;
  if (newImageUrl) {
    dogImage.src = newImageUrl;
    dogImage.addEventListener("load", onImageLoad);
  }
};

// Event listener for the update button
updateImageButton.addEventListener("click", updateImageSource);
