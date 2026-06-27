import { motion, type HTMLMotionProps } from 'motion/react';

export default function MotionDiv(props: HTMLMotionProps<'div'>) {
  const MotionDiv = motion.div;
  return <MotionDiv {...props} />;
}
