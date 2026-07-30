import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, type MotionValue, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SelectableCarouselProps<T> {
  items: T[];
  selectedIndex: number;
  onChange: (index: number) => void;
  renderItem: (item: T, isActive: boolean) => React.ReactNode;
  emptyMessage?: string;
}

interface CarouselCardProps<T> {
  item: T;
  index: number;
  trackX: MotionValue<number>;
  centerOffset: number;
  stepSize: number;
  renderItem: (item: T, isActive: boolean) => React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

function CarouselCard<T>({
  item,
  index,
  trackX,
  centerOffset,
  stepSize,
  renderItem,
  isActive,
  onClick,
}: CarouselCardProps<T>) {
  const activeX = centerOffset - index * stepSize;
  const leftX = activeX - stepSize;
  const rightX = activeX + stepSize;

  // Real-time interpolation of styling properties based on track's drag position
  const scale = useTransform(trackX, [leftX, activeX, rightX], [0.8, 1.1, 0.8]);
  const opacity = useTransform(trackX, [leftX, activeX, rightX], [0.4, 1, 0.4]);

  // Make the blur transition faster so the incoming card becomes clear sooner during the swipe
  const blurVal = useTransform(
    trackX,
    [leftX, activeX - stepSize * 0.4, activeX, activeX + stepSize * 0.4, rightX],
    [3, 0, 0, 0, 3]
  );
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        filter,
        width: stepSize - 16,
        marginRight: 16,
      }}
      onClick={onClick}
      className="cursor-pointer origin-center shrink-0 flex items-center justify-center select-none"
    >
      {renderItem(item, isActive)}
    </motion.div>
  );
}

export default function SelectableCarousel<T>({
  emptyMessage,
  items,
  selectedIndex,
  onChange,
  renderItem,
}: SelectableCarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(320);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const itemWidth = isMobile ? 110 : 140;
  const gap = 16;
  const stepSize = itemWidth + gap;
  const centerOffset = (containerWidth - itemWidth) / 2;

  // Initialize motion value for track's horizontal position
  const initialX = centerOffset - selectedIndex * stepSize;
  const trackX = useMotionValue(initialX);

  // Keep trackX in sync with active index selections (such as button clicks)
  useEffect(() => {
    const targetX = centerOffset - selectedIndex * stepSize;
    animate(trackX, targetX, {
      type: "spring",
      stiffness: 280,
      damping: 26,
    });
  }, [selectedIndex, centerOffset, stepSize, trackX]);

  const handlePrev = () => {
    if (selectedIndex > 0) {
      onChange(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < items.length - 1) {
      onChange(selectedIndex + 1);
    }
  };

  const onDragEnd = (_event: unknown, info: PanInfo) => {
    const currentX = trackX.get();
    const velocityX = info.velocity.x;

    // Calculate nearest index based on current offset
    const nearestIndex = Math.round((centerOffset - currentX) / stepSize);

    // Dynamic swipe gesture support (snaps to next/prev quickly if velocity is high)
    if (velocityX < -350 && selectedIndex < items.length - 1) {
      onChange(selectedIndex + 1);
    } else if (velocityX > 350 && selectedIndex > 0) {
      onChange(selectedIndex - 1);
    } else {
      const clampedIndex = Math.max(0, Math.min(items.length - 1, nearestIndex));
      onChange(clampedIndex);
    }
  };

  const dragConstraints = {
    left: centerOffset - (items.length - 1) * stepSize,
    right: centerOffset,
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-32 items-center justify-center w-full select-none overflow-visible">
        <div className="center-col w-full">
          <p className="text-sm text-white/50 text-center">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full select-none overflow-visible">
      {/* Carousel Viewport Container */}
      <div
        ref={containerRef}
        className="relative flex items-center w-full max-w-[340px] sm:max-w-[450px] h-[160px] sm:h-[200px] overflow-hidden"
      >
        {/* Navigation Arrow Left */}
        {selectedIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 z-20 p-2 rounded-full bg-surface/80 hover:bg-surface-light border border-white/10 text-white/70 hover:text-white transition-all active:scale-95 duration-150 cursor-pointer shadow-lg"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Draggable Track */}
        <motion.div
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
          style={{ x: trackX }}
          className="flex items-center absolute left-0 h-full cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {items.map((item, index) => (
            <CarouselCard
              key={index}
              item={item}
              index={index}
              trackX={trackX}
              centerOffset={centerOffset}
              stepSize={stepSize}
              renderItem={renderItem}
              isActive={index === selectedIndex}
              onClick={() => {
                if (index !== selectedIndex) {
                  onChange(index);
                }
              }}
            />
          ))}
        </motion.div>

        {/* Navigation Arrow Right */}
        {selectedIndex < items.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 z-20 p-2 rounded-full bg-surface/80 hover:bg-surface-light border border-white/10 text-white/70 hover:text-white transition-all active:scale-95 duration-150 cursor-pointer shadow-lg"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      <div className="flex gap-2 mt-4 justify-center items-center">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => onChange(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${selectedIndex === index
              ? "w-6 bg-primary-500"
              : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
