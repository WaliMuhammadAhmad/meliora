import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background.tsx";
import { FlipWords } from "./ui/flip-words.tsx";
import Products from "./components/Products";
import { Reviews } from "./components/Reviews.jsx";
import { WaveAd } from "./components/WaveAd.jsx";
import Blogs from "./components/Blogs.jsx";
import logo from './assets/logoSVG.png';


function App() {
  const words = [
    "Eco-Friendly Solutions",
    "Advanced Cleaning Tech",
    "High-Efficiency",
    "Industrial Strength",
    "Safe for Home Use",
    "Surface Protection",
    "Fast-Acting Formulas",
    "Non-Toxic Ingredients",
    "Odor Neutralization",
    "Multi-Purpose Use",
    "Long-Lasting",
    "Cost-Effective Solutions",
    "Heavy-Duty Cleaning",
    "Stain Removal"
  ];

  return (
    <div className="relative" style={{backgroundColor: "black"}}>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <img src={logo} alt="Meliora Logo" className="w-60 md:w-72"  style={{marginTop: "-6%"}} />
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center"  style={{marginTop: "-12%"}}>
            Meliora Products <br />
            <span className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
              <FlipWords words={words} />
            </span>
          </div>
          <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4">
            Elevating Cleanliness, Empowering Excellence.
          </div>
          <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
            Shop now
          </button>
        </motion.div>
      </AuroraBackground>
      <Products />
      <div className="relative z-10">
        <WaveAd />
      </div>
      {/* <Services /> */}
      <Blogs />
      <Reviews />
    </div>
  );
}

export default App;
