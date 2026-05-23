# 📺 YouTube Clone

A fully functional YouTube clone built with **React.js** that replicates core YouTube features including live chat simulation, nested comments, video search with suggestions, and responsive design.

## 🌐 Live Demo

🔗 [View Live](https://youtube-clone-fku5.vercel.app/watch?v=sdXPt-lgbE0)

---

## 🚀 Features

### 🔍 Search with Debouncing
- Real-time search suggestions powered by the **YouTube Suggestions API**
- Debounced API calls (200ms delay) to minimize unnecessary requests
- Results cached in Redux store to avoid redundant API calls
- Suggestions disappear on scroll or blur

### 🎬 Video Playback
- Embedded YouTube player via **YouTube Data API v3**
- Fetches trending/popular videos on the home page
- Click any video card to watch it seamlessly

### 💬 Live Chat Simulation
- Auto-generates chat messages every 2 seconds with random usernames
- New messages appear at the top (latest first) with smooth scrolling
- Users can type and send their own messages
- Built using `setInterval` and Redux for state management

### 🗨️ Nested Comments
- Recursive comment structure supporting **unlimited nesting levels**
- Visual indentation with left border to clearly show reply threads
- Built using a recursive `CommentList` component

### 🗂️ Redux State Management
- Centralized store managing:
  - Sidebar open/close state
  - Search suggestion cache
  - Live chat messages
- Prevents prop drilling across components

### 📱 Responsive Design
- Fully responsive across mobile, tablet, and desktop
- Video + Live Chat stacks vertically on smaller screens
- Horizontally scrollable category filter buttons on mobile
- Adaptive video grid (1 → 2 → 3 → 4 columns)

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React.js | UI framework |
| Redux Toolkit | Global state management |
| React Router DOM | Client-side routing |
| Tailwind CSS | Styling & responsiveness |
| YouTube Data API v3 | Fetching videos |
| YouTube Suggestions API | Search autocomplete |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Head.js           # Navbar with search & debouncing
│   ├── Body.js           # Layout with sidebar + outlet
│   ├── SideBar.js        # Collapsible sidebar
│   ├── MainContainer.js  # Home page container
│   ├── ButtonList.js     # Category filter buttons
│   ├── VideoContainer.js # Video grid
│   ├── VideoCard.js      # Individual video card
│   ├── WatchVideo.js     # Video player page
│   ├── LiveChat.js       # Live chat simulation
│   ├── ChatMessage.js    # Single chat message
│   └── CommentsContainer.js # Nested comments
└── utils/
    ├── store.js          # Redux store
    ├── configSlice.js    # Sidebar state
    ├── searchSlice.js    # Search cache
    ├── chatSlice.js      # Live chat messages
    ├── constants.js      # API URLs & keys
    └── helper.js         # Random name/message generators
```

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/chandu6787/youtube_clone.git
cd youtube_clone
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your YouTube API key
In `src/utils/constants.js`:
```js
export const YOUTUBE_API_KEY = "YOUR_API_KEY_HERE";
```

> Get your API key from [Google Cloud Console](https://console.cloud.google.com) → Enable **YouTube Data API v3** → Credentials → Create API Key

### 4. Start the app
```bash
npm start
```

---

## 🔑 APIs Used

| API | Purpose |
|---|---|
| `googleapis.com/youtube/v3/videos` | Fetch trending videos |
| `googleapis.com/youtube/v3/search` | Search videos by query |
| `suggestqueries.google.com` | Search autocomplete suggestions |

---

## 💡 Key Concepts Implemented

- **Debouncing** — limits API calls while typing in search
- **Memoization** — caches search results in Redux to avoid repeat calls
- **Recursive Components** — nested comments rendered with recursion
- **Real-time Simulation** — live chat powered by `setInterval`
- **Code Splitting** — React Router lazy loads pages

---

## 📸 Screenshots

![Home Page](https://github.com/chandu6787/youtube_clone/blob/507462e7cec7524ea7e2c635e924e73edff4352e/Screenshot%202026-05-23%20093643.png)
![Watch Video Page](https://github.com/chandu6787/youtube_clone/blob/507462e7cec7524ea7e2c635e924e73edff4352e/Screenshot%202026-05-23%20093703.png)
![Comments](https://github.com/chandu6787/youtube_clone/blob/507462e7cec7524ea7e2c635e924e73edff4352e/Screenshot%202026-05-23%20093719.png)
![Suggestions](https://github.com/chandu6787/youtube_clone/blob/507462e7cec7524ea7e2c635e924e73edff4352e/Screenshot%202026-05-23%20093742.png)

---

## 🙌 Acknowledgements

- [YouTube Data API v3](https://developers.google.com/youtube/v3)
- [Tailwind CSS](https://tailwindcss.com)
- [Redux Toolkit](https://redux-toolkit.js.org)
