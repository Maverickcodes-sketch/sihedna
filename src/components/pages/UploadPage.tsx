import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { UploadCloud, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { DNABackground } from '../DNABackground';
import { Button } from '../ui/button';

interface UploadedFile {
  name: string;
  size: number;
  status: 'uploading' | 'success' | 'error';
}

export function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  }, []);

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.name.endsWith('.fasta') || file.name.endsWith('.fa') || file.name.endsWith('.fas')) {
        const newFile: UploadedFile = {
          name: file.name,
          size: file.size,
          status: 'uploading'
        };
        
        setUploadedFiles(prev => [...prev, newFile]);

        // Simulate upload process
        setTimeout(() => {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.name === file.name 
                ? { ...f, status: Math.random() > 0.1 ? 'success' : 'error' }
                : f
            )
          );
        }, 2000 + Math.random() * 1000);
      }
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen relative pt-20 px-6">
      <DNABackground />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#E6EDF3] mb-4">
            Upload FASTA Files
          </h1>
          <p className="text-lg text-[#E6EDF3]/70">
            Drop your genomic sequences here for analysis
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12"
        >
          <div
            className={`relative p-12 border-2 border-dashed rounded-2xl transition-all duration-300 ${
              dragActive
                ? 'border-[#14B8A6] bg-[#14B8A6]/10 scale-105'
                : 'border-[#14B8A6]/50 bg-[#14B8A6]/5 hover:border-[#14B8A6]/70 hover:bg-[#14B8A6]/10'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {/* Glowing effect */}
            <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
              dragActive ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6]/20 to-[#3B82F6]/20 rounded-2xl blur-xl" />
            </div>

            <div className="relative z-10 text-center">
              <motion.div
                animate={{ 
                  y: dragActive ? -10 : 0,
                  scale: dragActive ? 1.2 : 1
                }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <UploadCloud className="w-20 h-20 text-[#14B8A6] mx-auto" />
              </motion.div>

              <h3 className="text-2xl font-semibold text-[#E6EDF3] mb-4">
                Drop FASTA files here
              </h3>
              <p className="text-[#E6EDF3]/70 mb-6">
                Supports .fasta, .fa, and .fas file formats
              </p>

              <input
                type="file"
                multiple
                accept=".fasta,.fa,.fas"
                onChange={handleChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="cursor-pointer bg-gradient-to-r from-[#14B8A6] to-[#3B82F6] hover:from-[#14B8A6]/80 hover:to-[#3B82F6]/80 text-white border-0 shadow-lg shadow-[#14B8A6]/25">
                  Choose Files
                </Button>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#0D1117]/50 backdrop-blur-sm rounded-xl border border-[#14B8A6]/20 p-6"
          >
            <h3 className="text-xl font-semibold text-[#E6EDF3] mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#14B8A6]" />
              Uploaded Files
            </h3>

            <div className="space-y-4">
              {uploadedFiles.map((file, index) => (
                <motion.div
                  key={file.name + index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-[#14B8A6]/5 rounded-lg border border-[#14B8A6]/20"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#14B8A6]/20 rounded-lg">
                      <FileText className="w-5 h-5 text-[#14B8A6]" />
                    </div>
                    <div>
                      <p className="text-[#E6EDF3] font-medium">{file.name}</p>
                      <p className="text-[#E6EDF3]/60 text-sm">{formatFileSize(file.size)}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    {file.status === 'uploading' && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-[#14B8A6] border-t-transparent rounded-full"
                      />
                    )}
                    {file.status === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}