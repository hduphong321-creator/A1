const form = document.getElementById("formLogin");

if (form) {

    form.addEventListener("submit", function(e) {

        e.preventDefault();

        const userInput = document.getElementById("user");
        const passInput = document.getElementById("pass");
        const msg = document.getElementById("msg");

        const u = userInput.value.trim();
        const p = passInput.value;

        if (!u || !p) {

            msg.innerText = "Vui lòng nhập đầy đủ!";
            return;
        }

        // lấy dữ liệu account từ localStorage
        const local = localStorage.getItem("account");

        // nếu chưa có account nào
        if (!local) {

            msg.innerText = "Chưa có tài khoản!";
            return;
        }

        const data = JSON.parse(local);

        // tìm tài khoản đúng
        const found = data.find(
            acc =>
                acc.username.toLowerCase() === u.toLowerCase()
                &&
                acc.password === p
        );

        if (found) {

            // lưu user hiện tại
            localStorage.setItem(
                "currentUser",
                found.username
            );

            alert("Đăng nhập thành công!");

            // chuyển trang
            window.location.href = "./home.html";

        } else {

            msg.innerText =
                "Sai tài khoản hoặc mật khẩu!";
        }
    });
}