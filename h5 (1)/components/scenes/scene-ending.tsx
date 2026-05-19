"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { MagicParticles } from "@/components/magic-particles"
import { useAudio } from "@/components/audio-manager"
import Image from "next/image"

export function SceneEnding() {
  const [shared, setShared] = useState(false)
  const { playSound, isReady } = useAudio()
  
  // 结尾场景播放成功音效
  useEffect(() => {
    if (isReady) {
      setTimeout(() => playSound("success"), 500)
    }
  }, [isReady, playSound])

  const handleShare = () => {
    setShared(true)
    if (isReady) {
      playSound("sparkle")
      playSound("success")
    }
    // In real implementation, this would trigger native share API
    if (navigator.share) {
      navigator.share({
        title: "娃哈哈AD钙奶 - 不管几岁，快乐万岁",
        text: "一瓶AD钙奶，唤醒藏在心底的童心",
        url: window.location.href
      }).catch(() => {})
    }
  }
  
  const handleBuy = () => {
    if (isReady) {
      playSound("click")
    }
    window.open("https://www.wahaha.com.cn", "_blank")
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      {/* Background - office full of happy people */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260518104229_17_1146-Ts0fk3yMJcj1dH3Ug9E27KwgdZww7N.png"
          alt="办公室里的快乐氛围"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </div>

      {/* Celebration particles */}
      <MagicParticles count={35} colors={["#FFD700", "#FF69B4", "#90EE90", "#87CEEB", "#FFA500"]} />

      {/* Floating hearts and stars */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl"
            style={{
              left: `${5 + i * 8}%`,
              bottom: "30%"
            }}
            animate={{
              y: [0, -200],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity
            }}
          >
            {[
              <span key="heart" role="img" aria-label="heart">&#10084;&#65039;</span>,
              <span key="star" role="img" aria-label="star">&#11088;</span>,
              <span key="milk" role="img" aria-label="milk">&#129371;</span>,
              <span key="sparkle" role="img" aria-label="sparkle">&#10024;</span>,
              <span key="yellow-heart" role="img" aria-label="yellow heart">&#128155;</span>,
              <span key="glowing-star" role="img" aria-label="glowing star">&#127775;</span>,
            ][i % 6]}
          </motion.div>
        ))}
      </div>

      {/* Main content card */}
      <motion.div
        className="relative z-10 mx-4 flex flex-col items-center rounded-3xl bg-white/95 px-8 py-10 shadow-2xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
      >
        {/* Logo/Product */}
        <motion.div
          className="relative mb-6 h-40 w-28"
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20260518105831_24_1146-jSukxcZQ9GqlZrQCzGH1AhGbbDOHON.png"
            alt="娃哈哈AD钙奶"
            fill
            className="object-contain drop-shadow-xl"
          />
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 -z-10 rounded-full bg-amber-300/30 blur-xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Slogan */}
        <motion.h1
          className="mb-2 text-center text-2xl font-bold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          不管几岁，快乐万岁
        </motion.h1>

        <motion.p
          className="mb-6 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          娃哈哈AD钙奶，守护每一份童心
        </motion.p>

        {/* Highlight text */}
        <motion.div
          className="mb-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-6 py-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-center text-sm font-medium text-white">
            一口酸甜，一生快乐
          </p>
        </motion.div>

        {/* Action buttons */}
        <div className="flex w-full gap-4">
          <motion.button
            className="flex-1 rounded-full border-2 border-green-500 bg-white py-3 font-medium text-green-600 transition-colors hover:bg-green-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
          >
            {shared ? "已分享" : "分享快乐"}
          </motion.button>
          
          <motion.button
            className="flex-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 py-3 font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            onClick={handleBuy}
          >
            立即购买
          </motion.button>
        </div>
      </motion.div>

      {/* Brand footer */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p className="text-xs text-gray-400">娃哈哈 · 陪伴中国家庭的味道</p>
        <div className="flex gap-4 text-gray-400">
          <motion.span
            className="cursor-pointer hover:text-green-500"
            whileHover={{ scale: 1.2 }}
            onClick={() => isReady && playSound("click")}
          >
            <span role="img" aria-label="phone">&#128241;</span>
          </motion.span>
          <motion.span
            className="cursor-pointer hover:text-green-500"
            whileHover={{ scale: 1.2 }}
            onClick={() => isReady && playSound("click")}
          >
            <span role="img" aria-label="chat">&#128172;</span>
          </motion.span>
          <motion.span
            className="cursor-pointer hover:text-green-500"
            whileHover={{ scale: 1.2 }}
            onClick={() => isReady && playSound("click")}
          >
            <span role="img" aria-label="link">&#128279;</span>
          </motion.span>
        </div>
      </motion.div>

      {/* Replay hint */}
      <motion.button
        className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1.5 text-xs text-gray-600 shadow-sm backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (isReady) playSound("click")
          window.location.reload()
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        重新体验
      </motion.button>
      
      {/* Sound indicator */}
      <motion.div
        className="absolute right-16 top-4 flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs text-gray-600 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="flex gap-0.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="h-1.5 w-0.5 rounded-full bg-green-500" />
          <span className="h-2.5 w-0.5 rounded-full bg-green-500" />
          <span className="h-1.5 w-0.5 rounded-full bg-green-500" />
        </motion.div>
        <span>音乐收尾 + 温柔旁白</span>
      </motion.div>
    </div>
  )
}
