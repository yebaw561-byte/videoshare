const videoGrid =
    document.getElementById("videoGrid");

const empty =
    document.getElementById("empty");

const search =
    document.getElementById("search");

const playerModal =
    document.getElementById("playerModal");

const videoPlayer =
    document.getElementById("videoPlayer");

const playerTitle =
    document.getElementById("playerTitle");

const playerDescription =
    document.getElementById("playerDescription");

const closePlayer =
    document.getElementById("closePlayer");


/*
    ဒီနေရာမှာ နောက်ပိုင်း Firebase
    ကနေ Video data ယူမယ်။

    အခုတော့ demo data နဲ့
    structure ပြထားပါတယ်။
*/

let videos = [];


function showVideos(list) {

    videoGrid.innerHTML = "";


    if (list.length === 0) {

        empty.style.display = "block";

        return;

    }


    empty.style.display = "none";


    list.forEach(video => {

        const card =
            document.createElement("div");

        card.className =
            "video-card";


        const thumbnail =
            document.createElement("div");

        thumbnail.className =
            "thumbnail";


        const img =
            document.createElement("img");

        img.src =
            video.thumbnail;


        const play =
            document.createElement("button");

        play.className = "play";

        play.innerText = "▶";


        play.onclick = () => {

            openPlayer(video);

        };


        thumbnail.appendChild(img);

        thumbnail.appendChild(play);


        const info =
            document.createElement("div");

        info.className =
            "video-info";


        info.innerHTML = `

            <h3>
                ${escapeHTML(video.title)}
            </h3>

            <p>
                ${escapeHTML(video.description)}
            </p>

            <div class="meta">

                👁 ${video.views || 0} views

                • ${video.category}

            </div>

        `;


        card.appendChild(thumbnail);

        card.appendChild(info);


        videoGrid.appendChild(card);

    });

}


function openPlayer(video) {

    videoPlayer.src =
        video.videoUrl;

    playerTitle.innerText =
        video.title;

    playerDescription.innerText =
        video.description || "";

    playerModal.classList.add("show");

}


closePlayer.onclick =
    function() {

        videoPlayer.pause();

        videoPlayer.src = "";

        playerModal.classList.remove(
            "show"
        );

    };


search.addEventListener(
    "input",
    function() {

        const keyword =
            search.value.toLowerCase();


        const filtered =
            videos.filter(video =>

                video.title
                    .toLowerCase()
                    .includes(keyword)

            );


        showVideos(filtered);

    }
);


/* CATEGORY */

document
    .querySelectorAll(
        ".categories button"
    )
    .forEach(button => {

        button.onclick = function() {

            const category =
                this.dataset.category;


            if (category === "all") {

                showVideos(videos);

                return;

            }


            showVideos(
                videos.filter(
                    video =>
                    video.category === category
                )
            );

        };

    });


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text || "";

    return div.innerHTML;

}


/*
    Firebase ချိတ်ပြီးရင်
    videos = Firebase data
    ဖြစ်အောင် ဒီနေရာကိုပြောင်းမယ်။
*/

showVideos(videos);