import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, Trash2, Download, Image as ImageIcon, Type, Play, Smartphone, Settings, ChevronRight, ChevronLeft, Video, Loader2, Palette, Layout, Monitor, Move, AlertTriangle, Layers, FileVideo, Check, Sparkles, Film, Camera, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Type as TypeIcon, Pause, Copy, Sun, Contrast, Droplet, ArrowUp, X, Grid, Scaling, Menu, FileCode, Film as FilmIcon, ChevronDown, ChevronUp, Music, Volume2, VolumeX, Upload, RefreshCw, Clock } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

// --- AUDIO SOURCES (GITHUB RAW) ---
// These URLs point directly to the files in your GitHub repository. 
// This ensures the app works in this preview environment AND on Vercel without missing file errors.

const GITHUB_BASE = "https://raw.githubusercontent.com/MusfiqurTuhin/metamorphosis-studio-git/main/src";

const audioBoo = `${GITHUB_BASE}/04%20Light%20Entertainment%20Audience%2C%20Boo.mp3`;
const audioRoom = `${GITHUB_BASE}/09%20SCHOOLS%2C%20Girls%20Changing%20Room%20-%20Ge.mp3`;
const audioApplause = `${GITHUB_BASE}/19%20Theatre%20AND%20Concert%20Audience%2C%20App.mp3`;
const audioChildren = `${GITHUB_BASE}/23%20Babies%20AND%20Children%208-10%20Years%2C%202.mp3`;
const audioCinematic = `${GITHUB_BASE}/Cinematic_short.wav`;
const audioCorporate = `${GITHUB_BASE}/Corporate%20BackGround%20Minimal.wav`;
const audioMain = `${GITHUB_BASE}/Main%20(1-47).wav`;
const audioRise = `${GITHUB_BASE}/Rise%20to%20Inspire%20-%20Upbeat%20Corporate%20(30s).wav`;
const audioStudio = `${GITHUB_BASE}/StudioKolomna%20-%20Main%20Track.wav`;
const audioGroove = `${GITHUB_BASE}/The%20Groove.wav`;
const audioMotivated = `${GITHUB_BASE}/Top%20Flow%20Production%20-%20Motivated.wav`;

// --- AMP Boilerplate ---
const AMP_BOILERPLATE = `<!DOCTYPE html>
<html amp lang="en">
 <head>
   <meta charset="utf-8" />
   <script async src="https://cdn.ampproject.org/v0.js"></script>
   <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
   <script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Atma:wght@300;400;500;600;700&family=Baloo+Da+2:wght@400;500;600;700;800&family=Galada&family=Hind+Siliguri:wght@300;400;500;600;700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Mina:wght@400;700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Serif+Bengali:wght@100..900&family=Oswald:wght@200..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Tiro+Bangla:ital@0;1&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
   <title>__TITLE__</title>
   <link rel="canonical" href="__CANONICAL_URL__" />
   <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
   <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
   <style amp-custom>
     amp-story { font-family: 'Hind Siliguri', 'Roboto', sans-serif; }
     .gradient-overlay { position: absolute; bottom: 0; left: 0; right: 0; pointer-events: none; }
     .draggable-element { position: absolute; transform-origin: center; }
     amp-video { object-fit: cover; }
   </style>
 </head>
 <body>
   <amp-story standalone title="__TITLE__" publisher="__PUBLISHER__" publisher-logo-src="__LOGO__" poster-portrait-src="__POSTER__" background-audio="__AUDIO__">
     __PAGES__
   </amp-story>
 </body>
</html>`;

// --- CONSTANTS ---
const ANIMATIONS = [
    { value: 'zoom-in', label: 'Zoom In' }, { value: 'zoom-out', label: 'Zoom Out' },
    { value: 'pan-left', label: 'Pan Left' }, { value: 'pan-right', label: 'Pan Right' },
    { value: 'pan-up', label: 'Pan Up' }, { value: 'pan-down', label: 'Pan Down' },
    { value: 'zoom-in-pan-right', label: 'Zoom In + Pan Right' }, { value: 'static', label: 'No Animation' },
];

const TEXT_ANIMATIONS = [
    { value: 'none', label: 'None' }, { value: 'fade-up', label: 'Fade Up' },
    { value: 'typewriter', label: 'Typewriter' }, { value: 'slide-in', label: 'Slide In Left' },
    { value: 'scale-up', label: 'Scale Up' },
];

// --- MUSIC CONFIGURATION ---
const STOCK_MUSIC = [
    { label: 'None', value: '' },
    // Original Sounds
    { label: 'Audience Boo', value: audioBoo },
    { label: 'Girls Changing Room', value: audioRoom },
    { label: 'Concert Applause', value: audioApplause },
    { label: 'Children Playing', value: audioChildren },
    // New Added Sounds from GitHub
    { label: 'Cinematic Short', value: audioCinematic },
    { label: 'Corporate Background', value: audioCorporate },
    { label: 'Main Track (1-47)', value: audioMain },
    { label: 'Rise to Inspire', value: audioRise },
    { label: 'Studio Kolomna', value: audioStudio },
    { label: 'The Groove', value: audioGroove },
    { label: 'Motivated Production', value: audioMotivated }
];

const FONTS = [
    { value: "'Hind Siliguri', sans-serif", label: 'Hind Siliguri' },
    { value: "'Tiro Bangla', serif", label: 'Tiro Bangla' },
    { value: "'Baloo Da 2', sans-serif", label: 'Baloo Da 2' },
    { value: "'Mina', sans-serif", label: 'Mina' },
    { value: "'Atma', cursive", label: 'Atma' },
    { value: "'Galada', cursive", label: 'Galada' },
    { value: "'Noto Serif Bengali', serif", label: 'Noto Serif Bengali' },
    { value: "'Montserrat', sans-serif", label: 'Montserrat' },
    { value: "'Oswald', sans-serif", label: 'Oswald' },
    { value: "'Playfair Display', serif", label: 'Playfair' },
    { value: "'Lato', sans-serif", label: 'Lato' },
];

const RESOLUTIONS = [
    { label: 'Story (9:16)', width: 720, height: 1280, aspect: '9/16' },
    { label: 'Post (4:5)', width: 1080, height: 1350, aspect: '4/5' },
    { label: 'Square (1:1)', width: 1080, height: 1080, aspect: '1/1' },
    { label: 'Landscape (16:9)', width: 1280, height: 720, aspect: '16/9' },
    { label: 'Portrait (3:4)', width: 960, height: 1280, aspect: '3/4' },
];

const DEFAULT_TEXT_STYLE = {
    color: '#ffffff', bg: 'transparent',
    font: "'Playfair Display', serif", size: 32, weight: '400',
    align: 'left', spacing: 0, lineHeight: 1.4,
    shadow: false, radius: 0,
    italic: false, uppercase: false,
    opacity: 1,
    animation: 'fade-up'
};

export default function StoryBuilder() {
    // --- STATE ---
    const [metadata, setMetadata] = useState({
        title: 'Metamorphosis Story', publisher: 'Metamorphosis',
        logo: 'https://cdn-icons-png.flaticon.com/512/2965/2965879.png',
        poster: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
        canonical: 'https://www.metamorphosis.com',
        audio: '',
        audioName: ''
    });

    const [resolution, setResolution] = useState(RESOLUTIONS[0]);

    const [pages, setPages] = useState([
        {
            id: 1,
            media: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
            mediaType: 'image', // 'image', 'video', or 'color'
            bgColor: '#1a1a1a', // For solid color backgrounds
            videoMuted: true, // Default to muted
            bgAnimation: 'zoom-in', duration: 5, panX: 50, panY: 50,
            filters: { brightness: 100, contrast: 100, saturate: 100 },
            overlay: { color: '#000000', opacity: 0.6, height: 60 },
            texts: [
                {
                    id: 'h1', content: 'Driving Change',
                    ...DEFAULT_TEXT_STYLE,
                    x: 6, y: 65, size: 56, weight: '700', bg: '#f97316', radius: 8, shadow: false, animation: 'fade-up'
                },
                {
                    id: 's1', content: 'Metamorphosis: Transforming business with modern solutions.',
                    ...DEFAULT_TEXT_STYLE,
                    x: 6, y: 75, size: 38, color: '#e0e0e0', shadow: false, animation: 'fade-up'
                }
            ],
            images: [] // Image/logo overlay layers
        }
    ]);

    const [activePageIndex, setActivePageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('content');
    const [activeLayerId, setActiveLayerId] = useState(null);
    const [isExportingVideo, setIsExportingVideo] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [exportScope, setExportScope] = useState('all');
    const [dragTarget, setDragTarget] = useState(null);
    const [previewScale, setPreviewScale] = useState(0.5);

    // Refs
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const previewRef = useRef(null);
    const audioRef = useRef(null);
    const backgroundVideoRef = useRef(null); // HIDDEN VIDEO ELEMENT FOR PLAYBACK
    const dragStartRef = useRef({ x: 0, y: 0, initialX: 0, initialY: 0 });
    const loadedImageRef = useRef(null);
    const loadedImageLayersRef = useRef([]); // For image overlay layers
    const requestRef = useRef(null);

    const activePage = pages[activePageIndex] || pages[0];
    const activeLayer = activePage.texts.find(t => t.id === activeLayerId) ||
        (activePage.images || []).find(img => img.id === activeLayerId);
    const activeLayerType = activePage.texts.find(t => t.id === activeLayerId) ? 'text' :
        (activePage.images || []).find(img => img.id === activeLayerId) ? 'image' : null;

    // --- INIT & SAFETY ---
    useEffect(() => {
        const allLayers = [...activePage.texts, ...(activePage.images || [])];
        if (allLayers.length > 0) {
            if (!activeLayerId || !allLayers.find(l => l.id === activeLayerId)) {
                if (activeLayerId) setActiveLayerId(null);
            }
        } else {
            setActiveLayerId(null);
        }
    }, [activePageIndex, activePage.texts, activePage.images, activeLayerId]);

    // --- RESIZING ENGINE ---
    useEffect(() => {
        if (!containerRef.current) return;
        const updateScale = () => {
            const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();
            if (containerW <= 0 || containerH <= 0) return;
            const isMobile = window.innerWidth < 768;
            const padding = isMobile ? 20 : 40;
            const availableW = Math.max(50, containerW - padding);
            const availableH = Math.max(50, containerH - padding);
            const scaleW = availableW / resolution.width;
            const scaleH = availableH / resolution.height;
            setPreviewScale(Math.min(scaleW, scaleH));
        };
        const observer = new ResizeObserver(updateScale);
        observer.observe(containerRef.current);
        window.addEventListener('resize', updateScale);
        updateScale();
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateScale);
        };
    }, [resolution]);

    // --- AUDIO & VIDEO SYNC ---
    useEffect(() => {
        // 1. Handle Background Audio
        if (audioRef.current) {
            if (isPlaying && metadata.audio) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) playPromise.catch(e => console.warn("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }

        // 2. Handle Background Video (If active page is video)
        if (backgroundVideoRef.current && activePage.mediaType === 'video') {
            if (isPlaying) {
                const playPromise = backgroundVideoRef.current.play();
                if (playPromise !== undefined) playPromise.catch(e => console.warn("Video play failed:", e));
            } else {
                backgroundVideoRef.current.pause();
            }
        }
    }, [isPlaying, metadata.audio, activePage.mediaType, activePageIndex]);

    // --- VIDEO SOURCE LOADER ---
    useEffect(() => {
        if (activePage.mediaType === 'video' && backgroundVideoRef.current) {
            backgroundVideoRef.current.src = activePage.media;
            // Respect the mute setting for the active page
            backgroundVideoRef.current.muted = activePage.videoMuted !== false;
            backgroundVideoRef.current.load();

            // If we are already playing, ensure new video starts playing
            if (isPlaying) backgroundVideoRef.current.play();
        }
    }, [activePage.media, activePage.mediaType]);

    // --- VIDEO MUTE SYNC ---
    // This effect ensures that if the user toggles mute while on the same video, it updates immediately
    useEffect(() => {
        if (activePage.mediaType === 'video' && backgroundVideoRef.current) {
            backgroundVideoRef.current.muted = activePage.videoMuted !== false;
        }
    }, [activePage.videoMuted, activePage.mediaType]);

    // --- IMAGE PRELOADER ---
    useEffect(() => {
        if (activePage.mediaType === 'image' && activePage.media) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = activePage.media;
            img.onload = () => {
                loadedImageRef.current = img;
                drawFrame(canvasRef.current?.getContext('2d'), { ...activePage, imgElement: img, imageElements: loadedImageLayersRef.current }, 1.0);
            };
        }
    }, [activePage.media, activePage.mediaType]);

    // --- IMAGE LAYER PRELOADER ---
    useEffect(() => {
        const images = activePage.images || [];
        if (images.length === 0) {
            loadedImageLayersRef.current = [];
            return;
        }

        const loadImages = images.map(imgLayer => {
            return new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.src = imgLayer.src;
                img.onload = () => resolve(img);
                img.onerror = () => resolve(null);
            });
        });

        Promise.all(loadImages).then(loaded => {
            loadedImageLayersRef.current = loaded;
            // Redraw canvas with new images
            const ctx = canvasRef.current?.getContext('2d');
            if (ctx) drawFrame(ctx, { ...activePage, imgElement: loadedImageRef.current, videoElement: backgroundVideoRef.current, imageElements: loaded }, 1.0);
        });
    }, [activePage.images]);


    // --- FUNCTIONS ---

    const handleResolutionChange = (e) => {
        const label = e.target.value;
        const newRes = RESOLUTIONS.find(r => r.label === label);
        if (newRes) {
            setResolution(newRes);
            setIsPlaying(false);
        }
    };

    const updatePage = useCallback((updates) => {
        setPages(prevPages => {
            const newPages = [...prevPages];
            newPages[activePageIndex] = { ...newPages[activePageIndex], ...updates };
            return newPages;
        });
    }, [activePageIndex]);

    const updateTextLayer = useCallback((id, field, value) => {
        setPages(prevPages => {
            const newPages = [...prevPages];
            const currentPage = newPages[activePageIndex];
            const newTexts = currentPage.texts.map(t => t.id === id ? { ...t, [field]: value } : t);
            newPages[activePageIndex] = { ...currentPage, texts: newTexts };
            return newPages;
        });
    }, [activePageIndex]);

    const handleNestedChange = (parent, field, value) => {
        setPages(prevPages => {
            const newPages = [...prevPages];
            newPages[activePageIndex] = {
                ...newPages[activePageIndex],
                [parent]: { ...newPages[activePageIndex][parent], [field]: value }
            };
            return newPages;
        });
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => updatePage({ media: reader.result, mediaType: 'image' });
            reader.readAsDataURL(file);
        }
    };

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Use ObjectURL for video performance
            const url = URL.createObjectURL(file);
            // Default videoMuted to true. Detect duration to set videoEnd.
            const tempVid = document.createElement('video');
            tempVid.src = url;
            tempVid.onloadedmetadata = () => {
                const dur = tempVid.duration || 5;
                updatePage({
                    media: url,
                    mediaType: 'video',
                    videoMuted: true,
                    videoStart: 0,
                    videoEnd: dur,
                    duration: Math.ceil(dur), // Auto-set slide duration to video duration
                    videoScale: 1,
                    videoPanX: 0,
                    videoPanY: 0
                });
            };
        }
    };

    const handleColorBackgroundSelect = (color) => {
        updatePage({ bgColor: color, mediaType: 'color' });
    };

    const handleAudioUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setMetadata(prev => ({ ...prev, audio: url, audioName: file.name }));
        }
    };

    const addTextLayer = () => {
        const newId = Date.now().toString();
        const newText = {
            id: newId, content: 'New Text',
            ...DEFAULT_TEXT_STYLE, x: 50, y: 50, bg: '#ffffff', color: '#000000', radius: 4
        };
        setPages(prevPages => {
            const newPages = [...prevPages];
            const currentPage = newPages[activePageIndex];
            newPages[activePageIndex] = { ...currentPage, texts: [...currentPage.texts, newText] };
            return newPages;
        });
        setActiveLayerId(newId);
        setActiveTab('design');
    };

    const addImageLayer = (imageSrc) => {
        const newId = Date.now().toString();
        const newImage = {
            id: newId, src: imageSrc,
            x: 50, y: 50, width: 30, opacity: 1 // width as percentage
        };
        setPages(prevPages => {
            const newPages = [...prevPages];
            const currentPage = newPages[activePageIndex];
            const images = currentPage.images || [];
            newPages[activePageIndex] = { ...currentPage, images: [...images, newImage] };
            return newPages;
        });
        setActiveLayerId(newId);
        setActiveTab('design');
    };

    const updateImageLayer = (id, field, value) => {
        setPages(prevPages => {
            const newPages = [...prevPages];
            const currentPage = newPages[activePageIndex];
            const newImages = (currentPage.images || []).map(img => img.id === id ? { ...img, [field]: value } : img);
            newPages[activePageIndex] = { ...currentPage, images: newImages };
            return newPages;
        });
    };

    const deleteLayer = (id) => {
        setPages(prevPages => {
            const newPages = [...prevPages];
            const currentPage = newPages[activePageIndex];
            newPages[activePageIndex] = {
                ...currentPage,
                texts: currentPage.texts.filter(t => t.id !== id),
                images: (currentPage.images || []).filter(img => img.id !== id)
            };
            return newPages;
        });
        if (activeLayerId === id) setActiveLayerId(null);
    };

    const addNewPage = () => {
        setPages(prevPages => {
            const lastPage = prevPages[prevPages.length - 1];
            const newId = Date.now();
            const newPage = {
                ...lastPage, id: newId,
                texts: lastPage.texts.map(t => ({ ...t, id: Math.random().toString() })),
                images: (lastPage.images || []).map(img => ({ ...img, id: Math.random().toString() }))
            };
            return [...prevPages, newPage];
        });
        setActivePageIndex(prev => prev + 1);
    };

    const deletePage = () => {
        if (pages.length === 1) return alert("At least one page required.");
        setPages(prev => prev.filter((_, i) => i !== activePageIndex));
        setActivePageIndex(prev => Math.max(0, prev - 1));
    };

    // --- DRAGGING SYSTEM ---
    const getClientCoordinates = (e) => {
        if (e.touches && e.touches.length > 0) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        return { x: e.clientX, y: e.clientY };
    };

    const startDrag = (e, target) => {
        if (target !== 'bg') { e.stopPropagation(); setActiveLayerId(target); setActiveTab('design'); }
        if (e.type !== 'touchstart') e.preventDefault();

        let initialX = 0, initialY = 0;
        if (target === 'bg') {
            initialX = activePage.panX; initialY = activePage.panY;
        } else {
            const textLayer = activePage.texts.find(t => t.id === target);
            const imageLayer = (activePage.images || []).find(img => img.id === target);
            const layer = textLayer || imageLayer;
            if (layer) { initialX = layer.x; initialY = layer.y; }
        }
        const coords = getClientCoordinates(e);
        setDragTarget(target);
        dragStartRef.current = { x: coords.x, y: coords.y, initialX, initialY };
    };

    const handleMove = useCallback((e) => {
        if (!dragTarget) return;
        const coords = getClientCoordinates(e);
        const dxPx = coords.x - dragStartRef.current.x;
        const dyPx = coords.y - dragStartRef.current.y;

        if (dragTarget === 'bg') {
            const sensitivity = 0.15;
            const dX = (dxPx / previewScale) * sensitivity;
            const dY = (dyPx / previewScale) * sensitivity;
            updatePage({ panX: Math.min(100, Math.max(0, dragStartRef.current.initialX - dX)), panY: Math.min(100, Math.max(0, dragStartRef.current.initialY - dY)) });
        } else {
            const dX = (dxPx / (resolution.width * previewScale)) * 100;
            const dY = (dyPx / (resolution.height * previewScale)) * 100;
            const newX = Math.min(100, Math.max(0, dragStartRef.current.initialX + dX));
            const newY = Math.min(100, Math.max(0, dragStartRef.current.initialY + dY));

            // Check if it's a text or image layer
            const isTextLayer = activePage.texts.find(t => t.id === dragTarget);
            const isImageLayer = (activePage.images || []).find(img => img.id === dragTarget);

            if (isTextLayer) {
                updateTextLayer(dragTarget, 'x', newX);
                updateTextLayer(dragTarget, 'y', newY);
            } else if (isImageLayer) {
                updateImageLayer(dragTarget, 'x', newX);
                updateImageLayer(dragTarget, 'y', newY);
            }
        }
    }, [dragTarget, previewScale, resolution, updatePage, updateTextLayer, updateImageLayer]);

    const handleEnd = useCallback(() => setDragTarget(null), []);

    useEffect(() => {
        if (dragTarget) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchmove', handleMove, { passive: false });
            window.addEventListener('touchend', handleEnd);
        }
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
        };
    }, [dragTarget, handleMove, handleEnd]);

    // --- INLINE FONT PARSER ---
    // Parses text like: "{Playfair:Hello} {Hind Siliguri:বিশ্ব}" into segments
    const parseInlineFonts = (text, defaultFont) => {
        const segments = [];
        const regex = /\{([^:]+):([^}]+)\}/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            // Add text before the match (if any) with default font
            if (match.index > lastIndex) {
                const plainText = text.substring(lastIndex, match.index);
                if (plainText) segments.push({ font: defaultFont, text: plainText });
            }

            // Add the matched segment with custom font
            const fontName = match[1].trim();
            const segmentText = match[2];
            // Find the font value from FONTS array
            const font = FONTS.find(f => f.label === fontName);
            segments.push({
                font: font ? font.value : defaultFont,
                text: segmentText
            });

            lastIndex = regex.lastIndex;
        }

        // Add remaining text with default font
        if (lastIndex < text.length) {
            const remainingText = text.substring(lastIndex);
            if (remainingText) segments.push({ font: defaultFont, text: remainingText });
        }

        // If no segments found, return the whole text with default font
        if (segments.length === 0) {
            segments.push({ font: defaultFont, text });
        }

        return segments;
    };

    // --- RENDERER ---
    const drawFrame = (ctx, pageData, progress) => {
        if (!ctx) return;
        const { width, height } = ctx.canvas;
        ctx.fillStyle = '#111'; ctx.fillRect(0, 0, width, height);

        // DRAW BACKGROUND (Image, Video, or Solid Color)
        if (pageData.mediaType === 'color') {
            // Solid color background
            ctx.fillStyle = pageData.bgColor || '#1a1a1a';
            ctx.fillRect(0, 0, width, height);
        } else {
            // Image or Video background
            const mediaSource = pageData.mediaType === 'video' ? pageData.videoElement : pageData.imgElement;

            if (mediaSource) {
                ctx.save();
                if (pageData.filters) ctx.filter = `brightness(${pageData.filters.brightness}%) contrast(${pageData.filters.contrast}%) saturate(${pageData.filters.saturate}%)`;

                let scale = 1, tx = 0, ty = 0;
                const moveX = width * 0.1; const moveY = height * 0.1;

                switch (pageData.bgAnimation) {
                    case 'zoom-in': scale = 1 + (0.15 * progress); break;
                    case 'zoom-out': scale = 1.15 - (0.15 * progress); break;
                    case 'pan-left': scale = 1.2; tx = (moveX * 0.5) - (moveX * progress); break;
                    case 'pan-right': scale = 1.2; tx = -(moveX * 0.5) + (moveX * progress); break;
                    case 'pan-up': scale = 1.2; ty = (moveY * 0.5) - (moveY * progress); break;
                    case 'pan-down': scale = 1.2; ty = -(moveY * 0.5) + (moveY * progress); break;
                    case 'zoom-in-pan-right': scale = 1.1 + (0.1 * progress); tx = -(moveX * 0.5) + (moveX * progress); break;
                    default: scale = 1;
                }

                ctx.translate(width / 2, height / 2); ctx.scale(scale, scale); ctx.translate(tx, ty); ctx.translate(-width / 2, -height / 2);

                // --- VIDEO CROP/TRANSFORM LOGIC ---
                if (pageData.mediaType === 'video' && pageData.videoScale) {
                    const vs = pageData.videoScale;
                    const vx = width * ((pageData.videoPanX || 0) / 100);
                    const vy = height * ((pageData.videoPanY || 0) / 100);

                    ctx.translate(width / 2, height / 2);
                    ctx.scale(vs, vs);
                    ctx.translate(vx, vy);
                    ctx.translate(-width / 2, -height / 2);
                }

                // Aspect Ratio Logic
                let srcW, srcH;
                if (pageData.mediaType === 'video') {
                    srcW = mediaSource.videoWidth || 100;
                    srcH = mediaSource.videoHeight || 100;
                } else {
                    srcW = mediaSource.width;
                    srcH = mediaSource.height;
                }

                const mediaAspect = srcW / srcH;
                const canvasAspect = width / height;
                let renderW, renderH, offX, offY;

                if (mediaAspect > canvasAspect) {
                    renderH = height; renderW = height * mediaAspect;
                    offX = (width - renderW) * (pageData.panX / 100); offY = 0;
                } else {
                    renderW = width; renderH = width / mediaAspect;
                    offX = 0; offY = (height - renderH) * (pageData.panY / 100);
                }

                ctx.drawImage(mediaSource, offX, offY, renderW, renderH);
                ctx.restore();
            }
        }

        const ov = pageData.overlay || { color: '#000000', opacity: 0.6, height: 40 };
        if (ov.height > 0) {
            const gradient = ctx.createLinearGradient(0, height * (1 - (ov.height / 100)), 0, height);
            gradient.addColorStop(0, 'rgba(0,0,0,0)'); gradient.addColorStop(1, ov.color);
            ctx.save(); ctx.globalAlpha = ov.opacity; ctx.fillStyle = gradient;
            ctx.fillRect(0, height * (1 - (ov.height / 100)), width, height * (ov.height / 100)); ctx.restore();
        }

        (pageData.texts || []).forEach(layer => {
            ctx.save();
            let alpha = layer.opacity !== undefined ? layer.opacity : 1;
            let offsetY = 0, offsetX = 0;
            let displayText = layer.content;
            if (layer.uppercase) displayText = displayText.toUpperCase();

            if (progress < 1.0) {
                if (layer.animation === 'fade-up') { alpha *= Math.min(1, progress * 3); offsetY = (1 - Math.min(1, progress * 3)) * 30; }
                else if (layer.animation === 'slide-in') { alpha *= Math.min(1, progress * 3); offsetX = -(1 - Math.min(1, progress * 3)) * 100; }
                else if (layer.animation === 'typewriter') { const charCount = Math.floor(layer.content.length * Math.min(1, progress * 2)); displayText = layer.content.substring(0, charCount); if (layer.uppercase) displayText = displayText.toUpperCase(); }
                else if (layer.animation === 'scale-up') { const s = 0.5 + (0.5 * Math.min(1, progress * 3)); ctx.translate(width * (layer.x / 100), height * (layer.y / 100)); ctx.scale(s, s); ctx.translate(-width * (layer.x / 100), -height * (layer.y / 100)); }
            }

            ctx.globalAlpha = alpha; ctx.translate(offsetX, offsetY);
            const x = width * (layer.x / 100); const y = height * (layer.y / 100);
            const cleanFont = layer.font.replace(/"/g, "'"); const fontStyle = layer.italic ? 'italic' : 'normal';
            ctx.font = `${fontStyle} ${layer.weight} ${layer.size}px ${cleanFont}`;
            ctx.textAlign = layer.align; ctx.textBaseline = 'top';
            if (layer.spacing > 0) ctx.letterSpacing = `${layer.spacing}px`;

            // --- ENHANCED WORD WRAP WITH LINE BREAKS ---
            const maxWidth = width * 0.85; // Allow 15% padding on sides

            // First, split by explicit line breaks (\n)
            const paragraphs = displayText.split('\n');
            let lines = [];

            // Then apply word wrapping to each paragraph
            paragraphs.forEach((paragraph, pIndex) => {
                if (paragraph.trim() === '') {
                    // Preserve empty lines
                    lines.push('');
                } else {
                    const words = paragraph.split(' ');
                    let currentLine = words[0] || '';

                    for (let i = 1; i < words.length; i++) {
                        const word = words[i];
                        const testWidth = ctx.measureText(currentLine + " " + word).width;
                        if (testWidth < maxWidth) {
                            currentLine += " " + word;
                        } else {
                            lines.push(currentLine);
                            currentLine = word;
                        }
                    }
                    if (currentLine) lines.push(currentLine);
                }
            });
            // -----------------------

            const lineHeightPx = layer.size * layer.lineHeight;

            if (layer.bg && layer.bg !== 'transparent') {
                // Calculate Box Dimensions based on max line width
                let maxLineWidth = 0;
                lines.forEach(l => {
                    const m = ctx.measureText(l);
                    if (m.width > maxLineWidth) maxLineWidth = m.width;
                });

                const paddingX = 40;
                const paddingY = 30; // Increased padding for vertical centering feel
                const pW = maxLineWidth + paddingX;
                const pH = (lines.length * lineHeightPx) + paddingY;
                let rectX = x;
                if (layer.align === 'center') rectX = x - (pW / 2);
                if (layer.align === 'right') rectX = x - pW;

                if (layer.shadow) { ctx.shadowColor = 'rgba(0,0,0,0.4)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4; }
                ctx.fillStyle = layer.bg; ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(rectX, y, pW, pH, layer.radius || 0); else ctx.rect(rectX, y, pW, pH);
                ctx.fill();

                ctx.shadowColor = 'transparent'; ctx.fillStyle = layer.color;

                // --- VERTICAL CENTERING LOGIC ---
                ctx.textBaseline = 'middle';
                const totalTextH = lines.length * lineHeightPx;
                const boxCenterY = y + (pH / 2);
                // Offset to start drawing the first line so the entire block is centered
                const startTextY = boxCenterY - (totalTextH / 2) + (lineHeightPx / 2);

                lines.forEach((line, i) => {
                    let textX = rectX + (paddingX / 2);
                    if (layer.align === 'center') textX = rectX + (pW / 2);
                    if (layer.align === 'right') textX = rectX + pW - (paddingX / 2);
                    ctx.fillText(line, textX, startTextY + (i * lineHeightPx));
                });

            } else {
                if (layer.shadow) { ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 4; ctx.shadowOffsetY = 2; }
                ctx.fillStyle = layer.color;
                ctx.textBaseline = 'top'; // Default for non-boxed text
                lines.forEach((line, i) => {
                    ctx.fillText(line, x, y + (i * lineHeightPx));
                });
            }
            ctx.restore();
        });

        // --- RENDER IMAGE LAYERS ---
        (pageData.images || []).forEach((imgLayer, index) => {
            const imgEl = pageData.imageElements ? pageData.imageElements[index] : null;
            if (!imgEl || !imgEl.complete) return;

            ctx.save();
            ctx.globalAlpha = imgLayer.opacity || 1;

            const imgX = width * (imgLayer.x / 100);
            const imgY = height * (imgLayer.y / 100);
            const imgWidth = width * (imgLayer.width / 100);
            const imgHeight = (imgWidth / imgEl.width) * imgEl.height; // maintain aspect ratio

            ctx.drawImage(imgEl, imgX, imgY, imgWidth, imgHeight);
            ctx.restore();
        });
    };

    // --- EXPORT ---
    const loadPageAssets = (page) => new Promise(resolve => {
        if (page.mediaType === 'image') {
            const img = new Image(); img.crossOrigin = "anonymous"; img.src = page.media;
            img.onload = () => resolve({ ...page, imgElement: img });
            img.onerror = () => resolve({ ...page, imgElement: null });
        } else if (page.mediaType === 'video') {
            const vid = document.createElement('video');
            vid.src = page.media; vid.crossOrigin = "anonymous";
            vid.muted = page.videoMuted !== false;
            vid.onloadeddata = () => resolve({ ...page, videoElement: vid });
            vid.onerror = () => resolve({ ...page, videoElement: null });
        }
    });



    const generateVideo = async () => {
        if (!window.MediaRecorder) return alert("Export not supported.");
        setIsExportingVideo(true); setShowDownloadMenu(false); setIsPlaying(false); setExportProgress(0);
        const canvas = canvasRef.current; const ctx = canvas.getContext('2d');
        canvas.width = resolution.width; canvas.height = resolution.height;

        const pagesToRender = exportScope === 'current' ? [activePage] : pages;
        const loadedPages = await Promise.all(pagesToRender.map(loadPageAssets));

        // Audio Context Setup
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const dest = audioCtx.createMediaStreamDestination();
        const audioSources = []; // Keep track to disconnect/close later if needed

        // 1. Background Music
        if (metadata.audio) {
            try {
                const response = await fetch(metadata.audio);
                const arrayBuffer = await response.arrayBuffer();
                const decodedAudio = await audioCtx.decodeAudioData(arrayBuffer);
                const source = audioCtx.createBufferSource();
                source.buffer = decodedAudio;
                source.loop = true; // Optional: assume background music loops
                source.connect(dest);
                source.start(0);
                audioSources.push(source);
            } catch (e) {
                console.error("Failed to load background audio", e);
            }
        }

        // 2. Video Elements Audio
        loadedPages.forEach(page => {
            if (page.videoElement) {
                // Ensure unmute for recording if it was muted by default logic, 
                // but checking page.videoMuted to respect user decision if they EXPLICITLY muted it?
                // The user complaint is "uploaded video with sound... have no sounds".
                // Usually `videoMuted` defaults to true in the state for preview. 
                // For export, we likely want sound UNLESS specifically disabled.
                // However, `loadPageAssets` sets `vid.muted = page.videoMuted !== false`.
                // If we un-mute the element here, it will play to the destination.

                // IMPORTANT: createMediaElementSource requires the element to be unmuted to flow audio data 
                // in some browsers (or at least volume > 0). 
                // But we don't want it blasting the user's speakers. 
                // Connecting to 'dest' (MediaStreamDestination) acts as a sink.
                // If we DON'T connect to audioCtx.destination, it won't be audible to the user, acting like a "mute" from their perspective, 
                // but valid for recording.

                const source = audioCtx.createMediaElementSource(page.videoElement);
                source.connect(dest);

                // We must ensure the video element is technically "unmuted" for the audio to flow 
                // into the graph, even if not connected to speakers.
                if (page.videoMuted !== true) { // Logic: if NOT explicitly muted by user preference...
                    // Wait, the defaulting logic was `videoMuted: true` on upload. 
                    // Users might not have "unmuted" it in UI but expect it to have sound in export.
                    // Let's assume for now: If the user explicitly clicked "sound on", we record.
                    // If they never touched it, it's muted? That matches preview. 
                    // BUT the user said "i uploaded... didnt upload any audio separately... but after download video have no sounds".
                    // This implies they EXPECT sound. 
                    // Let's force unmute the element during export so it captures sound.
                    page.videoElement.muted = false;
                }
            }
        });

        const canvasStream = canvas.captureStream(30);
        const combinedStream = new MediaStream([
            ...canvasStream.getVideoTracks(),
            ...dest.stream.getAudioTracks()
        ]);

        // Fallback or selection of mimeType. Prioritize MP4.
        let mimeType = 'video/webm';
        let extension = 'webm';

        if (MediaRecorder.isTypeSupported('video/mp4')) {
            mimeType = 'video/mp4';
            extension = 'mp4';
        } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
            mimeType = 'video/webm;codecs=vp9';
        }

        const mediaRecorder = new MediaRecorder(combinedStream, { mimeType, videoBitsPerSecond: 8000000 });
        const chunks = [];
        mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = `${metadata.title.replace(/\s+/g, '-')}.${extension}`; a.click();

            // Cleanup
            audioCtx.close();
            setIsExportingVideo(false);
            // Redraw current state
            drawFrame(ctx, { ...activePage, mediaType: activePage.mediaType, imgElement: loadedImageRef.current, videoElement: backgroundVideoRef.current }, 1.0);
        };

        mediaRecorder.start();
        const FPS = 30;
        await document.fonts.ready;

        for (let i = 0; i < loadedPages.length; i++) {
            const page = loadedPages[i];
            const durationFrames = page.duration * FPS;

            if (page.videoElement) {
                page.videoElement.currentTime = page.videoStart || 0;
                try {
                    await page.videoElement.play();
                } catch (e) { console.error("Video play failed", e); }
            }

            for (let frame = 0; frame < durationFrames; frame++) {
                const progress = frame / durationFrames;
                // If video is buffering, await? Simplified here.
                drawFrame(ctx, page, progress);
                await new Promise(r => setTimeout(r, 1000 / FPS));
                setExportProgress(prev => Math.min(99, prev + (100 / (loadedPages.length * durationFrames))));
            }

            if (page.videoElement) {
                page.videoElement.pause();
            }
        }
        mediaRecorder.stop();
        setExportProgress(100);
    };

    const downloadJPG = async () => {
        setShowDownloadMenu(false);
        const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d');
        canvas.width = resolution.width; canvas.height = resolution.height;
        const loaded = await loadPageAssets(activePage);
        drawFrame(ctx, loaded, 1.0);
        const a = document.createElement('a'); a.download = 'slide.jpg'; a.href = canvas.toDataURL('image/jpeg', 0.9); a.click();
    };

    const generateHTML = () => {
        setShowDownloadMenu(false);
        let pagesHTML = '';
        pages.forEach((page) => {
            const imgFilters = `filter: brightness(${page.filters.brightness}%) contrast(${page.filters.contrast}%) saturate(${page.filters.saturate}%);`;
            const ov = page.overlay;
            const alphaHex = Math.round(ov.opacity * 255).toString(16).padStart(2, '0');
            const gradStyle = `background: linear-gradient(to top, ${ov.color}${alphaHex} 0%, transparent 100%); height: ${ov.height}%;`;

            let layersHTML = page.texts.map(t => {
                const cleanFont = t.font.replace(/"/g, "'");
                let animAttr = '';
                if (t.animation === 'fade-up') animAttr = 'animate-in="fly-in-bottom" animate-in-duration="1s"';
                else if (t.animation === 'slide-in') animAttr = 'animate-in="fly-in-left" animate-in-duration="1s"';
                else if (t.animation === 'scale-up') animAttr = 'animate-in="zoom-in" animate-in-duration="1s"';
                else if (t.animation === 'typewriter') animAttr = 'animate-in="fade-in" animate-in-duration="1s"';
                const style = `color: ${t.color}; font-family: ${cleanFont}; font-size: ${t.size}px; font-weight: ${t.weight}; text-align: ${t.align}; font-style: ${t.italic ? 'italic' : 'normal'}; text-transform: ${t.uppercase ? 'uppercase' : 'none'}; line-height: ${t.lineHeight}; opacity: ${t.opacity}; letter-spacing: ${t.spacing}px;`;
                const bgStyle = t.bg !== 'transparent' ? `background-color: ${t.bg}; padding: 8px 16px; border-radius: ${t.radius}px; box-shadow: ${t.shadow ? '0 4px 6px rgba(0,0,0,0.3)' : 'none'}; display: inline-block;` : `text-shadow: ${t.shadow ? '0 2px 4px rgba(0,0,0,0.8)' : 'none'};`;
                // Convert \n to <br/> for HTML export
                const contentWithBreaks = t.content.replace(/\n/g, '<br/>');
                return `<div class="draggable-element" style="left: ${t.x}%; top: ${t.y}%; width: 90%;" ${animAttr}><div style="${style} ${bgStyle}">${contentWithBreaks}</div></div>`;
            }).join('');

            let mediaLayer = '';
            if (page.mediaType === 'color') {
                mediaLayer = `<amp-story-grid-layer template="fill"><div style="background-color: ${page.bgColor}; width: 100%; height: 100%;"></div></amp-story-grid-layer>`;
            } else if (page.mediaType === 'video') {
                mediaLayer = `<amp-story-grid-layer template="fill"><amp-video autoplay loop width="${resolution.width}" height="${resolution.height}" layout="responsive" poster="" style="${imgFilters}"><source src="${page.media}" type="video/mp4" /></amp-video></amp-story-grid-layer>`;
            } else {
                mediaLayer = `<amp-story-grid-layer template="fill"><amp-img src="${page.media}" width="${resolution.width}" height="${resolution.height}" layout="responsive" object-position="${page.panX}% ${page.panY}%" animate-in="${page.bgAnimation === 'zoom-in-pan-right' ? 'zoom-in' : page.bgAnimation}" animate-in-duration="${page.duration * 1.5}s" style="${imgFilters}"></amp-img></amp-story-grid-layer>`;
            }

            pagesHTML += `<amp-story-page id="page-${page.id}" auto-advance-after="${page.duration}s">
           ${mediaLayer}
           <amp-story-grid-layer template="vertical" class="gradient-overlay" style="${gradStyle}">${layersHTML}</amp-story-grid-layer>
         </amp-story-page>`;
        });

        const finalHTML = AMP_BOILERPLATE
            .replace('__PAGES__', pagesHTML)
            .replace(/__TITLE__/g, metadata.title)
            .replace('__PUBLISHER__', metadata.publisher)
            .replace('__LOGO__', metadata.logo)
            .replace('__POSTER__', metadata.poster)
            .replace('__CANONICAL_URL__', metadata.canonical)
            .replace('__AUDIO__', metadata.audio || '');

        const blob = new Blob([finalHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `story.html`; document.body.appendChild(a); a.click(); document.body.removeChild(a);
    };

    // --- PREVIEW LOOP ---
    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d');

        const render = (time) => {
            const img = loadedImageRef.current;
            const vid = backgroundVideoRef.current;
            const pageData = { ...activePage, imgElement: img, videoElement: vid, imageElements: loadedImageLayersRef.current };

            if (isPlaying) {
                const duration = activePage.duration * 1000;
                if (!requestRef.current.startTime) requestRef.current.startTime = time;
                let elapsed = time - requestRef.current.startTime;

                if (elapsed > duration) {
                    const nextIndex = (activePageIndex + 1) % pages.length;
                    setActivePageIndex(nextIndex);
                    return;
                }

                drawFrame(ctx, pageData, elapsed / duration);
                requestRef.current.id = requestAnimationFrame(render);
            } else {
                drawFrame(ctx, pageData, 1.0);
            }
        };

        if (isPlaying) {
            requestRef.current = { startTime: null };
            requestRef.current.id = requestAnimationFrame(render);
        } else {
            render(performance.now());
            if (requestRef.current?.id) cancelAnimationFrame(requestRef.current.id);
        }
        return () => { if (requestRef.current?.id) cancelAnimationFrame(requestRef.current.id); };
    }, [activePage, isPlaying, resolution, previewScale, activePageIndex, pages.length]);

    return (
        <div className="flex flex-col md:flex-row h-[100dvh] bg-black text-white overflow-hidden font-sans selection:bg-orange-500/30">
            <link href="https://fonts.googleapis.com/css2?family=Atma:wght@300;400;500;600;700&family=Baloo+Da+2:wght@400;500;600;700;800&family=Galada&family=Hind+Siliguri:wght@300;400;500;600;700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Mina:wght@400;700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Serif+Bengali:wght@100..900&family=Oswald:wght@200..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Tiro+Bangla:ital@0;1&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

            <div className="hidden">
                <canvas key={resolution.label} ref={canvasRef} width={resolution.width} height={resolution.height} />
                <audio ref={audioRef} key={metadata.audio} src={metadata.audio} loop crossOrigin="anonymous" />
                {/* Hidden Video for Canvas Rendering */}
                <video ref={backgroundVideoRef} loop muted crossOrigin="anonymous" playsInline />
            </div>

            <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden relative">
                <div className="relative w-full h-[50vh] md:h-full md:flex-1 bg-[#121212] flex flex-col items-center justify-center overflow-hidden select-none order-first md:order-last shrink-0 border-b md:border-b-0 md:border-l border-white/10">
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
                        <button onClick={() => !isExportingVideo && setShowDownloadMenu(!showDownloadMenu)} className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 shadow-xl flex items-center gap-2 transition-transform hover:scale-105 active:scale-95" disabled={isExportingVideo}>
                            {isExportingVideo ? <><Loader2 className="w-4 h-4 animate-spin text-orange-500" /><span className="font-mono">{Math.round(exportProgress)}%</span></> : <><Download className="w-4 h-4" /><span>Export</span></>}
                        </button>
                        {showDownloadMenu && (
                            <div className="absolute right-0 top-12 w-60 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl p-1.5 z-50 flex flex-col gap-1">
                                <button onClick={downloadJPG} className="w-full text-left p-3 hover:bg-gray-800 rounded-lg text-sm text-gray-200 flex gap-3 transition-colors items-center"><Camera className="w-4 h-4 text-pink-500" /> JPG Snapshot</button>
                                <div className="h-px bg-gray-800 mx-2 my-1"></div>
                                <button onClick={() => { setExportScope('current'); generateVideo(); }} className="w-full text-left p-3 hover:bg-gray-800 rounded-lg text-sm text-gray-200 flex gap-3 transition-colors items-center"><Play className="w-4 h-4 text-blue-500" /> Video (Current Slide)</button>
                                <button onClick={() => { setExportScope('all'); generateVideo(); }} className="w-full text-left p-3 hover:bg-gray-800 rounded-lg text-sm text-gray-200 flex gap-3 transition-colors items-center"><FilmIcon className="w-4 h-4 text-purple-500" /> Video (Full Story)</button>
                                <div className="h-px bg-gray-800 mx-2 my-1"></div>
                                <button onClick={generateHTML} className="w-full text-left p-3 hover:bg-gray-800 rounded-lg text-sm text-gray-200 flex gap-3 transition-colors items-center"><FileCode className="w-4 h-4 text-orange-500" /> HTML Package</button>
                            </div>
                        )}
                    </div>

                    <div className="absolute bottom-4 flex items-center gap-3 md:gap-4 z-40 pointer-events-auto bg-black/60 backdrop-blur-md p-1.5 px-3 rounded-full border border-white/10 shadow-xl">
                        <button onClick={() => setActivePageIndex(Math.max(0, activePageIndex - 1))} className="p-1.5 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft className="text-white w-4 h-4 md:w-5 md:h-5" /></button>
                        <button onClick={() => setIsPlaying(!isPlaying)} className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${isPlaying ? 'bg-white text-black' : 'bg-orange-500 text-white'} shadow-lg transform active:scale-95 transition-all`}>{isPlaying ? <Pause fill="currentColor" className="w-3 h-3 md:w-4 md:h-4" /> : <Play fill="currentColor" className="w-3 h-3 md:w-4 md:h-4 ml-0.5" />}</button>
                        <div className="flex gap-1.5 px-1 h-2 items-center">{pages.map((_, i) => <div key={i} onClick={() => setActivePageIndex(i)} className={`rounded-full cursor-pointer transition-all ${i === activePageIndex ? 'bg-white w-2 h-2 md:w-2.5 md:h-2.5' : 'bg-white/30 w-1.5 h-1.5 md:w-2 md:h-2'}`} />)}<button onClick={addNewPage} className="w-4 h-4 md:w-5 md:h-5 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center text-[10px] font-bold active:scale-95 transition-transform">+</button></div>
                        {pages.length > 1 && <button onClick={deletePage} className="p-1.5 hover:bg-red-500/20 rounded-full transition-colors group" title="Delete current slide"><Trash2 className="text-white/60 group-hover:text-red-500 w-4 h-4 md:w-5 md:h-5" /></button>}
                        <button onClick={() => setActivePageIndex(Math.min(pages.length - 1, activePageIndex + 1))} className="p-1.5 hover:bg-white/10 rounded-full transition-colors"><ChevronRight className="text-white w-4 h-4 md:w-5 md:h-5" /></button>
                    </div>

                    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative p-4">
                        <div ref={previewRef} className="relative shadow-2xl"
                            style={{ width: resolution.width, height: resolution.height, transform: `scale(${previewScale})`, transformOrigin: 'center center' }}
                            onMouseDown={(e) => startDrag(e, 'bg')}
                            onTouchStart={(e) => startDrag(e, 'bg')}>
                            <canvas key={resolution.label} ref={canvasRef} width={resolution.width} height={resolution.height} className="w-full h-full block bg-[#1a1a1a]" />
                            {(activePage.texts || []).map(text => {
                                const cleanFont = text.font.replace(/"/g, "'");
                                let transformX = '0';
                                if (text.align === 'center') transformX = '-50%';
                                if (text.align === 'right') transformX = '-100%';
                                return (
                                    <div key={text.id}
                                        onMouseDown={(e) => startDrag(e, text.id)}
                                        onTouchStart={(e) => startDrag(e, text.id)}
                                        className={`absolute cursor-move transition-colors ${activeLayerId === text.id ? 'border-dashed border-2 border-orange-500/80 z-50' : 'border-transparent hover:border-white/20 z-10'}`}
                                        style={{
                                            left: `${text.x}%`, top: `${text.y}%`, transform: `translate(${transformX}, 0)`,
                                            minWidth: '50px', padding: text.bg !== 'transparent' ? '8px 16px' : '0px'
                                        }}>
                                        <div style={{
                                            fontFamily: cleanFont, fontSize: `${text.size}px`, fontWeight: text.weight,
                                            letterSpacing: `${text.spacing}px`, lineHeight: text.lineHeight, color: 'transparent',
                                            userSelect: 'none', whiteSpace: 'nowrap', pointerEvents: 'none'
                                        }}>{text.uppercase ? text.content.toUpperCase() : text.content}</div>
                                        {activeLayerId === text.id && <div className="absolute -top-6 -right-6 bg-orange-500 text-white p-2.5 rounded-full shadow-lg scale-90 md:scale-100 pointer-events-none"><Move className="w-4 h-4" /></div>}
                                    </div>
                                );
                            })}
                            {(activePage.images || []).map((imgLayer, index) => {
                                const imgEl = loadedImageLayersRef.current[index];
                                if (!imgEl) return null;

                                const imgWidth = resolution.width * (imgLayer.width / 100);
                                const imgHeight = (imgWidth / imgEl.width) * imgEl.height;

                                return (
                                    <div key={imgLayer.id}
                                        onMouseDown={(e) => startDrag(e, imgLayer.id)}
                                        onTouchStart={(e) => startDrag(e, imgLayer.id)}
                                        className={`absolute cursor-move transition-all ${activeLayerId === imgLayer.id ? 'border-dashed border-2 border-blue-500/80 z-50' : 'border-2 border-transparent hover:border-white/20 z-10'}`}
                                        style={{
                                            left: `${imgLayer.x}%`,
                                            top: `${imgLayer.y}%`,
                                            width: `${imgWidth}px`,
                                            height: `${imgHeight}px`,
                                            opacity: imgLayer.opacity
                                        }}>
                                        <img src={imgLayer.src} alt="Layer" className="w-full h-full object-contain pointer-events-none" />
                                        {activeLayerId === imgLayer.id && <div className="absolute -top-6 -right-6 bg-blue-500 text-white p-2.5 rounded-full shadow-lg scale-90 md:scale-100 pointer-events-none"><Move className="w-4 h-4" /></div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex-1 md:w-96 md:flex-none bg-[#0a0a0a] md:border-r border-white/10 flex flex-col z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] md:shadow-none md:h-full min-h-0">
                    <div className="p-4 md:p-6 border-b border-white/10 bg-[#0a0a0a] shrink-0">
                        <h1 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center"><Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" /></div>
                            Metamorphosis
                        </h1>
                        <div className="mt-2 flex items-center gap-2"><span className="text-[10px] font-bold tracking-wider uppercase text-white/40 bg-white/5 px-2 py-1 rounded">Story Studio</span></div>
                    </div>

                    <div className="flex border-b border-white/10 bg-[#0a0a0a] px-2 pt-2 shrink-0 sticky top-0 z-30">
                        <button onClick={() => setActiveTab('content')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all rounded-t-lg border-b-2 ${activeTab === 'content' ? 'bg-[#1a1a1a] text-white border-orange-500' : 'text-neutral-500 border-transparent hover:text-neutral-300'}`}>Content</button>
                        <button onClick={() => setActiveTab('design')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all rounded-t-lg border-b-2 ${activeTab === 'design' ? 'bg-[#1a1a1a] text-white border-purple-500' : 'text-neutral-500 border-transparent hover:text-neutral-300'}`}>Design</button>
                    </div>

                    <div className="flex-grow overflow-y-auto custom-scrollbar bg-[#121212] p-4 md:p-6 pb-20 md:pb-8">
                        {activeTab === 'content' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">Layers</h3>
                                        <div className="flex gap-2">
                                            <button onClick={addTextLayer} className="bg-white/10 hover:bg-white/20 text-orange-500 p-1.5 rounded transition-colors" title="Add Text"><Type className="w-4 h-4" /></button>
                                            <label className="bg-white/10 hover:bg-white/20 text-blue-500 p-1.5 rounded transition-colors cursor-pointer" title="Add Image">
                                                <ImageIcon className="w-4 h-4" />
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => addImageLayer(reader.result);
                                                        reader.readAsDataURL(file);
                                                    }
                                                }} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {(activePage.texts || []).map(text => (
                                            <div key={text.id} onClick={() => { setActiveLayerId(text.id); setActiveTab('design'); }} className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between group transition-all ${activeLayerId === text.id ? 'bg-[#2a2a2a] border-orange-500/50' : 'bg-[#1a1a1a] border-white/5 hover:border-white/20'}`}>
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <Type className={`w-4 h-4 flex-shrink-0 ${activeLayerId === text.id ? 'text-orange-500' : 'text-neutral-600'}`} />
                                                    <span className="truncate text-sm font-medium text-gray-300">{text.content}</span>
                                                </div>
                                                <button onClick={(e) => { e.stopPropagation(); deleteLayer(text.id); }} className="text-neutral-600 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        ))}
                                        {(activePage.images || []).map(img => (
                                            <div key={img.id} onClick={() => { setActiveLayerId(img.id); setActiveTab('design'); }} className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between group transition-all ${activeLayerId === img.id ? 'bg-[#2a2a2a] border-blue-500/50' : 'bg-[#1a1a1a] border-white/5 hover:border-white/20'}`}>
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <ImageIcon className={`w-4 h-4 flex-shrink-0 ${activeLayerId === img.id ? 'text-blue-500' : 'text-neutral-600'}`} />
                                                    <span className="truncate text-sm font-medium text-gray-300">Image</span>
                                                </div>
                                                <button onClick={(e) => { e.stopPropagation(); deleteLayer(img.id); }} className="text-neutral-600 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        ))}
                                        {activePage.texts.length === 0 && (activePage.images || []).length === 0 && <div className="text-center py-8 text-neutral-600 text-sm border border-dashed border-white/10 rounded-lg">No layers. Click + to add.</div>}
                                    </div>
                                </div>

                                <div className="h-px bg-white/10"></div>

                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">Media Background</h3>
                                    <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a] aspect-video shadow-lg">
                                        {activePage.mediaType === 'color' ? (
                                            <div style={{ backgroundColor: activePage.bgColor }} className="w-full h-full group-hover:opacity-40 transition-opacity" />
                                        ) : activePage.mediaType === 'video' ? (
                                            <video src={activePage.media} className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" autoPlay loop muted />
                                        ) : (
                                            <img src={activePage.media} className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" alt="Preview" />
                                        )}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-3 bg-black/50 backdrop-blur-sm">
                                            <div className="flex gap-3">
                                                <label className="cursor-pointer flex flex-col items-center gap-1 group/btn">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover/btn:bg-white/20 transition-colors">
                                                        <ImageIcon className="w-5 h-5 text-white" />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Image</span>
                                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                                </label>
                                                <label className="cursor-pointer flex flex-col items-center gap-1 group/btn">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover/btn:bg-white/20 transition-colors">
                                                        <Video className="w-5 h-5 text-white" />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Video</span>
                                                    <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
                                                </label>
                                                <label htmlFor="colorBgPicker" className="cursor-pointer flex flex-col items-center gap-1 group/btn">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover/btn:bg-white/20 transition-colors">
                                                        <Palette className="w-5 h-5 text-white" />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Color</span>
                                                    <input id="colorBgPicker" type="color" value={activePage.bgColor || '#1a1a1a'} className="hidden" onChange={(e) => handleColorBackgroundSelect(e.target.value)} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-[10px] text-neutral-500 italic">
                                            {activePage.mediaType === 'color' ? 'Solid color background' : 'Supports JPG, PNG, and MP4/WebM videos.'}
                                        </p>
                                        {activePage.mediaType === 'video' && (
                                            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-lg p-1 border border-white/10">
                                                <button
                                                    onClick={() => updatePage({ videoMuted: !activePage.videoMuted })}
                                                    className={`p-1.5 rounded-md transition-colors flex items-center gap-2 ${!activePage.videoMuted ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
                                                    title={activePage.videoMuted ? "Unmute Video" : "Mute Video"}
                                                >
                                                    {activePage.videoMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                                                    <span className="text-[10px] font-bold pr-1">{activePage.videoMuted ? "Muted" : "Sound On"}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* --- NEW DURATION CONTROL --- */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">Slide Duration</h3>
                                    <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-lg p-1">
                                        <Clock className="w-4 h-4 text-neutral-500 ml-2" />
                                        <select
                                            value={activePage.duration}
                                            onChange={(e) => updatePage({ duration: parseInt(e.target.value) })}
                                            className="w-full bg-transparent border-none text-sm text-white focus:ring-0 cursor-pointer"
                                        >
                                            {[3, 5, 10, 15, 20, 30, 45, 60].map(s => (
                                                <option key={s} value={s}>{s < 60 ? `${s} Seconds` : '1 Minute'}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className="text-[10px] text-gray-500 text-right">Seconds</p>
                                </div>

                                {/* --- VIDEO TRIM & CROP CONTROLS --- */}
                                {activePage.mediaType === 'video' && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 border-t border-white/10 pt-4">

                                        {/* TRIM */}
                                        <div className="space-y-2">
                                            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                                                <Clock className="w-3 h-3" /> Trim Video
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="text-[10px] text-gray-400">Start (s)</label>
                                                    <input
                                                        type="number"
                                                        className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white text-xs focus:border-orange-500 outline-none transition-colors"
                                                        step="0.1"
                                                        min="0"
                                                        max={activePage.videoEnd || 100}
                                                        value={activePage.videoStart || 0}
                                                        onChange={(e) => {
                                                            const newStart = parseFloat(e.target.value);
                                                            const newDur = (activePage.videoEnd || 0) - newStart;
                                                            updatePage({ videoStart: newStart, duration: Math.ceil(newDur) });
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-gray-400">End (s)</label>
                                                    <input
                                                        type="number"
                                                        className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-white text-xs focus:border-orange-500 outline-none transition-colors"
                                                        step="0.1"
                                                        min={activePage.videoStart || 0}
                                                        value={activePage.videoEnd || activePage.duration}
                                                        onChange={(e) => {
                                                            const newEnd = parseFloat(e.target.value);
                                                            const newDur = newEnd - (activePage.videoStart || 0);
                                                            updatePage({ videoEnd: newEnd, duration: Math.ceil(newDur) });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* CROP / TRANSFORM */}
                                        <div className="space-y-3">
                                            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                                                <Scaling className="w-3 h-3" /> Crop & Position
                                            </h3>

                                            {/* Scale */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-[10px] text-gray-400">
                                                    <span>Scale</span>
                                                    <span>{Math.round((activePage.videoScale || 1) * 100)}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="3"
                                                    step="0.1"
                                                    className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                                    value={activePage.videoScale || 1}
                                                    onChange={(e) => updatePage({ videoScale: parseFloat(e.target.value) })}
                                                />
                                            </div>

                                            {/* Pan X */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-[10px] text-gray-400">
                                                    <span>Pan Horizontal</span>
                                                    <span>{activePage.videoPanX || 0}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="-50"
                                                    max="50"
                                                    step="1"
                                                    className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                                    value={activePage.videoPanX || 0}
                                                    onChange={(e) => updatePage({ videoPanX: parseFloat(e.target.value) })}
                                                />
                                            </div>

                                            {/* Pan Y */}
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-[10px] text-gray-400">
                                                    <span>Pan Vertical</span>
                                                    <span>{activePage.videoPanY || 0}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="-50"
                                                    max="50"
                                                    step="1"
                                                    className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                                    value={activePage.videoPanY || 0}
                                                    onChange={(e) => updatePage({ videoPanY: parseFloat(e.target.value) })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">Animation</h3>
                                    <div className="relative">
                                        <select value={activePage.bgAnimation} onChange={(e) => updatePage({ bgAnimation: e.target.value })} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-sm text-white appearance-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none">
                                            {ANIMATIONS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                                        </select>
                                        <div className="absolute right-3 top-3.5 pointer-events-none"><Film className="w-4 h-4 text-neutral-500" /></div>
                                    </div>
                                </div>

                                <div className="space-y-4 py-4">
                                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2"><Sun className="w-3 h-3" /> Image Adjustments</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Sun className="w-3 h-3 text-neutral-500" />
                                            <input type="range" min="50" max="150" value={activePage.filters?.brightness || 100} onChange={(e) => handleNestedChange('filters', 'brightness', e.target.value)} className="flex-1 h-1.5 bg-[#2a2a2a] rounded-lg appearance-none accent-yellow-500" />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Contrast className="w-3 h-3 text-neutral-500" />
                                            <input type="range" min="50" max="150" value={activePage.filters?.contrast || 100} onChange={(e) => handleNestedChange('filters', 'contrast', e.target.value)} className="flex-1 h-1.5 bg-[#2a2a2a] rounded-lg appearance-none accent-yellow-500" />
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Droplet className="w-3 h-3 text-neutral-500" />
                                            <input type="range" min="0" max="200" value={activePage.filters?.saturate || 100} onChange={(e) => handleNestedChange('filters', 'saturate', e.target.value)} className="flex-1 h-1.5 bg-[#2a2a2a] rounded-lg appearance-none accent-yellow-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-white/10"></div>

                                <div className="space-y-3 pb-4">
                                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2"><Music className="w-3 h-3" /> Background Music</h3>
                                    <div className="space-y-2">
                                        {STOCK_MUSIC.map((track) => (
                                            <div key={track.label} onClick={() => setMetadata(prev => ({ ...prev, audio: track.value, audioName: '' }))} className={`p-3 rounded-lg cursor-pointer border transition-all flex items-center justify-between ${metadata.audio === track.value ? 'bg-[#2a2a2a] border-orange-500' : 'bg-[#1a1a1a] border-white/5 hover:border-white/10'}`}>
                                                <div className="flex items-center gap-3">
                                                    {metadata.audio === track.value ? <Volume2 className="w-4 h-4 text-orange-500" /> : <Music className="w-4 h-4 text-neutral-600" />}
                                                    <span className={`text-sm font-medium ${metadata.audio === track.value ? 'text-white' : 'text-neutral-400'}`}>{track.label}</span>
                                                </div>
                                            </div>
                                        ))}
                                        <div className={`relative p-3 rounded-lg cursor-pointer border border-dashed transition-all flex items-center justify-center group ${metadata.audioName ? 'bg-[#2a2a2a] border-orange-500' : 'bg-[#1a1a1a] border-white/10 hover:border-white/20'}`}>
                                            <input type="file" accept="audio/*" onChange={handleAudioUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                            <div className="flex items-center gap-2 text-sm">
                                                <Upload className={`w-4 h-4 ${metadata.audioName ? 'text-orange-500' : 'text-neutral-500'}`} />
                                                <span className={`${metadata.audioName ? 'text-white font-medium' : 'text-neutral-500 group-hover:text-neutral-300'}`}>{metadata.audioName || 'Upload Custom Audio'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'design' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2"><Monitor className="w-3 h-3" /> Canvas</h3>
                                    <select value={resolution.label} onChange={handleResolutionChange} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-orange-500 outline-none">
                                        {RESOLUTIONS.map((res, i) => <option key={i} value={res.label}>{res.label}</option>)}
                                    </select>
                                </div>

                                {activeLayer ? (
                                    <>
                                        <div className="space-y-3">
                                            <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">Text Content</h3>
                                            <textarea value={activeLayer.content} onChange={(e) => updateTextLayer(activeLayerId, 'content', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-base text-white min-h-[100px] resize-none focus:border-orange-500 outline-none transition-colors shadow-inner" placeholder="Type something..." />
                                        </div>
                                        <div className="h-px bg-white/10"></div>
                                        <div className="space-y-4">
                                            <h3 className="text-xs font-bold text-orange-500 uppercase tracking-wider">Typography</h3>
                                            <div className="grid grid-cols-1 gap-3">
                                                <select value={activeLayer.font} onChange={(e) => updateTextLayer(activeLayerId, 'font', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-orange-500 outline-none">
                                                    {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded-lg px-3 h-10">
                                                    <TypeIcon className="w-4 h-4 text-neutral-500 mr-2" />
                                                    <input type="number" value={activeLayer.size} onChange={(e) => updateTextLayer(activeLayerId, 'size', parseInt(e.target.value))} className="w-full bg-transparent border-none text-white text-sm focus:ring-0 p-0" />
                                                </div>
                                                <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded-lg px-3 h-10">
                                                    <Bold className="w-4 h-4 text-neutral-500 mr-2" />
                                                    <select value={activeLayer.weight} onChange={(e) => updateTextLayer(activeLayerId, 'weight', e.target.value)} className="w-full bg-transparent border-none text-white text-sm focus:ring-0 p-0">
                                                        <option value="400">Regular</option><option value="700">Bold</option><option value="900">Heavy</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 bg-[#1a1a1a] p-1 rounded-lg border border-white/10">
                                                <button onClick={() => updateTextLayer(activeLayerId, 'italic', !activeLayer.italic)} className={`flex-1 p-2 rounded-md transition-colors ${activeLayer.italic ? 'bg-orange-500 text-white' : 'text-neutral-500 hover:text-white'}`}><Italic className="w-4 h-4 mx-auto" /></button>
                                                <button onClick={() => updateTextLayer(activeLayerId, 'uppercase', !activeLayer.uppercase)} className={`flex-1 p-2 rounded-md transition-colors ${activeLayer.uppercase ? 'bg-orange-500 text-white' : 'text-neutral-500 hover:text-white'}`}><TypeIcon className="w-4 h-4 mx-auto" /></button>
                                                <button onClick={() => updateTextLayer(activeLayerId, 'shadow', !activeLayer.shadow)} className={`flex-1 p-2 rounded-md transition-colors ${activeLayer.shadow ? 'bg-orange-500 text-white' : 'text-neutral-500 hover:text-white'}`} title={activeLayer.shadow ? 'Remove drop shadow' : 'Add drop shadow'}><Sparkles className="w-4 h-4 mx-auto" /></button>
                                                <div className="w-px bg-white/10 mx-1"></div>
                                                {['left', 'center', 'right'].map(a => <button key={a} onClick={() => updateTextLayer(activeLayerId, 'align', a)} className={`flex-1 p-2 rounded-md transition-colors ${activeLayer.align === a ? 'bg-white/10 text-white' : 'text-neutral-500'}`}>{a === 'left' ? <AlignLeft className="w-4 h-4 mx-auto" /> : a === 'center' ? <AlignCenter className="w-4 h-4 mx-auto" /> : <AlignRight className="w-4 h-4 mx-auto" />}</button>)}
                                            </div>
                                        </div>

                                        <div className="h-px bg-white/10"></div>
                                        <div className="space-y-4">
                                            <h3 className="text-xs font-bold text-purple-500 uppercase tracking-wider">Colors</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-[10px] text-neutral-500 uppercase mb-1.5 block">Text Color</label>
                                                    <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded-lg p-1 pr-3">
                                                        <input type="color" value={activeLayer.color} onChange={(e) => updateTextLayer(activeLayerId, 'color', e.target.value)} className="w-8 h-8 rounded bg-transparent border-none cursor-pointer p-0 mr-2" />
                                                        <span className="text-xs text-gray-400 font-mono">{activeLayer.color}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-neutral-500 uppercase mb-1.5 block">Background</label>
                                                    <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded-lg p-1 pr-2">
                                                        {activeLayer.bg !== 'transparent' ? (
                                                            <>
                                                                <input type="color" value={activeLayer.bg} onChange={(e) => updateTextLayer(activeLayerId, 'bg', e.target.value)} className="w-8 h-8 rounded bg-transparent border-none cursor-pointer p-0 mr-2" />
                                                                <button onClick={() => updateTextLayer(activeLayerId, 'bg', 'transparent')} className="ml-auto p-1.5 hover:bg-white/10 rounded-md text-neutral-500 hover:text-white"><X className="w-3 h-3" /></button>
                                                            </>
                                                        ) : (
                                                            <button onClick={() => updateTextLayer(activeLayerId, 'bg', '#ffffff')} className="w-full h-8 text-xs text-neutral-500 border border-dashed border-white/20 rounded hover:border-white/40 hover:text-white">Add Fill</button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-3 pt-2">
                                                <div className="flex justify-between text-xs text-neutral-500"><span>Opacity</span><span>{Math.round((activeLayer.opacity || 1) * 100)}%</span></div>
                                                <input type="range" min="0" max="1" step="0.1" value={activeLayer.opacity} onChange={(e) => updateTextLayer(activeLayerId, 'opacity', parseFloat(e.target.value))} className="w-full h-1.5 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-purple-500" />
                                                {activeLayer.bg !== 'transparent' && (
                                                    <>
                                                        <div className="flex justify-between text-xs text-neutral-500 mt-2"><span>Corner Radius</span><span>{activeLayer.radius}px</span></div>
                                                        <input type="range" min="0" max="50" value={activeLayer.radius} onChange={(e) => updateTextLayer(activeLayerId, 'radius', parseInt(e.target.value))} className="w-full h-1.5 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-purple-500" />
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="h-px bg-white/10"></div>
                                        <div className="space-y-3">
                                            <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wider">Entrance Animation</h3>
                                            <select value={activeLayer.animation} onChange={(e) => updateTextLayer(activeLayerId, 'animation', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-orange-500 outline-none">
                                                {TEXT_ANIMATIONS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                                            </select>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 text-neutral-600 border border-dashed border-white/10 rounded-xl bg-[#151515]">
                                        <Move className="w-8 h-8 mb-2 opacity-50" />
                                        <p className="text-sm">Select a layer to edit design</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div >
            </div >
            <Analytics />
        </div >
    );
}
