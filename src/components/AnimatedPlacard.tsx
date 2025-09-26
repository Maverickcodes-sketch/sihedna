//@ts-nocheck
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface AnimatedPlacardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  gradient?: string;
  iconAnimation?: 'pulse' | 'rotate' | 'bounce' | 'wiggle' | 'scale';
  children?: ReactNode;
}

export function AnimatedPlacard({ 
  icon: Icon, 
  title, 
  description, 
  onClick, 
  gradient = 'from-[#14B8A6]/20 to-[#3B82F6]/20',
  iconAnimation = 'pulse',
  children
}: AnimatedPlacardProps) {
  const iconAnimations = {
    pulse: { scale: [1, 1.2, 1] },
    rotate: { rotate: [0, 360] },
    bounce: { y: [0, -10, 0] },
    wiggle: { rotate: [0, -10, 10, -10, 0] },
    scale: { scale: [1, 1.1, 1] }
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        rotateX: 5 
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative group p-6 rounded-xl bg-gradient-to-br ${gradient} border border-[#14B8A6]/30 hover:border-[#14B8A6]/60 transition-all duration-300 cursor-pointer overflow-hidden`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/10 to-[#3B82F6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-4">
          <motion.div
            animate={iconAnimations[iconAnimation]}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="p-3 rounded-lg bg-[#14B8A6]/20 group-hover:bg-[#14B8A6]/30 transition-colors"
          >
            <Icon className="w-8 h-8 text-[#14B8A6]" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-[#E6EDF3] group-hover:text-[#14B8A6] transition-colors">
              {title}
            </h3>
          </div>
        </div>
        
        <p className="text-[#E6EDF3]/80 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        {children}
      </div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-[#14B8A6]/0 group-hover:border-[#14B8A6]/50"
        animate={{
          background: [
            'linear-gradient(0deg, #14B8A6/0, #14B8A6/0)',
            'linear-gradient(360deg, #14B8A6/20, #3B82F6/20)',
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}