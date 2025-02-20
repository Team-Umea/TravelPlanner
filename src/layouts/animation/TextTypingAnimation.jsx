import { motion } from "framer-motion";

export default function TextTypingAnimation({ text }) {
  return (
    <div className="flex flex-wrap justify-center gap-x-1 lg:gap-x-3 tracking-wider w-screen text-white">
      {text.split(" ").map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: i / 10,
          }}
          key={i}
          className="w-fit text-3xl lg:text-5xl font-semibold">
          {el}
        </motion.span>
      ))}
    </div>
  );
}
