window.onload = function () {
    let data = localStorage.getItem("newsDetail");
    let box = document.getElementById("detail");
    if (!data) {
        box.innerHTML = "Không có dữ liệu!";
        return;
    }
    let a = JSON.parse(data);
    let content = (a.description || "") + " " + (a.content || "");
    content = content.replace(/\[\+\d+\schars\]/, "").trim();
    box.innerHTML = `
        <h1>${a.title}</h1>
        <img src="${a.urlToImage || 'https://via.placeholder.com/500'}">
        <p>${content}...</p>
        <br>
        <a href="${a.url}" target="_blank">Đọc full bài</a>
    `;
};