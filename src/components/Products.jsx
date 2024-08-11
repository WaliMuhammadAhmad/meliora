// import React from 'react'
// import { motion } from "framer-motion";
// import { LampContainer } from "../ui/lamp.tsx";
// import ProductCard from './ProductCard.jsx';

// function Products() {
//   return (
//     <div><LampContainer>
//     <motion.h1
//       initial={{ opacity: 0.5, y: 100 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{
//         delay: 0.3,
//         duration: 0.8,
//         ease: "easeInOut",
//       }}
//       className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
//     >
//       Our Products
//     </motion.h1>
//     {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           <ProductCard />
//       </div> */}
    
//   </LampContainer></div>
//   )
// }

// export default Products;
import React from 'react'
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp.tsx";
import ProductCard from './ProductCard.jsx';

function Products() {
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
        Our Products
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 py-8">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        {/* Add more ProductCard components as needed */}
      </div>
    </LampContainer>
  )
}

export default Products;
