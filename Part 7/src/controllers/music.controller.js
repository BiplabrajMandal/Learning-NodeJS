const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service");

const jwt = require('jsonwebtoken');

async function createMusic(req, res) {
    const {title} = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    });

    res.status(201).json({
        message: "Music created successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    });
}

async function createAlbum(req, res) {
    const {title, musics} = req.body;

    const album = await albumModel.create({
        title, 
        artist: req.user.id,
        musics: musics
    })

    res.status(201).json({
        message: "Album created successfully",
        album : {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics
        }
    }) 
}

async function getAllMusics(req, res) {
    // const musics = await musicModel.find();

    // const musics = await musicModel.find().populate("artist");

    // const musics = await musicModel.find().populate("artist", "userName email");

    // const musics = await musicModel
    //     .find()
    //     .limit(2)
    //     .populate("artist", "userName email");
    
    const musics = await musicModel
        .find()
        .skip(1)
        .limit(2)
        .populate("artist", "userName email");

    res.status(200).json({
        message: "Musics fetched successfully",
        musics: musics
    })
}

async function getAllAlbums(req, res) {
    // const albums = await albumModel.find().populate("artist", "userName email").populate("musics");
    const albums = await albumModel.find().select("title artist").populate("artist", "userName email");
    
    res.status(200).json({
        message: "Albums fetched successfully",
        albums: albums
    })
}

async function getAlbumById(req, res) {
    const albumId = req.params.albumId;
    const album = await albumModel.findById(albumId).populate("artist", "userName email").populate("musics");

    return res.status(200).json({
        message: "Album fetched successfully",
        album: album
    })
}

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById };


// Without using Middleware
/*
async function createMusic(req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "artist") {
            return res.status(403).json({message: "You don't have access to create a music"});
        }

        const {title} = req.body;
        const file = req.file;
    
        const result = await uploadFile(file.buffer.toString('base64'));
    
        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id
        });
    
        res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        });
    } catch(err) {
        console.log(err);
        return res.status(401).json({message: "Unauthorized"});
    }

}

async function createAlbum(req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "artist") {
            return res.status(403).json({message: "You don't have access to have an album"})
        }

        const {title, musics} = req.body;

        const album = await albumModel.create({
            title, 
            artist: decoded.id,
            musics: musics
        })

        res.status(201).json({
            message: "Album created successfully",
            album : {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        }) 
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "Unauthorized"});
    }
}
*/