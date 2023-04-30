import { useState, useEffect } from 'react';
import React from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Image } from "./Types.ts";
const CatalogViewer = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [slideshow, setSlideshow] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (slideshow) {
            interval = setInterval(() => {
                const currentIndex = images.findIndex((image) => image.id === selectedImage.id);
                if (currentIndex === images.length - 1) {
                    setSelectedImage(images[0]);
                } else {
                    setSelectedImage(images[currentIndex + 1]);
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [slideshow, selectedImage, images]);

    const handlePrev = () => {
        const currentIndex = images.findIndex((image) => image.id === selectedImage.id);
        if (currentIndex === 0) {
            setSelectedImage(images[images.length - 1]);
        } else {
            setSelectedImage(images[currentIndex - 1]);
        }
    };

    const handleNext = () => {
        const currentIndex = images.findIndex((image) => image.id === selectedImage.id);
        if (currentIndex === images.length - 1) {
            setSelectedImage(images[0]);
        } else {
            setSelectedImage(images[currentIndex + 1]);
        }
    };

    const handlePlayPause = () => {
        setSlideshow(!slideshow);
    };

    const handleThumbnailClick = (image: Image) => {
        setSelectedImage(image);
        setSlideshow(false);
    };

    return (
        <>
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12} sm={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <img src={selectedImage.src} alt={selectedImage.alt} style={{ maxWidth: '100%', borderRadius: "20px" }} />
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Grid item xs={12}>
                        <Typography sx={{ textTransform: "capitalize" }} variant="h4">{selectedImage.title ? selectedImage.title : "image title are not available "}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="p">{selectedImage.details ? selectedImage.details : "image details are not available "}</Typography>
                    </Grid>
                </Grid>
            </Grid >

            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} sm={8} sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={handlePrev} >
                        <ArrowLeftIcon sx={{ fontSize: '10vh', color: "black" }} />
                    </IconButton>

                    {images.map((image) => (
                        <Grid item key={image.id} xs={4} sm={4} sx={{ p: 0.5, }} >
                            <img
                                src={image.src}
                                alt={image.alt}
                                style={{ maxWidth: '100%', borderRadius: "8px", filter: image.id === selectedImage.id ? 'none' : 'grayscale(100%)' }}
                                onClick={() => handleThumbnailClick(image)}
                            />
                        </Grid>
                    ))}

                    <IconButton onClick={handleNext}>
                        <ArrowRightIcon sx={{ fontSize: '10vh', color: "black" }} />
                    </IconButton>



                </Grid>
                <Grid item xs={12} sm={4}>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton onClick={handlePlayPause} >
                            {slideshow ? <PauseIcon sx={{ fontSize: '100px', color: "#25beda" }} /> : <PlayArrowIcon sx={{ fontSize: '100px', color: "#25beda" }} />}
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid ></>

    );
};

export default CatalogViewer;
