
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Disc3, Waves } from 'lucide-react';
import { Song } from '../types/Song';

interface SongInfoProps {
  song: Song | undefined;
}

/**
 * Enhanced Song Information Display Component
 * Shows current song details with beautiful animations and visual effects
 */
const SongInfo: React.FC<SongInfoProps> = ({ song }) => {
  if (!song) {
    return (
      <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        <CardContent className="p-12 text-center">
          <div className="relative w-64 h-64 mx-auto mb-8">
            {/* Animated Background Rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-pink-500/20 to-blue-500/20 animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* Center Icon */}
            <div className="absolute inset-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <Music className="h-16 w-16 text-white/90" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-300 mb-3">Ready to Play</h2>
          <p className="text-lg text-gray-400 font-medium">Upload your music to begin the journey</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
      <CardContent className="p-12 text-center relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        {/* Album Art with Enhanced Design */}
        <div className="relative w-72 h-72 mx-auto mb-10 group">
          {/* Rotating Background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-spin" style={{ animationDuration: '20s' }}></div>
          
          {/* Album Cover */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/40 group-hover:scale-105 transition-all duration-500">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Disc3 className="h-16 w-16 text-white/90 animate-pulse" />
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Song Information with Enhanced Typography */}
        <div className="space-y-4 relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight">
            {song.title}
          </h2>
          <div className="flex items-center justify-center space-x-3 text-xl text-purple-300">
            <span>{song.artist}</span>
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
            <span>{song.album}</span>
          </div>
        </div>

        {/* Enhanced Audio Visualization */}
        <div className="flex justify-center items-end space-x-2 mt-10 h-16">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-t from-purple-600 via-pink-500 to-blue-400 rounded-full animate-pulse shadow-lg"
              style={{
                width: '4px',
                height: `${Math.random() * 60 + 20}%`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: `${0.8 + Math.random() * 0.7}s`
              }}
            />
          ))}
        </div>

        {/* Sound Wave Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-30">
          <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SongInfo;
