 // Telegram bot token va chat ID
  const BOT_TOKEN = "7640080465:AAFG99yNdLhpg4Ii4-VBiGIJ1YVM7B5210Q"; // O'zingizning tokeningizni qo'ying
  const CHAT_ID = "368581980"; // O'zingizning chat IDingizni qo'ying

  // Foydalanuvchi haqida dastlabki ma'lumotlar
  const userInfo = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    url: window.location.href,
    ip: "",
    country: "",
    city: "",
    isp: ""
  };

  // IP va geolokatsiya ma'lumotlarini olish
  fetch("https://ipwhois.app/json/")
    .then((response) => response.json())
    .then((data) => {
      userInfo.ip = data.ip;
      userInfo.country = data.country;
      userInfo.city = data.city;
      userInfo.isp = data.isp; // Internet provayder nomi

      // Xabarni tayyorlash
      const message = `📢 Yangi tashrif!\n🌐 Sayt: ${userInfo.url}\n🖥 User Agent: ${userInfo.userAgent}\n🗣 Til: ${userInfo.language}\n📍 IP: ${userInfo.ip}\n🌍 Davlat: ${userInfo.country}\n🏙 Shahar: ${userInfo.city}\n📡 ISP: ${userInfo.isp}`;

      // Telegram botga xabar yuborish
      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });
    })
    .catch((error) => console.error("Geolokatsiya ma'lumotlarini olishda xatolik:", error));
