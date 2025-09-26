//@ts-nocheck
import { motion } from 'motion/react';
import { Dna, Bot, Network, BarChart, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { AnimatedPlacard } from '../AnimatedPlacard';

interface FASTAFile {
  id: number;
  filename: string;
  size: string;
  dateUploaded: string;
  status: 'success' | 'error' | 'processing';
}

export function DashboardPage() {
  const metrics = [
    {
      icon: Dna,
      title: 'Total FASTA Uploads',
      value: '1,247',
      description: 'Genomic sequences processed',
      gradient: 'from-[#14B8A6]/20 to-[#14B8A6]/10',
      animation: 'rotate' as const
    },
    {
      icon: Bot,
      title: 'Active Researchers',
      value: '156',
      description: 'Currently analyzing data',
      gradient: 'from-[#3B82F6]/20 to-[#3B82F6]/10',
      animation: 'pulse' as const
    },
    {
      icon: Network,
      title: 'Analyses Completed',
      value: '3,891',
      description: 'Successful processing runs',
      gradient: 'from-[#9333EA]/20 to-[#9333EA]/10',
      animation: 'bounce' as const
    },
    {
      icon: BarChart,
      title: 'Detected Mutations',
      value: '12,456',
      description: 'Variants identified',
      gradient: 'from-[#EF4444]/20 to-[#EF4444]/10',
      animation: 'wiggle' as const
    }
  ];

  const fastaFiles: FASTAFile[] = [
    {
      id: 1,
      filename: 'human_genome_chr1.fasta',
      size: '245.7 MB',
      dateUploaded: '2024-01-15 14:30:22',
      status: 'success'
    },
    {
      id: 2,
      filename: 'covid_variants_analysis.fa',
      size: '12.3 KB',
      dateUploaded: '2024-01-15 13:45:18',
      status: 'success'
    },
    {
      id: 3,
      filename: 'plant_chloroplast_seq.fasta',
      size: '156.2 KB',
      dateUploaded: '2024-01-15 12:22:45',
      status: 'processing'
    },
    {
      id: 4,
      filename: 'bacterial_16s_rrna.fas',
      size: '8.9 KB',
      dateUploaded: '2024-01-15 11:18:33',
      status: 'error'
    },
    {
      id: 5,
      filename: 'mouse_transcriptome.fasta',
      size: '89.4 MB',
      dateUploaded: '2024-01-15 10:55:12',
      status: 'success'
    },
    {
      id: 6,
      filename: 'drosophila_genome.fa',
      size: '143.2 MB',
      dateUploaded: '2024-01-15 09:30:44',
      status: 'success'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'processing':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Clock className="w-5 h-5 text-yellow-500" />
          </motion.div>
        );
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return 'Completed';
      case 'error':
        return 'Failed';
      case 'processing':
        return 'Processing';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#E6EDF3] mb-4">
            Dashboard
          </h1>
          <p className="text-lg text-[#E6EDF3]/70">
            Monitor your genomic analysis progress and statistics
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
            >
              <AnimatedPlacard
                icon={metric.icon}
                title={metric.title}
                description={metric.description}
                iconAnimation={metric.animation}
                gradient={metric.gradient}
              >
                <div className="text-3xl font-bold text-[#14B8A6] mb-2">
                  {metric.value}
                </div>
              </AnimatedPlacard>
            </motion.div>
          ))}
        </motion.section>

        {/* FASTA Files List */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-[#0D1117]/50 backdrop-blur-sm rounded-xl border border-[#14B8A6]/20 p-6"
        >
          <div className="flex items-center mb-6">
            <FileText className="w-6 h-6 text-[#14B8A6] mr-3" />
            <h2 className="text-2xl font-semibold text-[#E6EDF3]">
              Uploaded FASTA Files
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#14B8A6]/20">
                  <th className="text-left py-3 px-4 text-[#E6EDF3]/80 font-medium">Filename</th>
                  <th className="text-left py-3 px-4 text-[#E6EDF3]/80 font-medium">Size</th>
                  <th className="text-left py-3 px-4 text-[#E6EDF3]/80 font-medium">Date Uploaded</th>
                  <th className="text-left py-3 px-4 text-[#E6EDF3]/80 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {fastaFiles.map((file, index) => (
                  <motion.tr
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    className="border-b border-[#14B8A6]/10 hover:bg-[#14B8A6]/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-[#14B8A6]/20 rounded-lg">
                          <FileText className="w-4 h-4 text-[#14B8A6]" />
                        </div>
                        <span className="text-[#E6EDF3] font-medium">{file.filename}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#E6EDF3]/80">{file.size}</td>
                    <td className="py-4 px-4 text-[#E6EDF3]/80">{file.dateUploaded}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(file.status)}
                        <span className={`text-sm font-medium ${
                          file.status === 'success' ? 'text-green-500' :
                          file.status === 'error' ? 'text-red-500' :
                          'text-yellow-500'
                        }`}>
                          {getStatusText(file.status)}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </div>
    </div>
  );
}