import { useState, useEffect } from "react";
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

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };
  const navigate = useNavigate();

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const response = await fetch(
          `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(
            searchQuery,
          )}`,
        );
        const data = await response.json();
        setSuggestions(data[1] || []);
        dispatch(cacheResults({ [searchQuery]: data[1] }));
      } catch (error) {
        console.error(error);
      }
    };

    const id = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchResults();
      }
    }, 200);

    return () => clearTimeout(id);
  }, [searchQuery, searchCache, dispatch]);

  // ✅ Hide suggestions on scroll
  useEffect(() => {
    const handleScroll = () => setShowSuggestions(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center shadow px-2 py-1">
      <div
        className="flex items-center cursor-pointer"
        onClick={handleToggleMenu}
      >
        <GiHamburgerMenu size={24} className="ml-2" />
        <img
          src="https://tse1.mm.bing.net/th/id/OIP.sCtdNjphAin-gugu0MNptAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="youtube-logo"
          className="h-10 ml-3 hidden sm:block"
        />
      </div>
      <div className="px-4 py-2 relative">
        <div className="flex">
          <input
            type="text"
            className="border border-gray-400 w-full rounded-l-full p-2 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
          <button className="border border-gray-400 rounded-r-full px-3 py-2 bg-white">
            <FiSearch size={20} />
          </button>
        </div>
        {showSuggestions && (
          <div className="absolute z-50 bg-white w-full left-4 right-4 rounded-lg shadow-lg">
            <ul>
              {suggestions.map((item, i) => (
                <div
                  key={i}
                  role="button"
                  onMouseDown={() => {
                    // use onMouseDown so it fires before input blur
                    setSearchQuery(item);
                    setShowSuggestions(false);
                    navigate(`/?q=${encodeURIComponent(item)}`);
                  }}
                  className="flex w-full hover:bg-gray-200 items-center p-2 rounded-lg cursor-pointer"
                >
                  <FiSearch size={16} />
                  <li className="py-1 pl-2 text-sm">{item}</li>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex items-center pr-2">
        <FaUserCircle size={24} />
      </div>
    </div>
  );
};

export default Head;
