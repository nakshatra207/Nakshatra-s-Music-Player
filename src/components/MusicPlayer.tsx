import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Shuffle, Repeat, Upload, Heart, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import Playlist from './Playlist';
import SongInfo from './SongInfo';
import { Song } from '../types/Song';
import { formatTime } from '../utils/audioUtils';

/**
 * Main Music Player Component
 * Handles audio playback, playlist management, and user interactions
 */
const MusicPlayer: React.FC = () => {
  // Audio reference for controlling playback
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');

  const currentSong = songs[currentSongIndex];

  /**
   * Handle file upload and create song objects
   * Supports multiple audio formats (mp3, mp4, wav, ogg, etc.)
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newSongs: Song[] = [];
    
    Array.from(files).forEach((file, index) => {
      if (file.type.startsWith('audio/')) {
        const song: Song = {
          id: Date.now() + index,
          title: file.name.replace(/\.[^/.]+$/, ''),
          artist: 'Unknown Artist',
          album: 'Unknown Album',
          duration: 0,
          url: URL.createObjectURL(file),
          file: file
        };
        newSongs.push(song);
      }
    });

    setSongs(prevSongs => [...prevSongs, ...newSongs]);
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (songs.length === 0) return;

    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }
    setCurrentSongIndex(nextIndex);
  };

  const previousSong = () => {
    if (songs.length === 0) return;

    const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    
    const seekTime = (value[0] / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleSongEnd = () => {
    switch (repeatMode) {
      case 'one':
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
        break;
      case 'all':
        nextSong();
        break;
      default:
        if (currentSongIndex < songs.length - 1) {
          nextSong();
        } else {
          setIsPlaying(false);
        }
    }
  };

  const selectSong = (index: number) => {
    setCurrentSongIndex(index);
  };

  const removeSong = (index: number) => {
    const newSongs = songs.filter((_, i) => i !== index);
    setSongs(newSongs);
    
    if (index < currentSongIndex) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else if (index === currentSongIndex && newSongs.length > 0) {
      setCurrentSongIndex(Math.min(currentSongIndex, newSongs.length - 1));
    }
  };

  // Effect to handle audio events and metadata loading
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => handleSongEnd();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnd);

    audio.volume = volume / 100;

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [currentSongIndex, repeatMode, volume]);

  useEffect(() => {
    if (currentSong && audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Traditional Indian Pattern Background with black theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,165,0,0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,20,147,0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(50,205,50,0.3) 0%, transparent 50%),
            radial-gradient(circle at 25% 75%, rgba(30,144,255,0.3) 0%, transparent 50%)
          `
        }}></div>
        
        {/* Mandala-style decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 border-4 border-orange-300/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border-4 border-green-300/20 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 border-4 border-pink-300/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-28 h-28 border-4 border-blue-300/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header with Indian-inspired styling */}
          <div className="text-center mb-12 pt-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-400 via-white to-green-400 rounded-3xl mb-6 shadow-2xl shadow-orange-500/50 border-4 border-white/30">
              <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-orange-600 rounded-xl flex items-center justify-center shadow-inner">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-green-500 rounded-sm"></div>
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 via-purple-400 via-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent mb-4 animate-pulse">
              Nakshatra Music Player
            </h1>
            <p className="text-2xl text-white font-light mb-2">Divine Music Experience</p>
            <p className="text-lg text-orange-200 font-medium">🎵 सुर ताल मेलोडी 🎵</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Main Player Section */}
            <div className="xl:col-span-8 space-y-8">
              {/* Song Information Display */}
              <SongInfo song={currentSong} />

              {/* Enhanced Player Controls with Indian styling */}
              <Card className="bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-green-500/20 backdrop-blur-xl border-2 border-gradient-to-r from-orange-400 to-green-400 shadow-2xl">
                <CardContent className="p-8">
                  {/* Progress Bar with Rainbow styling */}
                  <div className="mb-8">
                    <div className="relative">
                      <Slider
                        value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
                        onValueChange={handleSeek}
                        max={100}
                        step={0.1}
                        className="w-full [&>span:first-child]:h-3 [&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-orange-200/30 [&>span:first-child]:to-green-200/30 [&>span:first-child]:rounded-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-orange-400 [&_[role=slider]]:via-pink-400 [&_[role=slider]]:to-green-400 [&_[role=slider]]:border-0 [&_[role=slider]]:w-6 [&_[role=slider]]:h-6 [&_[role=slider]]:shadow-lg [&_[role=slider]]:shadow-orange-500/50 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-orange-400 [&>span:first-child>span]:via-pink-400 [&>span:first-child>span]:to-green-400 [&>span:first-child>span]:rounded-full"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-orange-100 mt-4 font-medium">
                      <span className="bg-gradient-to-r from-orange-500/30 to-pink-500/30 px-4 py-2 rounded-full border border-orange-300/30">
                        {formatTime(currentTime)}
                      </span>
                      <span className="bg-gradient-to-r from-green-500/30 to-blue-500/30 px-4 py-2 rounded-full border border-green-300/30">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>

                  {/* Main Control Buttons with Indian color scheme */}
                  <div className="flex items-center justify-center space-x-8 mb-8">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setIsShuffled(!isShuffled)}
                      className={`w-16 h-16 rounded-full transition-all duration-300 hover:scale-110 border-2 ${
                        isShuffled 
                          ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/40 border-orange-300' 
                          : 'bg-gradient-to-br from-white/10 to-orange-100/10 text-orange-100 hover:bg-gradient-to-br hover:from-orange-400/20 hover:to-pink-400/20 hover:text-white border-orange-300/50'
                      }`}
                    >
                      <Shuffle className="h-6 w-6" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={previousSong}
                      disabled={songs.length === 0}
                      className="w-18 h-18 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-110 disabled:opacity-30 border-2 border-blue-300/50"
                    >
                      <SkipBack className="h-7 w-7" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={togglePlayPause}
                      disabled={!currentSong}
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 via-pink-500 via-purple-500 to-green-400 text-white shadow-2xl shadow-rainbow-500/60 hover:shadow-3xl hover:scale-105 transition-all duration-300 disabled:opacity-50 border-4 border-white/30"
                    >
                      {isPlaying ? <Pause className="h-10 w-10" /> : <Play className="h-10 w-10 ml-1" />}
                    </Button>

                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={nextSong}
                      disabled={songs.length === 0}
                      className="w-18 h-18 rounded-full bg-gradient-to-br from-green-400/20 to-blue-400/20 text-white hover:from-green-500/30 hover:to-blue-500/30 transition-all duration-300 hover:scale-110 disabled:opacity-30 border-2 border-green-300/50"
                    >
                      <SkipForward className="h-7 w-7" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setRepeatMode(
                        repeatMode === 'none' ? 'all' : 
                        repeatMode === 'all' ? 'one' : 'none'
                      )}
                      className={`w-16 h-16 rounded-full transition-all duration-300 hover:scale-110 relative border-2 ${
                        repeatMode !== 'none' 
                          ? 'bg-gradient-to-br from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/40 border-green-300' 
                          : 'bg-gradient-to-br from-white/10 to-green-100/10 text-green-100 hover:bg-gradient-to-br hover:from-green-400/20 hover:to-blue-400/20 hover:text-white border-green-300/50'
                      }`}
                    >
                      <Repeat className="h-6 w-6" />
                      {repeatMode === 'one' && (
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-orange-400 to-pink-400 text-white rounded-full text-xs font-bold flex items-center justify-center border-2 border-white">1</span>
                      )}
                    </Button>
                  </div>

                  {/* Secondary Controls with Indian styling */}
                  <div className="flex items-center justify-between">
                    {/* Volume Control */}
                    <div className="flex items-center space-x-4 flex-1 max-w-xs">
                      <Volume2 className="h-6 w-6 text-orange-200" />
                      <Slider
                        value={[volume]}
                        onValueChange={handleVolumeChange}
                        max={100}
                        step={1}
                        className="flex-1 [&>span:first-child]:h-2 [&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-orange-200/30 [&>span:first-child]:to-green-200/30 [&>span:first-child]:rounded-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-orange-400 [&_[role=slider]]:to-green-400 [&_[role=slider]]:border-0 [&_[role=slider]]:w-5 [&_[role=slider]]:h-5 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-orange-400 [&>span:first-child>span]:to-green-400 [&>span:first-child>span]:rounded-full"
                      />
                      <span className="text-sm text-orange-100 w-16 text-center bg-gradient-to-r from-orange-500/30 to-green-500/30 px-3 py-2 rounded-full border border-orange-300/30 font-medium">
                        {volume}%
                      </span>
                    </div>

                    {/* Additional Controls */}
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400/20 to-red-400/20 text-pink-100 hover:from-pink-500/30 hover:to-red-500/30 hover:text-white transition-all duration-300 border border-pink-300/30"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 text-blue-100 hover:from-blue-500/30 hover:to-purple-500/30 hover:text-white transition-all duration-300 border border-blue-300/30"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced File Upload with Indian styling */}
              <Card className="bg-gradient-to-br from-orange-400/20 via-pink-400/20 via-purple-400/20 to-green-400/20 backdrop-blur-xl border-2 border-white/30 shadow-2xl shadow-rainbow-500/20">
                <CardContent className="p-8">
                  <div className="text-center">
                    <input
                      type="file"
                      multiple
                      accept="audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-orange-500 via-pink-500 via-purple-500 to-green-500 text-white rounded-3xl cursor-pointer hover:from-orange-600 hover:via-pink-600 hover:via-purple-600 hover:to-green-600 transition-all duration-300 shadow-lg shadow-rainbow-500/30 hover:shadow-xl hover:shadow-rainbow-500/50 hover:scale-105 border-2 border-white/30"
                    >
                      <Upload className="h-7 w-7 mr-4 group-hover:animate-bounce" />
                      <span className="text-xl font-bold">🎵 Upload Your Music 🎵</span>
                    </label>
                    <p className="text-orange-100 text-base mt-4 font-medium">
                      Drop your favorite tracks • सभी ऑडियो फॉर्मेट समर्थित • All formats supported 🌈
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Playlist Section */}
            <div className="xl:col-span-4">
              <Playlist
                songs={songs}
                currentSongIndex={currentSongIndex}
                onSongSelect={selectSong}
                onSongRemove={removeSong}
              />
            </div>
          </div>

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={currentSong?.url}
            preload="metadata"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
