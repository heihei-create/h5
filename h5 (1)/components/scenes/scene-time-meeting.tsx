"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { MagicParticles } from "@/components/magic-particles"
import { useAudio } from "@/components/audio-manager"
import Image from "next/image"

interface SceneTimeMeetingProps {
  onNext: () => void
}

export function SceneTimeMeeting({ onNext }: SceneTimeMeetingProps) {
  const [showDialogue, setShowDialogue] = useState(false)
  const [dialogueStep, setDialogueStep] = useState(0)
  const [canProceed, setCanProceed] = useState(false)
  const { playSound, isReady } = useAudio()

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowDialogue(true)
      if (isReady) playSound("sparkle")
    }, 1000)
    
    const timer2 = setTimeout(() => {
      setDialogueStep(1)
      if (isReady) playSound("ambient")
    }, 2500)
    
    const timer3 = setTimeout(() => {
      setCanProceed(true)
      if (isReady) playSound("laugh")
    }, 4000)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [isReady, playSound])

  const handleReceiveMilk = () => {
    if (isReady) {
      playSound("click")
      playSound("sparkle")
    }
    onNext()
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Background - childhood room with magic */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260518104225_13_1146.png-aYAbw0ME1cVki8rM3oQhi5ctITVkfl.jpeg"
          alt="童年小房间场景"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-transparent to-amber-100/20" />
      </div>

      {/* Floating magic particles */}
      <MagicParticles count={25} colors={["#FFD700", "#FFF8DC", "#FFFACD"]} />

      {/* Time warp effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-amber-300/20 via-transparent to-transparent" />
      </motion.div>

      {/* Dialogue bubbles */}
      {showDialogue && (
        <motion.div
          className="absolute right-8 top-1/3 max-w-[200px]"
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
            <p className="text-sm font-medium text-gray-800">
              {"给你，超甜的！"}
            </p>
            <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-white/95" />
          </div>
          <p className="mt-2 text-center text-xs text-amber-100">— 童年的自己</p>
        </motion.div>
      )}

      {dialogueStep >= 1 && (
        <motion.div
          className="absolute left-8 top-1/2 max-w-[200px]"
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative rounded-2xl bg-green-100/95 px-4 py-3 shadow-lg backdrop-blur-sm">
            <p className="text-sm font-medium text-gray-800">
              {"这味道...好熟悉..."}
            </p>
            <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-green-100/95" />
          </div>
          <p className="mt-2 text-center text-xs text-amber-100">— 成年的自己</p>
        </motion.div>
      )}

      {/* Click to receive milk */}
      {canProceed && (
        <motion.div
          className="absolute bottom-32 left-1/2 -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleReceiveMilk}
        >
          <motion.div
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative h-24 w-16 overflow-hidden rounded-lg bg-white/20 p-2 backdrop-blur-sm"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(255, 215, 0, 0.3)",
                  "0 0 40px rgba(255, 215, 0, 0.6)",
                  "0 0 20px rgba(255, 215, 0, 0.3)"
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260518105831_24_1146-jSukxcZQ9GqlZrQCzGH1AhGbbDOHON.png"
                alt="AD钙奶"
                fill
                className="object-contain"
              />
            </motion.div>
            <motion.span
              className="rounded-full bg-amber-500/80 px-4 py-2 text-sm font-medium text-white shadow-lg"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              点击接过AD钙奶
            </motion.span>
          </motion.div>
        </motion.div>
      )}

      {/* Scene text */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="px-8 text-xl font-medium text-white drop-shadow-lg text-balance">
          原来，童年的快乐，一直都在
        </p>
      </motion.div>

      {/* Sound indicator */}
      <motion.div
        className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
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
        <span>儿童笑声 + 魔法过渡声</span>
      </motion.div>

      {/* Childhood elements floating */}
      <motion.div
        className="absolute left-4 top-20 text-3xl"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span role="img" aria-label="star">&#11088;</span>
      </motion.div>
      <motion.div
        className="absolute right-8 top-16 text-2xl"
        animate={{ 
          y: [0, -8, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        <span role="img" aria-label="moon">&#127769;</span>
      </motion.div>
    </div>
  )
}
