// BookDetailView.js
// This is a simple placeholder component - we'll enhance it in the next step
import React from 'react';
import { ArrowLeft } from 'lucide-react';

const BookDetailView = ({ book, onClose }) => {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header with back button */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-black/30 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Library</span>
          </button>
        </div>
      </div>
      
      {/* Basic book info - to be expanded later */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Book cover */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-xl">
              <img 
                src={getBookCover()} 
                alt={book.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/images/bg-photo.jpg';
                }}
              />
            </div>
          </div>
          
          {/* Book details */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
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
              <div className="bg-white/10 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-3">Your Notes</h2>
                <p className="text-white/90">{book.notes}</p>
              </div>
            )}
            
            <div className="text-center md:text-left">
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