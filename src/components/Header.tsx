//@ts-nocheck
import { Link, useLocation } from 'react-router-dom';
import { Dna, Menu } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const location = useLocation();

  const navItems = [
    { label: 'Explore', path: '/explore' },
    { label: 'Upload', path: '/upload' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Statistics', path: '/statistics' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0D1117]/80 backdrop-blur-md border-b border-[#14B8A6]/20"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Dna className="w-8 h-8 text-[#14B8A6]" />
          </motion.div>
          <span className="text-xl font-semibold text-[#E6EDF3] group-hover:text-[#14B8A6] transition-colors">
            GenomeLab
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-3 py-2 transition-colors ${
                location.pathname === item.path
                  ? 'text-[#14B8A6]'
                  : 'text-[#E6EDF3] hover:text-[#14B8A6]'
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#14B8A6] rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleSidebar}
          className="p-2 rounded-lg bg-[#14B8A6]/10 hover:bg-[#14B8A6]/20 transition-colors border border-[#14B8A6]/30"
        >
          <Menu className="w-6 h-6 text-[#14B8A6]" />
        </motion.button>
      </div>
    </motion.header>
  );
}