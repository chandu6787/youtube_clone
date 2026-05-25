import { useState, useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/configSlice";
import { useNavigate } from "react-router-dom";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null); // ref for the whole search area
  const navigate = useNavigate();

  // ── Fetch suggestions ──────────────────────────────────────────────────────
  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const response = await fetch(
          `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(
            searchQuery
          )}`
        );
        const data = await response.json();
        const results = data[1] || [];
        setSuggestions(results);
        dispatch(cacheResults({ [searchQuery]: results }));
      } catch (error) {
        console.error(error);
      }
    };

    const id = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setSuggestions([]);
        return;
      }
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchResults();
      }
    }, 200);

    return () => clearTimeout(id);
  }, [searchQuery, searchCache, dispatch]);

  // ── Close suggestions when tapping/clicking OUTSIDE the search container ──
  // This is the reliable cross-device alternative to onBlur
  useEffect(() => {
    const handleOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    // Both mouse (desktop) and touch (mobile) events
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  // ── Hide on scroll ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setShowSuggestions(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectSuggestion = (item) => {
    setSearchQuery(item);
    setShowSuggestions(false);
    navigate(`/?q=${encodeURIComponent(item)}`);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleToggleMenu = () => dispatch(toggleMenu());

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center shadow px-2 py-1">
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={handleToggleMenu}>
        <GiHamburgerMenu size={24} className="ml-2" />
        <img
          src="https://tse1.mm.bing.net/th/id/OIP.sCtdNjphAin-gugu0MNptAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="youtube-logo"
          className="h-10 ml-3 hidden sm:block"
        />
      </div>

      {/* Search — entire area is ref'd for outside-click detection */}
      <div ref={searchContainerRef} className="px-4 py-2 relative">
        <div className="flex">
          <input
            type="text"
            className="border border-gray-400 w-full rounded-l-full p-2 text-sm"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true); // show as user types
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            // NO onBlur — outside-click handler covers this reliably on all devices
          />
          <button
            className="border border-gray-400 rounded-r-full px-3 py-2 bg-white"
            onMouseDown={(e) => {
              e.preventDefault(); // keep focus on input
              handleSearch();
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <FiSearch size={20} />
          </button>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 bg-white left-4 right-4 rounded-lg shadow-lg overflow-hidden">
            <ul>
              {suggestions.map((item, i) => (
                <li
                  key={i}
                  // onMouseDown for desktop (fires before any blur)
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectSuggestion(item);
                  }}
                  // onTouchEnd for mobile (most reliable touch event)
                  onTouchEnd={(e) => {
                    e.preventDefault(); // block the ghost mouse click
                    handleSelectSuggestion(item);
                  }}
                  className="flex w-full hover:bg-gray-200 active:bg-gray-300 items-center p-3 cursor-pointer"
                >
                  <FiSearch size={16} className="shrink-0 text-gray-400" />
                  <span className="py-1 pl-2 text-sm truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* User icon */}
      <div className="flex items-center pr-2">
        <FaUserCircle size={24} />
      </div>
    </div>
  );
};

export default Head;