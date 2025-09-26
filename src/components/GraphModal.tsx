//@ts-nocheck
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface GraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'bar' | 'line' | 'area' | 'pie' | 'radar' | 'network';
}

interface NetworkNode {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  color: string;
  connections: string[];
}

interface NetworkEdge {
  from: string;
  to: string;
}

export function GraphModal({ isOpen, onClose, title, type }: GraphModalProps) {
  // Sample data for different chart types
  const barData = [
  { month: 'Jan', uploads: 32 },
  { month: 'Feb', uploads: 45 },
  { month: 'Mar', uploads: 38 },
  { month: 'Apr', uploads: 50 },
  { month: 'May', uploads: 62 },
  { month: 'Jun', uploads: 58 },
  { month: 'Jul', uploads: 70 },
  { month: 'Aug', uploads: 65 },
  { month: 'Sep', uploads: 80 },
  { month: 'Oct', uploads: 75 },
  { month: 'Nov', uploads: 68 },
  { month: 'Dec', uploads: 82 }
];

//not working properly
  const lineData =  [
  { week: 'W1', shannon: 2.15 },
  { week: 'W2', shannon: 2.34 },
  { week: 'W3', shannon: 2.28 },
  { week: 'W4', shannon: 2.47 },
  { week: 'W5', shannon: 2.39 },
  { week: 'W6', shannon: 2.53 },
  { week: 'W7', shannon: 2.61 },
  { week: 'W8', shannon: 2.55 },
  { week: 'W9', shannon: 2.68 },
  { week: 'W10', shannon: 2.72 },
  { week: 'W11', shannon: 2.79 },
  { week: 'W12', shannon: 2.84 }
];


  const areaData =  [
  { length: '100-300bp', count: 300 },
  { length: '300-500bp', count: 450 },
  { length: '500-700bp', count: 600 },
  { length: '700-1000bp', count: 760 },
  { length: '1000-2000bp', count: 920 },
  { length: '2000-5000bp', count: 1120 },
  { length: '5000-8000bp', count: 680 },
  { length: '8000-10000bp', count: 480 },
  { length: '10000-15000bp', count: 320 },
  { length: '15000+bp', count: 150 }
];


  const pieData = [
  { name: 'Salmo trutta', value: 28, color: '#FF6B6B' },
  { name: 'Oncorhynchus mykiss', value: 24, color: '#4ECDC4' },
  { name: 'Esox lucius', value: 18, color: '#45B7D1' },
  { name: 'Daphnia pulex', value: 12, color: '#96CEB4' },
  { name: 'Chironomidae', value: 10, color: '#FFEAA7' },
  { name: 'Gammarus pulex', value: 8, color: '#DDA0DD' },
  { name: 'Planaria sp.', value: 6, color: '#98D8C8' },
  { name: 'Tubifex tubifex', value: 5, color: '#F7DC6F' },
  { name: 'Other Invertebrates', value: 4, color: '#BB8FCE' },
  { name: 'Other Fish', value: 3, color: '#85C1E9' }
];


  const radarData = [
  { feature: 'Richness', value: 78 },
  { feature: 'Evenness', value: 65 },
  { feature: 'Shannon Index', value: 82 },
  { feature: 'Simpson Index', value: 74 },
  { feature: 'Phylogenetic Diversity', value: 69 },
  { feature: 'Novel OTUs', value: 52 },
  { feature: 'Functional Diversity', value: 57 },
  { feature: 'Taxonomic Diversity', value: 63 }
];

  // Network data for sequence clusters - properly positioned within bounds
  const networkNodes: NetworkNode[] = [
    { id: 'human', label: 'Human Genome', x: 300, y: 200, size: 30, color: '#14B8A6', connections: ['mouse', 'chimp', 'covid'] },
    { id: 'mouse', label: 'Mouse Genome', x: 180, y: 150, size: 24, color: '#3B82F6', connections: ['human', 'rat'] },
    { id: 'chimp', label: 'Chimpanzee', x: 420, y: 150, size: 22, color: '#9333EA', connections: ['human'] },
    { id: 'covid', label: 'SARS-CoV-2', x: 300, y: 300, size: 18, color: '#EF4444', connections: ['human', 'bat'] },
    { id: 'rat', label: 'Rat Genome', x: 120, y: 220, size: 20, color: '#F59E0B', connections: ['mouse'] },
    { id: 'bat', label: 'Bat Genome', x: 380, y: 260, size: 18, color: '#22C55E', connections: ['covid'] },
    { id: 'plant', label: 'Plant Chloroplast', x: 220, y: 100, size: 22, color: '#84CC16', connections: ['algae'] },
    { id: 'algae', label: 'Green Algae', x: 320, y: 80, size: 16, color: '#06B6D4', connections: ['plant'] },
    { id: 'bacteria', label: 'E. coli', x: 460, y: 220, size: 14, color: '#F97316', connections: [] },
    { id: 'yeast', label: 'S. cerevisiae', x: 80, y: 280, size: 16, color: '#EC4899', connections: [] }
  ];

  const networkEdges: NetworkEdge[] = [];
  networkNodes.forEach(node => {
    node.connections.forEach(connectionId => {
      if (!networkEdges.some(edge => 
        (edge.from === node.id && edge.to === connectionId) || 
        (edge.from === connectionId && edge.to === node.id)
      )) {
        networkEdges.push({ from: node.id, to: connectionId });
      }
    });
  });

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#14B8A6/20" />
              <XAxis dataKey="month" stroke="#E6EDF3" />
              <YAxis stroke="#E6EDF3" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0D1117', 
                  border: '1px solid #14B8A6',
                  borderRadius: '8px',
                  color: '#E6EDF3'
                }}
              />
              <Bar dataKey="uploads" fill="#14B8A6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#14B8A6/20" />
              <XAxis dataKey="week" stroke="#E6EDF3" />
              <YAxis stroke="#E6EDF3" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0D1117', 
                  border: '1px solid #14B8A6',
                  borderRadius: '8px',
                  color: '#E6EDF3'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="shannon" 
                stroke="#14B8A6" 
                strokeWidth={3}
                dot={{ fill: '#14B8A6', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#14B8A6/20" />
              <XAxis dataKey="length" stroke="#E6EDF3" />
              <YAxis stroke="#E6EDF3" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0D1117', 
                  border: '1px solid #14B8A6',
                  borderRadius: '8px',
                  color: '#E6EDF3'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#14B8A6" 
                fill="url(#areaGradient)" 
              />
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#b4c5ddff', 
                  border: '1px solid #14B8A6',
                  borderRadius: '8px',
                  color: '#E6EDF3'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case 'radar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#14B8A6/30" />
              <PolarAngleAxis dataKey="feature" tick={{ fill: '#E6EDF3', fontSize: 12 }} />
              <PolarRadiusAxis 
                tick={{ fill: '#E6EDF3', fontSize: 10 }}
                tickCount={4}
              />
              <Radar
                name="Features"
                dataKey="value"
                stroke="#14B8A6"
                fill="#14B8A6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0D1117', 
                  border: '1px solid #14B8A6',
                  borderRadius: '8px',
                  color: '#E6EDF3'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        );
      
      case 'network':
        return (
          <div className="h-full relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#14B8A6/10" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Edges */}
              {networkEdges.map((edge, index) => {
                const fromNode = networkNodes.find(n => n.id === edge.from);
                const toNode = networkNodes.find(n => n.id === edge.to);
                if (!fromNode || !toNode) return null;
                
                return (
                  <motion.line
                    key={`${edge.from}-${edge.to}`}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#14B8A6"
                    strokeWidth="2"
                    opacity="0.6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                );
              })}
              
              {/* Nodes */}
              {networkNodes.map((node, index) => (
                <g key={node.id}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    fill={node.color}
                    opacity="0.8"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    className="cursor-pointer"
                  />
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size + 5}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="2"
                    opacity="0.3"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  />
                  <motion.text
                    x={node.x}
                    y={node.y + node.size + 16}
                    textAnchor="middle"
                    fill="#E6EDF3"
                    fontSize="10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    {node.label}
                  </motion.text>
                </g>
              ))}
            </svg>
            
           <div className="absolute top-2 right-2 bg-[#0D1117]/90 backdrop-blur-sm rounded-lg p-3 border border-[#14B8A6]/20 max-w-32"> 
              <h3 className="text-xs font-semibold text-[#E6EDF3] mb-2">Types</h3>
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-[#14B8A6]"></div>
                  <span className="text-xs text-[#E6EDF3]/80">Mammal</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
                  <span className="text-xs text-[#E6EDF3]/80">Viral</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
                  <span className="text-xs text-[#E6EDF3]/80">Plant</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B]"></div>
                  <span className="text-xs text-[#E6EDF3]/80">Microbe</span>
                </div>
              </div>
            </div>
          </div>

        );
      
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#14B8A6]/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-[#14B8A6] rounded-full"></div>
              </div>
              <p className="text-[#E6EDF3]/70">Chart type not supported</p>
            </div>
          </div>
        );
    }
  };

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-[#0D1117] border border-[#14B8A6]/30 rounded-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#14B8A6]/20">
              <h2 className="text-2xl font-semibold text-[#E6EDF3]">{title}</h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-lg bg-[#14B8A6]/10 hover:bg-[#14B8A6]/20 transition-colors border border-[#14B8A6]/30"
              >
                <X className="w-6 h-6 text-[#14B8A6]" />
              </motion.button>
            </div>

            {/* Chart Content */}
            <div className="flex-1 p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="h-full"
              >
                {renderChart()}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}