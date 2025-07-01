
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
 * Enhanced Playlist Component with Beautiful Design
 * Displays list of songs with modern styling and smooth interactions
 */
const Playlist: React.FC<PlaylistProps> = ({
  songs,
  currentSongIndex,
  onSongSelect,
  onSongRemove
}) => {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center text-2xl font-bold">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <Music className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-xl">Your Playlist</div>
            <div className="text-sm text-gray-400 font-normal">{songs.length} tracks ready</div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        {songs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center">
              <Music className="h-10 w-10 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Empty Playlist</h3>
            <p className="text-gray-400">Add some music to get started</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className={`group flex items-center p-4 border-b border-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 relative ${
                  index === currentSongIndex 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-l-4 border-l-purple-500' 
                    : 'hover:border-l-4 hover:border-l-white/20'
                }`}
                onClick={() => onSongSelect(index)}
              >
                {/* Track Number / Play Indicator */}
                <div className="flex items-center justify-center w-10 h-10 mr-4">
                  {index === currentSongIndex ? (
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="flex space-x-0.5">
                        <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
                        <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-gray-400 font-medium group-hover:bg-white/20 transition-all duration-300">
                      <span className="text-sm group-hover:hidden">{index + 1}</span>
                      <Play className="h-4 w-4 hidden group-hover:block" />
                    </div>
                  )}
                </div>

                {/* Song Information */}
                <div className="flex-1 min-w-0">
                  <p className={`text-base font-semibold truncate transition-colors duration-300 ${
                    index === currentSongIndex ? 'text-purple-300' : 'text-white group-hover:text-purple-200'
                  }`}>
                    {song.title}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-sm text-gray-400 truncate">
                      {song.artist}
                    </p>
                    {song.album !== 'Unknown Album' && (
                      <>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <p className="text-sm text-gray-500 truncate">
                          {song.album}
                        </p>
                      </>
                    )}
                  </div>
                  {song.duration > 0 && (
                    <p className="text-xs text-gray-500 mt-1 font-medium">
                      {formatTime(song.duration)}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300"
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
                    className="w-8 h-8 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-400/20 transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Active Song Indicator */}
                {index === currentSongIndex && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-full"></div>
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
