//@ts-nocheck
import { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Network, Dna, Worm, Leaf, Bot } from 'lucide-react';
import { AnimatedPlacard } from '../AnimatedPlacard';
import { GraphModal } from '../GraphModal';

interface StatPlacard {
  icon: any;
  title: string;
  description: string;
  chartType: 'bar' | 'line' | 'area' | 'pie' | 'radar' | 'network';
  gradient: string;
  animation: 'pulse' | 'rotate' | 'bounce' | 'wiggle' | 'scale';
}

export function StatisticsPage() {
  const [selectedChart, setSelectedChart] = useState<{ title: string; type: any } | null>(null);

  const statPlacards: StatPlacard[] = [
    {
      icon: BarChart,
      title: 'Monthly eDNA Sample Processing',
      description: 'Shows the number of environmental DNA samples processed and analyzed each month. Tracks laboratory throughput and seasonal sampling patterns across different aquatic ecosystems.',
      chartType: 'bar',
      gradient: 'from-[#14B8A6]/20 to-[#14B8A6]/10',
      animation: 'pulse'
    },
    {
      icon: Network,
      title: 'Sequence Clusters',
      description: 'Visualize relationships between genomic sequences and their classifications.Predator and prey competitive mapping by forming a network.Co-occurerence pattern analysis',
      chartType: 'network',
      gradient: 'from-[#3B82F6]/20 to-[#3B82F6]/10',
      animation: 'bounce'
    },
    {
      icon: Dna,
      title: 'Weekly Shannon Diversity Index Trends',
      description: 'Displays temporal changes in ecosystem biodiversity health using the Shannon diversity index. Higher values indicate more diverse and stable aquatic communities over time.',
      chartType: 'line',
      gradient: 'from-[#9333EA]/20 to-[#9333EA]/10',
      animation: 'rotate'
    },
    {
      icon: Worm,
      title: 'Sequence Length Variation',
      description: 'Visualizes the distribution of DNA sequence lengths (base pairs) found in eDNA samples. Different length ranges can indicate various organism types and sequencing quality.Predator and Prey competitive mapping',
      chartType: 'area',
      gradient: 'from-[#F59E0B]/20 to-[#F59E0B]/10',
      animation: 'wiggle'
    },
    {
      icon: Leaf,
      title: 'Top Detected Species Distribution',
      description: 'Breakdown of the most abundant species identified through eDNA analysis. Shows relative proportions of fish, invertebrates, and other organisms in sampled water bodies.',
      chartType: 'pie',
      gradient: 'from-[#22C55E]/20 to-[#22C55E]/10',
      animation: 'scale'
    },
    {
      icon: Bot,
      title: 'Ecosystem Health Indicators',
      description: 'Multi-dimensional view of biodiversity metrics including species richness, evenness, phylogenetic diversity, and novel species discovery rates. Provides comprehensive ecosystem assessment.',
      chartType: 'radar',
      gradient: 'from-[#EF4444]/20 to-[#EF4444]/10',
      animation: 'pulse'
    }
  ];

  const handlePlacardClick = (placard: StatPlacard) => {
    setSelectedChart({ title: placard.title, type: placard.chartType });
  };

  return (
    <div className="min-h-screen bg-[#0D1117] pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#E6EDF3] mb-4">
            Statistics & Analytics
          </h1>
          <p className="text-lg text-[#E6EDF3]/70">
            Explore comprehensive genomic data insights and visualizations
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {statPlacards.map((placard, index) => (
            <motion.div
              key={placard.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatedPlacard
                  icon={placard.icon}
                  title={placard.title}
                  description={placard.description}
                  iconAnimation={placard.animation}
                  gradient={placard.gradient}
                  onClick={() => handlePlacardClick(placard)}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="mt-4"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#E6EDF3]/60">Click to view</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-[#14B8A6]"
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatedPlacard>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-[#14B8A6]/10 to-[#14B8A6]/5 rounded-xl p-6 border border-[#14B8A6]/20">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-bold text-[#14B8A6] mb-2"
              >
                99.7%
              </motion.div>
              <p className="text-[#E6EDF3]/80">Analysis Accuracy</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#3B82F6]/10 to-[#3B82F6]/5 rounded-xl p-6 border border-[#3B82F6]/20">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="text-3xl font-bold text-[#3B82F6] mb-2"
              >
                2.3s
              </motion.div>
              <p className="text-[#E6EDF3]/80">Average Processing</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#9333EA]/10 to-[#9333EA]/5 rounded-xl p-6 border border-[#9333EA]/20">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                className="text-3xl font-bold text-[#9333EA] mb-2"
              >
                24/7
              </motion.div>
              <p className="text-[#E6EDF3]/80">System Uptime</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Graph Modal */}
      <GraphModal
        isOpen={!!selectedChart}
        onClose={() => setSelectedChart(null)}
        title={selectedChart?.title || ''}
        type={selectedChart?.type || 'bar'}
      />
    </div>
  );
}