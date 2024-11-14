require('dotenv').config()
var express = require('express');
var app = express();
var cors = require('cors');
var puppeteer = require('puppeteer');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3001;
var ytdl = require('ytdl-core')
var dns = require('dns')
const getFbVideoInfo = require("fb-downloader-scrapper");
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/screenshot', async (req, res) => {
    const { url, type } = req.query;
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'networkidle2' });

        const screenshotBuffer = await page.screenshot();
        await browser.close();
        let filename = `screenshot.${type}`;
        res.set({
            'Content-Type': `image/${type}`,
            'Content-Disposition': `attachment; filename=${filename}`
        });
        res.send(Buffer.from(screenshotBuffer, 'binary'));
    } catch (error) {
        res.status(500).json({ error: 'Error taking screenshot' });
    }
});

app.post('/api/download', async (req, res) => {
    const { url } = req.body;

    try {
        const videoInfo = await ytdl.getInfo(url);
        const video = await ytdl(url, { quality: 'highest' });
        res.set("Content-Disposition", `attachment; filename*=UTF-8''${videoInfo.title}.mp4`);
        video.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error downloading video: ${error.message}`);
    }
});

//hostname to ip
app.post('/dns-lookup', (req, res) => {
    const { hostname } = req.body;
    dns.resolve(hostname, (err, addresses) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ hostname, addresses });
    });
});

app.post('/fb-video-download', (req, res) => {
    const { url } = req.body;
    getFbVideoInfo(url)
        .then((result) => {
            res.send({ videoURL: result });
        }).catch((err) => {
            console.log(err);
        })
})

app.post('/x-video-download', (req, res) => {
    const videoUrl = req.body.url;
    const outputPath = path.join(__dirname, 'downloads', '%(title)s.%(ext)s');

    // Create the downloads directory if it doesn't exist
    const downloadsDir = path.join(__dirname, 'downloads');
    if (!fs.existsSync(downloadsDir)) {
        fs.mkdirSync(downloadsDir);
    }

    // Execute yt-dlp command
    exec(`yt-dlp -o "${outputPath}" "${videoUrl}"`, (error) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Error downloading video' });
        }

        // Find the downloaded file
        const files = fs.readdirSync(downloadsDir);
        const downloadedFile = files.find(file => file.endsWith('.mp4') || file.endsWith('.mkv'));

        if (downloadedFile) {
            res.download(path.join(downloadsDir, downloadedFile), (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                    res.status(500).json({ error: 'Error sending file' });
                }
                // Optionally delete the file after sending
                fs.unlinkSync(path.join(downloadsDir, downloadedFile));
            });
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    });
});

app.post('/tiktok-video-download', async (req, res) => {
    console.log("Hello");
    const videoUrl = req.query.url;
    console.log(videoUrl);
    try {
        const { data } = await axios.get(videoUrl);
        const $ = cheerio.load(data);

        // Extract video URL
        const videoElement = $('video');
        const videoSrc = videoElement.attr('src');

        if (videoSrc) {
            res.json({ videoUrl: videoSrc });
        } else {
            res.status(404).json({ error: 'Video not found' });
        }
    } catch (error) {
        console.error('Error fetching video:', error);
        res.status(500).json({ error: 'Error fetching video' });
    }
});

app.listen(port, () => {
    console.log(`Server Running on port : ${port}`);
})
