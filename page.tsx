"use client"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  const noBtnRef = useRef<HTMLButtonElement>(null)

  const handleNoClick = () => {
    setNoCount(noCount + 1)
    if (noBtnRef.current) {
      // Move button to random position
      const x = Math.random() * (window.innerWidth - 100)
      const y = Math.random() * (window.innerHeight - 40)
      noBtnRef.current.style.position = "absolute"
      noBtnRef.current.style.left = `${x}px`
      noBtnRef.current.style.top = `${y}px`
    }
  }

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Ya mejor dime que no me amas",
      "¿Estás segura?",
      "¿De verdad?",
      "¿Última oportunidad?",
      "¿No te arrepentirás?",
      "¡Piénsalo bien!",
      "¿Segurísima?",
      "¡No me hagas esto!",
      "Me romperás el corazón :(",
      "¡Dame una oportunidad!",
    ]
    return phrases[Math.min(noCount, phrases.length - 1)]
  }

  const handleYesClick = () => {
    setYesPressed(true)
    // Trigger confetti
    confetti({
      particleCount: 200,
      spread: 69,
      origin: { y: 0.6 },
      colors: ['#7A288A'],
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-200 to-violet-400 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
<motion.div
  key={i}
  className="absolute"
  style={{
    clipPath: "polygon(50% 0%, 63% 39%, 100% 50%, 63% 61%, 50% 100%, 37% 61%, 0% 50%, 37% 39%)",
  }}
  initial={{ y: "100vh" }}
  animate={{
    y: "-100vh",
    x: Math.sin(i * 45) * 100,
    rotate: 360,
  }}
  transition={{
    duration: 20,
    repeat: Number.POSITIVE_INFINITY,
    delay: i * 2,
    ease: "linear",
  }}
  style={{ left: `${i * 20}%` }}
>
  <div className="w-16 h-16 relative">
    <div className="absolute w-full h-full bg-red-500 rotate-45 rounded-[25%]" />
    <div className="absolute w-full h-full bg-red-600 rotate-45 rounded-[25%] translate-x-2" />
  </div>
</motion.div>

        ))}
      </div>
      <div className="z-10 flex flex-col items-center gap-8">
        <h1
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          <span style={{ display: "block" }}>
            Mi niña, Mi vida, Mi princesita, Mi amor, Mi cielito, Mi todo
          </span>
          <span style={{ display: "block" }}>
            ¿Me permitirías ser tú San Valentin?
          </span>
        </h1>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShOomdpcFHj2KBEmxaw1ZWhhJZZAVUNp8tKg&s"
          alt="Cute Valentine cartoon characters"
          className="w-96 h-auto object-contain rounded-lg shadow-lg"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="px-8 py-4 bg-green-500 text-white rounded-lg text-xl font-bold transform hover:scale-110 transition-transform"
            onClick={handleYesClick}
          >
            Sí
          </button>
          <button
            ref={noBtnRef}
            className="px-8 py-4 bg-red-500 text-white rounded-lg text-xl font-bold hover:bg-red-600"
            onClick={handleNoClick}
            style={{ position: noCount ? "absolute" : "relative" }}
          >
            {getNoButtonText()}
          </button>
        </div>
        <AnimatePresence>
          {yesPressed && (
            <motion.div
                           initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="text-2xl font-bold text-white text-center"
            >
              Sabia que dirias que si, pero aun así, gracias por querer ser mi san valentin, se que quiza no podremos vernos ese día, pero eso no quita el hecho de que quiero ser tú San Valentin, Te amo muchisimo, princesita
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

