import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
}

interface UseScrollAnimationResult {
  ref: (node?: Element | null) => void;
  controls: ReturnType<typeof useAnimation>;
  isInView: boolean;
}

export function useScrollAnimation(options?: UseScrollAnimationOptions): UseScrollAnimationResult {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: options?.threshold || 0.1,
    triggerOnce: options?.once !== undefined ? options.once : true,
    rootMargin: '0px 0px -10% 0px', // Adjust as needed
    // @ts-expect-error - 'amount' is a valid option but conflicts with 'threshold' in some versions
    amount: options?.amount,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!options?.once) {
      controls.start('hidden');
    }
  }, [controls, inView, options?.once]);

  return { ref, controls, isInView: inView };
}