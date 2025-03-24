$(document).ready(function () {
    // 🔹 Formani ochish
    $("#lunaradio-message-icon").click(function () {
        $("#message-form").fadeIn();
    });

    // 🔹 Formani yopish
    $("#close-form").click(function () {
        $("#message-form").fadeOut();
    });

    // 🔹 Qora fonni bosganda formani yopish
    $("#message-form").click(function (event) {
        if ($(event.target).is("#message-form")) {
            $("#message-form").fadeOut();
        }
    });

    // 🔹 Xabarni yuborish
    $("#send-message").click(function () {
        var userName = $("#user-name").val().trim();
        var userMessage = $("#user-message").val().trim();

        if (userName === "" || userMessage === "") {
            showNotification("⚠️ Iltimos, ismingiz va xabaringizni kiriting!", "error");
            return;
        }

        // 🔹 Telegram botga yuborish
        var telegramBotToken = "7640080465:AAFG99yNdLhpg4Ii4-VBiGIJ1YVM7B5210Q";  // Bot tokenini shu yerga yozing
        var chatId = "368581980"; // O'z telegram chat ID yoki kanal ID
        var telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

        var messageText = `📩 *Yangi xabar!* \n👤 *Ism:* ${userName}\n📝 *Xabar:* ${userMessage}`;

        $.ajax({
            url: telegramApiUrl,
            type: "POST",
            data: {
                chat_id: chatId,
                text: messageText,
                parse_mode: "Markdown"
            },
            success: function () {
                showNotification("✅ Xabaringiz yuborildi!", "success");
                $("#message-form").fadeOut();
                $("#user-name").val("");
                $("#user-message").val("");
            },
            error: function () {
                showNotification("❌ Xatolik yuz berdi. Keyinroq urinib ko‘ring.", "error");
            }
        });
    });

    // 🔹 Modal oynani sayt yuklangandan keyin avtomatik ochish
    setTimeout(function () {
        $("#aboutModal").addClass("show");
    }, 5000);

    // 🔹 Modal oynani yopish
    $(".closeBtn").click(function () {
        $("#aboutModal").removeClass("show");
    });

    // 🔹 Modal oynadan tashqariga bosganda yopish
    $(window).click(function (event) {
        if ($(event.target).is("#aboutModal")) {
            $("#aboutModal").removeClass("show");
        }
    });

    // 🔥 Bildirish (Notification) funksiyasi
    function showNotification(message, type) {
        var notification = $("<div class='notification'></div>").text(message);
        if (type === "success") {
            notification.addClass("success");
        } else {
            notification.addClass("error");
        }

        $("body").append(notification);
        setTimeout(function () {
            notification.fadeOut(500, function () {
                $(this).remove();
            });
        }, 3000); // 3 soniyadan keyin yo‘qoladi
    }
});
