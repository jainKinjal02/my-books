// src/components/ui/ReadingProgress.js
import React from 'react';
import { Clock, Calendar, Award, TrendingUp, BookOpen, BarChart } from 'lucide-react';

const ReadingProgress = ({ book }) => {
  // Calculate reading progress
  const progress = book.currentPage ? Math.min(100, Math.round((book.currentPage / book.pages) * 100)) : 0;
  
  // Sample reading data - in a real app, this would come from your backend
  const readingData = {
    started: "March 15, 2025",
    lastRead: "April 12, 2025",
    sessionsCompleted: 12,
    averageSession: "45 minutes",
    estimatedCompletion: "May 3, 2025",
    readingSpeed: "35 pages/hour",
    streak: 4, // days
  };
  
  // For books with reading in progress
  if (book.status === 'Reading') {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 transform transition-transform duration-500 hover:scale-[1.01] hover:bg-white/15">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-sky-400">
          <TrendingUp size={20} />
          <span>Your Reading Progress</span>
        </h2>
        
        {/* Progress Visualization */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-white/80">Progress</span>
            <span className="text-white font-semibold">{progress}%</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-white/60">
            <span>Page {book.currentPage || 0}</span>
            <span>of {book.pages}</span>
          </div>
        </div>
        
        {/* Reading Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3">
            <Calendar size={18} className="text-blue-400" />
            <div>
              <p className="text-xs text-white/60">Started Reading</p>
              <p className="text-sm text-white">{readingData.started}</p>
            </div>
          </div>
          
          <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3">
            <Clock size={18} className="text-green-400" />
            <div>
              <p className="text-xs text-white/60">Avg. Reading Session</p>
              <p className="text-sm text-white">{readingData.averageSession}</p>
            </div>
          </div>
          
          <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3">
            <BookOpen size={18} className="text-purple-400" />
            <div>
              <p className="text-xs text-white/60">Reading Speed</p>
              <p className="text-sm text-white">{readingData.readingSpeed}</p>
            </div>
          </div>
          
          <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3">
            <Award size={18} className="text-yellow-400" />
            <div>
              <p className="text-xs text-white/60">Current Streak</p>
              <p className="text-sm text-white">{readingData.streak} days</p>
            </div>
          </div>
        </div>
        
        {/* Reading Patterns */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-sky-400">Reading Patterns</h3>
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart size={18} className="text-indigo-400" />
                <span className="text-sm text-white/80">Your Favorite Reading Times</span>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-white/60 mb-1">{day}</div>
                  <div className="mx-auto w-5 h-12 bg-white/5 rounded-t-sm rounded-b-sm relative overflow-hidden">
                    <div 
                      className="absolute bottom-0 w-full bg-indigo-500/70"
                      style={{ height: `${[30, 45, 20, 60, 40, 80, 70][index]}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center text-xs text-white/60 mt-2">
              You read most on weekends
            </div>
          </div>
        </div>
        
        {/* Prediction */}
        <div className="bg-white/5 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={16} className="text-white/60" />
            <p className="text-sm text-white/80">At your current pace, you'll finish by</p>
          </div>
          <p className="text-lg font-semibold text-white">{readingData.estimatedCompletion}</p>
          <div className="mt-2 text-xs text-white/60">
            That's about {Math.round((new Date(readingData.estimatedCompletion) - new Date()) / (1000 * 60 * 60 * 24))} days from now
          </div>
        </div>
      </div>
    );
  }
  
  // For books not started yet
  if (book.status === 'To Read') {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-sky-400">
          <BookOpen size={20} />
          <span>Reading Journey</span>
        </h2>
        
        <div className="text-center py-8">
          <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
            <BookOpen size={36} className="text-white/70" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Ready to Begin Your Journey</h3>
          <p className="text-white/70 max-w-md mx-auto mb-6">
            Track your reading progress, set goals, and enjoy insights about your reading habits when you start this book.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Start Reading
          </button>
        </div>
        
        <div className="mt-6 bg-white/5 p-4 rounded-lg">
          <h3 className="text-md font-semibold mb-3 text-sky-400">Average Reading Time</h3>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-white/60" />
              <span className="text-sm text-white/80">Estimated time to complete</span>
            </div>
            <span className="text-white font-medium">~{Math.round(book.pages / 30)} hours</span>
          </div>
          <div className="text-xs text-white/50 mt-2">
            Based on your average reading speed of 30 pages per hour
          </div>
        </div>
      </div>
    );
  }
  
  // For completed books
  if (book.status === 'Read') {
    // Sample completion data
    const completionData = {
      completed: "February 23, 2025",
      daysToFinish: 14,
      totalReadingTime: "10 hours 23 minutes",
      sessions: 12,
    };
    
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-sky-400">
          <Award size={20} className="text-yellow-400" />
          <span>Reading Completed</span>
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 animate-pulse-slow opacity-30"></div>
              <div className="absolute inset-2 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <span className="block text-3xl font-bold text-yellow-400">100%</span>
                  <span className="text-xs text-white/70">Completed</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-3 w-full">
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="text-xs text-white/60">Completed On</p>
              <p className="text-sm text-white">{completionData.completed}</p>
            </div>
            
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="text-xs text-white/60">Days to Finish</p>
              <p className="text-sm text-white">{completionData.daysToFinish} days</p>
            </div>
            
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="text-xs text-white/60">Total Reading Time</p>
              <p className="text-sm text-white">{completionData.totalReadingTime}</p>
            </div>
            
            <div className="bg-white/5 p-3 rounded-lg">
              <p className="text-xs text-white/60">Reading Sessions</p>
              <p className="text-sm text-white">{completionData.sessions} sessions</p>
            </div>
          </div>
        </div>
        
        {/* Reading achievements */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-3 text-sky-400">Achievements</h3>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white/5 rounded-lg p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <Award size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Fast Reader</p>
                <p className="text-xs text-white/60">Finished 20% faster than average</p>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                <Calendar size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Consistent Reader</p>
                <p className="text-xs text-white/60">Read on 10 consecutive days</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Achievement or reflection prompt */}
        <div className="bg-white/5 p-4 rounded-lg text-center">
          <p className="text-white/80 mb-3">Would you like to share your thoughts on this book?</p>
          <button className="px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
            Write a Reflection
          </button>
        </div>
      </div>
    );
  }
  
  return null;
};

// Add this to handle the animation in the parent component
const animationStyle = `
  @keyframes pulse-slow {
    0%, 100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

export default ReadingProgress;