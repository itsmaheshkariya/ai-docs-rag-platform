'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Scan, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PinEntry({ mode = 'verify' }: { mode?: 'verify' | 'set' }) {
  const [pin, setPin] = useState<string>('')
  const [debugInfo, setDebugInfo] = useState<string>('')
  const router = useRouter()

  const handleNumberClick = (number: string) => {
    if (pin.length >= 6 && pin !== '000000') {
      setPin(number) // Reset pin and start typing again
    } else {
      setPin(prev => prev + number)
    }
    if (pin.length === 6) {
      if (pin === '000000') {
        localStorage.setItem("verifiedPin", "true");
        router.push('/')
      } else {
        setPin('') // Reset on incorrect password
      }
    }
  }

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1))
  }

  return (
    <div className="min-h-screen bg-[#1C2127] text-white font-sans flex flex-col justify-between p-4">
      <div className="flex-grow flex flex-col justify-center items-center">
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-light tracking-tight text-white">
            Trade Predictor
          </h1>
        </motion.div>

        {/* PIN Indicators */}
        <div className="flex justify-center gap-4 mb-8">
          {Array(6).fill(0).map((_, i) => (
            <motion.div
              key={i} // Use the index as the unique key
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                backgroundColor: pin.length > i ? 'white' : 'transparent'
              }}
              transition={{ 
                delay: i * 0.1,
                duration: 0.2
              }}
              className={`w-3 h-3 rounded-full border-2 ${
                pin.length > i 
                  ? 'border-white' 
                  : 'border-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
            <motion.button
              key={number}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleNumberClick(number.toString())}
              className="w-14 h-14 text-2xl font-medium hover:text-gray-300 active:text-gray-400 transition-colors flex items-center justify-center relative group"
            >
              {number}
              <motion.div
                initial={{ scale: 0 }}
                whileTap={{ scale: 1 }}
                className="absolute w-14 h-14 bg-white/10 rounded-full -z-10"
              />
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push('/forgot-pin')}
            className="w-14 h-14 text-sm text-gray-400 hover:text-gray-300 transition-colors flex items-center justify-center"
          >
            Forgot?
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleNumberClick('0')}
            className="w-14 h-14 text-2xl font-medium hover:text-gray-300 active:text-gray-400 transition-colors flex items-center justify-center relative group"
          >
            0
            <motion.div
              initial={{ scale: 0 }}
              whileTap={{ scale: 1 }}
              className="absolute w-14 h-14 bg-white/10 rounded-full -z-10"
            />
          </motion.button>
          {pin.length > 0 ? (
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handleBackspace}
              className="w-14 h-14 flex items-center justify-center"
            >
              <ArrowLeft className="w-6 h-6 text-gray-400 hover:text-gray-300 transition-colors" />
            </motion.button>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="w-14 h-14 flex items-center justify-center"
            >
              <Scan className="w-6 h-6 text-gray-400 hover:text-gray-300 transition-colors" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}