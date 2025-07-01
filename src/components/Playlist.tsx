
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Music, Play, Pause, MoreVertical } from 'lucide-react';
import { Song } from '../types/Song';
import { formatTime } from '../utils/audioUtils';

interface PlaylistProps {
  songs: Song[];
  currentSongIndex: number;
  onSongSelect: (index: number) => void;
  onSongRemove: (index: number) => void;
}

/**
 * Enhanced Playlist Component with Indian-inspired design
 * Displays list of songs with vibrant Indian colors and styling
 */
const Playlist: React.FC<PlaylistProps> = ({
  songs,
  currentSongIndex,
  onSongSelect,
  onSongRemove
}) => {
  return (
    <Card className="bg-gradient-to-br from-orange-400/20 via-pink-400/20 via-purple-400/20 to-green-400/20 backdrop-blur-xl border-2 border-white/30 shadow-2xl h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center text-2xl font-bold">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-pink-500 to-green-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg border-2 border-white/30">
            <Music className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="text-2xl bg-gradient-to-r from-orange-300 via-pink-300 to-green-300 bg-clip-text text-transparent">
              🎵 Your Playlist
            </div>
            <div className="text-base text-orange-200 font-normal">
              {songs.length} tracks ready
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        {songs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-orange-500/30 via-pink-500/30 to-green-500/30 rounded-3xl flex items-center justify-center border-4 border-white/20">
              <Music className="h-12 w-12 text-orange-200" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">🎵 Empty Playlist 🎵</h3>
            <p className="text-orange-200 text-lg">Add some music to get started</p>
            <p className="text-green-200 text-base mt-2">🌈 Celestial Tracks Awaiting 🌈</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gradient-to-r scrollbar-thumb-from-orange-400 scrollbar-thumb-to-green-400">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className={`group flex items-center p-5 border-b border-white/10 hover:bg-gradient-to-r hover:from-orange-400/20 hover:via-pink-400/20 hover:to-green-400/20 cursor-pointer transition-all duration-300 relative ${
                  index === currentSongIndex 
                    ? 'bg-gradient-to-r from-orange-500/30 via-pink-500/30 to-green-500/30 border-l-4 border-l-orange-400 shadow-lg' 
                    : 'hover:border-l-4 hover:border-l-white/30'
                }`}
                onClick={() => onSongSelect(index)}
              >
                {/* Track Number / Play Indicator with Indian colors */}
                <div className="flex items-center justify-center w-12 h-12 mr-4">
                  {index === currentSongIndex ? (
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
                      <div className="flex space-x-1">
                        <div className="w-1 h-4 bg-white rounded-full animate-pulse"></div>
                        <div className="w-1 h-5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        <div className="w-1 h-5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-white/10 to-orange-100/10 rounded-full flex items-center justify-center text-orange-200 font-bold group-hover:bg-gradient-to-br group-hover:from-orange-400/30 group-hover:to-pink-400/30 transition-all duration-300 border border-white/20">
                      <span className="text-sm group-hover:hidden">{index + 1}</span>
                      <Play className="h-5 w-5 hidden group-hover:block text-white" />
                    </div>
                  )}
                </div>

                {/* Song Information with Indian styling */}
                <div className="flex-1 min-w-0">
                  <p className={`text-lg font-bold truncate transition-colors duration-300 ${
                    index === currentSongIndex ? 'text-orange-200' : 'text-white group-hover:text-orange-100'
                  }`}>
                    🎵 {song.title}
                  </p>
                  <div className="flex items-center space-x-3 mt-1">
                    <p className="text-base text-orange-300 truncate">
                      {song.artist}
                    </p>
                    {song.album !== 'Unknown Album' && (
                      <>
                        <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                        <p className="text-base text-green-300 truncate">
                          {song.album}
                        </p>
                      </>
                    )}
                  </div>
                  {song.duration > 0 && (
                    <p className="text-sm text-blue-300 mt-1 font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-2 py-1 rounded-full inline-block border border-blue-300/30">
                      ⏱️ {formatTime(song.duration)}
                    </p>
                  )}
                </div>

                {/* Action Buttons with Indian colors */}
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 rounded-full text-orange-300 hover:text-white hover:bg-gradient-to-br hover:from-orange-400/30 hover:to-pink-400/30 transition-all duration-300 border border-orange-300/30"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSongRemove(index);
                    }}
                    className="w-10 h-10 rounded-full text-orange-300 hover:text-red-300 hover:bg-gradient-to-br hover:from-red-400/30 hover:to-pink-400/30 transition-all duration-300 border border-red-300/30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Active Song Indicator with rainbow gradient */}
                {index === currentSongIndex && (
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-orange-500 via-pink-500 via-purple-500 to-green-500 rounded-l-full"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Playlist;
