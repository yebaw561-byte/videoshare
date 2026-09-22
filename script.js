/* ==================================================
   BUUMAL VIDEO WEBSITE
   ================================================== */


/* ==================================================
   CLOUDINARY
   ================================================== */

const CLOUDINARY_CLOUD_NAME = "lulxogem";

const CLOUDINARY_UPLOAD_PRESET =
  "buumal_videos";


/* ==================================================
   ADMIN LOGIN

   DEMO ONLY

   GitHub Pages မှာ ဒီအချက်အလက်တွေကို
   လူတွေက source code ကြည့်ပြီး သိနိုင်ပါတယ်။
   ================================================== */

const ADMIN_GMAIL =
  "minmayloe@gmail.com";

const ADMIN_PASSWORD =
  "mmsp8883";


/* ==================================================
   INITIAL VIDEOS
   ================================================== */

const defaultVideos = [

  {
    id:
      "60fcc87208ab14282df0141507d62393",

    title:
      "My First Video",

    description:
      "Cloudinary မှာတင်ထားသော Video",

    videoUrl:
      "https://res.cloudinary.com/lulxogem/video/upload/60fcc87208ab14282df0141507d62393.mp4",

    thumbnail:
      "https://res.cloudinary.com/lulxogem/video/upload/so_0/60fcc87208ab14282df0141507d62393.jpg",

    views: 0,

    createdAt:
      Date.now()

  }

];


/* ==================================================
   LOAD VIDEOS
   ================================================== */

let videos =
  JSON.parse(
    localStorage.getItem(
      "buumalVideos"
    )
  ) || defaultVideos;


/* ==================================================
   SAVE
   ================================================== */

function saveVideos() {

  localStorage.setItem(
    "buumalVideos",
    JSON.stringify(videos)
  );

}


/* ==================================================
   PAGINATION
   ================================================== */

const VIDEOS_PER_PAGE = 10;

let currentPage = 1;

let currentVideoList = [];


/* ==================================================
   DISPLAY VIDEOS
   ================================================== */

function displayVideos(
  list = videos,
  page = 1
) {

  const grid =
    document.getElementById(
      "videoGrid"
    );

  const pagination =
    document.getElementById(
      "pagination"
    );


  if (!grid) return;


  currentVideoList = list;

  currentPage = page;


  grid.innerHTML = "";


  if (list.length === 0) {

    grid.innerHTML = `

      <div class="no-video">

        <h3>
          Video မရှိသေးပါ
        </h3>

        <p>
          Video ရှာမတွေ့ပါ။
        </p>

      </div>

    `;

    if (pagination) {

      pagination.innerHTML =
        "";

    }

    return;

  }


  /* TOTAL PAGES */

  const totalPages =
    Math.ceil(
      list.length /
      VIDEOS_PER_PAGE
    );


  if (
    currentPage >
    totalPages
  ) {

    currentPage =
      totalPages;

  }


  /* START / END */

  const start =
    (currentPage - 1) *
    VIDEOS_PER_PAGE;


  const end =
    start +
    VIDEOS_PER_PAGE;


  const pageVideos =
    list.slice(
      start,
      end
    );


  /* CREATE CARDS */

  pageVideos.forEach(
    video => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "video-card";


      let thumbnail =
        video.thumbnail;


      if (!thumbnail) {

        thumbnail =
          `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/so_0/${video.id}.jpg`;

      }


      card.innerHTML = `

        <div class="thumbnail-box">

          <img
            class="thumbnail"
            src="${thumbnail}"
            alt="${escapeHTML(video.title)}"
            onerror="this.style.display='none'"
          >

          <div class="play-icon">
            ▶
          </div>

        </div>


        <div class="video-info">

          <h3>
            ${escapeHTML(video.title)}
          </h3>

          <p>
            ${escapeHTML(
              video.description || ""
            )}
          </p>

          <small>
            ${video.views || 0} views
          </small>

        </div>

      `;


      card.onclick =
        function () {

          openVideo(
            video.id
          );

        };


      grid.appendChild(
        card
      );

    }
  );


  createPagination(
    totalPages
  );

}


/* ==================================================
   OPEN VIDEO
   ================================================== */

function openVideo(id) {

  const video =
    videos.find(
      item =>
        item.id === id
    );


  if (!video) return;


  video.views =
    (video.views || 0) + 1;


  saveVideos();


  localStorage.setItem(
    "selectedVideo",
    JSON.stringify(video)
  );


  window.location.href =
    "watch.html";

}


/* ==================================================
   PAGINATION
   ================================================== */

function createPagination(
  totalPages
) {

  const pagination =
    document.getElementById(
      "pagination"
    );


  if (!pagination) return;


  pagination.innerHTML =
    "";


  if (totalPages <= 1) {

    return;

  }


  /* PREVIOUS */

  if (currentPage > 1) {

    const prev =
      document.createElement(
        "button"
      );


    prev.className =
      "page-arrow";


    prev.textContent =
      "‹";


    prev.onclick =
      function () {

        displayVideos(
          currentVideoList,
          currentPage - 1
        );


        scrollToVideos();

      };


    pagination.appendChild(
      prev
    );

  }


  /* PAGE NUMBERS */

  let startPage =
    Math.max(
      1,
      currentPage - 2
    );


  let endPage =
    Math.min(
      totalPages,
      startPage + 4
    );


  if (
    endPage - startPage < 4
  ) {

    startPage =
      Math.max(
        1,
        endPage - 4
      );

  }


  for (
    let i = startPage;
    i <= endPage;
    i++
  ) {

    const button =
      document.createElement(
        "button"
      );


    button.className =
      "page-number";


    button.textContent =
      i;


    if (
      i === currentPage
    ) {

      button.classList.add(
        "active"
      );

    }


    button.onclick =
      function () {

        displayVideos(
          currentVideoList,
          i
        );


        scrollToVideos();

      };


    pagination.appendChild(
      button
    );

  }


  /* NEXT */

  if (
    currentPage <
    totalPages
  ) {

    const next =
      document.createElement(
        "button"
      );


    next.className =
      "page-arrow";


    next.textContent =
      "›";


    next.onclick =
      function () {

        displayVideos(
          currentVideoList,
          currentPage + 1
        );


        scrollToVideos();

      };


    pagination.appendChild(
      next
    );

  }

}


/* ==================================================
   SCROLL
   ================================================== */

function scrollToVideos() {

  const section =
    document.getElementById(
      "latest"
    );


  if (section) {

    section.scrollIntoView({
      behavior: "smooth"
    });

  }

}


/* ==================================================
   SEARCH
   ================================================== */

function searchVideos() {

  const input =
    document.getElementById(
      "searchInput"
    );


  if (!input) return;


  const keyword =
    input.value
      .toLowerCase()
      .trim();


  if (!keyword) {

    displayVideos(
      videos,
      1
    );

    return;

  }


  const result =
    videos.filter(
      video => {

        const title =
          (
            video.title ||
            ""
          ).toLowerCase();


        const description =
          (
            video.description ||
            ""
          ).toLowerCase();


        return (

          title.includes(
            keyword
          )

          ||

          description.includes(
            keyword
          )

        );

      }
    );


  displayVideos(
    result,
    1
  );

}


/* ==================================================
   POPULAR VIDEOS
   ================================================== */

function displayPopularVideos() {

  const grid =
    document.getElementById(
      "popularGrid"
    );


  if (!grid) return;


  grid.innerHTML =
    "";


  const popular =
    [...videos]
      .sort(
        (a, b) =>
          (b.views || 0) -
          (a.views || 0)
      )
      .slice(
        0,
        10
      );


  popular.forEach(
    video => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "video-card";


      let thumbnail =
        video.thumbnail;


      if (!thumbnail) {

        thumbnail =
          `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/so_0/${video.id}.jpg`;

      }


      card.innerHTML = `

        <div class="thumbnail-box">

          <img
            class="thumbnail"
            src="${thumbnail}"
            alt="${escapeHTML(video.title)}"
          >

          <div class="play-icon">
            ▶
          </div>

        </div>


        <div class="video-info">

          <h3>
            ${escapeHTML(video.title)}
          </h3>

          <p>
            ${escapeHTML(
              video.description || ""
            )}
          </p>

          <small>
            ${video.views || 0} views
          </small>

        </div>

      `;


      card.onclick =
        function () {

          openVideo(
            video.id
          );

        };


      grid.appendChild(
        card
      );

    }
  );

}


/* ==================================================
   MOBILE MENU
   ================================================== */

function toggleMenu() {

  const nav =
    document.getElementById(
      "mainNav"
    );


  if (!nav) return;


  nav.classList.toggle(
    "active"
  );

}


/* ==================================================
   ADMIN LOGIN
   ================================================== */

function adminLogin() {

  const email =
    document.getElementById(
      "adminEmail"
    );


  const password =
    document.getElementById(
      "adminPassword"
    );


  const error =
    document.getElementById(
      "loginError"
    );


  if (!email || !password)
    return;


  if (

    email.value.trim() ===
      ADMIN_GMAIL

    &&

    password.value ===
      ADMIN_PASSWORD

  ) {

    sessionStorage.setItem(
      "buumalAdmin",
      "true"
    );


    window.location.href =
      "admin.html";

  }

  else {

    if (error) {

      error.textContent =
        "Gmail သို့မဟုတ် Password မှားနေပါတယ်။";

    }

  }

}


/* ==================================================
   CHECK ADMIN
   ================================================== */

function checkAdmin() {

  const loggedIn =
    sessionStorage.getItem(
      "buumalAdmin"
    );


  if (
    loggedIn !== "true"
  ) {

    window.location.href =
      "login.html";


    return false;

  }


  return true;

}


/* ==================================================
   LOGOUT
   ================================================== */

function adminLogout() {

  sessionStorage.removeItem(
    "buumalAdmin"
  );


  window.location.href =
    "login.html";

}


/* ==================================================
   CLOUDINARY UPLOAD
   ================================================== */

async function uploadVideo() {

  const fileInput =
    document.getElementById(
      "videoFile"
    );


  const titleInput =
    document.getElementById(
      "videoTitle"
    );


  const descriptionInput =
    document.getElementById(
      "videoDescription"
    );


  const progress =
    document.getElementById(
      "uploadProgress"
    );


  const status =
    document.getElementById(
      "uploadStatus"
    );


  if (
    !fileInput ||
    !fileInput.files.length
  ) {

    alert(
      "Video file ရွေးပါ။"
    );


    return;

  }


  const file =
    fileInput.files[0];


  const title =
    titleInput.value.trim();


  const description =
    descriptionInput.value.trim();


  if (!title) {

    alert(
      "Video Title ထည့်ပါ။"
    );


    return;

  }


  if (

    CLOUDINARY_UPLOAD_PRESET ===
    "YOUR_UPLOAD_PRESET"

  ) {

    alert(
      "Cloudinary Upload Preset ထည့်ပါ။"
    );


    return;

  }


  const uploadURL =

    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`;


  const formData =
    new FormData();


  formData.append(
    "file",
    file
  );


  formData.append(
    "upload_preset",
    CLOUDINARY_UPLOAD_PRESET
  );


  try {

    status.textContent =
      "Video Upload လုပ်နေပါတယ်...";


    progress.value =
      20;


    const response =
      await fetch(
        uploadURL,
        {
          method: "POST",
          body: formData
        }
      );


    progress.value =
      70;


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.error?.message ||
        "Upload failed"
      );

    }


    progress.value =
      100;


    const newVideo = {

      id:
        data.public_id,

      title:
        title,

      description:
        description,

      videoUrl:
        data.secure_url,

      thumbnail:
        data.secure_url
          .replace(
            "/video/upload/",
            "/video/upload/so_0/"
          )
          .replace(
            /\.[^/.]+$/,
            ".jpg"
          ),

      views:
        0,

      createdAt:
        Date.now()

    };


    videos.unshift(
      newVideo
    );


    saveVideos();


    status.textContent =
      "✅ Video Upload အောင်မြင်ပါပြီ။";


    titleInput.value =
      "";


    descriptionInput.value =
      "";


    fileInput.value =
      "";


    loadAdminVideos();

  }

  catch (error) {

    console.error(
      error
    );


    status.textContent =
      "❌ Upload မအောင်မြင်ပါ: " +
      error.message;

  }

}


/* ==================================================
   ADMIN VIDEO LIST
   ================================================== */

function loadAdminVideos() {

  const list =
    document.getElementById(
      "adminVideoList"
    );


  if (!list) return;


  list.innerHTML =
    "";


  if (
    videos.length === 0
  ) {

    list.innerHTML =
      "<p>Video မရှိသေးပါ။</p>";


    return;

  }


  videos.forEach(
    (video, index) => {

      const item =
        document.createElement(
          "div"
        );


      item.className =
        "admin-video-item";


      item.innerHTML = `

        <div>

          <strong>
            ${escapeHTML(video.title)}
          </strong>

          <p>
            ${escapeHTML(
              video.description || ""
            )}
          </p>

        </div>


        <button
          class="delete-btn"
          onclick="deleteVideo(${index})"
        >
          Delete
        </button>

      `;


      list.appendChild(
        item
      );

    }
  );

}


/* ==================================================
   DELETE VIDEO
   ================================================== */

function deleteVideo(index) {

  const ok =
    confirm(
      "Website ထဲက ဒီ Video ကို ဖျက်မလား?"
    );


  if (!ok) return;


  videos.splice(
    index,
    1
  );


  saveVideos();


  loadAdminVideos();


  displayVideos(
    videos,
    1
  );

}


/* ==================================================
   WATCH PAGE
   ================================================== */

function loadWatchPage() {

  const data =
    localStorage.getItem(
      "selectedVideo"
    );


  if (!data) {

    return;

  }


  const video =
    JSON.parse(data);


  const player =
    document.getElementById(
      "mainVideo"
    );


  const title =
    document.getElementById(
      "watchTitle"
    );


  const description =
    document.getElementById(
      "watchDescription"
    );


  const views =
    document.getElementById(
      "watchViews"
    );


  if (player) {

    player.src =
      video.videoUrl;

  }


  if (title) {

    title.textContent =
      video.title;

  }


  if (description) {

    description.textContent =
      video.description || "";

  }


  if (views) {

    views.textContent =
      `${video.views || 0} views`;

  }

}


/* ==================================================
   ESCAPE HTML
   ================================================== */

function escapeHTML(text) {

  const div =
    document.createElement(
      "div"
    );


  div.textContent =
    text || "";


  return div.innerHTML;

}


/* ==================================================
   PAGE START
   ================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {


    /* HOME */

    if (
      document.getElementById(
        "videoGrid"
      )
    ) {

      displayVideos(
        videos,
        1
      );


      displayPopularVideos();

    }


    /* WATCH */

    if (
      document.getElementById(
        "mainVideo"
      )
    ) {

      loadWatchPage();

    }


    /* ADMIN */

    if (
      document.getElementById(
        "adminVideoList"
      )
    ) {

      if (checkAdmin()) {

        loadAdminVideos();

      }

    }

  }
);