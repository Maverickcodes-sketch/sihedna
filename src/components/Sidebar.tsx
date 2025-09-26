//@ts-nocheck
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  LayoutDashboard, 
  Compass, 
  UploadCloud, 
  BarChart2,
  Database 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const sidebarItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Explore', path: '/explore', icon: Compass },
    { label: 'Upload', path: '/upload', icon: UploadCloud },
    { label: 'Statistics', path: '/statistics', icon: BarChart2 },
    
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-[#0D1117] border-l border-[#14B8A6]/20 z-50 shadow-2xl"
          >
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg bg-[#14B8A6]/10 hover:bg-[#14B8A6]/20 transition-colors border border-[#14B8A6]/30"
                >
                  <X className="w-6 h-6 text-[#14B8A6]" />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-4">
                {sidebarItems.map((item, index) => (
                  <motion.div
                    key={item.path + item.label}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-[#14B8A6]/5 hover:bg-[#14B8A6]/10 transition-all duration-300 group border border-transparent hover:border-[#14B8A6]/30"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="p-2 rounded-lg bg-[#14B8A6]/10 group-hover:bg-[#14B8A6]/20 transition-colors"
                      >
                        <item.icon className="w-5 h-5 text-[#14B8A6]" />
                      </motion.div>
                      <span className="text-[#E6EDF3] group-hover:text-[#14B8A6] transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Branding */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="flex items-center space-x-2 p-4 rounded-lg bg-gradient-to-r from-[#14B8A6]/10 to-[#3B82F6]/10 border border-[#14B8A6]/20">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-3 h-3 bg-[#14B8A6] rounded-full"></div>
                  </motion.div>
                  <span className="text-sm text-[#E6EDF3]/80">Powered by GenomeLab</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}