"use client";

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface DynamicTextProps {
  text: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  className?: string;
}

export default function DynamicText({ text, mouseX, mouseY, className }: DynamicTextProps) {
  // Use parent motion values to drive text repulsion, bypassing re-renders
  const repelX = useTransform(mouseX, [-500, 500], [15, -15]);
  const repelY = useTransform(mouseY, [-500, 500], [15, -15]);

  return (
    <motion.div
      style={{ x: repelX, y: repelY }}
      className={`${className} will-change-transform transform-gpu inline-block`}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block mr-[0.2em] whitespace-nowrap">
          {word}
        </span>
      ))}
    </motion.div>
  );
}
