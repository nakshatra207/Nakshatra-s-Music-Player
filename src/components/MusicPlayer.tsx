
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header with Logo */}
          <div className="text-center mb-12 pt-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-2xl shadow-purple-500/25">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-3">
              Rhythm Flow
            </h1>
            <p className="text-xl text-gray-300 font-light">Supreme Audio Experience</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Main Player Section */}
            <div className="xl:col-span-8 space-y-8">
              {/* Song Information Display */}
              <SongInfo song={currentSong} />

              {/* Enhanced Player Controls */}
              <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                <CardContent className="p-8">
                  {/* Progress Bar with Enhanced Styling */}
                  <div className="mb-8">
                    <div className="relative">
                      <Slider
                        value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
                        onValueChange={handleSeek}
                        max={100}
                        step={0.1}
                        className="w-full [&>span:first-child]:h-2 [&>span:first-child]:bg-white/10 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-500 [&_[role=slider]]:to-pink-500 [&_[role=slider]]:border-0 [&_[role=slider]]:w-5 [&_[role=slider]]:h-5 [&_[role=slider]]:shadow-lg [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-purple-500 [&>span:first-child>span]:to-pink-500"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mt-3 font-medium">
                      <span className="bg-white/5 px-3 py-1 rounded-full">{formatTime(currentTime)}</span>
                      <span className="bg-white/5 px-3 py-1 rounded-full">{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Main Control Buttons with Enhanced Design */}
                  <div className="flex items-center justify-center space-x-6 mb-8">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setIsShuffled(!isShuffled)}
                      className={`w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 ${
                        isShuffled 
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      <Shuffle className="h-5 w-5" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={previousSong}
                      disabled={songs.length === 0}
                      className="w-16 h-16 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 disabled:opacity-30"
                    >
                      <SkipBack className="h-6 w-6" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={togglePlayPause}
                      disabled={!currentSong}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/40 hover:shadow-3xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
                    >
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                    </Button>

                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={nextSong}
                      disabled={songs.length === 0}
                      className="w-16 h-16 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 disabled:opacity-30"
                    >
                      <SkipForward className="h-6 w-6" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => setRepeatMode(
                        repeatMode === 'none' ? 'all' : 
                        repeatMode === 'all' ? 'one' : 'none'
                      )}
                      className={`w-14 h-14 rounded-full transition-all duration-300 hover:scale-110 relative ${
                        repeatMode !== 'none' 
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      <Repeat className="h-5 w-5" />
                      {repeatMode === 'one' && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-purple-500 rounded-full text-xs font-bold flex items-center justify-center">1</span>
                      )}
                    </Button>
                  </div>

                  {/* Secondary Controls */}
                  <div className="flex items-center justify-between">
                    {/* Volume Control */}
                    <div className="flex items-center space-x-4 flex-1 max-w-xs">
                      <Volume2 className="h-5 w-5 text-gray-400" />
                      <Slider
                        value={[volume]}
                        onValueChange={handleVolumeChange}
                        max={100}
                        step={1}
                        className="flex-1 [&>span:first-child]:h-2 [&>span:first-child]:bg-white/10 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-500 [&_[role=slider]]:to-pink-500 [&_[role=slider]]:border-0 [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-purple-500 [&>span:first-child>span]:to-pink-500"
                      />
                      <span className="text-sm text-gray-400 w-12 text-center bg-white/5 px-2 py-1 rounded-full">{volume}%</span>
                    </div>

                    {/* Additional Controls */}
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-10 h-10 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-10 h-10 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced File Upload */}
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 shadow-2xl shadow-purple-500/10">
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
                      className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl cursor-pointer hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
                    >
                      <Upload className="h-6 w-6 mr-3 group-hover:animate-bounce" />
                      <span className="text-lg font-semibold">Upload Your Music</span>
                    </label>
                    <p className="text-gray-400 text-sm mt-4 font-medium">
                      Drop your favorite tracks • Supports MP3, MP4, WAV, OGG, FLAC & more
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
