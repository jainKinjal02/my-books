import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Book, Clock, Check, Award, Search, Heart, PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';

const App = () => {
  // State for current view
  const [view, setView] = useState('landing');
  
  // State for books
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', status: 'Read', rating: 4, pages: 180, notes: 'A masterpiece of American literature' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', status: 'Reading', rating: 5, pages: 281, notes: 'Compelling story about justice and moral growth' },
    { id: 3, title: '1984', author: 'George Orwell', genre: 'Dystopian', status: 'To Read', rating: 0, pages: 328, notes: '' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', status: 'Read', rating: 4, pages: 279, notes: 'Witty romance with memorable characters' },
    { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', status: 'Read', rating: 5, pages: 310, notes: 'Amazing adventure fantasy' },
  ]);
  
  // Reading stats
  const [statistics, setStatistics] = useState({
    booksRead: 0,
    pagesRead: 0,
    currentlyReading: 0,
    toRead: 0,
    favoriteGenre: '',
  });
  const [pageTransitioning, setPageTransitioning] = useState(false);
  // UI State
  const [activeTab, setActiveTab] = useState('library');
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', status: 'To Read', rating: 0, pages: 0, notes: '' });
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const [isAscending, setIsAscending] = useState(true);
  const [showGenreStats, setShowGenreStats] = useState(false);
  const [landingHover, setLandingHover] = useState(false);
  
  // Calculate statistics
  useEffect(() => {
    const read = books.filter(book => book.status === 'Read').length;
    const reading = books.filter(book => book.status === 'Reading').length;
    const toRead = books.filter(book => book.status === 'To Read').length;
    const pagesRead = books
      .filter(book => book.status === 'Read')
      .reduce((sum, book) => sum + book.pages, 0);
    
    // Calculate favorite genre
    const genreCounts = {};
    books.forEach(book => {
      if (book.genre) {
        genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
      }
    });
    
    let favoriteGenre = '';
    let maxCount = 0;
    
    Object.keys(genreCounts).forEach(genre => {
      if (genreCounts[genre] > maxCount) {
        maxCount = genreCounts[genre];
        favoriteGenre = genre;
      }
    });
    
    setStatistics({
      booksRead: read,
      pagesRead,
      currentlyReading: reading,
      toRead,
      favoriteGenre
    });
  }, [books]);
  
  // Add new book
  const handleAddBook = () => {
    if (newBook.title && newBook.author) {
      setBooks([...books, { ...newBook, id: books.length + 1 }]);
      setNewBook({ title: '', author: '', genre: '', status: 'To Read', rating: 0, pages: 0, notes: '' });
      setShowAddForm(false);
    }
  };
  const handleViewChange = (newView) => {
    setPageTransitioning(true);
    setTimeout(() => {
      setView(newView);
      setPageTransitioning(false);
    }, 500);
  };
  
  // Filter and sort books
  const filteredBooks = books
    .filter(book => filterStatus === 'All' || book.status === filterStatus)
    .filter(book => 
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.genre.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return isAscending 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      }
      
      return isAscending 
        ? valA - valB 
        : valB - valA;
    });
  
  // Get genre stats for visualization
  const genreStats = books.reduce((stats, book) => {
    if (book.genre) {
      stats[book.genre] = (stats[book.genre] || 0) + 1;
    }
    return stats;
  }, {});
  
  // Create a color map for genres
  const genreColors = {
    Classic: '#8884d8',
    Fiction: '#82ca9d',
    Dystopian: '#ffc658',
    Romance: '#ff8042',
    Fantasy: '#0088fe',
    Mystery: '#00C49F',
    'Sci-Fi': '#FFBB28',
    Biography: '#FF8042',
  };
  
  // Rating component
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`text-xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
        ))}
      </div>
    );
  };

// Add this component
const AnimatedRatingStars = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span 
          key={star} 
          className={`text-xl star-animation ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          style={{ '--star-index': star }}
        >
          ★
        </span>
      ))}
    </div>
  );
};
  
  // Book card with animation
// Replace your BookCard component with this enhanced version
const BookCard = ({ book }) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div 
      className="book-card bg-white rounded-lg overflow-hidden shadow-lg mb-4 transition-all duration-500"
      style={{ 
        transform: expanded ? 'scale(1.02)' : isHovering ? 'translateY(-8px)' : 'scale(1)',
        borderLeft: `4px solid ${genreColors[book.genre] || '#ccc'}`,
        boxShadow: isHovering ? '0 15px 30px rgba(0,0,0,0.1)' : '',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="corner-fold p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-1">{book.title}</h3>
            <p className="text-gray-700 mb-2">by {book.author}</p>
            <div className="flex items-center mb-2">
              <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                {book.genre}
              </span>
              <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                book.status === 'Read' ? 'bg-green-100 text-green-800' : 
                book.status === 'Reading' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-purple-100 text-purple-800'
              }`}>
                {book.status}
              </span>
            </div>
            {book.status === 'Read' && <AnimatedRatingStars rating={book.rating} />}
          </div>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        
        {expanded && (
          <div className="mt-3 pt-3 border-t border-gray-200 animate-fadeIn">
            <p className="text-gray-600 mb-2"><span className="font-semibold">Pages:</span> {book.pages}</p>
            {book.notes && <p className="text-gray-600"><span className="font-semibold">Notes:</span> {book.notes}</p>}
            <div className="mt-3 flex space-x-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition">
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
  

// Enhanced StatCard component
const StatCard = ({ icon, title, value, color }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-lg p-4 shadow-md flex items-center space-x-4 overflow-hidden relative transition-all duration-300"
      style={{
        transform: isHovering ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: isHovering ? '0 10px 25px rgba(0,0,0,0.1)' : ''
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={`p-3 rounded-full ${color} transition-all duration-300`} style={{
        transform: isHovering ? 'scale(1.1)' : 'scale(1)'
      }}>
        {icon}
      </div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div 
        className="absolute -right-6 -bottom-6 opacity-10 transition-all duration-300" 
        style={{ 
          opacity: isHovering ? '0.2' : '0.1',
          transform: isHovering ? 'scale(1.2)' : 'scale(1)'
        }}
      >
        {React.cloneElement(icon, { size: 80 })}
      </div>
    </div>
  );
};
  // Landing Page Component with animated background carousel
  const LandingPage = () => {
    // State for background image carousel
    const [currentBgIndex, setCurrentBgIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    // Background images - replace with your actual image paths
    const backgroundImages = [
      "/images/bg-photo-3.jpg", // Library shelves
      "/images/bg-photo-1.jpg", // Closeup of open book
      "/images/bg-photo-2.jpg", // Reading nook
      "/images/bg-photo.jpg"  // Library entrance
    ];
    
    // Effect for image carousel
    useEffect(() => {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 500);
        }, 1000);
      }, 2000); // Change image every 8 seconds
      
      return () => clearInterval(interval);
    }, []);
    
    return (
      <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
        {/* Background images with zoom/fade transitions */}
        {backgroundImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-2000 ease-in-out
              ${currentBgIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
            style={{ 
              backgroundImage: `url('${img}')`,
              filter: "brightness(0.6)",
              transitionProperty: "opacity, transform",
              zIndex: currentBgIndex === index ? 1 : 0,
              transform: isTransitioning && currentBgIndex === index ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        ))}
        
        {/* Radial gradient overlay */}
        <div 
          className="absolute inset-0 z-[2]"
          style={{ 
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)'
          }}
        />
        
        {/* Floating book elements (decorative) */}
        {/* <div className="absolute inset-0 z-[3] overflow-hidden">
          <div className="book-float-1 absolute -left-10 top-1/4 text-white opacity-20">
            <BookOpen size={80} />
          </div>
          <div className="book-float-2 absolute right-20 top-1/3 text-white opacity-10">
            <Book size={120} />
          </div>
          <div className="book-float-3 absolute left-1/4 bottom-1/4 text-white opacity-15">
            <Book size={60} />
          </div>
        </div> */}
        
        {/* Content container */}
        <div 
          className={`z-10 text-center transition-all duration-700 ${
            landingHover ? "scale-110" : "scale-100"
          }`}
          onMouseEnter={() => setLandingHover(true)}
          onMouseLeave={() => setLandingHover(false)}
          onClick={() => handleViewChange('dashboard')}
          style={{ cursor: 'pointer' }}
        >
          <div className="animate-float relative p-10">
            {/* Subtle glow effect behind text */}
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-3xl blur-xl -z-10 animate-pulse-slow"></div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wider drop-shadow-lg font-playfair">
              Welcome to My Library
            </h1>
            
            <div className="flex items-center justify-center">
              <div className="h-0.5 w-16 bg-white opacity-70"></div>
              <BookOpen size={36} className="mx-4 text-white" />
              <div className="h-0.5 w-16 bg-white opacity-70"></div>
            </div>
            
            <p className="text-xl text-white mt-6 drop-shadow-md max-w-xl mx-auto font-libre">
              Discover your reading journey and track your literary adventures
            </p>
            
            <div className={`mt-10 transition-all duration-500 ${
              landingHover ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
            }`}>
              <span className="px-8 py-3 bg-white text-blue-900 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-xl animate-pulse-slow">
                Enter Library
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Main Dashboard (original app)
  const Dashboard = () => {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
                <div 
          className="fixed inset-0 z-0 bg-cover bg-center opacity-10"
          style={{ 
            backgroundImage: "url('/images/rey-seven-_nm_mZ4Cs2I-unsplash.jpg')"
          }}
        ></div>
        {/* Header/Nav */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
          <div className="container mx-auto py-4 px-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <BookOpen size={32} className="mr-2" />
                <h1 className="text-2xl font-bold">My Reading Journey</h1>
              </div>
            </div>
          </div>
        </header>
        
        {/* Background Image - Positioned with opacity */}

        
        {/* Main Content */}
        <main className="flex-grow container mx-auto p-6 z-10">
          {activeTab === 'library' && (
            <div className="space-y-6">
              {/* Top Controls */}
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="All">All Books</option>
                    <option value="Read">Read</option>
                    <option value="Reading">Currently Reading</option>
                    <option value="To Read">To Read</option>
                  </select>
                  
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="title">Sort by Title</option>
                    <option value="author">Sort by Author</option>
                    <option value="genre">Sort by Genre</option>
                    <option value="rating">Sort by Rating</option>
                  </select>
                  
                  <button 
                    onClick={() => setIsAscending(!isAscending)}
                    className="px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    {isAscending ? "↑ Asc" : "↓ Desc"}
                  </button>
                  
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <PlusCircle size={18} className="mr-1" /> Add Book
                  </button>
                </div>
              </div>
              
              {/* Add Book Form */}
              {showAddForm && (
                <div className="bg-white p-6 rounded-lg shadow-lg animate-fadeIn">
                  <h2 className="text-xl font-bold mb-4">Add New Book</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Title *</label>
                      <input
                        type="text"
                        value={newBook.title}
                        onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter book title"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Author *</label>
                      <input
                        type="text"
                        value={newBook.author}
                        onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter author name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Genre</label>
                      <select
                        value={newBook.genre}
                        onChange={(e) => setNewBook({...newBook, genre: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a genre</option>
                        <option value="Classic">Classic</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Biography">Biography</option>
                        <option value="Dystopian">Dystopian</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Status</label>
                      <select
                        value={newBook.status}
                        onChange={(e) => setNewBook({...newBook, status: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="To Read">To Read</option>
                        <option value="Reading">Currently Reading</option>
                        <option value="Read">Read</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Pages</label>
                      <input
                        type="number"
                        value={newBook.pages}
                        onChange={(e) => setNewBook({...newBook, pages: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Number of pages"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Rating (if read)</label>
                      <select
                        value={newBook.rating}
                        onChange={(e) => setNewBook({...newBook, rating: parseInt(e.target.value)})}
                        disabled={newBook.status !== 'Read'}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="0">Not rated</option>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Notes</label>
                    <textarea
                      value={newBook.notes}
                      onChange={(e) => setNewBook({...newBook, notes: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add your thoughts about this book"
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddBook}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Add Book
                    </button>
                  </div>
                </div>
              )}
              
              {/* Book List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
                
                {filteredBooks.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-gray-500 text-lg">No books found. Try adjusting your filters or add a new book.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'stats' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6">Reading Statistics</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard 
                  icon={<Book size={24} className="text-white" />}
                  title="Books Read"
                  value={statistics.booksRead}
                  color="bg-blue-500"
                />
                <StatCard 
                  icon={<Clock size={24} className="text-white" />}
                  title="Currently Reading"
                  value={statistics.currentlyReading}
                  color="bg-yellow-500"
                />
                <StatCard 
                  icon={<Check size={24} className="text-white" />}
                  title="To Read"
                  value={statistics.toRead}
                  color="bg-purple-500"
                />
                <StatCard 
                  icon={<Award size={24} className="text-white" />}
                  title="Pages Read"
                  value={statistics.pagesRead}
                  color="bg-green-500"
                />
              </div>
              
              {/* Genre Distribution */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Genre Distribution</h3>
                  <button 
                    onClick={() => setShowGenreStats(!showGenreStats)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    {showGenreStats ? 'Hide' : 'Show'} Details
                  </button>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex mb-2 h-4 overflow-hidden rounded-full">
                    {Object.keys(genreStats).map((genre, index) => {
                      const percentage = (genreStats[genre] / books.length) * 100;
                      return (
                        <div
                          key={genre}
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: genreColors[genre] || '#ccc',
                          }}
                          className="transition-all duration-500"
                          title={`${genre}: ${genreStats[genre]} books (${percentage.toFixed(1)}%)`}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                
                {showGenreStats && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 animate-fadeIn">
                    {Object.keys(genreStats).map(genre => (
                      <div key={genre} className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: genreColors[genre] || '#ccc' }}
                        ></div>
                        <div>
                          <span className="font-medium">{genre}:</span> {genreStats[genre]} books
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Reading Progress */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4">Reading Progress</h3>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Goal: 20 books this year</span>
                    <span className="text-sm font-medium">{statistics.booksRead}/20 ({(statistics.booksRead/20*100).toFixed(0)}%)</span>
                  </div>
                  <div className="flex h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.min(statistics.booksRead/20*100, 100)}%` }}
                      className="bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-1000"
                    ></div>
                  </div>
                </div>
              </div>

              {/* Reading Habits */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4">Reading Insights</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-700">Favorite Genre</h4>
                    <p className="text-blue-800">
                      {statistics.favoriteGenre ? `You seem to enjoy ${statistics.favoriteGenre} books the most!` : 'Add more books to see your favorite genre'}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-md border-l-4 border-green-500">
                    <h4 className="font-bold text-green-700">Reading Pace</h4>
                    <p className="text-green-800">
                      {statistics.booksRead > 0 
                        ? `You've read an average of ${Math.round(statistics.pagesRead / statistics.booksRead)} pages per book.`
                        : 'Start reading to track your pace!'}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-md border-l-4 border-purple-500">
                    <h4 className="font-bold text-purple-700">To Read List</h4>
                    <p className="text-purple-800">
                      {statistics.toRead > 0 
                        ? `You have ${statistics.toRead} books waiting to be discovered.`
                        : 'Your to-read list is empty. Time to add some new books!'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto px-6 text-center">
            <p>My Reading Journey - Track your books and reading habits</p>
            <div className="mt-2 flex justify-center space-x-4">
              <Heart size={16} className="text-red-400" /> 
              <span>Made with love for book enthusiasts</span>
            </div>
          </div>
        </footer>
      </div>
    );
  };
  
  // Main App Rendering
  return (
    <>
      {view === 'landing' ? <LandingPage /> : <Dashboard />}
    </>
  );
};

// Custom Chart component
const Chart = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
      <path d="m6 15 3-3 3 3 4-4 2 2" />
    </svg>
  );
};

// Add some CSS animations
const globalStyles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes pulse-slow {
  0% { opacity: 0.9; }
  50% { opacity: 1; }
  100% { opacity: 0.9; }
}

@keyframes book-float-1 {
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(20px, -15px) rotate(5deg); }
  66% { transform: translate(-10px, 20px) rotate(-3deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

@keyframes book-float-2 {
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-25px, 15px) rotate(-8deg); }
  66% { transform: translate(15px, -20px) rotate(5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

@keyframes book-float-3 {
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(15px, 10px) rotate(3deg); }
  66% { transform: translate(-15px, -15px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.book-float-1 {
  animation: book-float-1 20s ease-in-out infinite;
}

.book-float-2 {
  animation: book-float-2 25s ease-in-out infinite;
}

.book-float-3 {
  animation: book-float-3 18s ease-in-out infinite;
}

.duration-2000 {
  transition-duration: 2000ms;
}

/* Custom fonts */
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@400;500;600;700&display=swap');

.font-playfair {
  font-family: 'Playfair Display', serif;
}

.font-libre {
  font-family: 'Libre Baskerville', serif;
}
`;

// Add the styles to the document
const style = document.createElement('style');
style.innerHTML = globalStyles;
document.head.appendChild(style);

export default App;