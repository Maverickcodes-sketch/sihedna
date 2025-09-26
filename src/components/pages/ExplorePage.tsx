//@ts-nocheck
import { motion } from 'motion/react';
import { Dna, Leaf, Bot, Network, Worm, BarChart, Activity } from 'lucide-react';
import { AnimatedPlacard } from '../AnimatedPlacard';
import { DNABackground } from '../DNABackground';
import { Button } from '../ui/button';

export function ExplorePage() {
  const features = [
    {
      icon: Dna,
      title: 'Biodiversity Metrics',
      description: `Calculate Shannon diversity, Simpson index, and species richness,
        Analyze species evenness and dominance patterns,
        Generate comprehensive biodiversity reports
`,
      animation: 'rotate' as const,
      gradient: 'from-[#14B8A6]/20 to-[#14B8A6]/10'
    },
    {
      icon: Bot,
      title: 'AI Species Classification',
      description: `IDNABERT-2 powered species identification",
        HDBSCAN clustering for OTU detection,
        Confidence scoring and taxonomic annotation
`,
      animation: 'wiggle' as const,
      gradient: 'from-[#22C55E]/20 to-[#14B8A6]/10'
    },
    {
      icon: Leaf,
      title: 'Ecosystem Health Analysis',
      description: `AI-powered ecosystem health scoring (0-100),
        Health categorization: Excellent, Good, Fair, Poor, Critical,
        Component analysis: biodiversity, stability, rarity, functional diversity
`,
      animation: 'pulse' as const,
      gradient: 'from-[#3B82F6]/20 to-[#9333EA]/10'
    },
    {
      icon: Network,
      title: 'Species Interaction Networks',
      description: `Co-occurrence pattern analysis",
        "Predator-prey and competitive relationship mapping",
        "Interactive network visualizations"
`,
      animation: 'bounce' as const,
      gradient: 'from-[#9333EA]/20 to-[#EC4899]/10'
    },
    {
      icon: Worm,
      title: 'Conservation Insights',
      description: `Priority assessment: Protection, Monitoring, Restoration, Critical",
        Management recommendations and monitoring plans,
        Rare species detection and tracking
`,
      animation: 'scale' as const,
      gradient: 'from-[#F59E0B]/20 to-[#EF4444]/10'
    },
    {
      icon: BarChart,
      title: 'Sample Analysis & Visualization',
      description: `FASTA file upload and processing,
        Interactive charts and graphs,
        Temporal and geographic pattern analysis`
,
      animation: 'pulse' as const,
      gradient: 'from-[#EF4444]/20 to-[#DC2626]/10'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <DNABackground />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 pt-20 pb-32 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#14B8A6] via-[#3B82F6] to-[#9333EA] bg-clip-text text-transparent"
          >
            Empowering Genomic Data Analysis
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-[#E6EDF3]/80 mb-12 leading-relaxed"
          >
            Upload, Explore & Analyze FASTA sequences with ease using cutting-edge AI and machine learning tools
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="px-8 py-4 text-lg bg-gradient-to-r from-[#14B8A6] to-[#3B82F6] hover:from-[#14B8A6]/80 hover:to-[#3B82F6]/80 text-white border-0 shadow-lg shadow-[#14B8A6]/25 hover:shadow-[#14B8A6]/40 transition-all duration-300">
              Start Analyzing
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative z-10 px-6 pb-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#E6EDF3] mb-4">
              OUR FEATURES
            </h2>
            <p className="text-lg text-[#E6EDF3]/70">
              Discover our comprehensive suite of analysis capabilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
              >
                <AnimatedPlacard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  iconAnimation={feature.animation}
                  gradient={feature.gradient}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Bottom Footer Strip */}
    <motion.footer
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 2, duration: 0.8 }}
  className="relative z-10 bg-gradient-to-r from-[#14B8A6]/10 to-[#3B82F6]/10 border-t border-[#14B8A6]/20 py-8"
>
  <div className="max-w-4xl mx-auto px-6 text-center">
    <div className="flex items-center justify-center space-x-3 mb-4">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Activity className="w-6 h-6 text-[#14B8A6]" />
      </motion.div>
      <span className="text-lg font-semibold text-[#E6EDF3]">
        Powered by GenomeLab Technology
      </span>
    </div>
    <p className="text-[#E6EDF3]/60 text-sm mb-6">
      Advanced algorithms for next-generation genomic analysis
    </p>

    {/* Ministry of Earth Sciences Block */}
    <div className="flex items-center justify-center space-x-3">
      <img
        src="https://media-exp1.licdn.com/dms/image/C560BAQFF9qCRX7sfsA/company-logo_200_200/0/1606735586265?e=2159024400&v=beta&t=rioMAghmoDR1_POySDkVLLw5-ox7H7zZmqCH36wIMnw" // Replace with actual path to the emblem SVG or PNG
        alt="National Emblem of India"
        className="w-8 h-10"
      />
      <span className="text-sm font-medium text-[#E6EDF3]/80">
        Ministry of Earth Sciences, Government of India
      </span>
    </div>
  </div>
</motion.footer>
    </div>
  );
}