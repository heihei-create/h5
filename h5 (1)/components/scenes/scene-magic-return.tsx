"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { MagicParticles } from "@/components/magic-particles"
import { useAudio } from "@/components/audio-manager"
import Image from "next/image"

interface SceneMagicReturnProps {
  onNext: () => void
}

export function SceneMagicReturn({ onNext }: SceneMagicReturnProps) {
  const [phase, setPhase] = useState(0)
  const [showColleague, setShowColleague] = useState(false)
  const { playSound, isReady } = useAudio()

  useEffect(() => {
    // Phase 0: Magic fading
    // Phase 1: Return to office
    // Phase 2: Colleague appears
    
    // 魔法消散音效
    if (isReady) {
      playSound("magic")
    }
    
    const timer1 = setTimeout(() => {
      setPhase(1)
      if (isReady) playSound("ambient")
    }, 1500)
    
    const timer2 = setTimeout(() => {
      setShowColleague(true)
      if (isReady) playSound("sparkle")
    }, 3000)
    
    const timer3 = setTimeout(() => {
      setPhase(2)
      if (isReady) playSound("laugh")
    }, 3500)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [isReady, playSound])
  
  const handleReceive = () => {
    if (isReady) {
      playSound("click")
      playSound("success")
    }
    onNext()
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Magic dissolve effect */}
      {phase === 0 && (
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-200/80 via-white/60 to-green-100/80" />
          <MagicParticles count={40} colors={["#FFD700", "#FFFFFF", "#90EE90"]} />
        </motion.div>
      )}

      {/* Background - office scene */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260518104228_16_1146-doALyrDVwtG7D7eQhzxmMWosjW6pwq.png"
          alt="回到办公室"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-amber-100/30" />
      </motion.div>

      {/* Warm glow overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2 }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-amber-200/40 via-transparent to-transparent" />
      </motion.div>

      {/* Subtle sparkles remaining */}
      {phase >= 1 && (
        <MagicParticles count={10} colors={["#FFD700", "#FFF8DC"]} />
      )}

      {/* Colleague dialogue */}
      {showColleague && (
        <motion.div
          className="absolute right-6 top-1/3 max-w-[220px] z-10"
          initial={{ opacity: 0, x: 30, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div 
            className="relative rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm"
            animate={{ 
              boxShadow: [
                "0 4px 20px rgba(0,0,0,0.1)",
                "0 8px 30px rgba(255,215,0,0.2)",
                "0 4px 20px rgba(0,0,0,0.1)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-sm font-medium text-gray-800">
              {"累了就喝口甜的，找回快乐~"}
            </p>
            <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-white/95" />
          </motion.div>
          <p className="mt-2 text-center text-xs text-gray-600">— 贴心同事</p>
        </motion.div>
      )}

      {/* Expression change indicator */}
      {phase >= 1 && (
        <motion.div
          className="absolute left-6 top-1/4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <motion.div
            className="rounded-full bg-amber-100/90 px-3 py-1.5 text-sm shadow-lg"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            眼神明亮了
          </motion.div>
        </motion.div>
      )}

      {/* Click to receive milk from colleague */}
      {phase >= 2 && (
        <motion.div
          className="absolute bottom-32 left-1/2 -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReceive}
          >
            <motion.div
              className="relative h-20 w-14 overflow-hidden rounded-lg bg-white/30 p-2 backdrop-blur-sm"
              animate={{ 
                rotate: [-5, 5, -5],
                boxShadow: [
                  "0 0 15px rgba(34, 197, 94, 0.3)",
                  "0 0 30px rgba(34, 197, 94, 0.5)",
                  "0 0 15px rgba(34, 197, 94, 0.3)"
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260518105831_24_1146-jSukxcZQ9GqlZrQCzGH1AhGbbDOHON.png"
                alt="同事递来的AD钙奶"
                fill
                className="object-contain"
              />
            </motion.div>
            <motion.span
              className="rounded-full bg-green-500/90 px-5 py-2.5 text-sm font-medium text-white shadow-lg"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              接过这份快乐
            </motion.span>
          </motion.div>
        </motion.div>
      )}

      {/* Scene text */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p className="px-8 text-xl font-medium text-gray-800 drop-shadow-sm text-balance">
          AD钙奶，唤醒童心，传递快乐
        </p>
      </motion.div>

      {/* Sound indicator */}
      <motion.div
        className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs text-gray-600 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="flex gap-0.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="h-1.5 w-0.5 rounded-full bg-amber-500" />
          <span className="h-2.5 w-0.5 rounded-full bg-amber-500" />
          <span className="h-1.5 w-0.5 rounded-full bg-amber-500" />
        </motion.div>
        <span>音乐推向柔和高潮 + 笑声</span>
      </motion.div>
    </div>
  )
}
