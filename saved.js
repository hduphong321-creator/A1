const saved = JSON.parse(localStorage.getItem("savedNews")) || [];
const container =
    document.getElementById("saved-container");
if (saved.length === 0) {
    container.innerHTML = `
        <h2>
            Chưa có bài viết nào được lưu.
        </h2>
    `;
} else {
    container.innerHTML = saved.map((item, index) => `
        <div class="card">
            <img
                src="${item.urlToImage || "https://via.placeholder.com/400x250"}"
                class="news-img"
            >
            <div class="news-content">
                <h3 class="news-title">
                    ${item.title || "No title"}
                </h3>
                <p class="news-desc">
                    ${item.description || ""}
                </p>

                <div class="btn-group">

                    <button
                        class="btn-detail"
                        onclick="viewDetail(${index})"
                    >
                        Xem
                    </button>

                    <button
                        class="btn-save"
                        onclick="removeNews(${index})"
                    >
                        Xóa
                    </button>

                </div>

            </div>

        </div>
    `).join("");
}

function viewDetail(index) {

    localStorage.setItem(
        "newsDetail",
        JSON.stringify(saved[index])
    );

    location.href = "detail.html";
}

function removeNews(index) {

    saved.splice(index, 1);

    localStorage.setItem(
        "savedNews",
        JSON.stringify(saved)
    );

    location.reload();
}