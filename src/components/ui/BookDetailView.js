// BookDetailView.js with teal-blue animated gradient background
import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Heart, Share2, Bookmark, Download } from 'lucide-react';

const BookDetailView = ({ book, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Animation effect on component mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Simple function to get book cover image
  const getBookCover = () => {
    const bookCovers = {
      'The Magic': '/images/books/theMagic.png',
      'I Too Had A Love Story': '/images/books/tooHadALoveStory.png',
      'The Immortals Of Meluha': '/images/books/meluha.png',
      'Too Good To Be True': '/images/books/goosTooBeTrue.png',
      'The Spanish Love Deception': '/images/books/loveDeception.png',
      'The American Room Experiment': 'images/books/americanRoomExp.png',
      'The Great Gatsby': '/images/books/theGreatGatsby.png',
      'To Kill a Mockingbird': '/images/books/mockingBird.png',
      '1984': '/images/books/1984.png',
      'Pride and Prejudice': '/images/books/pride&Prejudice.png',
      'The Hobbit': '/images/books/TheHobbit.png',
      // Default fallback
      'default': '/images/bg-photo.jpg'
    };
    
    return book.coverUrl || bookCovers[book.title] || bookCovers.default;
  };

  // Make sure we have a book
  if (!book) return <div>No book selected</div>;

  return (
    <div className={`min-h-screen relative transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Teal-Blue Animated Gradient Background */}
      <div className="fixed inset-0 z-0 teal-blue-gradient"></div>
      
      {/* Header with back button */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-black/30 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Library</span>
            </button>
            
            {/* Action buttons */}
            <div className="flex gap-3">
              <button className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all">
                <Heart size={18} className="text-white/80" />
              </button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all">
                <Bookmark size={18} className="text-white/80" />
              </button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all">
                <Share2 size={18} className="text-white/80" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Basic book info - to be expanded later */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Book cover with animation */}
          <div className="w-full md:w-1/3 lg:w-1/4 perspective-1000">
            <div 
              className={`book-cover relative transition-all duration-500 transform-3d preserve-3d 
                ${isHovering ? 'rotate-y-10 scale-105 shadow-2xl' : 'rotate-y-0 shadow-xl'}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Front cover */}
              <div className="aspect-[2/3] rounded-lg overflow-hidden bg-black/50 absolute inset-0 backface-hidden">
                <img 
                  src={getBookCover()} 
                  alt={book.title} 
                  className="w-full h-full object-cover transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/images/bg-photo.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              {/* 3D edge effect */}
              <div className={`absolute top-0 bottom-0 right-0 w-4 bg-gray-300 transform rotate-y-90 origin-right shadow-inner transition-all duration-500
                ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
              </div>
            </div>
          </div>
          
          {/* Book details */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">{book.title}</h1>
            <p className="text-xl text-white/80 mb-6">by {book.author}</p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-block bg-yellow-400/80 text-black rounded-full px-3 py-1 text-sm font-semibold">
                {book.genre}
              </span>
              <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                book.status === 'Read' ? 'bg-green-500/80 text-white' :
                book.status === 'Reading' ? 'bg-blue-500/80 text-white' :
                'bg-purple-500/80 text-white'
              }`}>
                {book.status}
              </span>
              <span className="inline-block bg-gray-500/80 text-white rounded-full px-3 py-1 text-sm font-semibold">
                {book.pages} pages
              </span>
            </div>
            
            {book.status === 'Read' && (
              <div className="flex mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-2xl ${star <= book.rating ? 'text-yellow-400' : 'text-gray-400/50'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            )}
            
            {book.notes && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 transform transition-transform duration-500 hover:scale-[1.01] hover:bg-white/15">
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <BookOpen size={20} />
                  <span>Your Notes</span>
                </h2>
                <p className="text-white/90">{book.notes}</p>
              </div>
            )}
            
            <div className="text-center md:text-left p-6 bg-white/5 backdrop-blur-sm rounded-lg">
              <p className="text-lg text-white/70 italic">
                This is a placeholder for the full book detail view. 
                More features coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailView;