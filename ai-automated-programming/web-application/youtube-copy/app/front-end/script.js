// script.js
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  fetchVideos(searchTerm);
});

function fetchVideos(searchTerm) {
  const url = searchTerm
    ? `http://localhost:3001/public/videos?search=${encodeURIComponent(
        searchTerm
      )}`
    : "http://localhost:3001/public/videos";

  fetch(url)
    .then((response) => response.json())
    .then((videos) => {
      const videoGrid = document.getElementById("video-grid");
      videoGrid.innerHTML = "";
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
}

// Fetch videos on page load
fetchVideos();

// fetch("http://localhost:3001/public/videos")
//   .then((response) => response.json())
//   .then((videos) => {
//     const videoGrid = document.getElementById("video-grid");
//     videos.forEach((video) => {
//       videoGrid.innerHTML += `
//         <div class="col-md-4 mb-4">
//           <div class="card">
//             <a href="video-player.html?url=${encodeURIComponent(video.url)}">
//               <img src="${
//                 video.thumbnail
//               }" class="card-img-top" alt="Thumbnail">
//             </a>
//             <div class="card-body">
//               <h5 class="card-title">${video.title}</h5>
//               <p class="card-text">${video.description}</p>
//             </div>
//           </div>
//         </div>
//       `;
//     });
//   })
//   .catch((error) => {
//     console.error("Error fetching videos:", error);
//   });
