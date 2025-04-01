"use client"
import { useState } from "react"
import AnimatedTable from "./table"
import { motion } from "framer-motion"

export default function MainTb() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Animated Table Component</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? "Hide Table" : "Show Table"}
          </motion.button>
        </div>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isVisible ? 1 : 0, height: isVisible ? "auto" : 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          <AnimatedTable />
        </motion.div>
      </div>
    </div>
  )
}

