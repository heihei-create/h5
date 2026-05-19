"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { MagicParticles, GlowingOrb } from "@/components/magic-particles"
import { useAudio } from "@/components/audio-manager"
import Image from "next/image"

interface SceneOpeningProps {
  onNext: () => void
}

export function SceneOpening({ onNext }: SceneOpeningProps) {
  const [isBottleGlowing, setIsBottleGlowing] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const { playSound, isReady } = useAudio()

  const handleBottleClick = () => {
    setIsBottleGlowing(true)
    setShowHint(false)
    
    // 播放开瓶和魔法音效
    if (isReady) {
      playSound("pop")
      setTimeout(() => playSound("magic"), 200)
      setTimeout(() => playSound("sparkle"), 600)
    }
    
    setTimeout(() => {
      onNext()
    }, 1500)
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Background - dark office */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260518104226_14_1146-28ORiOL3gNiXQ6KWjJPM74zXvQDlc4.png"
          alt="深夜办公室场景"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-slate-900/30" />
      </div>

      {/* Magic glow effects when activated */}
      {isBottleGlowing && (
        <>
          <MagicParticles count={60} colors={["#FFD700", "#FFA500", "#FFFFFF", "#90EE90"]} />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-transparent to-green-200/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.4] }}
            transition={{ duration: 1.5 }}
          />
        </>
      )}

      {/* Clickable bottle area */}
      <motion.div
        className="absolute cursor-pointer"
        style={{ 
          left: "25%", 
          top: "35%",
          width: "120px",
          height: "180px"
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBottleClick}
      >
        {/* Glowing orbs around bottle */}
        {!isBottleGlowing && (
          <>
            <GlowingOrb className="h-4 w-4 -left-2 top-0" />
            <GlowingOrb className="h-3 w-3 -right-1 top-1/4" />
            <GlowingOrb className="h-5 w-5 left-1/2 -top-4" />
          </>
        )}

        {/* Pulse animation on bottle */}
        <motion.div
          className="absolute inset-0 rounded-full bg-amber-400/20"
          animate={!isBottleGlowing ? {
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          } : {
            scale: [1, 3],
            opacity: [1, 0],
          }}
          transition={{
            duration: isBottleGlowing ? 1.5 : 2,
            repeat: isBottleGlowing ? 0 : Infinity,
          }}
        />
      </motion.div>

      {/* Click hint */}
      {showHint && (
        <motion.div
          className="absolute left-[20%] top-[60%] flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
          >
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </motion.div>
          <span className="rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm">
            点击瓶盖，触发魔法
          </span>
        </motion.div>
      )}

      {/* Opening text */}
      <motion.div
        className="absolute bottom-24 left-0 right-0 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.p
          className="mb-4 text-lg text-amber-200/90"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          深夜的办公室，疲惫悄然袭来...
        </motion.p>
        <p className="px-8 text-2xl font-medium text-white text-balance">
          一瓶AD钙奶，唤醒藏在心底的童心
        </p>
      </motion.div>

      {/* Sound effect indicator */}
      <motion.div
        className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="flex gap-0.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="h-1.5 w-0.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-0.5 rounded-full bg-amber-400" />
          <span className="h-1.5 w-0.5 rounded-full bg-amber-400" />
        </motion.div>
        <span>开盖啵啵声 + 魔法微光声</span>
      </motion.div>
    </div>
  )
}
