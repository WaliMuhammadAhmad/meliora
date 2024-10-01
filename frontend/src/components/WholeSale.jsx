import React from 'react'
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp.tsx";
import ProductCard from './ProductCard.jsx';
import WholeSaleCard from './WholeSaleCard.jsx';

function WholeSale() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br mt-[-10%] from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        WholeSale
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 py-8">
        <WholeSaleCard />
        <WholeSaleCard />
        <WholeSaleCard />
        <WholeSaleCard />
        <WholeSaleCard />
        <WholeSaleCard />
        <WholeSaleCard />
        <WholeSaleCard />
        <WholeSaleCard />
      </div>
    </LampContainer>
  )
}

export default WholeSale;
