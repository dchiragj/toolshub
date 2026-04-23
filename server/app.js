require('dotenv').config()
var express = require('express');
var app = express();
var cors = require('cors');
var puppeteer = require('puppeteer');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3001;
var ytdl = require('@distube/ytdl-core')
var dns = require('dns')
const getFbVideoInfo = require("fb-downloader-scrapper");
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const twitter = require("twitter-downloader");
const cheerio = require('cheerio');
const vdl = require('vdl-core');
app.use(cors());
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }));
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
        if(!url || !ytdl.validateURL(url)){
        return res.status(400).json({ error: "Invalid YouTube URL." });
        }
        const info = await ytdl.getInfo(url);
        const formats = info?.formats || [];
        return res.status(200).send({data:formats});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:error.message});
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

app.post('/linkedin-video-download', async (req, res) => {
    try {
        const { url } = req.body;
        const linkedInDownloader = new vdl.Linkedin(url);
        const videos = await linkedInDownloader.extractVideos()
        return res.status(200).json({data:videos.length > 0 ? videos[0] :{}})
    } catch(err){
        return res.status(500).json({ error: err.message });
    }
})

app.post('/x-video-download', async (req, res) => {
    try {
        const videoUrl = req.body.url;
        const response = await twitter.TwitterDL(videoUrl)
        return res.status(200).json({ data: response?.result?.media?.map((data)=>data?.videos)[0][0]?.url });
    } catch(err){
        return res.status(500).json({ error: err.message });
    }
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
