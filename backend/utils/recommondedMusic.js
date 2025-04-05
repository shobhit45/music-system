const musicDB = {
    happy: [
      { title: "Happy", artist: "Pharrell Williams", url: "" },
      { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", url: "https://youtu.be/ru0K8uYEZWw" },
    ],
    sad: [
      { title: "Someone Like You", artist: "Adele", url: "https://youtu.be/hLQl3WQQoQ0" },
      { title: "Let Her Go", artist: "Passenger", url: "https://youtu.be/RBumgq5yVrA" },
    ],
    angry: [
      { title: "Stronger", artist: "Kanye West", url: "https://youtu.be/PsO6ZnUZI0g" },
      { title: "Breaking the Habit", artist: "Linkin Park", url: "https://youtu.be/v2H4l9RpkwM" },
    ],
    fearful: [
      { title: "Demons", artist: "Imagine Dragons", url: "https://youtu.be/mWRsgZuwf_8" },
    ],
    neutral: [
      { title: "Counting Stars", artist: "OneRepublic", url: "https://youtu.be/hT_nvWreIhg" },
    ],
    disgust: [
      { title: "Uptown Funk", artist: "Bruno Mars", url: "https://youtu.be/OPf0YbXqDm0" },
    ],
    surprised: [
      { title: "Shake It Off", artist: "Taylor Swift", url: "https://youtu.be/nfWlot6h_JM" },
    ]
  };
  
  function recommendSongs(emotion) {
    const songs = musicDB[emotion.toLowerCase()];
    return songs;
  }
  
  module.exports = recommendSongs;
  