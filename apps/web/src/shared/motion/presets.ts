import type { HTMLMotionProps } from 'motion/react';

type MotionPreset = Pick<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'exit' | 'transition'>;

export const fadeInUp: MotionPreset = {
  initial: { y: 10, opacity: 0, scale: 0.95 },
  animate: { y: 0, opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

export const fadeInBottom: MotionPreset = {
  initial: { y: -10, opacity: 0, scale: 0.95 },
  animate: { y: 0, opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

export const fadeInUpSoft: MotionPreset = {
  initial: { y: 10, opacity: 0, scale: 0.95 },
  animate: { y: 0, opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export const fadeInListItem: MotionPreset = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: 'backOut' },
};

export const slideInHeader: MotionPreset = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export const gameCardSwap: MotionPreset = {
  initial: { opacity: 0, scale: 0.95, y: 15 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -15 },
  transition: { duration: 0.3, ease: 'easeInOut' },
};

export const floatingLoop: MotionPreset = {
  animate: { y: 5 },
  transition: { duration: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
};

export function withDelay(preset: MotionPreset, delay: number): MotionPreset {
  return {
    ...preset,
    transition: {
      ...preset.transition,
      delay,
    },
  };
}
