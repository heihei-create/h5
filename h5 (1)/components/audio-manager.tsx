"use client"

import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

// 音频上下文类型
interface AudioContextType {
  playSound: (type: SoundType) => void
  setBackgroundVolume: (volume: number) => void
  setSfxVolume: (volume: number) => void
  toggleMute: () => void
  isMuted: boolean
  isReady: boolean
  initAudio: () => void
}

type SoundType = 
  | "pop"           // 开瓶声
  | "magic"         // 魔法声
  | "sparkle"       // 闪光声
  | "transition"    // 场景切换
  | "click"         // 点击
  | "laugh"         // 笑声
  | "swipe"         // 滑动
  | "success"       // 成功
  | "ambient"       // 环境音

const AudioContext = createContext<AudioContextType | null>(null)

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider")
  }
  return context
}

// Web Audio API 合成音效
function createSound(audioCtx: globalThis.AudioContext, type: SoundType): void {
  const now = audioCtx.currentTime
  
  switch (type) {
    case "pop": {
      // 开瓶啵啵声
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(800, now)
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.1)
      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15)
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      osc.start(now)
      osc.stop(now + 0.15)
      
      // 第二声
      setTimeout(() => {
        const osc2 = audioCtx.createOscillator()
        const gain2 = audioCtx.createGain()
        osc2.type = "sine"
        osc2.frequency.setValueAtTime(600, audioCtx.currentTime)
        osc2.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.08)
        gain2.gain.setValueAtTime(0.25, audioCtx.currentTime)
        gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1)
        osc2.connect(gain2)
        gain2.connect(audioCtx.destination)
        osc2.start(audioCtx.currentTime)
        osc2.stop(audioCtx.currentTime + 0.1)
      }, 100)
      break
    }
    
    case "magic": {
      // 魔法微光滋滋声
      for (let i = 0; i < 5; i++) {
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()
        const filter = audioCtx.createBiquadFilter()
        
        osc.type = "sine"
        osc.frequency.setValueAtTime(1200 + i * 200, now + i * 0.1)
        osc.frequency.exponentialRampToValueAtTime(800 + i * 100, now + i * 0.1 + 0.3)
        
        filter.type = "highpass"
        filter.frequency.setValueAtTime(500, now)
        
        gain.gain.setValueAtTime(0, now + i * 0.1)
        gain.gain.linearRampToValueAtTime(0.15, now + i * 0.1 + 0.05)
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3)
        
        osc.connect(filter)
        filter.connect(gain)
        gain.connect(audioCtx.destination)
        osc.start(now + i * 0.1)
        osc.stop(now + i * 0.1 + 0.35)
      }
      break
    }
    
    case "sparkle": {
      // 闪光声
      const frequencies = [2000, 2400, 2800, 3200]
      frequencies.forEach((freq, i) => {
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, now + i * 0.05)
        gain.gain.setValueAtTime(0.1, now + i * 0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.2)
        osc.connect(gain)
        gain.connect(audioCtx.destination)
        osc.start(now + i * 0.05)
        osc.stop(now + i * 0.05 + 0.25)
      })
      break
    }
    
    case "transition": {
      // 场景切换 - 渐变音效
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      const filter = audioCtx.createBiquadFilter()
      
      osc.type = "triangle"
      osc.frequency.setValueAtTime(200, now)
      osc.frequency.linearRampToValueAtTime(800, now + 0.4)
      osc.frequency.linearRampToValueAtTime(400, now + 0.8)
      
      filter.type = "lowpass"
      filter.frequency.setValueAtTime(1000, now)
      filter.frequency.linearRampToValueAtTime(3000, now + 0.4)
      filter.frequency.linearRampToValueAtTime(500, now + 0.8)
      
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.2, now + 0.1)
      gain.gain.linearRampToValueAtTime(0.15, now + 0.5)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8)
      
      osc.connect(filter)
      filter.connect(gain)
      gain.connect(audioCtx.destination)
      osc.start(now)
      osc.stop(now + 0.85)
      break
    }
    
    case "click": {
      // 简单点击声
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(1000, now)
      osc.frequency.exponentialRampToValueAtTime(500, now + 0.05)
      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05)
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      osc.start(now)
      osc.stop(now + 0.06)
      break
    }
    
    case "laugh": {
      // 欢快的笑声音效
      const notes = [523, 659, 784, 880, 784, 659]
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, now + i * 0.08)
        gain.gain.setValueAtTime(0.12, now + i * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.1)
        osc.connect(gain)
        gain.connect(audioCtx.destination)
        osc.start(now + i * 0.08)
        osc.stop(now + i * 0.08 + 0.12)
      })
      break
    }
    
    case "swipe": {
      // 滑动音效
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(400, now)
      osc.frequency.linearRampToValueAtTime(800, now + 0.15)
      gain.gain.setValueAtTime(0.1, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15)
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      osc.start(now)
      osc.stop(now + 0.18)
      break
    }
    
    case "success": {
      // 成功/完成音效
      const notes = [523, 659, 784, 1047]
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, now + i * 0.12)
        gain.gain.setValueAtTime(0.15, now + i * 0.12)
        gain.gain.setValueAtTime(0.15, now + i * 0.12 + 0.1)
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.25)
        osc.connect(gain)
        gain.connect(audioCtx.destination)
        osc.start(now + i * 0.12)
        osc.stop(now + i * 0.12 + 0.3)
      })
      break
    }
    
    case "ambient": {
      // 柔和环境音
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      const filter = audioCtx.createBiquadFilter()
      
      osc.type = "sine"
      osc.frequency.setValueAtTime(220, now)
      
      filter.type = "lowpass"
      filter.frequency.setValueAtTime(300, now)
      
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.05, now + 0.5)
      gain.gain.setValueAtTime(0.05, now + 2)
      gain.gain.linearRampToValueAtTime(0, now + 3)
      
      osc.connect(filter)
      filter.connect(gain)
      gain.connect(audioCtx.destination)
      osc.start(now)
      osc.stop(now + 3.5)
      break
    }
  }
}

// 背景音乐生成器 - 创建柔和的纯音乐
function createBackgroundMusic(audioCtx: globalThis.AudioContext): { start: () => void; stop: () => void; setVolume: (v: number) => void } {
  let isPlaying = false
  let masterGain: GainNode
  let oscillators: OscillatorNode[] = []
  let intervalId: NodeJS.Timeout | null = null
  
  const melodyNotes = [
    { freq: 523, dur: 0.5 },  // C5
    { freq: 587, dur: 0.5 },  // D5
    { freq: 659, dur: 0.75 }, // E5
    { freq: 523, dur: 0.25 }, // C5
    { freq: 698, dur: 0.5 },  // F5
    { freq: 659, dur: 0.5 },  // E5
    { freq: 587, dur: 0.75 }, // D5
    { freq: 523, dur: 0.25 }, // C5
    { freq: 493, dur: 0.5 },  // B4
    { freq: 523, dur: 0.5 },  // C5
    { freq: 587, dur: 0.75 }, // D5
    { freq: 659, dur: 0.5 },  // E5
    { freq: 523, dur: 0.75 }, // C5
  ]
  
  const chordProgressions = [
    [261, 329, 392], // C major
    [293, 369, 440], // D minor
    [329, 415, 493], // E minor
    [349, 440, 523], // F major
    [392, 493, 587], // G major
    [261, 329, 392], // C major
  ]
  
  function playMelody() {
    if (!isPlaying) return
    
    let time = audioCtx.currentTime
    
    melodyNotes.forEach((note, i) => {
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      
      osc.type = "sine"
      osc.frequency.setValueAtTime(note.freq, time)
      
      gain.gain.setValueAtTime(0, time)
      gain.gain.linearRampToValueAtTime(0.08, time + 0.05)
      gain.gain.setValueAtTime(0.08, time + note.dur * 0.7)
      gain.gain.linearRampToValueAtTime(0, time + note.dur)
      
      osc.connect(gain)
      gain.connect(masterGain)
      
      osc.start(time)
      osc.stop(time + note.dur + 0.1)
      oscillators.push(osc)
      
      time += note.dur * 0.8
    })
  }
  
  function playChords() {
    if (!isPlaying) return
    
    let time = audioCtx.currentTime
    
    chordProgressions.forEach((chord) => {
      chord.forEach((freq) => {
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()
        
        osc.type = "triangle"
        osc.frequency.setValueAtTime(freq / 2, time) // 低八度
        
        gain.gain.setValueAtTime(0, time)
        gain.gain.linearRampToValueAtTime(0.03, time + 0.1)
        gain.gain.setValueAtTime(0.03, time + 1.8)
        gain.gain.linearRampToValueAtTime(0, time + 2)
        
        osc.connect(gain)
        gain.connect(masterGain)
        
        osc.start(time)
        osc.stop(time + 2.2)
        oscillators.push(osc)
      })
      time += 2
    })
  }
  
  return {
    start: () => {
      if (isPlaying) return
      isPlaying = true
      masterGain = audioCtx.createGain()
      masterGain.gain.setValueAtTime(0.5, audioCtx.currentTime)
      masterGain.connect(audioCtx.destination)
      
      playMelody()
      playChords()
      
      // 循环播放
      intervalId = setInterval(() => {
        oscillators = oscillators.filter(osc => {
          try {
            return osc.context.state !== "closed"
          } catch {
            return false
          }
        })
        playMelody()
        playChords()
      }, 12000)
    },
    stop: () => {
      isPlaying = false
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
      oscillators.forEach(osc => {
        try {
          osc.stop()
        } catch {
          // 已停止
        }
      })
      oscillators = []
    },
    setVolume: (v: number) => {
      if (masterGain) {
        masterGain.gain.setValueAtTime(v, audioCtx.currentTime)
      }
    }
  }
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [bgVolume, setBgVolume] = useState(0.5)
  const [sfxVolume, setSfxVolume] = useState(0.7)
  
  const audioCtxRef = useRef<globalThis.AudioContext | null>(null)
  const bgMusicRef = useRef<ReturnType<typeof createBackgroundMusic> | null>(null)
  
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return
    
    try {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      bgMusicRef.current = createBackgroundMusic(audioCtxRef.current)
      bgMusicRef.current.start()
      setIsReady(true)
    } catch (e) {
      console.error("Audio initialization failed:", e)
    }
  }, [])
  
  const playSound = useCallback((type: SoundType) => {
    if (isMuted || !audioCtxRef.current) return
    
    // 确保音频上下文处于运行状态
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume()
    }
    
    createSound(audioCtxRef.current, type)
  }, [isMuted])
  
  const setBackgroundVolume = useCallback((volume: number) => {
    setBgVolume(volume)
    bgMusicRef.current?.setVolume(volume)
  }, [])
  
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev
      if (newMuted) {
        bgMusicRef.current?.setVolume(0)
      } else {
        bgMusicRef.current?.setVolume(bgVolume)
      }
      return newMuted
    })
  }, [bgVolume])
  
  // 清理
  useEffect(() => {
    return () => {
      bgMusicRef.current?.stop()
      audioCtxRef.current?.close()
    }
  }, [])
  
  return (
    <AudioContext.Provider value={{
      playSound,
      setBackgroundVolume,
      setSfxVolume: (v) => setSfxVolume(v),
      toggleMute,
      isMuted,
      isReady,
      initAudio
    }}>
      {children}
    </AudioContext.Provider>
  )
}

// 音频控制按钮组件
export function AudioControls() {
  const { isMuted, toggleMute, isReady, initAudio } = useAudio()
  const [showVolume, setShowVolume] = useState(false)
  
  if (!isReady) {
    return (
      <motion.button
        className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-white backdrop-blur-sm"
        onClick={initAudio}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
        <span className="text-sm">开启音效</span>
      </motion.button>
    )
  }
  
  return (
    <motion.div
      className="fixed right-4 top-4 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      <motion.button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMuted ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </motion.button>
      
      {/* 音量指示器 */}
      <AnimatePresence>
        {showVolume && !isMuted && (
          <motion.div
            className="absolute right-0 top-12 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-sm"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            <span>音乐播放中</span>
            <motion.div
              className="flex gap-0.5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="h-2 w-0.5 rounded-full bg-green-400"
                  animate={{ scaleY: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
