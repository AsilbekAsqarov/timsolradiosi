$(document).ready(function () {
    // Formani ochish
    $("#lunaradio-message-icon").click(function () {
        $("#message-form").fadeIn(); // Forma chiqadi
    });

    // Formani yopish
    $("#close-form").click(function () {
        $("#message-form").fadeOut(); // Forma yo‘qoladi
    });

    // Xabarni yuborish
    $("#send-message").click(function () {
        var userName = $("#user-name").val().trim();
        var userMessage = $("#user-message").val().trim();

        if (userName === "" || userMessage === "") {
            alert("Iltimos, ismingiz va xabaringizni kiriting!");
            return;
        }

        // Telegram botga yuborish
        var telegramBotToken = "7640080465:AAFG99yNdLhpg4Ii4-VBiGIJ1YVM7B5210Q";  // Bot tokenini shu yerga yozing
        var chatId = "368581980"; // O'z telegram chat ID yoki kanal ID
        var telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

        var messageText = `📩 *Yangi xabar!* \n👤 *Ism:* ${userName}\n📝 *Xabar:* ${userMessage}`;

        $.post(telegramApiUrl, {
            chat_id: chatId,
            text: messageText,
            parse_mode: "Markdown"
        }, function (data) {
            alert("Xabaringiz yuborildi!");
            $("#message-form").fadeOut(); // Xabar yuborilgandan keyin forma yopiladi
            $("#user-name").val(""); // Ism maydonini tozalash
            $("#user-message").val(""); // Xabar maydonini tozalash
        }).fail(function () {
            alert("Xatolik yuz berdi. Keyinroq urinib ko‘ring.");
        });
    });
});
     // Modal oynani sayt yuklangandan keyin avtomatik ochish
     window.addEventListener("load", function () {
        setTimeout(function () {
            document.getElementById("aboutModal").classList.add("show");
        }, 5000); // 5 soniyadan keyin chiqadi
    });

    // Modal oynani yopish
    document.querySelector(".closeBtn").addEventListener("click", function () {
        document.getElementById("aboutModal").classList.remove("show");
    });

    // Modal oynadan tashqariga bosganda yopish
    window.addEventListener("click", function (event) {
        if (event.target == document.getElementById("aboutModal")) {
            document.getElementById("aboutModal").classList.remove("show");
        }
    });