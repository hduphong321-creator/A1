const dangky = () => {

    const wrap = document.querySelector("#formSignin");

    if (!wrap) return;

    wrap.addEventListener("submit", async (e) => {

        e.preventDefault();

        const userInput = wrap.querySelector("#user");
        const passInput = wrap.querySelector("#pass");
        const repassInput = wrap.querySelector("#repass");

        const userName = userInput.value.trim();
        const password = passInput.value;
        const repass = repassInput.value;

        if (!userName || !password || !repass) {

            alert("Nhập đầy đủ!");
            return;
        }

        if (password !== repass) {

            alert("Mật khẩu nhập lại không đúng!");
            return;
        }

        try {

            const res = await fetch("account.json");

            const data = await res.json();

            const isExisted = data.some(
                item =>
                    item.username.toLowerCase()
                    ===
                    userName.toLowerCase()
            );

            if (isExisted) {

                alert("Tài khoản đã tồn tại!");
                return;
            }

            data.push({
                username: userName,
                password: password
            });

            // lưu localStorage tạm
            localStorage.setItem(
                "account",
                JSON.stringify(data)
            );

            alert("Đăng ký thành công!");

            window.location.href = "login.html";

        } catch (error) {

            console.log(error);

            alert("Lỗi đọc JSON!");
        }
    });
};

dangky();