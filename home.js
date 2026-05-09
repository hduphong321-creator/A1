const API_KEY = "f259d085be8a4dd9a7359a28c40ffbf0";

let newsData = [];

const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 25,
    loop: true,
    speed: 800,

    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
});

window.onload = () => {

    const user = localStorage.getItem("currentUser");

    if (!user) {
        location.href = "login.html";
        return;
    }

    document.getElementById("hello").innerText =
        `Chào mừng, ${user}!`;

    getNews("technology");
};

async function getNews(keyword) {

    const q =
        keyword ||
        document.getElementById("search").value ||
        "technology";

    const container =
        document.getElementById("news-container");

    container.innerHTML =
        "<div class='swiper-slide'>Đang tải tin tức...</div>";

    try {

        const res = await fetch(
            `https://newsapi.org/v2/everything?q=${q}&pageSize=12&apiKey=${API_KEY}`
        );

        const data = await res.json();

        if (data.status !== "ok") {

            container.innerHTML =
                `<div class='swiper-slide'>Lỗi: ${data.message}</div>`;

            return;
        }

        renderNews(data.articles);

    } catch {

        container.innerHTML =
            "<div class='swiper-slide'>Lỗi kết nối máy chủ!</div>";
    }
}

function renderNews(data) {

    newsData = data;

    const container =
        document.getElementById("news-container");

    if (!data || data.length === 0) {

        container.innerHTML =
            "<div class='swiper-slide'>Không có dữ liệu.</div>";

        return;
    }

    container.innerHTML = data.map((item, index) => `
        <div class="swiper-slide">

            <div class="card">

                <img
                    src="${item.urlToImage || "https://via.placeholder.com/400x250"}"
                    class="news-img"
                    alt="news"
                >

                <div class="news-content">

                    <h3 class="news-title">
                        ${item.title
                            ? item.title.substring(0, 50) + "..."
                            : "No Title"}
                    </h3>

                    <p class="news-desc">
                        ${item.description
                            ? item.description.substring(0, 80) + "..."
                            : ""}
                    </p>

                    <div class="btn-group">

                        <button
                            class="btn-detail"
                            onclick="goToDetail(${index})"
                        >
                            Xem chi tiết
                        </button>

                        <button
                            class="btn-save"
                            onclick="saveNews(${index})"
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
    swiper.update();
    swiper.autoplay.start();
}
function goToDetail(index) {
    localStorage.setItem(
        "newsDetail",
        JSON.stringify(newsData[index])
    );
    location.href = "detail.html";
}
function saveNews(index) {
    const saved =
        JSON.parse(localStorage.getItem("savedNews")) || [];
    const article = newsData[index];
    const exists = saved.some(
        item => item.title === article.title
    );
    saved.push(article);
    localStorage.setItem(
        "savedNews",
        JSON.stringify(saved)
    );
    alert("Đã lưu bài viết!");
}
function logout() {
    localStorage.removeItem("currentUser");
    location.href = "login.html";
}