const apiKey = "YOUTUBE_API_KEY";

fetchTrendingVideos();

function fetchTrendingVideos() {
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&publishedAfter=${getTwoHoursAgo()}&maxResults=50&key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const videoGrid = document.getElementById("video-grid");
      videoGrid.innerHTML = "";

      const videoIds = data.items.map((item) => item.id.videoId).join(",");

      fetchVideoStats(videoIds).then((videoStats) => {
        let displayedVideos = 0;
        data.items.forEach((item, index) => {
          if (
            videoStats[index].statistics.likeCount > 5000 &&
            displayedVideos < 10
          ) {
            videoGrid.innerHTML += `
              <div class="col-md-4 mb-4">
                <div class="card">
                  <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                    <img src="${item.snippet.thumbnails.high.url}" class="card-img-top" alt="Thumbnail">
                  </a>
                  <div class="card-body">
                    <h5 class="card-title">${item.snippet.title}</h5>
                    <p class="card-text">${item.snippet.description}</p>
                  </div>
                </div>
              </div>
            `;
            displayedVideos++;
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching trending videos:", error);
    });
}

function getTwoHoursAgo() {
  const twoHoursAgo = new Date();
  twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);
  return twoHoursAgo.toISOString();
}

function fetchVideoStats(videoIds) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`;

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => data.items)
    .catch((error) => {
      console.error("Error fetching video stats:", error);
      return [];
    });
}
