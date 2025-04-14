// BookDetailView.js with teal-blue animated gradient background
import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Heart, Share2, Bookmark, Download, Quote, Camera, Plus, X } from 'lucide-react';

const BookDetailView = ({ book, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeTab, setActiveTab] = useState('quotes'); // 'quotes' or 'photos'
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

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

  // Mock data for quotes and photos - in a real app these would come from your backend
  const sampleQuotes = book.quotes || [
    { id: 1, text: "It is our choices that show what we truly are, far more than our abilities.", page: 333 },
    { id: 2, text: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.", page: 427 },
    { id: 3, text: "The truth is a beautiful and terrible thing, and should therefore be treated with great caution.", page: 298 }
  ];

  const samplePhotos = book.photos || [
    { id: 1, url: "/images/quotes/IMG_9902.jpeg", caption: "Beautiful passage on page 63" },
    { id: 2, url: "/images/quotes/IMG_9903.jpeg", caption: "those looking for love" },
    { id: 3, url: "/images/quotes/IMG_9904.jpeg", caption: "My favorite scene described on page 156" }
  ];

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
            
            {/* New Quotes & Photos Sections */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex mb-6 border-b border-white/20">
                <button
                  className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                    activeTab === 'quotes' 
                      ? 'text-white border-b-2 border-white font-semibold' 
                      : 'text-white/60 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('quotes')}
                >
                  <Quote size={18} />
                  <span>Quote Collection</span>
                </button>
                <button
                  className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                    activeTab === 'photos' 
                      ? 'text-white border-b-2 border-white font-semibold' 
                      : 'text-white/60 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('photos')}
                >
                  <Camera size={18} />
                  <span>Book Photos</span>
                </button>
              </div>
              
              {/* Tab Content */}
              <div className="relative">
                {/* Quotes Tab */}
                <div className={`transition-all duration-300 ${
                  activeTab === 'quotes' ? 'opacity-100 translate-y-0' : 'opacity-0 absolute translate-y-4 pointer-events-none'
                }`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Memorable Quotes</h3>
                    <button 
                      onClick={() => setShowQuoteModal(true)}
                      className="bg-white/20 hover:bg-white/30 transition-colors text-white text-sm rounded-lg px-3 py-1 flex items-center gap-1"
                    >
                      <Plus size={16} />
                      <span>Add Quote</span>
                    </button>
                  </div>
                  
                  {sampleQuotes.length > 0 ? (
                    <div className="space-y-4">
                      {sampleQuotes.map(quote => (
                        <div key={quote.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                          <blockquote className="text-white/90 italic mb-2">"{quote.text}"</blockquote>
                          <div className="text-sm text-white/60">Page {quote.page}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/70 text-center py-6">
                      You haven't saved any quotes from this book yet.
                    </p>
                  )}
                </div>
                
                {/* Photos Tab */}
                <div className={`transition-all duration-300 ${
                  activeTab === 'photos' ? 'opacity-100 translate-y-0' : 'opacity-0 absolute translate-y-4 pointer-events-none'
                }`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Book Photos</h3>
                    <button 
                      onClick={() => setShowPhotoModal(true)}
                      className="bg-white/20 hover:bg-white/30 transition-colors text-white text-sm rounded-lg px-3 py-1 flex items-center gap-1"
                    >
                      <Plus size={16} />
                      <span>Add Photo</span>
                    </button>
                  </div>
                  
                  {samplePhotos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {samplePhotos.map(photo => (
                        <div key={photo.id} className="bg-white/5 rounded-lg overflow-hidden group hover:bg-white/10 transition-colors">
                          <div className="aspect-video relative">
                            <img 
                              src={photo.url} 
                              alt={photo.caption || "Book photo"} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                          <div className="p-3">
                            <p className="text-sm text-white/90">{photo.caption}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/70 text-center py-6">
                      You haven't added any photos from this book yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* <div className="text-center md:text-left p-6 bg-white/5 backdrop-blur-sm rounded-lg">
              <p className="text-lg text-white/70 italic">
                This is a placeholder for the full book detail view. 
                More features coming soon!
              </p>
            </div> */}
          </div>
        </div>
      </div>
      
      {/* Add Photo Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Add New Book Photo</h3>
              <button 
                onClick={() => setShowPhotoModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Upload Photo</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Camera size={36} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG or WEBP (max. 5MB)</p>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Caption</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="What's this photo about?"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowPhotoModal(false)}
                  className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 rounded-lg text-white">
                  Add Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Add New Quote</h3>
              <button 
                onClick={() => setShowQuoteModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Quote Text</label>
                <textarea
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white h-32"
                  placeholder="Type the quote here..."
                ></textarea>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Page Number</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="123"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowQuoteModal(false)}
                  className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 rounded-lg text-white">
                  Save Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailView;