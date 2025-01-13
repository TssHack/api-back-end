const express = require("express");
const axios = require("axios"); // برای ارسال درخواست به وب‌سرویس اصلی
const app = express();
const port = 3000;

// Middleware برای پردازش JSON
app.use(express.json());

// Route برای دریافت درخواست POST
app.post("/proxy", async (req, res) => {
  try {
    const { q } = req.body; // دریافت query از بدنه درخواست

    if (!q) {
      return res.status(400).json({ error: "Query parameter (q) is required" });
    }

    // ارسال درخواست GET به وب‌سرویس اصلی
    const response = await axios.get(`https://req.wiki-api.ir/apis-2/ChatGPT4?q=${encodeURIComponent(q)}`);

    // ساخت خروجی کاستومایز شده
    const customResponse = {
      status: true, // وضعیت درخواست
      "my name": "EHSAN", // اطلاعات شما
      developer: "@abj0o", // اطلاعات شما
      results: response.data.results, // پارامتر results از وب‌سرویس اصلی
    };

    // برگرداندن خروجی کاستومایز شده
    res.json(customResponse);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to process request" });
  }
});

// شروع سرور
app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
