import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BookOpen, Book, Clock, Check, Award, Search, Heart, PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';
import BookDetailView from './components/ui/BookDetailView';

const App = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  // State for current view
  const [view, setView] = useState('landing');

  // State for books
  const [books, setBooks] = useState([
    { id: 1, title: 'The Magic', author: 'Rhonda Byrne', genre: 'Classic', status: 'Read', rating: 4, pages: 180, notes: 'A masterpiece of American literature' },
    { id: 2, title: 'I Too Had A Love Story', author: 'Ravinder Singh', genre: 'Fiction', status: 'Read', rating: 3, pages: 380, notes: 'A masterpiece of American literature' },
    { id: 3, title: 'The Immortals Of Meluha', author: 'Amish Tripathi', genre: 'Classic', status: 'Read', rating: 4, pages: 380, notes: 'A masterpiece of American literature' },
    { id: 4, title: 'Too Good To Be True', author: 'Prajakta Koli', genre: 'Fiction', status: 'Read', rating: 3, pages: 280, notes: 'A masterpiece of American literature' },
    { id: 5, title: 'The Spanish Love Deception', author: 'Elena Armas', genre: 'Fiction', status: 'Read', rating: 4, pages: 340, notes: 'A masterpiece of American literature' },
    { id: 6, title: 'The American Room Experiment', author: 'Elena Armas', genre: 'Fiction', status: 'Reading', rating: 5, pages: 150, notes: 'A masterpiece of American literature' },

    { id: 7, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', status: 'Read', rating: 4, pages: 180, notes: 'A masterpiece of American literature' },
    { id: 8, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', status: 'Reading', rating: 5, pages: 281, notes: 'Compelling story about justice and moral growth' },
    { id: 9, title: '1984', author: 'George Orwell', genre: 'Dystopian', status: 'To Read', rating: 0, pages: 328, notes: '' },
    { id: 10, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', status: 'Read', rating: 4, pages: 279, notes: 'Witty romance with memorable characters' },
    { id: 11, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', status: 'Read', rating: 5, pages: 310, notes: 'Amazing adventure fantasy' },
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
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    status: 'To Read',
    rating: 0,
    pages: 0,
    notes: '',
    coverUrl: ''
  });
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

  // Add this function to handle viewing book details
const handleViewBookDetails = (book) => {
  setSelectedBook(book);
  setView('bookDetail'); // Switch to book detail view
};

// Add this function to go back from book details to dashboard
const handleCloseBookDetails = () => {
  setSelectedBook(null);
  setView('dashboard');
};

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
                <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${book.status === 'Read' ? 'bg-green-100 text-green-800' :
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
          className={`z-10 text-center transition-all duration-700 ${landingHover ? "scale-110" : "scale-100"
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

            <div className={`mt-10 transition-all duration-500 ${landingHover ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
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
  const bgImage = "/images/rey-seven-_nm_mZ4Cs2I-unsplash.jpg";
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Show searching indicator immediately
    if (searchInput !== debouncedSearch) {
      setIsSearching(true);
    }

    // Debounce the search input
    const timerId = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setIsSearching(false);
    }, 300); // 300ms debounce time

    // Cleanup
    return () => clearTimeout(timerId);
  }, [searchInput, debouncedSearch]);

  const filteredBooks = useCallback(() => {
    return books
      .filter(book => filterStatus === 'All' || book.status === filterStatus)
      .filter(book =>
        book.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        book.author.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        book.genre.toLowerCase().includes(debouncedSearch.toLowerCase())
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
  }, [books, filterStatus, debouncedSearch, sortBy, isAscending]);

  const booksToDisplay = filteredBooks();

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: '0.9'
        }}>
      </div>
      <div className="relative z-10 flex flex-col h-screen">
        {/* Fixed Header */}
        <header className="backdrop-blur-md bg-black/30 text-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto py-4 px-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => handleViewChange('landing')}
                  className="mr-3 p-2 rounded-full hover:bg-white/10 transition-all duration-300"
                  title="Back to welcome page"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 hover:-translate-x-1"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <h1 className="text-3xl font-bold font-playfair">My Reading Journey</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Fixed Filters Row */}
        <div className= "sticky top-[73px] z-40 py-4 border-white/10">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[150px]">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/30 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="All">All Books</option>
                  <option value="Read">Read</option>
                  <option value="Reading">Currently Reading</option>
                  <option value="To Read">To Read</option>
                </select>
              </div>

              <div className="flex-1 min-w-[150px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/30 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="title">Sort by Title</option>
                  <option value="author">Sort by Author</option>
                  <option value="genre">Sort by Genre</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
                  <input
                    type="text"
                    placeholder="Find your fav.."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/30 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin h-4 w-4 border-2 border-white/50 rounded-full border-t-transparent"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Add Book button */}
              <div className="flex-0">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="h-full px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-all shadow-lg hover:shadow-blue-500/30 flex items-center space-x-2 whitespace-nowrap"
                >
                  <PlusCircle size={18} /> <span>Add Book</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Book Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {booksToDisplay.map((book) => (
                <VisualBookCard     
                key={book.id} 
                book={book} 
                onViewDetails={handleViewBookDetails} />
              ))}

              {booksToDisplay.length === 0 && (
                <div className="col-span-full text-center py-12 bg-black/30 backdrop-blur-md rounded-lg text-white">
                  <p className="text-white/80 text-lg">
                    {debouncedSearch
                      ? `No books found matching "${debouncedSearch}". Try adjusting your search.`
                      : "No books found. Try adjusting your filters or add a new book."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Book Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fadeIn">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Add New Book</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              {/* Add Book Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter book title"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Author *</label>
                  <input
                    type="text"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter author name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Cover Image URL</label>
                  <input
                    type="text"
                    value={newBook.coverUrl || ''}
                    onChange={(e) => setNewBook({ ...newBook, coverUrl: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/book-cover.jpg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Genre</label>
                  <select
                    value={newBook.genre}
                    onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
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
                    onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}
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
                    onChange={(e) => setNewBook({ ...newBook, pages: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Number of pages"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Rating (if read)</label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewBook({ ...newBook, rating: star })}
                        className={`text-2xl focus:outline-none ${star <= newBook.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        disabled={newBook.status !== 'Read'}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-full mb-4">
                <label className="block text-gray-700 mb-2">Notes</label>
                <textarea
                  value={newBook.notes}
                  onChange={(e) => setNewBook({ ...newBook, notes: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add your thoughts about this book"
                  rows="3"
                ></textarea>
              </div>
              
              {/* Add Save Button */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleAddBook}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Save Book
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


const VisualBookCard = ({ book, onViewDetails }) => {
  // Map of book covers - in a real app, you'd store these with your book data
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
    // Add default cover as fallback
    'default': '/images/bg-photo.jpg'
  };

  // Get book cover or fallback to default
  const coverImage = book.coverUrl || bookCovers[book.title] || bookCovers.default;

  return (
    <div 
      className="book-card rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative group cursor-pointer"
      onClick={() => onViewDetails(book)}
    >
      {/* Book Cover Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={coverImage}
          alt={book.title}
          className="object-cover w-full h-full"
          onError={(e) => {
            e.target.src = bookCovers.default;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>

      {/* Book Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-2xl font-bold mb-1 drop-shadow-lg">{book.title}</h3>
        <p className="text-white/80 mb-2">by {book.author}</p>

        <div className="flex flex-wrap gap-2 mb-2">
          <span className="inline-block bg-yellow-400/80 text-black rounded-full px-3 py-1 text-sm font-semibold">
            {book.genre}
          </span>
          <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${book.status === 'Read' ? 'bg-green-500/80 text-white' :
            book.status === 'Reading' ? 'bg-blue-500/80 text-white' :
              'bg-purple-500/80 text-white'
            }`}>
            {book.status}
          </span>
        </div>

        {book.status === 'Read' && (
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-xl star-animation ${star <= book.rating ? 'text-yellow-400' : 'text-gray-400/50'}`}
                style={{ '--star-index': star }}
              >
                ★
              </span>
            ))}
          </div>
        )}
      </div>

      {/* View Details Indicator - shows on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
  <div className="bg-black/50 text-white px-4 py-2 border border-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
    <span className="text-xs tracking-widest font-light">EXPLORE</span>
  </div>
</div>
    </div>
  );
};

  // Main App Rendering
  return (
    <>
          {view === 'landing' ? (
      <LandingPage />
    ) : view === 'bookDetail' ? (
      <BookDetailView 
        book={selectedBook} 
        onClose={handleCloseBookDetails} 
      />
    ) : (
      <Dashboard />
    )}
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