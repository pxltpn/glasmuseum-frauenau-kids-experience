import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, translateY: 50 }}
      animate={{
        opacity: 1,
        translateY: 0,
        transition: { duration: 0.3 },
      }}
      exit={{ opacity: 0, translateY: 0 }}
      className={cn(
        'shadow-xl fixed z-10 bottom-[4vh] w-max right-0 left-0 mx-auto flex justify-center items-center gap-[1.5vw] text-[4vw] uppercase p-[2vw] px-[1.5vw] pr-[3vw] cursor-pointer',
        className
      )}
    >
      {children}
    </motion.button>
  );
};
