import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";


async function takeScreenshot(url, fileName) {
    try {
        // Path where Chrome for Testing is installed
        const executablePath = "D:\\DarshD.Coding-website\\DarshD.Coding-website\\chrome\\win64-144.0.7526.3\\chrome-win64\\chrome.exe";

        // Launch browser
        const browser = await puppeteer.launch({
            executablePath,
            headless: true,
        });

        const page = await browser.newPage();

        // Set thumbnail viewport
        await page.setViewport({ width: 1280, height: 720 });

        await page.goto(url, {
            waitUntil: ["networkidle0", "domcontentloaded"],
            timeout: 60000,
        });

        // Ensure folder exists
        const dir = path.resolve("public/ImageGallery");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const outputPath = path.join(dir, fileName);

        // Save a JPEG thumbnail
        await page.screenshot({
            path: outputPath,
            type: "jpeg",
            quality: 70, // thumbnail
            fullPage: true,
        });

        await browser.close();

        console.log("Screenshot saved:", outputPath);
    } catch (err) {
        console.error("Error:", err);
    }
}

// Run example:
// node screenshot.js https://example.com example.jpg
const [,, url, file] = process.argv;

if (!url || !file) {
    console.log("Usage: node screenshot.js <url> <outputFileName>");
    process.exit(1);
}

takeScreenshot(url, file);
