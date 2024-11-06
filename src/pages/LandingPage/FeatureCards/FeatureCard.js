import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const FeatureCard = ({ index, title, description, icon, delay }) => {
  const cardRef = useRef(null);

  useEffect(() => {}, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.4 }}
      whileHover={{
        scale: 1.05,
        rotateX: 10, // Tilt card on X-axis
        rotateY: 5, // Tilt card on Y-axis
        originX: 0.5,
        originY: 0.5, // Set pivot point on Y-axis
        transition: { duration: 0.3 }, // Smooth transition
      }}
      whileTap={{
        scale: 1.05,
        rotateX: 10, // Tilt card on X-axis
        rotateY: 5, // Tilt card on Y-axis
        originX: 0.5,
        originY: 0.5, // Set pivot point on Y-axis
        transition: { duration: 0.3 }, // Smooth transition
      }}
      style={{ perspective: 2000 }} // Add perspective for 3D effect
      className={`cards_container`}
    >
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-5">
          <div className="cards_icons">{icon}</div>
          <h4 className="card_title">{title}</h4>
        </div>
        <div className="mt-5">
          <p className="card_desc">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};
