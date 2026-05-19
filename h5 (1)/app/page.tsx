"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MagicParticles } from "@/components/magic-particles"
import { SceneOpening } from "@/components/scenes/scene-opening"
import { SceneTimeMeeting } from "@/components/scenes/scene-time-meeting"
import { ScenePlayTogether } from "@/components/scenes/scene-play-together"
import { SceneMagicReturn } from "@/components/scenes/scene-magic-return"
import { SceneEnding } from "@/components/scenes/scene-ending"
import { AudioProvider, AudioControls, useAudio } from "@/components/audio-manager"

function ADMilkH5Content() {
  const [currentScene, setCurrentScene] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showMagicOverlay, setShowMagicOverlay] = useState(false)
  const { playSound, isReady } = useAudio()

  const goToNextScene = useCallback(() => {
    if (isTransitioning || currentScene >= 4) return
    
    setIsTransitioning(true)
    setShowMagicOverlay(true)
    
    // 播放场景切换音效
    if (isReady) {
      playSound("transition")
      playSound("sparkle")
    }
    
    setTimeout(() => {
      setCurrentScene(prev => prev + 1)
      setTimeout(() => {
        setShowMagicOverlay(false)
        setIsTransitioning(false)
      }, 500)
    }, 800)
  }, [isTransitioning, currentScene, playSound, isReady])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        goToNextScene()
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [goToNextScene])

  const scenes = [
    <SceneOpening key="opening" onNext={goToNextScene} />,
    <SceneTimeMeeting key="time-meeting" onNext={goToNextScene} />,
    <ScenePlayTogether key="play-together" onNext={goToNextScene} />,
    <SceneMagicReturn key="magic-return" onNext={goToNextScene} />,
    <SceneEnding key="ending" />,
  ]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-900">
      {/* Audio Controls */}
      <AudioControls />
      
      {/* Magic transition overlay */}
      <AnimatePresence>
        {showMagicOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-100/90 via-white/95 to-green-100/90"
          >
            <MagicParticles count={50} />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ duration: 0.8 }}
              className="text-6xl"
            >
              <span role="img" aria-label="sparkle">&#10024;</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full"
        >
          {scenes[currentScene]}
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 gap-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentScene 
                ? "w-8 bg-green-500" 
                : index < currentScene 
                  ? "w-2 bg-green-300" 
                  : "w-2 bg-white/30"
            }`}
            animate={index === currentScene ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ADMilkH5() {
  return (
    <AudioProvider>
      <ADMilkH5Content />
    </AudioProvider>
  )
}
