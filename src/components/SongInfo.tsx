
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Disc3, Waves } from 'lucide-react';
import { Song } from '../types/Song';

interface SongInfoProps {
  song: Song | undefined;
}

/**
 * Enhanced Song Information Display Component with Indian styling
 * Shows current song details with beautiful Indian-inspired animations and colors
 */
const SongInfo: React.FC<SongInfoProps> = ({ song }) => {
  if (!song) {
    return (
      <Card className="bg-gradient-to-br from-orange-400/20 via-pink-400/20 to-green-400/20 backdrop-blur-xl border-2 border-white/30 shadow-2xl">
        <CardContent className="p-12 text-center">
          <div className="relative w-72 h-72 mx-auto mb-8">
            {/* Traditional Indian pattern rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/30 via-pink-400/30 to-green-400/30 animate-pulse border-4 border-white/20"></div>
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 animate-pulse border-4 border-white/20" style={{ animationDelay: '1s' }}></div>
            <div className="absolute inset-12 rounded-full bg-gradient-to-br from-blue-400/30 via-green-400/30 to-yellow-400/30 animate-pulse border-4 border-white/20" style={{ animationDelay: '2s' }}></div>
            
            {/* Center Icon with Indian colors */}
            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-green-500 flex items-center justify-center shadow-2xl shadow-rainbow-500/40 border-4 border-white/50">
              <Music className="h-20 w-20 text-white drop-shadow-lg" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full animate-bounce"></div>
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">🎵 संगीत Ready 🎵</h2>
          <p className="text-xl text-orange-200 font-medium">Upload your music to begin the divine journey</p>
          <p className="text-lg text-green-200 mt-2">🌈 सुर ताल मिलाकर 🌈</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-orange-400/20 via-pink-400/20 via-purple-400/20 to-green-400/20 backdrop-blur-xl border-2 border-white/30 shadow-2xl overflow-hidden">
      <CardContent className="p-12 text-center relative">
        {/* Traditional Indian pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-pink-500 via-purple-500 to-green-500"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(255,165,0,0.4) 2px, transparent 2px),
              radial-gradient(circle at 80% 80%, rgba(255,20,147,0.4) 2px, transparent 2px),
              radial-gradient(circle at 40% 60%, rgba(50,205,50,0.4) 2px, transparent 2px),
              radial-gradient(circle at 60% 40%, rgba(30,144,255,0.4) 2px, transparent 2px)
            `,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        {/* Album Art with Indian-inspired design */}
        <div className="relative w-80 h-80 mx-auto mb-12 group">
          {/* Rotating mandala-style background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 via-purple-500 to-green-500 animate-spin border-4 border-white/30" style={{ animationDuration: '30s' }}></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-green-500 via-blue-500 via-purple-500 to-orange-500 animate-spin border-4 border-white/30" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
          
          {/* Central album cover */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-orange-600 via-pink-600 via-purple-600 to-green-600 flex items-center justify-center shadow-2xl shadow-rainbow-500/50 group-hover:scale-105 transition-all duration-500 border-4 border-white/50">
            <div className="w-36 h-36 bg-gradient-to-br from-white/30 to-orange-200/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/40">
              <Disc3 className="h-20 w-20 text-white animate-pulse drop-shadow-lg" />
            </div>
          </div>

          {/* Decorative floating elements with Indian colors */}
          <div className="absolute -top-6 -right-6 w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full animate-bounce shadow-lg"></div>
          <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -top-6 -left-6 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Song Information with enhanced Indian typography */}
        <div className="space-y-6 relative z-10">
          <h2 className="text-5xl font-bold text-white leading-tight drop-shadow-lg">
            🎵 {song.title} 🎵
          </h2>
          <div className="flex items-center justify-center space-x-4 text-2xl text-orange-200">
            <span className="bg-gradient-to-r from-orange-500/30 to-pink-500/30 px-4 py-2 rounded-full border border-orange-300/30">
              {song.artist}
            </span>
            <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
            <span className="bg-gradient-to-r from-green-500/30 to-blue-500/30 px-4 py-2 rounded-full border border-green-300/30">
              {song.album}
            </span>
          </div>
          <p className="text-xl text-green-200 font-medium">🌈 अब बजेगा संगीत 🌈</p>
        </div>

        {/* Enhanced Audio Visualization with Indian colors */}
        <div className="flex justify-center items-end space-x-3 mt-12 h-20">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-t from-orange-500 via-pink-500 via-purple-500 via-blue-500 to-green-500 rounded-full animate-pulse shadow-lg"
              style={{
                width: '6px',
                height: `${Math.random() * 70 + 30}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.8 + Math.random() * 0.9}s`
              }}
            />
          ))}
        </div>

        {/* Rainbow wave effect */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-pink-500 via-purple-500 via-blue-500 via-green-500 to-yellow-500 opacity-40 rounded-b-lg">
          <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse rounded-b-lg"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SongInfo;
