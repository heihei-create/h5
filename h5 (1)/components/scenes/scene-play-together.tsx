"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import { MagicParticles } from "@/components/magic-particles"
import { useAudio } from "@/components/audio-manager"
import Image from "next/image"

interface ScenePlayTogetherProps {
  onNext: () => void
}

export function ScenePlayTogether({ onNext }: ScenePlayTogetherProps) {
  const [currentView, setCurrentView] = useState(0)
  const { playSound, isReady } = useAudio()
  
  const x = useMotionValue(0)
  const background = useTransform(
    x, 
    [-200, 0, 200], 
    ["#FFF8DC", "#FFFAF0", "#E0FFE0"]
  )

  const images = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260518104227_15_1146-IK6K1OyUUp7Fwg8B8NDTR4205elZIn.png",
      alt: "一起装饰AD钙奶瓶"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260518104221_10_1146-LaqvGrwyXoDyXP2Az2Q1ZRwcMKI5SS.jpg",
      alt: "一起玩耍奔跑"
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentView < 1) {
        setCurrentView(1)
        if (isReady) playSound("swipe")
      }
    }, 4000)
    return () => clearTimeout(timer)
  }, [currentView, isReady, playSound])
  
  // 场景进入时播放欢快笑声
  useEffect(() => {
    if (isReady) {
      playSound("laugh")
    }
  }, [isReady, playSound])

  const handleSwipe = (direction: number) => {
    if (direction < 0 && currentView < 1) {
      setCurrentView(1)
      if (isReady) playSound("swipe")
    } else if (direction > 0 && currentView > 0) {
      setCurrentView(0)
      if (isReady) playSound("swipe")
    }
  }
  
  const handleContinue = () => {
    if (isReady) {
      playSound("click")
      playSound("sparkle")
    }
    onNext()
  }

  return (
    <motion.div 
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: background }}
    >
      {/* Main image slider */}
      <motion.div
        className="absolute inset-0"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => handleSwipe(info.offset.x)}
        style={{ x }}
      >
        <motion.div
          className="flex h-full"
          animate={{ x: currentView * -100 + "%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ width: "200%" }}
        >
          {images.map((img, index) => (
            <div key={index} className="relative h-full w-1/2">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/10" />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating stickers animation */}
      <motion.div
        className="pointer-events-none absolute inset-0"
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i % 3) * 25}%`
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity
            }}
          >
            {[
              <span key="flower" role="img" aria-label="flower">&#127800;</span>,
              <span key="star" role="img" aria-label="star">&#11088;</span>,
              <span key="ribbon" role="img" aria-label="ribbon">&#127872;</span>,
              <span key="dizzy" role="img" aria-label="dizzy">&#128171;</span>,
              <span key="rainbow" role="img" aria-label="rainbow">&#127752;</span>,
              <span key="balloon" role="img" aria-label="balloon">&#127880;</span>,
              <span key="clover" role="img" aria-label="clover">&#127808;</span>,
              <span key="sparkle" role="img" aria-label="sparkle">&#10024;</span>,
            ][i]}
          </motion.div>
        ))}
      </motion.div>

      {/* Sparkle effect */}
      <MagicParticles count={20} colors={["#FFB6C1", "#98FB98", "#FFD700", "#87CEEB"]} />

      {/* Paper airplane animation */}
      {currentView === 1 && (
        <motion.div
          className="absolute text-4xl"
          initial={{ x: "-100%", y: "100%", rotate: -30 }}
          animate={{ 
            x: ["0%", "50%", "110%"],
            y: ["60%", "20%", "40%"],
            rotate: [-30, 10, -20]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span role="img" aria-label="airplane">&#9992;&#65039;</span>
        </motion.div>
      )}

      {/* Slide indicator */}
      <div className="absolute bottom-28 left-1/2 flex -translate-x-1/2 gap-3">
        {[0, 1].map((index) => (
          <motion.button
            key={index}
            className={`h-3 w-3 rounded-full transition-all ${
              currentView === index ? "bg-green-500 w-6" : "bg-white/50"
            }`}
            onClick={() => {
              setCurrentView(index)
              if (isReady) playSound("click")
            }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <motion.div
        className="absolute top-1/2 right-4 flex items-center gap-2 text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentView === 0 ? 1 : 0, x: [0, -10, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <span className="text-sm">滑动</span>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.div>

      {/* Activity descriptions */}
      <motion.div
        className="absolute top-8 left-0 right-0 text-center"
        key={currentView}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-block rounded-full bg-white/80 px-6 py-2 shadow-lg backdrop-blur-sm">
          <p className="text-sm font-medium text-gray-700">
            {currentView === 0 ? "一起给AD钙奶贴贴纸、折纸飞机" : "追着纸飞机在草坪上奔跑"}
          </p>
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.button
        className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-8 py-3 font-medium text-white shadow-lg"
        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(34, 197, 94, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContinue}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        继续旅程
      </motion.button>

      {/* Scene text */}
      <motion.div
        className="absolute bottom-32 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="px-8 text-xl font-medium text-gray-800 drop-shadow-sm text-balance">
          不管几岁，童心未改，快乐不难
        </p>
      </motion.div>
      
      {/* Sound indicator */}
      <motion.div
        className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="flex gap-0.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="h-1.5 w-0.5 rounded-full bg-green-400" />
          <span className="h-2.5 w-0.5 rounded-full bg-green-400" />
          <span className="h-1.5 w-0.5 rounded-full bg-green-400" />
        </motion.div>
        <span>笑声 + 轻快音乐</span>
      </motion.div>
    </motion.div>
  )
}
