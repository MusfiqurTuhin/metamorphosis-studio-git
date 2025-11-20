import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Download, Image as ImageIcon, Type, Play, Smartphone, Settings, ChevronRight, ChevronLeft, Video, Loader2, Palette, Layout, Monitor, Move, AlertTriangle, Layers, FileVideo, Check, Sparkles, Film, Camera, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Type as TypeIcon, Pause, Copy, Sun, Contrast, Droplet, ArrowUp, X, Grid, Scaling, Menu, FileCode, Film as FilmIcon } from 'lucide-react';

// --- AMP Boilerplate ---
const AMP_BOILERPLATE = `<!DOCTYPE html>
<html amp lang="en">
 <head>
   <meta charset="utf-8" />
   <script async src="https://cdn.ampproject.org/v0.js"></script>
   <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
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
   </style>
 </head>
 <body>
   <amp-story standalone title="__TITLE__" publisher="__PUBLISHER__" publisher-logo-src="__LOGO__" poster-portrait-src="__POSTER__">
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
   title: 'Metamorphosis & Odoo', publisher: 'Metamorphosis',
   logo: 'https://cdn-icons-png.flaticon.com/512/2965/2965879.png',
   poster: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
   canonical: 'https://www.metamorphosis.com'
 });

 const [resolution, setResolution] = useState(RESOLUTIONS[0]);

 const [pages, setPages] = useState([
   {
     id: 1,
     image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
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
         x: 6, y: 75, size: 38, color: '#e0e0e0', shadow: true, animation: 'fade-up'
       }
     ]
   }
 ]);

 const [activePageIndex, setActivePageIndex] = useState(0);
 const [activeTab, setActiveTab] = useState('content');
 const [activeLayerId, setActiveLayerId] = useState('h1');
 const [isExportingVideo, setIsExportingVideo] = useState(false);
 const [exportProgress, setExportProgress] = useState(0);
 const [showDownloadMenu, setShowDownloadMenu] = useState(false);
 const [isPlaying, setIsPlaying] = useState(false);
 const [exportFormat, setExportFormat] = useState('');
 const [exportScope, setExportScope] = useState('all');
 const [dragTarget, setDragTarget] = useState(null);
 const dragStartRef = useRef({ x: 0, y: 0, initialX: 0, initialY: 0 });
 const [previewScale, setPreviewScale] = useState(0.5);
 // Refs
 const canvasRef = useRef(null);
 const containerRef = useRef(null);
 const previewRef = useRef(null);

 const activePage = pages[activePageIndex] || pages[0];
 const activeLayer = activePage.texts.find(t => t.id === activeLayerId);

 // --- INIT ---
 useEffect(() => {
   if (activePage.texts.length > 0 && (!activeLayer || !activePage.texts.find(t => t.id === activeLayerId))) {
       setActiveLayerId(activePage.texts[0].id);
   }
 }, [activePageIndex, activePage.texts.length]);

 // --- RESIZING ENGINE ---
 useEffect(() => {
     if (!containerRef.current) return;
    
     const updateScale = () => {
         const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();
         if (containerW <= 0 || containerH <= 0) return;

         // Reduced padding for mobile
         const isMobile = window.innerWidth < 768;
         const padding = isMobile ? 0 : 32; // No padding on mobile to maximize width
         const availableW = Math.max(50, containerW - padding);
         const availableH = Math.max(50, containerH - padding);
        
         const scaleW = availableW / resolution.width;
         const scaleH = availableH / resolution.height;
        
         setPreviewScale(Math.min(scaleW, scaleH));
     };
    
     const observer = new ResizeObserver(updateScale);
     observer.observe(containerRef.current);
    
     updateScale();
     return () => observer.disconnect();
 }, [resolution]);

 // --- FUNCTIONS ---

 const handleResolutionChange = (e) => {
     const label = e.target.value;
     const newRes = RESOLUTIONS.find(r => r.label === label);
     if (newRes) {
         setResolution(newRes);
         setIsPlaying(false);
     }
 };

 const updatePage = (updates) => {
     const newPages = [...pages];
     newPages[activePageIndex] = { ...newPages[activePageIndex], ...updates };
     setPages(newPages);
 };

 const updateTextLayer = (id, field, value) => {
     const newTexts = activePage.texts.map(t => t.id === id ? { ...t, [field]: value } : t);
     updatePage({ texts: newTexts });
 };

 const handleNestedChange = (parent, field, value) => {
   const newPages = [...pages];
   newPages[activePageIndex] = {
       ...newPages[activePageIndex],
       [parent]: { ...newPages[activePageIndex][parent], [field]: value }
   };
   setPages(newPages);
 }

 const handleImageUpload = (e) => {
   const file = e.target.files[0];
   if (file) {
     const reader = new FileReader();
     reader.onloadend = () => updatePage({ image: reader.result });
     reader.readAsDataURL(file);
   }
 };

 const addTextLayer = () => {
     const newId = Date.now().toString();
     const newText = {
         id: newId, content: 'New Text',
         ...DEFAULT_TEXT_STYLE, x: 50, y: 50, bg: '#ffffff', color: '#000000', radius: 4
     };
     updatePage({ texts: [...activePage.texts, newText] });
     setActiveLayerId(newId);
     setActiveTab('design');
 };

 const deleteLayer = (id) => {
     const newTexts = activePage.texts.filter(t => t.id !== id);
     updatePage({ texts: newTexts });
     if (activeLayerId === id && newTexts.length > 0) setActiveLayerId(newTexts[0].id);
 };

 const addNewPage = () => {
     const lastPage = pages[pages.length - 1];
     const newId = Date.now();
     const newPage = {
         ...lastPage, id: newId,
         texts: lastPage.texts.map(t => ({...t, id: Math.random().toString()}))
     };
     setPages([...pages, newPage]);
     setActivePageIndex(pages.length);
 };

 const deletePage = () => {
     if (pages.length === 1) return alert("At least one page required.");
     const newPages = pages.filter((_, i) => i !== activePageIndex);
     setPages(newPages);
     setActivePageIndex(Math.max(0, activePageIndex - 1));
 };

 // --- DRAGGING SYSTEM (Unified Touch + Mouse) ---
  const getClientCoordinates = (e) => {
     if (e.touches && e.touches.length > 0) {
         return { x: e.touches[0].clientX, y: e.touches[0].clientY };
     }
     return { x: e.clientX, y: e.clientY };
 };

 const startDrag = (e, target) => {
     if (target !== 'image') { e.stopPropagation(); setActiveLayerId(target); setActiveTab('design'); }
     // Prevent default only if not input to allow focus, mostly prevent scroll on touch
     if(e.type === 'touchstart') {
        // don't prevent default immediately or inputs break
     } else {
        e.preventDefault();
     }

     let initialX = 0, initialY = 0;
     if (target === 'image') { initialX = activePage.panX; initialY = activePage.panY; }
     else { const layer = activePage.texts.find(t => t.id === target); if (layer) { initialX = layer.x; initialY = layer.y; } }
    
     const coords = getClientCoordinates(e);
     setDragTarget(target);
     dragStartRef.current = { x: coords.x, y: coords.y, initialX, initialY };
 };

 const handleMove = (e) => {
     if (!dragTarget) return;
     const coords = getClientCoordinates(e);
     const dxPx = coords.x - dragStartRef.current.x;
     const dyPx = coords.y - dragStartRef.current.y;

     if (dragTarget === 'image') {
         const sensitivity = 0.2;
         const dX = (dxPx / previewScale) * sensitivity;
         const dY = (dyPx / previewScale) * sensitivity;
         const newPanX = Math.min(100, Math.max(0, dragStartRef.current.initialX - dX));
         const newPanY = Math.min(100, Math.max(0, dragStartRef.current.initialY - dY));
         updatePage({ panX: newPanX, panY: newPanY });
     } else {
         const dX = (dxPx / (resolution.width * previewScale)) * 100;
         const dY = (dyPx / (resolution.height * previewScale)) * 100;
        
         const newX = Math.min(100, Math.max(0, dragStartRef.current.initialX + dX));
         const newY = Math.min(100, Math.max(0, dragStartRef.current.initialY + dY));
        
         updateTextLayer(dragTarget, 'x', newX);
         updateTextLayer(dragTarget, 'y', newY);
     }
 };

 const handleEnd = () => setDragTarget(null);

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
 }, [dragTarget, activePageIndex, previewScale]);

 // --- RENDERER ---
 const drawFrame = (ctx, pageData, progress) => {
     const { width, height } = ctx.canvas;
     ctx.fillStyle = '#111'; ctx.fillRect(0, 0, width, height);

     const img = pageData.imgElement;
     if (img) {
         ctx.save();
         if (pageData.filters) ctx.filter = `brightness(${pageData.filters.brightness}%) contrast(${pageData.filters.contrast}%) saturate(${pageData.filters.saturate}%)`;
         let scale = 1, tx = 0, ty = 0;
         const moveX = width * 0.1; const moveY = height * 0.1;
         switch(pageData.bgAnimation) {
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
        
         const imgAspect = img.width / img.height; const canvasAspect = width / height;
         let renderW, renderH, offX, offY;
         if (imgAspect > canvasAspect) { renderH = height; renderW = height * imgAspect; offX = (width - renderW) * (pageData.panX / 100); offY = 0; }
         else { renderW = width; renderH = width / imgAspect; offX = 0; offY = (height - renderH) * (pageData.panY / 100); }
         ctx.drawImage(img, offX, offY, renderW, renderH); ctx.restore();
     }

     const ov = pageData.overlay || { color: '#000000', opacity: 0.6, height: 40 };
     const gradient = ctx.createLinearGradient(0, height * (1 - (ov.height/100)), 0, height);
     gradient.addColorStop(0, 'rgba(0,0,0,0)'); gradient.addColorStop(1, ov.color);
     ctx.save(); ctx.globalAlpha = ov.opacity; ctx.fillStyle = gradient; ctx.fillRect(0, height * (1 - (ov.height/100)), width, height * (ov.height/100)); ctx.restore();

     (pageData.texts || []).forEach(layer => {
         ctx.save();
         let alpha = layer.opacity !== undefined ? layer.opacity : 1;
         let offsetY = 0, offsetX = 0; let displayText = layer.content;
         if (layer.uppercase) displayText = displayText.toUpperCase();

         if (layer.animation === 'fade-up') { alpha *= Math.min(1, progress * 3); offsetY = (1 - Math.min(1, progress * 3)) * 30; }
         else if (layer.animation === 'slide-in') { alpha *= Math.min(1, progress * 3); offsetX = -(1 - Math.min(1, progress * 3)) * 100; }
         else if (layer.animation === 'typewriter') { const charCount = Math.floor(layer.content.length * Math.min(1, progress * 2)); displayText = layer.content.substring(0, charCount); if(layer.uppercase) displayText = displayText.toUpperCase(); }
         else if (layer.animation === 'scale-up') { const s = 0.5 + (0.5 * Math.min(1, progress * 3)); ctx.translate(width*(layer.x/100), height*(layer.y/100)); ctx.scale(s, s); ctx.translate(-width*(layer.x/100), -height*(layer.y/100)); }

         ctx.globalAlpha = alpha; ctx.translate(offsetX, offsetY);
         const x = width * (layer.x / 100); const y = height * (layer.y / 100);
         const cleanFont = layer.font.replace(/"/g, "'"); const fontStyle = layer.italic ? 'italic' : 'normal';
         ctx.font = `${fontStyle} ${layer.weight} ${layer.size}px ${cleanFont}`;
         ctx.textAlign = layer.align; ctx.textBaseline = 'top'; if (layer.spacing > 0) ctx.letterSpacing = `${layer.spacing}px`;

         const fullText = layer.uppercase ? layer.content.toUpperCase() : layer.content;
         const metrics = ctx.measureText(fullText);
        
         if (layer.bg && layer.bg !== 'transparent') {
             const pW = metrics.width + 40; const pH = layer.size * 1.6;
             let rectX = x; if (layer.align === 'center') rectX = x - (pW/2); if (layer.align === 'right') rectX = x - pW;
             if (layer.shadow) { ctx.shadowColor = 'rgba(0,0,0,0.4)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 4; }
             ctx.fillStyle = layer.bg; ctx.beginPath(); ctx.roundRect(rectX, y, pW, pH, layer.radius || 0); ctx.fill();
             ctx.shadowColor = 'transparent'; ctx.fillStyle = layer.color;
             let textX = rectX + 20; if (layer.align === 'center') textX = rectX + (pW/2); if (layer.align === 'right') textX = rectX + pW - 20;
             ctx.fillText(displayText, textX, y + (pH - layer.size)/2 + 2);
         } else {
            if (layer.shadow) { ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 4; ctx.shadowOffsetY = 2; }
            ctx.fillStyle = layer.color;
            const maxWidth = width * 0.9; const words = displayText.split(' '); let line = ''; let lineY = y;
            for (let n = 0; n < words.length; n++) {
               const testLine = line + words[n] + ' '; const m = ctx.measureText(testLine);
               if (m.width > maxWidth && n > 0) { ctx.fillText(line, x, lineY); line = words[n] + ' '; lineY += (layer.size * (layer.lineHeight || 1.4)); } else { line = testLine; }
            }
            ctx.fillText(line, x, lineY);
         }
         ctx.restore();
     });
 };

 // --- EXPORT ---
 const loadPageImage = (page) => new Promise(resolve => { const img = new Image(); img.crossOrigin = "anonymous"; img.src = page.image; img.onload = () => resolve({ ...page, imgElement: img }); img.onerror = () => resolve({ ...page, imgElement: null }); });

 const generateVideo = async () => {
     setIsExportingVideo(true); setShowDownloadMenu(false); setIsPlaying(false); setExportProgress(0); setExportFormat('');
     const canvas = canvasRef.current; const ctx = canvas.getContext('2d');
     canvas.width = resolution.width; canvas.height = resolution.height;
    
     const pagesToRender = exportScope === 'current' ? [activePage] : pages;
     const loadedPages = await Promise.all(pagesToRender.map(loadPageImage));
     const stream = canvas.captureStream(30);
     const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9', videoBitsPerSecond: 4000000 });
     const chunks = []; mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
     mediaRecorder.onstop = () => { const blob = new Blob(chunks, { type: 'video/webm' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${metadata.title.replace(/\s+/g, '-')}.webm`; a.click(); setIsExportingVideo(false); };
     mediaRecorder.start(); const FPS = 30; await document.fonts.ready;
     for (let i = 0; i < loadedPages.length; i++) {
         const page = loadedPages[i]; const durationFrames = page.duration * FPS;
         for (let frame = 0; frame < durationFrames; frame++) { drawFrame(ctx, page, frame / durationFrames); await new Promise(r => setTimeout(r, 1000 / FPS)); setExportProgress(prev => Math.min(99, prev + (100 / (loadedPages.length * durationFrames)))); }
     }
     mediaRecorder.stop(); setExportProgress(100);
 };

 const downloadJPG = async () => {
     setShowDownloadMenu(false); const canvas = canvasRef.current; if(!canvas) return; const ctx = canvas.getContext('2d');
     canvas.width = resolution.width; canvas.height = resolution.height;
     const loaded = await loadPageImage(activePage); drawFrame(ctx, loaded, 1.0);
     const a = document.createElement('a'); a.download = 'slide.jpg'; a.href = canvas.toDataURL('image/jpeg', 0.9); a.click();
 };

 const generateHTML = () => {
     setShowDownloadMenu(false);
     let pagesHTML = '';
     pages.forEach((page) => {
         const imgFilters = `filter: brightness(${page.filters.brightness}%) contrast(${page.filters.contrast}%) saturate(${page.filters.saturate}%);`;
         const ov = page.overlay;
         const gradStyle = `background: linear-gradient(to top, ${ov.color}${Math.round(ov.opacity*255).toString(16).padStart(2,'0')} 0%, transparent 100%); height: ${ov.height}%;`;
        
         let layersHTML = page.texts.map(t => {
            const cleanFont = t.font.replace(/"/g, "'");
            let animAttr = '';
            if(t.animation === 'fade-up') animAttr = 'animate-in="fly-in-bottom" animate-in-duration="1s"';
            else if(t.animation === 'slide-in') animAttr = 'animate-in="fly-in-left" animate-in-duration="1s"';
            else if(t.animation === 'scale-up') animAttr = 'animate-in="zoom-in" animate-in-duration="1s"';
            else if(t.animation === 'typewriter') animAttr = 'animate-in="fade-in" animate-in-duration="1s"';
           
            const style = `color: ${t.color}; font-family: ${cleanFont}; font-size: ${t.size}px; font-weight: ${t.weight}; text-align: ${t.align}; font-style: ${t.italic?'italic':'normal'}; text-transform: ${t.uppercase?'uppercase':'none'}; line-height: ${t.lineHeight}; opacity: ${t.opacity}; letter-spacing: ${t.spacing}px;`;
            const bgStyle = t.bg !== 'transparent' ? `background-color: ${t.bg}; padding: 8px 16px; border-radius: ${t.radius}px; box-shadow: ${t.shadow?'0 4px 6px rgba(0,0,0,0.3)':'none'}; display: inline-block;` : `text-shadow: ${t.shadow?'0 2px 4px rgba(0,0,0,0.8)':'none'};`;

            return `<div class="draggable-element" style="left: ${t.x}%; top: ${t.y}%; width: 90%;" ${animAttr}><div style="${style} ${bgStyle}">${t.content}</div></div>`;
         }).join('');

         pagesHTML += `<amp-story-page id="page-${page.id}" auto-advance-after="${page.duration}s">
           <amp-story-grid-layer template="fill"><amp-img src="${page.image}" width="${resolution.width}" height="${resolution.height}" layout="responsive" object-position="${page.panX}% ${page.panY}%" animate-in="${page.bgAnimation==='zoom-in-pan-right'?'zoom-in':page.bgAnimation}" animate-in-duration="${page.duration*1.5}s" style="${imgFilters}"></amp-img></amp-story-grid-layer>
           <amp-story-grid-layer template="vertical" class="gradient-overlay" style="${gradStyle}">${layersHTML}</amp-story-grid-layer>
         </amp-story-page>`;
     });
     const finalHTML = AMP_BOILERPLATE.replace('__PAGES__', pagesHTML).replace(/__TITLE__/g, metadata.title).replace('__PUBLISHER__', metadata.publisher).replace('__LOGO__', metadata.logo).replace('__POSTER__', metadata.poster).replace('__CANONICAL_URL__', metadata.canonical);
     const blob = new Blob([finalHTML], { type: 'text/html' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a'); a.href = url; a.download = `story.html`; document.body.appendChild(a); a.click(); document.body.removeChild(a);
 };

 // --- PREVIEW LOOP ---
 useEffect(() => {
     const canvas = canvasRef.current;
     if(!canvas) return;
     const ctx = canvas.getContext('2d');
     const img = new Image();
     img.crossOrigin = "anonymous";
     img.src = activePage.image;
     let animId;
     const render = () => {
        img.onload = () => {
            if (isPlaying) {
                const duration = activePage.duration * 1000;
                const start = performance.now();
                const loop = (time) => {
                    const elapsed = time - start;
                    drawFrame(ctx, { ...activePage, imgElement: img }, (elapsed % duration) / duration);
                    animId = requestAnimationFrame(loop);
                };
                animId = requestAnimationFrame(loop);
            } else {
                drawFrame(ctx, { ...activePage, imgElement: img }, 1.0);
            }
        };
     };
     render();
     return () => cancelAnimationFrame(animId);
 }, [activePageIndex, pages, isPlaying, resolution, previewScale]);

 return (
   // Changed Root: min-h-[100dvh] allows scrolling, removed fixed height lock on mobile
   <div className="flex flex-col md:flex-row md:h-[100dvh] min-h-[100dvh] bg-gray-900 text-white overflow-x-hidden font-sans">
     <div className="hidden"><canvas key={resolution.label} ref={canvasRef} width={resolution.width} height={resolution.height} /></div>

     {/* MOBILE HEADER (Visible only md:hidden) */}
     <div className="md:hidden h-12 bg-gray-800 border-b border-gray-700 flex items-center px-4 justify-between shrink-0 z-20 sticky top-0">
        <div className="flex items-center gap-2">
           <Smartphone className="w-5 h-5 text-orange-500" /> 
           <h1 className="text-sm font-bold text-white tracking-wide">Metamorphosis</h1>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={() => setShowDownloadMenu(!showDownloadMenu)} className="bg-gray-700 p-2 rounded-full text-gray-300 hover:text-white relative">
                {isExportingVideo ? <Loader2 className="w-4 h-4 animate-spin text-orange-500"/> : <Download className="w-4 h-4"/>}
            </button>
             {showDownloadMenu && (
                <div className="absolute right-2 top-14 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-2 z-50">
                    <button onClick={downloadJPG} className="w-full text-left p-3 hover:bg-gray-700 rounded text-sm text-gray-300 flex gap-2 transition-colors items-center"><Camera className="w-4 h-4 flex-shrink-0 text-pink-500"/> JPG Image</button>
                    <button onClick={() => { setExportScope('current'); generateVideo(); }} className="w-full text-left p-3 hover:bg-gray-700 rounded text-sm text-gray-300 flex gap-2 transition-colors items-center"><Play className="w-4 h-4 flex-shrink-0 text-blue-500"/> Video (This Slide)</button>
                    <button onClick={() => { setExportScope('all'); generateVideo(); }} className="w-full text-left p-3 hover:bg-gray-700 rounded text-sm text-gray-300 flex gap-2 transition-colors items-center"><FilmIcon className="w-4 h-4 flex-shrink-0 text-purple-500"/> Video (Full Story)</button>
                    <button onClick={generateHTML} className="w-full text-left p-3 hover:bg-gray-700 rounded text-sm text-gray-300 flex gap-2 transition-colors items-center"><FileCode className="w-4 h-4 flex-shrink-0 text-orange-500"/> HTML Story</button>
                </div>
            )}
        </div>
     </div>

     {/* PREVIEW - Dynamic Height on Mobile / Desktop Right (flex-1) */}
     <div className="relative w-full md:h-full md:flex-1 bg-black flex flex-col items-center justify-center overflow-hidden select-none order-first md:order-last shrink-0">
        
        {/* Desktop-only download button (hidden on mobile) */}
        <div className="absolute top-6 right-6 z-50 hidden md:block">
            <button onClick={() => setShowDownloadMenu(!showDownloadMenu)} className="bg-white/10 p-3 rounded-full backdrop-blur-md hover:bg-white/20 text-white transition-all relative">
                {isExportingVideo ? <Loader2 className="w-5 h-5 animate-spin text-orange-500"/> : <Download className="w-5 h-5"/>}
            </button>
            {showDownloadMenu && (
                <div className="absolute right-0 top-12 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-2 z-50">
                    <button onClick={downloadJPG} className="w-full text-left p-2 hover:bg-gray-700 rounded text-sm text-gray-300 flex gap-2 transition-colors items-center"><Camera className="w-4 h-4 flex-shrink-0 text-pink-500"/> JPG Image</button>
                    <button onClick={() => { setExportScope('current'); generateVideo(); }} className="w-full text-left p-2 hover:bg-gray-700 rounded text-sm text-gray-300 flex gap-2 transition-colors items-center"><Play className="w-4 h-4 flex-shrink-0 text-blue-500"/> Video (Current Slide)</button>
                    <button onClick={() => { setExportScope('all'); generateVideo(); }} className="w-full text-left p-2 hover:bg-gray-700 rounded text-sm text-gray-300 flex gap-2 transition-colors items-center"><FilmIcon className="w-4 h-4 flex-shrink-0 text-purple-500"/> Video (Full Story)</button>
                    <button onClick={generateHTML} className="w-full text-left p-2 hover:bg-gray-700 rounded text-sm text-gray-300 flex gap-2 transition-colors items-center"><FileCode className="w-4 h-4 flex-shrink-0 text-orange-500"/> HTML Story</button>
                </div>
            )}
        </div>

        {/* Floating Controls (Inside Preview for Space Saving) */}
        <div className="absolute bottom-4 flex items-center gap-3 md:gap-4 z-40 pointer-events-auto bg-black/50 backdrop-blur-sm p-1.5 rounded-full border border-white/10">
           <button onClick={() => setActivePageIndex(Math.max(0, activePageIndex-1))} className="p-1.5 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft className="text-white w-5 h-5"/></button>
           <button onClick={() => setIsPlaying(!isPlaying)} className={`p-2 rounded-full ${isPlaying?'bg-red-500':'bg-green-500'} text-white shadow-lg transform active:scale-95 transition-all`}>{isPlaying?<Pause fill="currentColor" className="w-4 h-4"/>:<Play fill="currentColor" className="w-4 h-4 ml-0.5"/>}</button>
           <div className="flex gap-1.5 px-1">{pages.map((_,i)=><div key={i} onClick={()=>setActivePageIndex(i)} className={`rounded-full cursor-pointer transition-all ${i===activePageIndex?'bg-orange-500 w-3 h-3':'bg-gray-500 w-2 h-2'}`}/>)}<button onClick={addNewPage} className="w-4 h-4 bg-white text-black rounded-full flex items-center justify-center text-[10px] font-bold active:scale-95 transition-transform">+</button></div>
           <button onClick={() => setActivePageIndex(Math.min(pages.length-1, activePageIndex+1))} className="p-1.5 hover:bg-white/10 rounded-full transition-colors"><ChevronRight className="text-white w-5 h-5"/></button>
        </div>

        {/* Container Logic Change: 
            On Desktop: h-full (flex expand)
            On Mobile: aspect-ratio based on resolution. This forces the div to take the correct height naturally.
        */}
        <div ref={containerRef} 
             className="w-full flex items-center justify-center bg-neutral-950 relative"
             style={{ 
                 height: window.innerWidth < 768 ? 'auto' : '100%', 
                 aspectRatio: window.innerWidth < 768 ? `${resolution.width}/${resolution.height}` : 'auto' 
             }}
        >
            <div ref={previewRef} className="relative shadow-2xl"
                 style={{ width: resolution.width, height: resolution.height, transform: `scale(${previewScale})`, transformOrigin: 'center center' }}
                 onMouseDown={(e) => startDrag(e, 'image')}
                 onTouchStart={(e) => startDrag(e, 'image')}>
                 <canvas key={resolution.label} ref={canvasRef} width={resolution.width} height={resolution.height} className="w-full h-full block bg-black" />
                
                 {/* Text Hit Areas */}
                 {activePage.texts.map(text => (
                     <div key={text.id}
                          onMouseDown={(e) => startDrag(e, text.id)}
                          onTouchStart={(e) => startDrag(e, text.id)}
                          className={`absolute cursor-move transition-colors ${activeLayerId === text.id ? 'border-dashed border-2 border-orange-500/70' : 'border-transparent'}`}
                          style={{
                              left: `${text.x}%`, top: `${text.y}%`,
                              width: '80%', height: 'auto', minHeight: '60px',
                              transform: 'translate(0, -50%)'
                          }}
                     >
                         {/* Handle */}
                         {activeLayerId === text.id && <div className="absolute -top-4 -right-4 bg-orange-500 text-white p-2 rounded-full shadow-lg scale-75 md:scale-100"><Move className="w-4 h-4"/></div>}
                     </div>
                 ))}
            </div>
        </div>
     </div>

     {/* SIDEBAR / CONTROLS - Mobile Bottom (Natural Flow) / Desktop Left */}
     <div className="w-full md:w-96 bg-gray-800 border-t md:border-t-0 md:border-r border-gray-700 flex flex-col z-30 order-last md:order-first md:h-full md:overflow-hidden shadow-[0_-4px_20px_rgba(0,0,0,0.3)] md:shadow-none">
         
         {/* Desktop Header (Hidden on mobile) */}
         <div className="hidden md:block p-5 border-b border-gray-700 bg-gray-800 sticky top-0 z-10">
           <div className="flex justify-between items-center mb-1">
               <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 flex items-center gap-2 min-w-0">
                   <Smartphone className="w-5 h-5 text-orange-500 flex-shrink-0" /> <span className="truncate">Metamorphosis Studio</span>
               </h1>
           </div>
           <div className="flex items-center gap-2"><span className="text-[10px] uppercase font-bold tracking-widest bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/30">AMP Story Maker</span></div>
         </div>

         <div className="flex border-b border-gray-700 bg-gray-750 gap-1 px-1 shrink-0">
            <button onClick={() => setActiveTab('content')} className={`flex-1 py-3 md:py-3 text-sm font-medium transition-colors rounded-t ${activeTab==='content'?'bg-gray-700 text-orange-400 border-b-2 border-orange-500':'text-gray-400 hover:text-gray-300'}`}>Content</button>
            <button onClick={() => setActiveTab('design')} className={`flex-1 py-3 md:py-3 text-sm font-medium transition-colors rounded-t ${activeTab==='design'?'bg-gray-700 text-violet-400 border-b-2 border-violet-500':'text-gray-400 hover:text-gray-300'}`}>Design</button>
         </div>
        
         {/* Mobile: Natural height (no overflow-y-auto on parent), Desktop: overflow-y-auto */}
         <div className="flex-grow md:overflow-y-auto p-4 md:p-6 space-y-5 md:space-y-6 custom-scrollbar pb-20 md:pb-8 bg-gray-800/50">
            {activeTab === 'content' && (
               <>
                  <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-400 font-bold"><span>Layers</span><button onClick={addTextLayer} className="text-orange-400 hover:text-orange-300 hover:bg-orange-400/10 rounded p-1"><Plus className="w-4 h-4"/></button></div>
                      {activePage.texts.map(text => (
                          <div key={text.id} onClick={() => { setActiveLayerId(text.id); setActiveTab('design'); }} className={`p-3 md:p-3 rounded border cursor-pointer flex justify-between group text-sm transition-all ${activeLayerId === text.id ? 'bg-gray-700 border-orange-500 shadow-lg' : 'bg-gray-800 border-gray-700 hover:border-gray-600'}`}>
                             <span className="truncate flex-1 font-medium">{text.content}</span>
                             <button onClick={(e) => { e.stopPropagation(); deleteLayer(text.id); }} className="text-gray-500 hover:text-red-400 ml-2 flex-shrink-0 px-2"><Trash2 className="w-4 h-4"/></button>
                          </div>
                      ))}
                  </div>
                 
                  <div className="space-y-2 mt-4 border-t border-gray-700 pt-4">
                     <label className="text-xs font-bold text-gray-400 uppercase block">Background Image</label>
                     <div className="relative group rounded-lg overflow-hidden border border-gray-600 aspect-video bg-gray-900 shadow-inner">
                       <img src={activePage.image} className="w-full h-full object-cover" alt="Preview"/>
                       <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                         <ImageIcon className="w-8 h-8 mb-2 text-gray-300" /><span className="text-xs font-bold text-white bg-gray-700 px-3 py-1 rounded">Change Image</span>
                         <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                       </label>
                     </div>
                  </div>
                  <div className="border-t border-gray-700 pt-4"><label className="text-xs font-bold text-gray-400 uppercase mb-3 flex gap-2"><Film className="w-3 h-3" /> Page Animation</label><select value={activePage.bgAnimation} onChange={(e) => updatePage({bgAnimation: e.target.value})} className="w-full bg-gray-700 border-gray-600 rounded p-3 text-sm text-white">{ANIMATIONS.map(a=><option key={a.value} value={a.value}>{a.label}</option>)}</select></div>
               </>
            )}

            {activeTab === 'design' && activeLayer && (
                <div className="space-y-6">
                    <div className="border-b border-gray-700 pb-4">
                       <label className="flex text-xs md:text-sm mb-2 text-orange-400 font-semibold items-center gap-1 uppercase">
                           <Monitor className="w-3 h-3" /> Canvas Size
                       </label>
                       <select value={resolution.label} onChange={handleResolutionChange} className="w-full bg-gray-700 border border-gray-600 rounded p-3 md:p-2.5 text-sm md:text-sm text-white outline-none focus:border-orange-500 transition-colors">
                           {RESOLUTIONS.map((res, i) => <option key={i} value={res.label}>{res.label}</option>)}
                       </select>
                    </div>
                    {activeLayer ? (
                      <>
                        <div><label className="text-xs md:text-sm font-bold text-gray-500 uppercase mb-2 block">Text Content</label><textarea value={activeLayer.content} onChange={(e) => updateTextLayer(activeLayerId, 'content', e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-base text-white h-24 resize-none focus:border-orange-500 outline-none transition-colors" /></div>
                        <div className="space-y-4 border-t border-gray-700 pt-4"><label className="text-xs font-bold text-orange-400 uppercase">Typography</label><div className="grid grid-cols-2 gap-3"><select value={activeLayer.font} onChange={(e) => updateTextLayer(activeLayerId, 'font', e.target.value)} className="col-span-2 w-full bg-gray-700 border-gray-600 rounded p-3 text-sm">{FONTS.map(f=><option key={f.value} value={f.value}>{f.label}</option>)}</select><div className="flex items-center gap-2"><TypeIcon className="w-4 h-4 text-gray-500"/><input type="number" value={activeLayer.size} onChange={(e) => updateTextLayer(activeLayerId, 'size', parseInt(e.target.value))} className="w-full bg-gray-700 border-gray-600 rounded p-3 text-base" /></div><div className="flex items-center gap-2"><Bold className="w-4 h-4 text-gray-500"/><select value={activeLayer.weight} onChange={(e) => updateTextLayer(activeLayerId, 'weight', e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded p-3 text-sm"><option value="400">Normal</option><option value="700">Bold</option><option value="900">Heavy</option></select></div></div><div className="flex gap-2"><button onClick={() => updateTextLayer(activeLayerId, 'italic', !activeLayer.italic)} className={`p-3 rounded flex-1 ${activeLayer.italic?'bg-orange-500 text-white':'bg-gray-700 text-gray-400'}`}><Italic className="w-4 h-4 mx-auto"/></button><button onClick={() => updateTextLayer(activeLayerId, 'uppercase', !activeLayer.uppercase)} className={`p-3 rounded flex-1 ${activeLayer.uppercase?'bg-orange-500 text-white':'bg-gray-700 text-gray-400'}`}><TypeIcon className="w-4 h-4 mx-auto"/></button><div className="flex bg-gray-700 rounded p-1 flex-[2]">{['left','center','right'].map(a=><button key={a} onClick={()=>updateTextLayer(activeLayerId,'align',a)} className={`flex-1 rounded p-2 ${activeLayer.align===a?'bg-gray-600 text-white':'text-gray-400'}`}>{a==='left'?<AlignLeft className="w-4 h-4 mx-auto"/>:a==='center'?<AlignCenter className="w-4 h-4 mx-auto"/>:<AlignRight className="w-4 h-4 mx-auto"/>}</button>)}</div></div></div>
                        <div className="space-y-4 border-t border-gray-700 pt-4">
                           <label className="text-xs font-bold text-purple-400 uppercase">Appearance</label>
                           <div className="flex gap-4">
                               <div className="flex-1"><label className="text-xs text-gray-500 mb-1 block">Text Color</label><div className="flex items-center bg-gray-700 rounded p-1 h-10"><input type="color" value={activeLayer.color} onChange={(e) => updateTextLayer(activeLayerId, 'color', e.target.value)} className="w-full h-full rounded bg-transparent border-none"/></div></div>
                               <div className="flex-1">
                                   <label className="text-xs text-gray-500 mb-1 block">Background</label>
                                   <div className="flex items-center bg-gray-700 rounded p-1 gap-2 h-10">
                                       {activeLayer.bg !== 'transparent' ? (
                                           <>
                                               <input type="color" value={activeLayer.bg} onChange={(e) => updateTextLayer(activeLayerId, 'bg', e.target.value)} className="flex-1 h-full rounded bg-transparent border-none cursor-pointer" />
                                               <button onClick={() => updateTextLayer(activeLayerId, 'bg', 'transparent')} className="text-gray-400 hover:text-red-400 p-2"><X className="w-4 h-4" /></button>
                                           </>
                                       ) : (
                                           <button onClick={() => updateTextLayer(activeLayerId, 'bg', '#ffffff')} className="w-full h-full flex items-center justify-center text-xs text-gray-400 hover:text-white border border-dashed border-gray-500 hover:border-gray-300 rounded">No Fill</button>
                                       )}
                                   </div>
                               </div>
                           </div>
                           <div><label className="text-xs text-gray-500 mb-1 block">Opacity</label><input type="range" min="0" max="1" step="0.1" value={activeLayer.opacity} onChange={(e)=>updateTextLayer(activeLayerId, 'opacity', parseFloat(e.target.value))} className="w-full h-2 bg-gray-600 rounded-lg appearance-none accent-purple-500"/></div>
                           {activeLayer.bg !== 'transparent' && (<div><label className="text-xs text-gray-500 mb-1 block">Corner Radius: {activeLayer.radius}px</label><input type="range" min="0" max="50" value={activeLayer.radius} onChange={(e)=>updateTextLayer(activeLayerId, 'radius', parseInt(e.target.value))} className="w-full h-2 bg-gray-600 rounded-lg appearance-none accent-purple-500"/></div>)}
                        </div>
                        <div className="space-y-4 border-t border-gray-700 pt-4"><label className="text-xs font-bold text-blue-400 uppercase">Text Motion</label><select value={activeLayer.animation} onChange={(e) => updateTextLayer(activeLayerId, 'animation', e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded p-3 text-sm text-white">{TEXT_ANIMATIONS.map(a=><option key={a.value} value={a.value}>{a.label}</option>)}</select></div>
                      </>
                    ) : <div className="text-gray-500 text-center py-10 text-sm">Select a text layer to edit</div>}
                   
                    <div className="border-t border-gray-700 pt-4"><label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2"><Sun className="w-3 h-3" /> Image Adjustments</label><div className="space-y-3"><div className="flex items-center gap-2 text-xs text-gray-400"><Sun className="w-3 h-3"/> Brightness <input type="range" min="50" max="150" value={activePage.filters?.brightness || 100} onChange={(e) => handleNestedChange('filters', 'brightness', e.target.value)} className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none accent-yellow-500"/></div><div className="flex items-center gap-2 text-xs text-gray-400"><Contrast className="w-3 h-3"/> Contrast <input type="range" min="50" max="150" value={activePage.filters?.contrast || 100} onChange={(e) => handleNestedChange('filters', 'contrast', e.target.value)} className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none accent-yellow-500"/></div><div className="flex items-center gap-2 text-xs text-gray-400"><Droplet className="w-3 h-3"/> Saturate <input type="range" min="0" max="200" value={activePage.filters?.saturate || 100} onChange={(e) => handleNestedChange('filters', 'saturate', e.target.value)} className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none accent-yellow-500"/></div></div></div>
                    <div className="border-t border-gray-700 pt-4 pb-4"><label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2"><ArrowUp className="w-3 h-3" /> Background Overlay</label><div className="flex gap-4 items-start flex-col md:flex-row"><div className="flex items-center gap-3 w-full"><input type="color" value={activePage.overlay?.color || '#000000'} onChange={(e) => handleNestedChange('overlay', 'color', e.target.value)} className="h-10 w-10 rounded bg-transparent border-none cursor-pointer flex-shrink-0" /><span className="text-sm text-gray-400">Overlay Color</span></div><div className="flex-1 w-full space-y-2"><div className="flex justify-between text-xs text-gray-500"><span>Opacity</span><span>{Math.round((activePage.overlay?.opacity || 0.6)*100)}%</span></div><input type="range" min="0" max="1" step="0.1" value={activePage.overlay?.opacity || 0.6} onChange={(e) => handleNestedChange('overlay', 'opacity', e.target.value)} className="w-full h-2 bg-gray-600 rounded-lg appearance-none accent-pink-500"/></div><div className="flex-1 w-full space-y-2"><div className="flex justify-between text-xs text-gray-500"><span>Height</span><span>{activePage.overlay?.height || 40}%</span></div><input type="range" min="0" max="100" value={activePage.overlay?.height || 40} onChange={(e) => handleNestedChange('overlay', 'height', e.target.value)} className="w-full h-2 bg-gray-600 rounded-lg appearance-none accent-pink-500"/></div></div></div>
                </div>
            )}
         </div>
     </div>
   </div>
 );
}
