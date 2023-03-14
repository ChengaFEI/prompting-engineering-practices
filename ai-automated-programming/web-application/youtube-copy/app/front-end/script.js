// script.js
document.addEventListener("DOMContentLoaded", () => {
  const videoGrid = document.getElementById("video-grid");

  // Fetch video data from your back-end API
  async function fetchVideos() {
    try {
      const response = await fetch("http://localhost:3001/videos");
      const videos = await response.json();
      displayVideos(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  // Display video cards on the homepage
  function displayVideos(videos) {
    videos.forEach((video) => {
      const videoCard = `
        <article class="video-card">
          <a href="video.html?id=${video.id}">
            <img class="video-thumbnail" src="${video.thumbnail}" alt="${video.title}">
          </a>
          <h2 class="video-title">${video.title}</h2>
          <p class="video-author">by ${video.author}</p>
        </article>
      `;
      videoGrid.innerHTML += videoCard;
    });
  }

  // fetchVideos();
});

fetch("http://localhost:3001/public/videos")
  .then((response) => response.json())
  .then((videos) => {
    const videoGrid = document.getElementById("video-grid");
    videos.forEach((video) => {
      videoGrid.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card">
            <a href="video-player.html?url=${encodeURIComponent(video.url)}">
              <img src="${
                video.thumbnail
              }" class="card-img-top" alt="Thumbnail">
            </a>
            <div class="card-body">
              <h5 class="card-title">${video.title}</h5>
              <p class="card-text">${video.description}</p>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch((error) => {
    console.error("Error fetching videos:", error);
  });
