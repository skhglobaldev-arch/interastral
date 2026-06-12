

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
// Modular Firebase Imports
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from './firebaseConfig'; 

import { getLocalizedModules, TRANSLATIONS, READING_COSTS, COIN_PACKAGES, BLOG_POSTS, FAQ_ITEMS } from './constants';
import { ModuleType, User, AppFormData, ReadingResult, ModuleConfig, LanguageCode, BlogPost, FAQItem, FormField } from './types';
import { generateReading } from './services/geminiService';

// --- CONFIGURATION ---
const API_URL = '/api';
const BRAND_LOGO_IMAGE = '/assets/brand/interastral-logo.png';
const BRAND_LOGO_IMAGE_ABSOLUTE = 'https://interastral.vision/assets/brand/interastral-logo.png';

// Add html2canvas type to window
declare global {
  interface Window {
    html2canvas: (element: HTMLElement, options?: any) => Promise<HTMLCanvasElement>;
  }
}

// --- Icons ---
const StardustIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/>
    <path d="M9 3v4"/>
    <path d="M3 5h4"/>
    <path d="M3 9h4"/>
  </svg>
);

const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  </svg>
);

// --- Constants for Profile Images ---
const PLANET_IMAGES = [
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614730341194-75c60740a2d3?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1621516091172-1316b245c345?q=80&w=400&auto=format&fit=crop'
];

// --- SEO Engine ---
const SEO = ({ title, description, image, url }: { title: string, description: string, image?: string, url?: string }) => {
    useEffect(() => {
        document.title = title;
        
        const setMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        const setOg = (property: string, content: string) => {
            let element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        setMeta('description', description);
        setOg('og:title', title);
        setOg('og:description', description);
        if(image) setOg('og:image', image);
        if(url) setOg('og:url', url);
        if(image) setMeta('twitter:image', image);
        
    }, [title, description, image, url]);
    return null;
};

// --- Visual Components ---

const NotificationModal = ({ message, type, onClose }: { message: string, type: 'success' | 'error' | 'info', onClose: () => void }) => {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in p-4">
        <div className="bg-[#0a0514] border border-purple-500/30 p-8 rounded-2xl max-w-sm w-full text-center shadow-[0_0_50px_rgba(168,85,247,0.3)] relative overflow-hidden group">
           {/* Decorative elements */}
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
           <div className="absolute inset-0 bg-purple-500/5 pointer-events-none"></div>
           
           <div className="mb-6 flex justify-center relative z-10">
             {type === 'success' && (
                 <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                     <span className="text-4xl animate-bounce">✨</span>
                 </div>
             )}
             {type === 'error' && (
                 <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                     <span className="text-4xl animate-pulse">⚠️</span>
                 </div>
             )}
             {type === 'info' && (
                 <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                     <span className="text-4xl animate-pulse">🔮</span>
                 </div>
             )}
           </div>
           
           <h3 className={`text-xl font-orbitron mb-3 tracking-widest ${
               type === 'success' ? 'text-green-300' : type === 'error' ? 'text-red-300' : 'text-blue-300'
           }`}>
               {type === 'success' ? 'SUCCESS' : type === 'error' ? 'ERROR' : 'NOTICE'}
           </h3>
           <p className="text-gray-300 font-mono text-sm mb-8 leading-relaxed relative z-10">{message}</p>
           
           <button onClick={onClose} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold font-orbitron text-xs tracking-[0.2em] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all transform hover:-translate-y-1 relative z-10">
             ACKNOWLEDGE
           </button>
        </div>
      </div>
    );
};

const ConfirmationModal = ({ message, onConfirm, onCancel }: { message: string, onConfirm: () => void, onCancel: () => void }) => {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in p-4">
        <div className="bg-[#0a0514] border border-red-500/30 p-8 rounded-2xl max-w-sm w-full text-center shadow-[0_0_50px_rgba(239,68,68,0.2)] relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
           
           <div className="mb-6 flex justify-center">
             <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30">
                 <TrashIcon />
             </div>
           </div>
           
           <h3 className="text-xl font-orbitron text-red-300 mb-3 tracking-widest">CONFIRMATION</h3>
           <p className="text-gray-300 font-mono text-sm mb-8">{message}</p>
           
           <div className="flex gap-4">
               <button onClick={onCancel} className="flex-1 bg-white/5 border border-white/10 text-gray-300 py-3 rounded-xl font-bold font-orbitron text-xs tracking-wider hover:bg-white/10 transition-all">
                 CANCEL
               </button>
               <button onClick={onConfirm} className="flex-1 bg-red-900/50 border border-red-500/30 text-red-200 py-3 rounded-xl font-bold font-orbitron text-xs tracking-wider hover:bg-red-800/50 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all">
                 DELETE
               </button>
           </div>
        </div>
      </div>
    );
};

const GalacticBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const layer1Ref = useRef<HTMLDivElement>(null);
    const layer2Ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
        let rafId = 0;
        const handleMouseMove = (e: MouseEvent) => {
          targetX = (e.clientX / window.innerWidth) * 2 - 1;
          targetY = (e.clientY / window.innerHeight) * 2 - 1;
        };
        const update = () => {
          currentX += (targetX - currentX) * 0.03;
          currentY += (targetY - currentY) * 0.03;
          if (containerRef.current) {
            containerRef.current.style.transform = `perspective(1000px) rotateX(${currentY * 2}deg) rotateY(${currentX * 2}deg)`;
          }
          if (layer1Ref.current) layer1Ref.current.style.transform = `translate(${currentX * -10}px, ${currentY * -10}px)`;
          if (layer2Ref.current) layer2Ref.current.style.transform = `translate(${currentX * -25}px, ${currentY * -25}px)`;
          rafId = requestAnimationFrame(update);
        };
        window.addEventListener('mousemove', handleMouseMove);
        update();
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          cancelAnimationFrame(rafId);
        };
    }, []);
    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-black">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black to-black opacity-80"></div>
           <div ref={containerRef} className="absolute inset-[-10%] w-[120%] h-[120%] will-change-transform" style={{ perspective: '1000px' }}>
               <div ref={layer1Ref} className="absolute inset-0 stars-layer layer-1 opacity-60 will-change-transform"></div>
               <div ref={layer2Ref} className="absolute inset-0 stars-layer layer-2 opacity-80 will-change-transform"></div>
           </div>
           <style>{`
             .stars-layer { background-repeat: repeat; position: absolute; }
             .layer-1 { background-image: radial-gradient(1px 1px at 10px 10px, white, transparent), radial-gradient(1px 1px at 130px 180px, white, transparent), radial-gradient(1px 1px at 300px 120px, white, transparent); background-size: 300px 300px; }
             .layer-2 { background-image: radial-gradient(2px 2px at 100px 50px, white, transparent), radial-gradient(1.5px 1.5px at 200px 150px, #FFD700, transparent), radial-gradient(2px 2px at 50px 350px, white, transparent); background-size: 400px 400px; }
           `}</style>
        </div>
    );
};

const MeteorShower = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="absolute w-[2px] h-[60px] bg-gradient-to-b from-white to-transparent opacity-60"
             style={{
               left: `${Math.random() * 100}%`,
               top: -100,
               transform: 'rotate(20deg)',
               animation: `meteorFall ${3 + Math.random() * 4}s linear infinite`,
               animationDelay: `${Math.random() * 5}s`
             }}>
        </div>
      ))}
      <style>{`
        @keyframes meteorFall {
          0% { transform: translateX(0) translateY(0) rotate(20deg); opacity: 1; }
          100% { transform: translateX(-200px) translateY(120vh) rotate(20deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// Shamsi Date Picker
const ShamsiDatePicker = ({ value, onChange, label }: { value: string, onChange: (val: string) => void, label: string }) => {
    const [y, m, d] = value ? value.split('/').map(s => parseInt(s)) : [null, null, null];
    const [year, setYear] = useState<number | ''>(y || '');
    const [month, setMonth] = useState<number | ''>(m || '');
    const [day, setDay] = useState<number | ''>(d || '');
    useEffect(() => { if (y) setYear(y); if (m) setMonth(m); if (d) setDay(d); }, [value]);
    useEffect(() => { if (year && month && day) { const formatted = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`; if (formatted !== value) onChange(formatted); } }, [year, month, day]);
    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const years = Array.from({ length: 100 }, (_, i) => 1404 - i);
    const selectClass = "bg-white/5 border border-white/10 text-white rounded-xl p-3 outline-none focus:border-pink-500 transition-all text-xs md:text-sm appearance-none text-center font-vazir cursor-pointer hover:bg-white/10";
    return (
      <div className="flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-2" dir="rtl">
              <div className="relative"><select value={day} onChange={e => setDay(Number(e.target.value))} className={`${selectClass} w-full`} required><option value="" disabled className="text-gray-500">روز</option>{days.map(d => <option key={d} value={d} className="text-black">{d}</option>)}</select></div>
              <div className="relative"><select value={month} onChange={e => setMonth(Number(e.target.value))} className={`${selectClass} w-full`} required><option value="" disabled className="text-gray-500">ماه</option>{months.map((m, i) => <option key={i} value={i+1} className="text-black">{m}</option>)}</select></div>
              <div className="relative"><select value={year} onChange={e => setYear(Number(e.target.value))} className={`${selectClass} w-full`} required><option value="" disabled className="text-gray-500">سال</option>{years.map(y => <option key={y} value={y} className="text-black">{y}</option>)}</select></div>
          </div>
          <input type="hidden" name={label} value={value} required />
      </div>
    );
};

// 3D Circular Carousel
const CircularCarousel = ({ items, onSelect, t }: { items: ModuleConfig[], onSelect: (mod: ModuleConfig) => void, t: any }) => {
  const rotationRef = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(380);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<number>(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  useEffect(() => { const handleResize = () => setRadius(window.innerWidth < 768 ? 260 : 420); handleResize(); window.addEventListener('resize', handleResize); return () => window.removeEventListener('resize', handleResize); }, []);
  const itemCount = items.length; const angleStep = 360 / itemCount;
  useEffect(() => { const animate = () => { if (!isDragging.current) { if (Math.abs(velocity.current) > 0.01) { rotationRef.current += velocity.current; velocity.current *= 0.95; } else { rotationRef.current -= 0.05; } } if (carouselRef.current) carouselRef.current.style.transform = `translateY(50px) rotateX(-10deg) rotateY(${rotationRef.current}deg)`; autoRotateRef.current = requestAnimationFrame(animate); }; autoRotateRef.current = requestAnimationFrame(animate); return () => cancelAnimationFrame(autoRotateRef.current); }, []);
  const handleStart = (clientX: number) => { isDragging.current = true; lastX.current = clientX; velocity.current = 0; if(containerRef.current) containerRef.current.style.cursor = 'grabbing'; };
  const handleMove = (clientX: number) => { if (!isDragging.current) return; const delta = clientX - lastX.current; rotationRef.current += delta * 0.5; velocity.current = delta * 0.5; lastX.current = clientX; };
  const handleEnd = () => { isDragging.current = false; if(containerRef.current) containerRef.current.style.cursor = 'grab'; };

  if (!items || items.length === 0) return <div className="text-center text-gray-500 mt-20 relative z-20">Initializing Modules...</div>;

  return (
    <div className="relative w-full h-[650px] md:h-[750px] flex justify-center items-center overflow-hidden perspective-container select-none" 
         onMouseDown={(e) => { e.preventDefault(); handleStart(e.clientX); }}
         onMouseMove={(e) => { e.preventDefault(); handleMove(e.clientX); }}
         onMouseUp={handleEnd}
         onMouseLeave={handleEnd}
         onTouchStart={(e) => handleStart(e.touches[0].clientX)}
         onTouchMove={(e) => handleMove(e.touches[0].clientX)}
         onTouchEnd={handleEnd}
         ref={containerRef}
         style={{ touchAction: 'none', cursor: 'grab' }}>
      
      <div className="absolute z-10 flex flex-col items-center justify-center pointer-events-none top-[5%] md:top-[5%] w-full text-center px-4">
         <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
             <div className="absolute inset-0 rounded-full border border-purple-200/50 animate-[spin_8s_linear_infinite]"></div>
             <div className="absolute inset-[-10px] rounded-full border border-pink-500/20 animate-[spin_10s_linear_infinite_reverse]"></div>
             <img src={BRAND_LOGO_IMAGE} alt="Interastral logo" className="w-full h-full rounded-full object-cover opacity-90 relative z-10 shadow-[0_0_50px_rgba(168,85,247,0.4)]" />
         </div>
         <p className="mt-2 text-[10px] md:text-sm tracking-[0.2em] font-cinzel font-bold max-w-lg leading-relaxed text-shimmer drop-shadow-[0_0_5px_rgba(192,132,252,0.5)]">
            {t.tagline}
         </p>
      </div>

      <div ref={carouselRef} className="absolute transform-style-3d will-change-transform" style={{ transform: `translateY(50px) rotateX(-10deg) rotateY(0deg)`, width: '100%', height: '100%' }}>
        {items.map((mod, index) => {
          const angle = index * angleStep;
          const cost = READING_COSTS[mod.type];
          
          return (
            <div key={mod.type} onClick={(e) => { e.stopPropagation(); onSelect(mod); }}
              className="absolute top-1/2 left-1/2 transform-style-3d cursor-pointer group"
              style={{ transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`, width: window.innerWidth < 768 ? '160px' : '180px', height: window.innerWidth < 768 ? '220px' : '240px' }}>
              <div className="relative w-full h-full bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:border-pink-400/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all duration-300 group-hover:scale-105 flex flex-col select-none">
                <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60"></div>
                <div className="relative h-3/4 overflow-hidden pointer-events-none">
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050214] to-transparent z-10"></div>
                   <img src={mod.image} alt={mod.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" draggable={false} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center z-20">
                  <h3 className="text-white font-orbitron text-[10px] md:text-sm font-bold mb-1 tracking-wider group-hover:text-pink-200 truncate">{mod.title}</h3>
                  <div className="flex items-center justify-center gap-1 text-yellow-300 text-[10px] font-bold mt-1">
                      <StardustIcon /> <span>{cost}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <style>{` .perspective-container { perspective: 1000px; } .transform-style-3d { transform-style: preserve-3d; } `}</style>
    </div>
  );
};

const HyperspaceTransition = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-white/0 animate-flash-light"></div>
      <div className="absolute inset-0 flex items-center justify-center">
         {Array.from({length: 24}).map((_, i) => (
            <div key={i} className="absolute h-[0px] w-[50vw] bg-gradient-to-r from-white via-yellow-100 to-transparent shadow-[0_0_15px_white] origin-left animate-warp-light" 
                 style={{ transform: `rotate(${i * 15}deg) translateX(10px)`, animationDelay: '0.1s' }} />
         ))}
      </div>
      <style>{`
        .animate-flash-light { animation: flash-light 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-warp-light { animation: warp-light 0.6s ease-out forwards; }
        @keyframes flash-light { 0% { background-color: rgba(255, 255, 255, 0); } 30% { background-color: rgba(255, 255, 255, 0.9); } 100% { background-color: rgba(255, 255, 255, 0); } }
        @keyframes warp-light { 0% { transform: rotate(var(--tw-rotate)) translateX(0) scaleX(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: rotate(var(--tw-rotate)) translateX(100vh) scaleX(2); opacity: 0; } }
      `}</style>
    </div>
  );
};

// --- BLOG COMPONENTS ---
const BlogList = ({ posts, onPostClick, language, t }: { posts: BlogPost[], onPostClick: (post: BlogPost) => void, language: LanguageCode, t: any }) => {
    return (
        <div className="w-full max-w-5xl mx-auto py-12 px-4 animate-fade-in">
             <h2 className="text-4xl font-orbitron text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">{t.blog}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {posts.map(post => {
                     const title = post.title[language] || post.title['en'];
                     const excerpt = post.excerpt[language] || post.excerpt['en'];
                     return (
                         <div key={post.id} onClick={() => onPostClick(post)} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 hover:bg-white/10 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                             <div className="h-48 overflow-hidden relative">
                                 <img src={post.image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                 <div className="absolute bottom-4 left-4 flex gap-2">
                                     {post.tags.map(tag => (
                                         <span key={tag} className="text-[10px] font-bold bg-purple-600/80 px-2 py-1 rounded text-white uppercase tracking-wider">{tag}</span>
                                     ))}
                                 </div>
                             </div>
                             <div className="p-6">
                                 <p className="text-xs text-gray-400 font-mono mb-2">{post.date}</p>
                                 <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-300 transition-colors">{title}</h3>
                                 <p className="text-sm text-gray-300 line-clamp-3">{excerpt}</p>
                                 <div className="mt-4 flex items-center text-purple-300 text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                     {t.readMore} →
                                 </div>
                             </div>
                         </div>
                     )
                 })}
             </div>
        </div>
    );
};

const BlogPostView = ({ post, language, onBack, t }: { post: BlogPost, language: LanguageCode, onBack: () => void, t: any }) => {
    const title = post.title[language] || post.title['en'];
    const content = post.content[language] || post.content['en'];
    const isRtl = language === 'fa' || language === 'ar';

    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4 animate-fade-in pb-32">
            <button onClick={onBack} className="mb-6 flex items-center gap-2 text-purple-300 hover:text-white transition-colors text-sm font-orbitron tracking-widest">
                ← {t.back}
            </button>
            <div className="relative h-[400px] rounded-3xl overflow-hidden mb-8 border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.2)]">
                <img src={post.image} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050214] via-[#050214]/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                     <div className="flex gap-2 mb-4">
                         {post.tags.map(tag => (
                             <span key={tag} className="text-[10px] font-bold bg-yellow-500/90 text-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">{tag}</span>
                         ))}
                     </div>
                     <h1 className={`text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-xl ${isRtl ? 'font-vazir' : 'font-orbitron'}`}>{title}</h1>
                     <p className="text-sm text-gray-300 mt-4 font-mono">{post.date}</p>
                </div>
            </div>
            
            <div className={`prose prose-invert prose-lg max-w-none prose-headings:text-purple-200 prose-p:text-gray-300 prose-a:text-pink-400 prose-blockquote:border-purple-500 prose-blockquote:bg-white/5 prose-blockquote:p-4 prose-blockquote:rounded-r-lg ${isRtl ? 'font-vazir rtl' : 'font-sans'}`} dir={isRtl ? 'rtl' : 'ltr'}>
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            
            <div className="mt-16 border-t border-white/10 pt-8 text-center">
                 <p className="text-gray-400 mb-4 font-orbitron text-sm">Explore your own destiny</p>
                 <button onClick={onBack} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all transform hover:-translate-y-1">
                     Start a Reading
                 </button>
            </div>
        </div>
    );
};

const FAQList = ({ faqs, language, t }: { faqs: FAQItem[], language: LanguageCode, t: any }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const isRtl = language === 'fa' || language === 'ar';

    return (
        <div className="w-full max-w-3xl mx-auto py-12 px-4 animate-fade-in" dir={isRtl ? 'rtl' : 'ltr'}>
            <h3 className={`text-2xl font-bold mb-8 text-center text-purple-200 ${isRtl ? 'font-vazir' : 'font-orbitron'}`}>
                {t.faqTitle}
            </h3>
            <div className="space-y-4">
                {faqs.map((faq, index) => {
                    const question = faq.question[language] || faq.question['en'];
                    const answer = faq.answer[language] || faq.answer['en'];
                    const isOpen = openIndex === index;

                    return (
                        <div key={index} className="border border-white/10 rounded-xl bg-white/5 overflow-hidden transition-all duration-300 hover:border-purple-500/30">
                            <button 
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                            >
                                <span className={`font-bold text-gray-200 ${isRtl ? 'font-vazir' : 'font-sans'}`}>{question}</span>
                                <span className={`text-purple-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className={`p-5 pt-0 text-gray-400 leading-relaxed text-sm ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                                    <ReactMarkdown>{answer}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Footer: React.FC = () => (
    <footer className="bg-black/40 backdrop-blur-md text-gray-400 py-6 border-t border-white/5 mt-auto relative z-20 font-mono text-xs">
      <div className="max-w-4xl mx-auto text-center px-4"><p className="mb-2 tracking-[0.2em] text-purple-300">INTERASTRAL.VISION</p><p className="opacity-50">© 2025 All rights reserved.</p></div>
    </footer>
);

const StoryTemplate = ({ result, elementRef, language, user }: { result: ReadingResult, elementRef: React.RefObject<HTMLDivElement>, language: LanguageCode, user: User | null }) => {
    // Email-like Theme Constants
    const isRtl = language === 'fa' || language === 'ar';
    const fontFamily = isRtl ? 'Vazirmatn, sans-serif' : 'Verdana, Geneva, sans-serif';
    const storyT = TRANSLATIONS[language] || TRANSLATIONS.en;
    
    return (
        <div ref={elementRef} className="fixed top-0 left-[-9999px]" style={{ 
            width: '540px', // Wider for better resolution
            height: '960px', // 9:16 aspect ratio
            background: 'linear-gradient(180deg, #0a0514 0%, #1a0b2e 100%)',
            fontFamily: fontFamily,
            direction: isRtl ? 'rtl' : 'ltr',
            color: '#e0e0e0',
            padding: '30px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
             {/* Decorative Border Container (Simulating the email container border) */}
             <div className="absolute inset-4 border border-[#4c1d95] rounded-3xl pointer-events-none opacity-50 shadow-[0_0_30px_rgba(168,85,247,0.2)]"></div>
             
             {/* Header */}
             <div className="z-10 text-center w-full pt-6 border-b border-[#4c1d95]/50 pb-4 mb-4">
                 <img src={BRAND_LOGO_IMAGE} alt="Logo" className="w-20 h-20 rounded-full border-2 border-[#a855f7] shadow-[0_0_15px_#a855f7] mx-auto mb-3 object-cover" crossOrigin="anonymous" />
                 <h2 className="text-[#f0abfc] text-2xl font-bold tracking-widest uppercase">INTERASTRAL</h2>
                 <p className="text-[#a855f7] text-xs tracking-[0.3em] uppercase mt-1">{storyT.tagline}</p>
             </div>

             {/* Main Content Area */}
             <div className="flex-grow flex flex-col items-center justify-center w-full px-4 space-y-6">
                 
                 {/* Title */}
                 <div className="text-center">
                     <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-md">{result.title}</h1>
                     <p className="text-sm text-gray-400 font-mono">{result.date}</p>
                 </div>

                 {/* Images */}
                 <div className="w-full flex justify-center items-center">
                     {result.type === ModuleType.TAROT && result.images && result.images.length >= 3 ? (
                         <div className="flex gap-3 justify-center items-center">
                             {result.images.slice(0, 3).map((img, i) => (
                                 <img key={i} src={img} className="w-28 h-48 object-cover rounded-lg border border-[#fcd34d]/50 shadow-[0_0_15px_rgba(251,191,36,0.3)] transform hover:scale-105 transition-transform" style={{ transform: i === 1 ? 'translateY(-10px)' : 'none' }} crossOrigin="anonymous" />
                             ))}
                         </div>
                     ) : (
                         <div className="relative w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden border border-[#a855f7]/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                             <img src={result.images?.[0] || 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=600'} className="w-full h-full object-cover" crossOrigin="anonymous" />
                             {/* Overlay Gradient */}
                             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514] via-transparent to-transparent opacity-60"></div>
                         </div>
                     )}
                 </div>

                 {/* Text Content Snippet */}
                 <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center w-full relative">
                     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-[#fcd34d] text-2xl">❝</div>
                     <p className="text-sm md:text-base leading-relaxed text-gray-200 line-clamp-[8] font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                         {result.content.replace(/---EMAIL_START---[\s\S]*---EMAIL_END---/, '').replace(/[#*`]/g, '').substring(0, 350)}...
                     </p>
                 </div>
             </div>
             
             {/* Footer */}
             <div className="z-10 w-full text-center pb-6 pt-4 border-t border-[#4c1d95]/50 mt-4">
                {user?.referralCode && (
                    <div className="inline-block bg-[#4c1d95]/30 px-4 py-2 rounded-full border border-[#d8b4fe]/30 mb-3">
                        <span className="text-[10px] text-[#d8b4fe] uppercase tracking-wider mr-2">{storyT.referral}</span>
                        <span className="text-sm font-bold text-[#fcd34d] font-mono">{user.referralCode}</span>
                    </div>
                )}
                <div className="text-[#6b7280] text-[10px] uppercase tracking-[0.2em] font-mono">
                    {storyT.discoverDestiny}
                </div>
                <div className="text-[#f0abfc] text-sm font-bold tracking-widest mt-1">
                    INTERASTRAL.VISION
                </div>
             </div>
        </div>
    );
};

const Navbar = ({ user, language, setLanguage, onLogout, onLogin, onDashboard, onHome, onPricing, onBlog, t }: { 
  user: User | null, 
  language: LanguageCode,
  setLanguage: (lang: LanguageCode) => void,
  onLogout: () => void, 
  onLogin: () => void, 
  onDashboard: () => void, 
  onHome: () => void, 
  onPricing: () => void,
  onBlog: () => void,
  t: any
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const linkClass = "px-4 py-2 font-orbitron text-xs tracking-[0.2em] text-gray-300 hover:text-white hover:text-shadow-glow transition-all duration-300 relative group flex items-center gap-1";
  const languages: {code: LanguageCode, label: string, flag: string}[] = [ { code: 'en', label: 'English', flag: '🇬🇧' }, { code: 'fr', label: 'Français', flag: '🇫🇷' }, { code: 'pt-PT', label: 'Português (PT)', flag: '🇵🇹' }, { code: 'pt-BR', label: 'Português (BR)', flag: '🇧🇷' }, { code: 'ar', label: 'العربية', flag: '🇸🇦' }, { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' }, { code: 'fa', label: 'فارسی', flag: '🇮🇷' }, { code: 'de', label: 'Deutsch', flag: '🇩🇪' } ];
  const currentFlag = languages.find(l => l.code === language)?.flag || '🇬🇧';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050214]/60 backdrop-blur-lg border-b border-white/5 transition-all duration-300" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer group" onClick={onHome}>
            <div className="relative"><div className="absolute inset-0 bg-purple-600 rounded-full blur-md opacity-20 group-hover:opacity-50 transition-opacity animate-pulse"></div><img src={BRAND_LOGO_IMAGE} alt="Logo" className="relative h-10 w-10 md:h-12 md:w-12 rounded-full border border-purple-400/20 group-hover:scale-105 transition-transform duration-500 z-10 opacity-90 group-hover:opacity-100"/></div>
            <div className="ml-4 flex flex-col justify-center"><h1 className="font-orbitron text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 tracking-[0.15em] group-hover:text-white transition-colors">{t.appTitle}</h1><p className="hidden md:block text-[8px] text-purple-300/70 tracking-[0.3em] font-cinzel mt-1">{t.tagline.split(',')[0]}</p></div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <button onClick={onHome} className={linkClass}><span className="group-hover:text-pink-200 transition-colors">{t.home}</span></button>
            <button onClick={onBlog} className={linkClass}><span className="group-hover:text-pink-200 transition-colors">{t.blog}</span></button>
            <div className="relative ml-2"><button onClick={() => setLangMenuOpen(!langMenuOpen)} className="px-3 py-2 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"><span className="text-lg filter grayscale hover:grayscale-0 transition-all">{currentFlag}</span></button>{langMenuOpen && (<div className="absolute top-full right-0 mt-2 w-48 bg-[#0a0514]/95 border border-purple-500/20 rounded-xl overflow-hidden shadow-2xl animate-fade-in backdrop-blur-xl">{languages.map(lang => (<button key={lang.code} onClick={() => { setLanguage(lang.code); setLangMenuOpen(false); }} className="w-full text-left px-4 py-3 text-xs font-mono text-gray-300 hover:bg-purple-900/30 hover:text-white flex items-center justify-between transition-colors border-b border-white/5 last:border-none"><span className={lang.code === language ? 'text-pink-400' : ''}>{lang.label}</span><span className="text-base">{lang.flag}</span></button>))}</div>)}</div>
            <div className="w-[1px] h-6 bg-white/10 mx-4"></div>

            {!user ? (
              <button onClick={onLogin} className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 hover:from-purple-700 hover:to-pink-700 text-white border border-purple-500/30 px-6 py-2 rounded-full font-orbitron text-[10px] font-bold tracking-[0.2em] shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all duration-300 transform hover:-translate-y-0.5">{t.login}</button>
            ) : (
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-yellow-500/30 cursor-pointer hover:bg-white/10 transition-all" onClick={onPricing}>
                    <span className="text-yellow-400 font-mono text-sm font-bold">{user.coins}</span>
                    <StardustIcon />
                    <span className="text-yellow-400 text-xs ml-1">+</span>
                 </div>
                <span className="text-pink-200 text-xs font-mono cursor-pointer hover:text-white tracking-wider border-b border-transparent hover:border-pink-500 transition-all" onClick={onDashboard}>{user.name}</span>
                <button onClick={onLogout} className="text-gray-400 hover:text-red-300 text-[10px] font-bold tracking-widest transition-colors">{t.logout}</button>
              </div>
            )}
          </div>
          
          <div className="-mr-2 flex md:hidden items-center gap-4">
             {user && <div className="flex items-center gap-1 text-yellow-400" onClick={onPricing}><span className="font-bold text-xs">{user.coins}</span><StardustIcon /></div>}
             <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="text-2xl filter grayscale hover:grayscale-0 transition-all">{currentFlag}</button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-purple-300 hover:text-white p-2"><svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"} /></svg></button>
          </div>
        </div>
      </div>
      
      {langMenuOpen && (<div className="md:hidden fixed top-20 right-4 w-48 bg-[#0a0514]/95 border border-purple-500/20 rounded-xl z-[60] p-1 grid grid-cols-1 gap-1 shadow-2xl backdrop-blur-xl">{languages.map(lang => (<button key={lang.code} onClick={() => { setLanguage(lang.code); setLangMenuOpen(false); }} className="text-left px-4 py-3 text-sm font-mono text-gray-300 hover:bg-white/10 flex items-center justify-between rounded-lg"><span className={lang.code === language ? 'text-pink-400' : ''}>{lang.label}</span><span>{lang.flag}</span></button>))}</div>)}
      {isOpen && (<div className="md:hidden bg-[#050214]/95 backdrop-blur-xl border-b border-white/10 animate-fade-in"><div className="px-4 pt-4 pb-6 space-y-3 flex flex-col items-center"><button onClick={() => { onHome(); setIsOpen(false); }} className="w-full text-center py-4 text-purple-200 font-orbitron text-sm tracking-widest border-b border-white/5 hover:text-white transition-colors">{t.home}</button><button onClick={() => { onBlog(); setIsOpen(false); }} className="w-full text-center py-4 text-purple-200 font-orbitron text-sm tracking-widest border-b border-white/5 hover:text-white transition-colors">{t.blog}</button><button onClick={() => { onPricing(); setIsOpen(false); }} className="w-full text-center py-4 text-purple-200 font-orbitron text-sm tracking-widest border-b border-white/5 hover:text-white transition-colors">{t.pricing}</button>{!user ? (<button onClick={() => { onLogin(); setIsOpen(false); }} className="w-full text-center py-4 bg-purple-900/40 text-pink-200 font-orbitron mt-2 tracking-widest rounded-lg">{t.login}</button>) : (<div className="w-full flex flex-col gap-2 mt-2"><button onClick={() => { onDashboard(); setIsOpen(false); }} className="w-full text-center py-3 text-pink-300 font-bold bg-white/5 rounded-lg">{user.name}</button><button onClick={() => { onLogout(); setIsOpen(false); }} className="w-full text-center py-2 text-red-400 text-xs">{t.logout}</button></div>)}</div></div>)}
    </nav>
  );
};

// ... (AuthModal, ShopModal, RedeemIntroModal, ModuleForm remain unchanged) ...
const AuthModal = ({ onClose, onLogin, t }: { onClose: () => void, onLogin: (name: string, email: string) => void, t: any }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      onLogin(user?.displayName || 'Traveler', user?.email || '');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/unauthorized-domain' || err.code === 'auth/operation-not-allowed') {
          setError('Domain unauthorized in Firebase. Please use Guest Login for testing.');
      } else if (err.message && err.message.includes('Cross-Origin-Opener-Policy')) {
          setError('Login blocked by browser policy. Please open the app in a new tab to login.');
      } else {
          setError(err.message || 'Login failed. If nothing happens, please open the app in a new tab.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
      <div className="relative bg-[#0a0514] border border-purple-500/30 p-8 w-full max-w-md shadow-[0_0_50px_rgba(168,85,247,0.15)] rounded-2xl text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
        <h2 className="text-3xl font-orbitron text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-8">{t.authTitle}</h2>
        {error && <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 text-xs text-left"><p className="font-bold">Error:</p><p>{error}</p></div>}
        <p className="text-xs text-yellow-400 mb-4">{t.authHelp}</p>
        <button onClick={handleGoogleLogin} disabled={loading} className="w-full bg-white text-black py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors mb-4"><svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.82-.15-1.82Z"/></svg>{loading ? t.connecting : t.continueWithGoogle}</button>
        <p className="text-[9px] text-purple-400/60 text-center mt-6 italic border-t border-white/5 pt-4">{t.legal.entertainment}</p>
      </div>
    </div>
  );
};
const ShopModal = ({ onClose, onBuy, onRedeem, t, user }: { onClose: () => void, onBuy: (planId: string, coins: number) => void, onRedeem: (code: string) => void, t: any, user: User | null }) => {
  const [refCode, setRefCode] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const handlePurchase = async (pkg: any) => { setProcessingId(pkg.id); await onBuy(pkg.id, pkg.coins); setProcessingId(null); };
  
  return (
      <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/90">
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[#050214]"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1600')] bg-cover bg-center opacity-40 mix-blend-screen"></div>
            <div className="absolute inset-0 opacity-70" style={{ 
                backgroundImage: 'radial-gradient(1.5px 1.5px at 20px 30px, #eee, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0))',
                backgroundSize: '200px 200px',
                animation: 'twinkle 5s infinite alternate' 
            }}></div>
        </div>
        <div className="relative z-10 flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 md:p-12 shadow-[0_0_50px_rgba(251,191,36,0.15)] animate-fade-in overflow-hidden">
              <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white text-xl bg-white/10 hover:bg-white/30 w-10 h-10 flex items-center justify-center rounded-full transition-all z-20 backdrop-blur-md">✕</button>
              <div className="text-center mb-12 relative z-10">
                <h2 className="text-3xl md:text-5xl font-cinzel font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 drop-shadow-[0_2px_10px_rgba(234,179,8,0.5)]">{t.chooseDestiny}</h2>
                <p className="text-purple-200 font-orbitron text-xs md:text-sm tracking-[0.3em] uppercase opacity-80">Acquire Stardust • Unlock Wisdom</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-6 mb-12 relative z-10">
                {COIN_PACKAGES.map((pkg, idx) => {
                    const isRecommended = pkg.isRecommended;
                    const isSpecial = pkg.isSpecial;
                    
                    let bgClass = 'bg-black/30 border-white/10 hover:border-purple-400/40 hover:bg-black/50';
                    let btnClass = 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/30';
                    let scaleClass = '';
                    
                    if (isRecommended) {
                        bgClass = 'bg-gradient-to-b from-yellow-900/60 to-black/60 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.3)] z-10';
                        btnClass = 'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]';
                        scaleClass = 'md:scale-105';
                    } else if (isSpecial) {
                        bgClass = 'bg-gradient-to-b from-pink-900/60 to-black/60 border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.3)] z-10';
                        btnClass = 'bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white font-bold shadow-[0_0_20px_rgba(236,72,153,0.3)]';
                        scaleClass = 'md:scale-105';
                    }

                    return (
                    <div key={idx} className={`relative group transition-all duration-500 hover:-translate-y-2 
                        ${bgClass} ${scaleClass} 
                        border rounded-2xl p-6 flex flex-col items-center backdrop-blur-md`}>
                        {isRecommended && (<div className="absolute -top-4 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black text-[10px] font-bold px-4 py-1 rounded-full tracking-widest font-orbitron shadow-lg">{t.mostPopular}</div>)}
                        {isSpecial && (<div className="absolute -top-4 bg-gradient-to-r from-pink-600 to-pink-400 text-white text-[10px] font-bold px-4 py-1 rounded-full tracking-widest font-orbitron shadow-lg animate-pulse">{t.oneTimeOffer}</div>)}
                        
                        <div className={`p-4 rounded-full mb-4 ${isRecommended ? 'bg-yellow-500/20 text-yellow-300' : isSpecial ? 'bg-pink-500/20 text-pink-300' : 'bg-white/5 text-gray-300'} group-hover:scale-110 transition-transform duration-500`}><StardustIcon /></div>
                        <h3 className={`text-lg font-orbitron mb-2 tracking-wider ${isRecommended ? 'text-white' : isSpecial ? 'text-pink-100' : 'text-gray-300'}`}>{pkg.name}</h3>
                        <div className="flex items-center gap-2 mb-6"><span className="text-3xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">{pkg.coins}</span><span className="text-xs text-yellow-500 font-bold uppercase tracking-widest">Stardust</span></div>
                        <div className="w-full border-t border-white/10 mb-6"></div>
                        <button onClick={() => handlePurchase(pkg)} disabled={processingId !== null} className={`w-full py-4 rounded-xl font-bold text-sm tracking-widest font-orbitron transition-all duration-300 flex items-center justify-center gap-2 ${btnClass} disabled:opacity-50 disabled:cursor-not-allowed`}>
                            {processingId === pkg.id ? (<span className="animate-pulse">{t.processing}</span>) : (<><span>{pkg.price} €</span><span className="text-xs opacity-70">➔</span></>)}
                        </button>
                    </div>
                )})}
              </div>
              {(!user || !user.redeemedReferral) && (
                <div className="max-w-lg mx-auto bg-white/5 backdrop-blur-sm p-1 rounded-2xl border border-white/10 relative z-10 flex flex-col md:flex-row gap-2 items-center hover:bg-white/10 transition-colors">
                     <div className="flex-grow w-full"><input type="text" value={refCode} onChange={(e) => setRefCode(e.target.value)} placeholder={t.referral} className="bg-transparent text-white px-6 py-4 w-full text-center md:text-left font-mono tracking-widest outline-none placeholder-gray-600 text-sm" /></div>
                     <button onClick={() => { onRedeem(refCode); setRefCode(''); }} className="w-full md:w-auto bg-purple-900/50 hover:bg-purple-800/50 text-purple-200 border border-purple-500/30 px-8 py-3 rounded-xl font-bold text-xs hover:text-white transition-all font-orbitron tracking-wider whitespace-nowrap m-1">{t.redeem}</button>
                </div>
              )}
            </div>
        </div>
        <style>{` @keyframes twinkle { 0% { opacity: 0.5; transform: scale(1); } 100% { opacity: 1; transform: scale(1.1); } } `}</style>
      </div>
  );
};
const RedeemIntroModal = ({ onClose, onRedeem, t }: { onClose: () => void, onRedeem: (code: string) => void, t: any }) => {
    const [code, setCode] = useState('');
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 animate-fade-in">
        <div className="w-full max-w-sm bg-[#0a0514] border border-purple-500/30 p-8 rounded-2xl text-center shadow-[0_0_50px_rgba(168,85,247,0.2)]">
           <h3 className="text-xl font-orbitron text-white mb-4">{t.cosmicCodeTitle}</h3>
           <p className="text-gray-400 text-xs mb-6 font-mono">{t.cosmicCodeDesc}</p>
           <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder={t.code} className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl w-full text-center font-mono tracking-widest mb-4 focus:border-purple-500 outline-none" />
           <button onClick={() => { if(code) onRedeem(code); }} className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold mb-3 hover:bg-purple-500 transition-colors font-orbitron text-sm">{t.redeem}</button>
           <button onClick={onClose} className="text-gray-500 hover:text-gray-300 text-xs tracking-widest underline">{t.skipForNow}</button>
        </div>
      </div>
  );
};

const NATAL_UI_TRANSLATIONS: Record<LanguageCode, any> = {
  en: {
    steps: [
      { title: 'Choose Chart Type', subtitle: 'First, choose the year and depth of the reading.' },
      { title: 'Birth Basics', subtitle: 'Quick details that make the analysis more precise.' },
      { title: 'Emotional Entry', subtitle: 'This makes the reading feel personal, not generic.' },
      { title: 'Analysis Focus', subtitle: 'Choose the main life area for the reading.' },
      { title: 'Love Patterns', subtitle: 'A stronger layer of personalization for relationships.' },
      { title: 'Career & Future', subtitle: 'Your current path, goal, and what feels blocked.' },
      { title: 'Deep Question', subtitle: 'The one change the reading should speak to.' },
      { title: 'Professional Version', subtitle: 'Monthly forecast, deeper relationship analysis, and golden decision windows.' }
    ],
    progress: (current: number, total: number) => `Step ${current} of ${total}`,
    stepError: 'Please complete this step first.',
    loadingTitle: 'Analyzing your personal path through your data and life patterns...',
    loadingSubtitle: 'Your chart is becoming a personal, emotional, and practical life analysis.',
    professionalRecommendation: 'Professional Recommendation',
    previous: 'Back',
    startAnalysis: 'Start Analysis'
  },
  fa: {
    steps: [
      { title: 'انتخاب نوع چارت', subtitle: 'اول مشخص کن تحلیل برای کدام سال نوشته شود.' },
      { title: 'اطلاعات پایه', subtitle: 'سریع، ساده و فقط برای دقیق‌تر شدن تحلیل.' },
      { title: 'ورود احساسی', subtitle: 'این بخش کمک می‌کند تحلیل فقط تاریخ تولد نباشد.' },
      { title: 'تمرکز تحلیل', subtitle: 'بگو انرژی اصلی تحلیل کجا باشد.' },
      { title: 'عشق و الگوهای رابطه', subtitle: 'اینجا تحلیل شخصی‌تر و واقعی‌تر می‌شود.' },
      { title: 'کار و آینده', subtitle: 'مسیر شغلی، هدف و مانع اصلی را روشن کن.' },
      { title: 'سوال عمیق', subtitle: 'همان نقطه‌ای که تحلیل باید به آن برسد.' },
      { title: 'نسخه حرفه‌ای', subtitle: 'ماه‌به‌ماه، روابط عمیق‌تر و زمان‌های طلایی تصمیم‌گیری.' }
    ],
    progress: (current: number, total: number) => `مرحله ${current} از ${total}`,
    stepError: 'لطفا فیلدهای این مرحله را کامل کن.',
    loadingTitle: 'در حال تحلیل مسیر شخصی شما بر اساس داده‌ها و الگوهای زندگی‌تان…',
    loadingSubtitle: 'چارت شما در حال تبدیل شدن به یک تحلیل شخصی، احساسی و کاربردی است.',
    professionalRecommendation: 'پیشنهاد حرفه‌ای',
    previous: 'قبلی',
    startAnalysis: 'شروع تحلیل'
  },
  fr: {
    steps: [
      { title: 'Type de thème', subtitle: 'Choisissez l’année et la profondeur de l’analyse.' },
      { title: 'Bases de naissance', subtitle: 'Quelques détails pour rendre l’analyse plus précise.' },
      { title: 'Entrée émotionnelle', subtitle: 'Cette étape rend la lecture personnelle et moins générique.' },
      { title: 'Focus de l’analyse', subtitle: 'Choisissez le domaine de vie principal.' },
      { title: 'Schémas amoureux', subtitle: 'Une couche plus personnelle pour les relations.' },
      { title: 'Carrière et avenir', subtitle: 'Votre chemin actuel, votre objectif et ce qui bloque.' },
      { title: 'Question profonde', subtitle: 'Le changement auquel la lecture doit répondre.' },
      { title: 'Version professionnelle', subtitle: 'Prévisions mensuelles, analyse relationnelle et fenêtres de décision.' }
    ],
    progress: (current: number, total: number) => `Étape ${current} sur ${total}`,
    stepError: 'Veuillez compléter cette étape avant de continuer.',
    loadingTitle: 'Analyse de votre chemin personnel à partir de vos données et schémas de vie...',
    loadingSubtitle: 'Votre thème devient une analyse personnelle, émotionnelle et pratique.',
    professionalRecommendation: 'Recommandation professionnelle',
    previous: 'Retour',
    startAnalysis: 'Lancer l’analyse'
  },
  'pt-BR': {
    steps: [
      { title: 'Tipo de mapa', subtitle: 'Escolha o ano e a profundidade da leitura.' },
      { title: 'Dados de nascimento', subtitle: 'Detalhes rápidos para deixar a análise mais precisa.' },
      { title: 'Entrada emocional', subtitle: 'Isso faz a leitura ficar pessoal, não genérica.' },
      { title: 'Foco da análise', subtitle: 'Escolha a área principal da vida.' },
      { title: 'Padrões no amor', subtitle: 'Uma camada mais forte de personalização nos relacionamentos.' },
      { title: 'Carreira e futuro', subtitle: 'Seu caminho atual, sua meta e o que parece bloqueado.' },
      { title: 'Pergunta profunda', subtitle: 'A mudança que a leitura deve tocar.' },
      { title: 'Versão profissional', subtitle: 'Previsão mês a mês, relações mais profundas e janelas de decisão.' }
    ],
    progress: (current: number, total: number) => `Etapa ${current} de ${total}`,
    stepError: 'Complete esta etapa antes de continuar.',
    loadingTitle: 'Analisando seu caminho pessoal pelos seus dados e padrões de vida...',
    loadingSubtitle: 'Seu mapa está virando uma análise pessoal, emocional e prática.',
    professionalRecommendation: 'Recomendação profissional',
    previous: 'Voltar',
    startAnalysis: 'Iniciar análise'
  },
  'pt-PT': {
    steps: [
      { title: 'Tipo de mapa', subtitle: 'Escolha o ano e a profundidade da leitura.' },
      { title: 'Dados de nascimento', subtitle: 'Detalhes rápidos para tornar a análise mais precisa.' },
      { title: 'Entrada emocional', subtitle: 'Isto torna a leitura pessoal, não genérica.' },
      { title: 'Foco da análise', subtitle: 'Escolha a área principal da vida.' },
      { title: 'Padrões no amor', subtitle: 'Uma camada mais forte de personalização nas relações.' },
      { title: 'Carreira e futuro', subtitle: 'O seu caminho atual, objetivo e o que parece bloqueado.' },
      { title: 'Pergunta profunda', subtitle: 'A mudança sobre a qual a leitura deve falar.' },
      { title: 'Versão profissional', subtitle: 'Previsão mês a mês, relações mais profundas e janelas de decisão.' }
    ],
    progress: (current: number, total: number) => `Etapa ${current} de ${total}`,
    stepError: 'Complete esta etapa antes de continuar.',
    loadingTitle: 'A analisar o seu caminho pessoal através dos seus dados e padrões de vida...',
    loadingSubtitle: 'O seu mapa está a tornar-se uma análise pessoal, emocional e prática.',
    professionalRecommendation: 'Recomendação profissional',
    previous: 'Voltar',
    startAnalysis: 'Iniciar análise'
  },
  ar: {
    steps: [
      { title: 'اختيار نوع الخريطة', subtitle: 'اختر السنة وعمق القراءة أولاً.' },
      { title: 'بيانات الميلاد', subtitle: 'تفاصيل سريعة تجعل التحليل أكثر دقة.' },
      { title: 'المدخل العاطفي', subtitle: 'هذه الخطوة تجعل القراءة شخصية وليست عامة.' },
      { title: 'تركيز التحليل', subtitle: 'اختر المجال الأساسي في الحياة.' },
      { title: 'أنماط الحب', subtitle: 'طبقة أعمق لتخصيص العلاقات.' },
      { title: 'العمل والمستقبل', subtitle: 'مسارك الحالي وهدفك وما يبدو عائقاً.' },
      { title: 'السؤال العميق', subtitle: 'التغيير الذي يجب أن تتحدث عنه القراءة.' },
      { title: 'النسخة المهنية', subtitle: 'توقعات شهرية، تحليل علاقات أعمق، وأوقات ذهبية للقرار.' }
    ],
    progress: (current: number, total: number) => `الخطوة ${current} من ${total}`,
    stepError: 'يرجى إكمال هذه الخطوة أولاً.',
    loadingTitle: 'جارٍ تحليل مسارك الشخصي عبر بياناتك وأنماط حياتك...',
    loadingSubtitle: 'تتحول خريطتك إلى تحليل شخصي وعاطفي وعملي.',
    professionalRecommendation: 'توصية مهنية',
    previous: 'السابق',
    startAnalysis: 'ابدأ التحليل'
  },
  hi: {
    steps: [
      { title: 'चार्ट प्रकार चुनें', subtitle: 'पहले वर्ष और रीडिंग की गहराई चुनें.' },
      { title: 'जन्म की मूल जानकारी', subtitle: 'छोटे विवरण जो विश्लेषण को अधिक सटीक बनाते हैं.' },
      { title: 'भावनात्मक शुरुआत', subtitle: 'इससे रीडिंग व्यक्तिगत बनती है, सामान्य नहीं.' },
      { title: 'विश्लेषण का केंद्र', subtitle: 'जीवन का मुख्य क्षेत्र चुनें.' },
      { title: 'प्रेम के पैटर्न', subtitle: 'रिश्तों के लिए अधिक व्यक्तिगत परत.' },
      { title: 'करियर और भविष्य', subtitle: 'आपका वर्तमान रास्ता, लक्ष्य और जो अटका हुआ लगता है.' },
      { title: 'गहरा प्रश्न', subtitle: 'वह बदलाव जिसके बारे में रीडिंग को बोलना चाहिए.' },
      { title: 'पेशेवर संस्करण', subtitle: 'मासिक पूर्वानुमान, गहरा संबंध विश्लेषण और निर्णय के शुभ समय.' }
    ],
    progress: (current: number, total: number) => `चरण ${current} / ${total}`,
    stepError: 'कृपया पहले यह चरण पूरा करें.',
    loadingTitle: 'आपके डेटा और जीवन पैटर्न के आधार पर आपका निजी मार्ग विश्लेषित हो रहा है...',
    loadingSubtitle: 'आपका चार्ट व्यक्तिगत, भावनात्मक और व्यावहारिक विश्लेषण बन रहा है.',
    professionalRecommendation: 'पेशेवर सुझाव',
    previous: 'वापस',
    startAnalysis: 'विश्लेषण शुरू करें'
  },
  de: {
    steps: [
      { title: 'Chart-Typ wählen', subtitle: 'Wähle zuerst Jahr und Tiefe der Deutung.' },
      { title: 'Geburtsdaten', subtitle: 'Kurze Details, die die Analyse präziser machen.' },
      { title: 'Emotionaler Einstieg', subtitle: 'Dadurch wird die Deutung persönlich statt allgemein.' },
      { title: 'Analysefokus', subtitle: 'Wähle den wichtigsten Lebensbereich.' },
      { title: 'Liebesmuster', subtitle: 'Eine stärkere persönliche Ebene für Beziehungen.' },
      { title: 'Karriere und Zukunft', subtitle: 'Dein aktueller Weg, dein Ziel und was blockiert wirkt.' },
      { title: 'Tiefe Frage', subtitle: 'Die eine Veränderung, über die die Deutung sprechen soll.' },
      { title: 'Professionelle Version', subtitle: 'Monatsprognose, tiefere Beziehungsanalyse und goldene Entscheidungsfenster.' }
    ],
    progress: (current: number, total: number) => `Schritt ${current} von ${total}`,
    stepError: 'Bitte fülle diesen Schritt zuerst aus.',
    loadingTitle: 'Dein persönlicher Weg wird anhand deiner Daten und Lebensmuster analysiert...',
    loadingSubtitle: 'Dein Chart wird zu einer persönlichen, emotionalen und praktischen Lebensanalyse.',
    professionalRecommendation: 'Professionelle Empfehlung',
    previous: 'Zurück',
    startAnalysis: 'Analyse starten'
  }
};

const ModuleForm = ({ type, onSubmit, loading, user, config, t, language, initialValues }: { type: ModuleType, onSubmit: (data: AppFormData) => void, loading: boolean, user: User | null, config: ModuleConfig, t: any, language: LanguageCode, initialValues?: AppFormData }) => {
  const [formData, setFormData] = useState<AppFormData>(initialValues || { name: user?.name || '', email: user?.email || '' } as AppFormData);
  const [userImage, setUserImage] = useState<string | undefined>(initialValues?.userImage);
  const [natalStep, setNatalStep] = useState(0);
  const [natalStepError, setNatalStepError] = useState('');
  const [formError, setFormError] = useState('');
  const isCafe = type === ModuleType.CAFE; const isDream = type === ModuleType.DREAM; const isWealth = type === ModuleType.WEALTH; const isLove = type === ModuleType.LOVE; const isTarot = type === ModuleType.TAROT; const isDaily = type === ModuleType.DAILY; const isReturnLove = type === ModuleType.RETURN_LOVE; const isPastLife = type === ModuleType.PAST_LIFE; const isNatalChart = type === ModuleType.NATAL_CHART; const isMystic = isCafe || isDream || isTarot;
  useEffect(() => { if(initialValues) { setFormData(initialValues); if(initialValues.userImage) setUserImage(initialValues.userImage); } else if(user) { setFormData(prev => ({...prev, name: user.name, email: user.email})); } setNatalStep(0); setNatalStepError(''); setFormError(''); }, [user, initialValues, type]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { const { name, value, type, checked } = e.target as HTMLInputElement; if (type === 'checkbox') { setFormData(prev => ({ ...prev, [name]: checked })); if (name === 'unknownTime' && checked) setFormData(prev => ({ ...prev, [name]: checked, birthTime: '' })); } else setFormData(prev => ({ ...prev, [name]: value })); setNatalStepError(''); setFormError(''); };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setUserImage(reader.result as string); reader.readAsDataURL(file); } };
  const submitHandler = (e: React.FormEvent) => { e.preventDefault(); if ((isCafe && !String(formData.lifeArea || '').trim()) || (isTarot && !String(formData.tarotFocus || '').trim())) { setFormError(t.multiSelectError); return; } onSubmit({ ...formData, userImage }); };
  const getContainerClass = () => { if (isCafe) return 'bg-black/70 border-none shadow-[0_0_25px_rgba(252,111,77,0.3)]'; if (isDream) return 'bg-[#7c7b7b]/70 border-none shadow-[0_0_25px_rgba(252,211,77,0.3)]'; if (isWealth) return 'bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(31,38,135,0.37)]'; if (isLove) return 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_25px_rgba(200,100,255,0.4)]'; if (isTarot) return 'bg-[#403f3f]/50 backdrop-blur-md shadow-[0_0_30px_rgba(252,211,77,0.6)] border border-white/10'; if (isDaily) return 'bg-[#757272]/10 backdrop-blur-md shadow-[0_8px_32px_rgba(31,38,135,0.37)] border border-white/20'; if (isReturnLove) return 'bg-[#2c003e]/85 shadow-[0_0_20px_rgba(255,105,180,0.5)] border border-[#ba75a1]/30'; if (isPastLife) return 'bg-white/10 backdrop-blur-md shadow-[0_0_25px_rgba(200,100,255,0.4)] border border-white/20'; if (isNatalChart) return 'bg-[#10123a]/90 backdrop-blur-md border border-[#818cf8]/30 shadow-[0_0_40px_rgba(79,70,229,0.25)]'; return 'bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.1)]'; };
  const getTitleClass = () => { if (isMystic) return 'font-cinzel text-[#fcd34d] drop-shadow-[2px_2px_6px_#000]'; if (isWealth) return 'text-[#fcd34d]'; if (isLove) return 'text-[#f7afd3] drop-shadow-[0_0_10px_#54012b]'; if (isDaily) return 'bg-gradient-to-r from-white via-[#c79aff] to-[#86f0ff] bg-clip-text text-transparent'; if (isReturnLove) return 'font-vibes text-[#f82b91] text-5xl drop-shadow-[0_0_10px_#f5afd2]'; if (isPastLife) return 'text-[#ffb4f4] font-bold'; if (isNatalChart) return 'text-[#dbeafe] font-bold drop-shadow-[0_0_8px_#4f46e5]'; return 'font-orbitron text-purple-200'; };
  const getLabelClass = () => { if (isMystic) return 'font-cinzel text-[#fef9c3]'; if (isWealth) return 'text-white font-bold'; if (isLove) return 'text-[#f9eff4] drop-shadow-[0_0_10px_#a00050]'; if (isDaily) return 'text-[#e0e0e0] drop-shadow-[0_0_6px_rgba(0,0,0,0.3)]'; if (isReturnLove) return 'text-[#f8c6de] drop-shadow-[0_0_5px_#ff7bbe] font-semibold'; if (isPastLife) return 'text-[#f5dcff] font-bold'; if (isNatalChart) return 'text-[#dbeafe] font-bold'; return 'font-mono text-gray-400'; };
  const getInputClass = () => { if (isCafe || isDream) return 'bg-[#1f2937]/90 border border-[#fcd34d] text-[#fef9c3] placeholder-yellow-100/30 font-cinzel'; if (isTarot) return 'bg-[#1f2937]/90 border border-[#fcd34d] text-[#fef9c3] font-cinzel'; if (isWealth) return 'bg-white/80 border border-[#ccc] text-gray-800 focus:bg-white'; if (isLove) return 'bg-white/20 border border-pink-200/50 text-white placeholder-pink-100'; if (isDaily) return 'bg-white/20 text-white shadow-inner focus:bg-white/35'; if (isReturnLove) return 'bg-white/10 border border-[#ba75a1] text-[#f0e6f6] focus:border-[#ff7bbe] focus:shadow-[0_0_12px_#ff7bbe] placeholder-[#dda0dd]/70'; if (isPastLife) return 'bg-white/20 text-white placeholder-[#f0c0e8] border-none focus:bg-white/30'; if (isNatalChart) return 'bg-[#1e1b4b]/70 border border-[#818cf8]/40 text-white focus:border-[#a5b4fc] focus:shadow-[0_0_15px_rgba(129,140,248,0.3)] disabled:opacity-50 disabled:cursor-not-allowed'; return 'bg-white/5 border border-white/10 text-white focus:border-pink-500 focus:shadow-[0_0_15px_rgba(236,72,153,0.2)] font-mono'; };
  const getButtonClass = () => { if (isMystic) return 'bg-gradient-to-br from-[#fcd34d] to-[#fde68a] text-black shadow-[0_0_20px_#fcd34d] hover:scale-[1.03] font-cinzel'; if (isWealth) return 'bg-[#8b4513] hover:bg-[#a0522d] text-white'; if (isLove) return 'bg-[#e91e63] hover:bg-[#c2185b] text-white'; if (isDaily) return 'bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] text-white shadow-[0_0_15px_#7b2ff7]'; if (isReturnLove) return 'bg-gradient-to-r from-[#ff56a0] to-[#ff7bbe] text-[#e121cb] font-vibes text-2xl font-bold hover:shadow-[0_5px_15px_#ff7bbe]'; if (isPastLife) return 'bg-[#e84cc2] hover:bg-[#ff79d2] text-white font-bold'; if (isNatalChart) return 'bg-[#6366f1] hover:bg-[#818cf8] text-white shadow-[0_0_20px_rgba(99,102,241,0.45)] font-bold'; return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] font-orbitron'; };
  const getUploadBoxClass = () => { if (isMystic) return 'border-[#fcd34d] bg-[#1f2937]/50 text-[#fcd34d]'; if (isLove) return 'border-pink-300 bg-white/10 text-pink-200'; if (isPastLife) return 'border-white/20 bg-white/10 text-[#f5dcff]'; return 'border-white/20 hover:border-pink-500 bg-white/5 text-pink-400'; };

  const natalUi = NATAL_UI_TRANSLATIONS[language] || NATAL_UI_TRANSLATIONS.en;
  const natalFieldGroups: (keyof AppFormData)[][] = [
    ['chartYear'],
    ['name', 'birthDate', 'birthTime', 'birthPlace'],
    ['currentEmotion'],
    ['natalFocus'],
    ['relationshipStatus', 'lovePattern', 'stillThinkingOfSomeone', 'loveGoal'],
    ['job', 'careerSatisfaction', 'biggestYearGoal', 'progressBlocker'],
    ['oneLifeChange'],
    ['professionalExtras']
  ];
  const natalFlowSteps = natalUi.steps.map((step: { title: string; subtitle: string }, index: number) => ({
    ...step,
    fieldNames: natalFieldGroups[index]
  }));

  const renderField = (field: FormField) => {
    const value = (formData as any)[field.name] || '';
    if (field.type === 'textarea') {
      return <textarea name={field.name} required={field.required} value={value} onChange={handleInputChange} className={`w-full p-3 rounded-xl outline-none transition-all ${getInputClass()}`} rows={4} />;
    }
    if (field.type === 'select' && ((isCafe && field.name === 'lifeArea') || (isTarot && field.name === 'tarotFocus'))) {
      const selectedValues = String(value || '').split(',').map(item => item.trim()).filter(Boolean);
      const toggleValue = (optionValue: string) => {
        const nextValues = selectedValues.includes(optionValue)
          ? selectedValues.filter(item => item !== optionValue)
          : [...selectedValues, optionValue];
        setFormData(prev => ({ ...prev, [field.name]: nextValues.join(',') }));
        setFormError('');
      };

      return (
        <div>
          <p className="mb-3 text-xs text-[#fef9c3]/70">{t.multiSelectHint}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {field.options?.map(opt => {
              const selected = selectedValues.includes(opt.value);
              return (
                <button key={opt.value} type="button" onClick={() => toggleValue(opt.value)} className={`rounded-xl border px-3 py-3 text-left text-sm transition-all ${selected ? 'border-[#fcd34d] bg-[#fcd34d]/25 text-white shadow-[0_0_14px_rgba(252,211,77,0.22)]' : 'border-[#fcd34d]/30 bg-[#1f2937]/70 text-[#fef9c3] hover:border-[#fcd34d]'}`}>
                  <span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded border border-[#fcd34d]/70 text-[10px]">{selected ? '✓' : ''}</span>
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      );
    }
    if (field.type === 'select' && isNatalChart) {
      return (
        <div className="grid gap-3">
          {field.options?.map(opt => {
            const selected = value === opt.value;
            return (
              <button key={opt.value} type="button" onClick={() => { setFormData(prev => ({ ...prev, [field.name]: opt.value })); setNatalStepError(''); }} className={`w-full text-left p-4 rounded-xl border transition-all ${selected ? 'bg-[#6366f1]/35 border-[#c7d2fe] text-white shadow-[0_0_18px_rgba(129,140,248,0.25)]' : 'bg-white/5 border-white/10 text-[#dbeafe] hover:border-[#818cf8]/70'}`}>
                <span className="block text-sm font-semibold leading-snug">{opt.label}</span>
                {field.name === 'chartYear' && opt.value === '2026_2027' && <span className="mt-2 inline-block rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-200">{natalUi.professionalRecommendation}</span>}
              </button>
            );
          })}
        </div>
      );
    }
    if (field.type === 'select') {
      return <select name={field.name} required={field.required} value={value} onChange={handleInputChange} className={`w-full p-3 rounded-xl outline-none transition-all ${getInputClass()}`}><option value="" className="text-black">...</option>{field.options?.map(opt => (<option key={opt.value} value={opt.value} className="text-black">{opt.label}</option>))}</select>;
    }
    if (field.type === 'file') {
      return <div className={`w-full border border-dashed p-6 flex flex-col items-center justify-center cursor-pointer transition-colors rounded-xl ${getUploadBoxClass()}`}><label className="cursor-pointer flex flex-col items-center"><span className="text-3xl mb-2">⇪</span><span className="font-mono text-xs opacity-70">{t.upload}</span><input type="file" className="hidden" accept="image/*" onChange={handleFileChange} /></label>{userImage && <p className="text-green-400 text-xs mt-2 font-mono">{t.uploadSuccess}</p>}</div>;
    }
    if (field.type === 'checkbox') {
      return <div className="flex items-center gap-3"><input type="checkbox" name={field.name} checked={!!(formData as any)[field.name]} onChange={handleInputChange} className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /><span className="text-sm opacity-80">{field.label}</span></div>;
    }
    if (field.type === 'date' && language === 'fa') {
      return <ShamsiDatePicker value={value} label={field.label} onChange={(val) => { setFormData(prev => ({ ...prev, [field.name]: val })); setNatalStepError(''); }} />;
    }
    return <input type={field.type} name={field.name} required={field.required} disabled={field.type === 'time' && field.name === 'birthTime' && formData.unknownTime} value={value} onChange={handleInputChange} className={`w-full p-3 rounded-xl outline-none transition-all ${getInputClass()}`} />;
  };

  const fieldIsComplete = (field: FormField) => !field.required || !!String((formData as any)[field.name] || '').trim();
  const currentNatalStep = natalFlowSteps[natalStep];
  const currentNatalFields = isNatalChart ? config.fields.filter(field => currentNatalStep.fieldNames.includes(field.name)) : config.fields;
  const canMoveNatalStep = () => currentNatalFields.every(fieldIsComplete);
  const handleNatalNext = () => { if (!canMoveNatalStep()) { setNatalStepError(natalUi.stepError); return; } setNatalStepError(''); setNatalStep(step => Math.min(step + 1, natalFlowSteps.length - 1)); };
  const handleNatalSubmit = (e: React.FormEvent) => { if (!canMoveNatalStep()) { e.preventDefault(); setNatalStepError(natalUi.stepError); return; } submitHandler(e); };

  if (isNatalChart && loading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl animate-fade-in my-8 relative overflow-hidden bg-[#10123a]/90 border border-[#818cf8]/30 shadow-[0_0_50px_rgba(99,102,241,0.25)] text-center">
        <div className="mx-auto mb-6 h-20 w-20 rounded-full border border-[#a5b4fc]/40 bg-[#6366f1]/20 flex items-center justify-center shadow-[0_0_35px_rgba(129,140,248,0.35)]">
          <div className="h-10 w-10 rounded-full border-2 border-transparent border-t-[#e0e7ff] border-r-[#e0e7ff] animate-spin"></div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-[#e0e7ff] mb-3">{natalUi.loadingTitle}</h2>
        <p className="text-sm text-[#c7d2fe]/80">{natalUi.loadingSubtitle}</p>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-2xl mx-auto p-8 rounded-2xl animate-fade-in my-8 relative overflow-hidden transition-all duration-500 ${getContainerClass()}`}>
      {isCafe && <MeteorShower />}
      <h2 className={`text-2xl font-bold mb-6 text-center tracking-wider z-10 relative ${getTitleClass()}`}>{config.title}</h2>
      <form onSubmit={isNatalChart ? handleNatalSubmit : submitHandler} className="space-y-6 relative z-10">
        {isNatalChart && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#c7d2fe]/80 mb-3">
              <span>{natalUi.progress(natalStep + 1, natalFlowSteps.length)}</span>
              <span>{Math.round(((natalStep + 1) / natalFlowSteps.length) * 100)}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-5">
              <div className="h-full bg-[#818cf8] transition-all duration-500" style={{ width: `${((natalStep + 1) / natalFlowSteps.length) * 100}%` }}></div>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{currentNatalStep.title}</h3>
            <p className="text-sm text-[#c7d2fe]/80">{currentNatalStep.subtitle}</p>
          </div>
        )}
        {currentNatalFields.map((field) => (
          <div key={field.name}>
            {field.type !== 'checkbox' && <label className={`block text-xs font-bold mb-2 tracking-widest ${getLabelClass()} flex items-center`}>{field.label}</label>}
            {renderField(field)}
          </div>
        ))}
        {isNatalChart && natalStepError && <p className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">{natalStepError}</p>}
        {!isNatalChart && formError && <p className="rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">{formError}</p>}
        {isNatalChart ? (
          <div className="flex gap-3 pt-2">
            {natalStep > 0 && <button type="button" onClick={() => { setNatalStep(step => Math.max(step - 1, 0)); setNatalStepError(''); }} className="flex-1 rounded-xl border border-white/15 bg-white/5 py-4 text-sm font-bold tracking-widest text-[#dbeafe] transition-colors hover:bg-white/10">{natalUi.previous}</button>}
            {natalStep < natalFlowSteps.length - 1 ? <button type="button" onClick={handleNatalNext} className={`flex-[2] py-4 font-bold tracking-widest rounded-xl transition-all ${getButtonClass()}`}>{t.continue}</button> : <button type="submit" disabled={loading} className={`flex-[2] py-4 font-bold tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-wait ${getButtonClass()}`}>{loading ? t.loading : natalUi.startAnalysis}</button>}
          </div>
        ) : (
          <button type="submit" disabled={loading} className={`w-full mt-8 py-4 font-bold tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-wait ${getButtonClass()}`}>{loading ? t.loading : (isMystic || isWealth || isDaily || isLove || isReturnLove || isPastLife ? t.continue : t.start)}</button>
        )}
      </form>
    </div>
  );
};
const ResultDisplay = ({ result, onBack, t, onShareClick }: { result: ReadingResult, onBack: () => void, t: any, onShareClick: () => void }) => {
    const isRtl = t.home === 'خانه' || t.home === 'الرئيسية';
    const isTarot = result.type === ModuleType.TAROT;
    const resultTypeLabel = t.modules?.[result.type]?.title || result.type.replace('_', ' ');

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 animate-fade-in pb-32">
             <button onClick={onBack} className="mb-6 flex items-center gap-2 text-purple-300 hover:text-white transition-colors group text-sm font-orbitron tracking-widest">
                <span className={`group-hover:${isRtl ? 'translate-x-1' : '-translate-x-1'} transition-transform transform ${isRtl ? 'rotate-180' : ''}`}>←</span> {t.back}
             </button>
             <div className="bg-[#050214]/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
                 
                 {/* MODIFIED IMAGE CONTAINER */}
                 <div className="relative w-full overflow-hidden group bg-black/40">
                     
                     {/* TAROT SPECIFIC DISPLAY */}
                     {isTarot && result.images && result.images.length >= 3 ? (
                        <div className="relative min-h-[400px] md:min-h-[500px] flex flex-col md:flex-row items-center justify-center gap-4 p-8">
                            {/* Background Blur based on middle card */}
                             <div className="absolute inset-0 z-0">
                                 <img src={result.images[1]} className="w-full h-full object-cover blur-3xl opacity-30" />
                                 <div className="absolute inset-0 bg-black/60 z-10"></div>
                             </div>

                             {/* The 3 Cards */}
                             {result.images.slice(0, 3).map((img, i) => (
                                 <div key={i} className="relative z-20 flex flex-col items-center animate-fade-in-up" style={{animationDelay: `${i*200}ms`}}>
                                     <img src={img} className="w-32 md:w-48 rounded-xl border border-yellow-500/30 shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:scale-105 transition-transform duration-500" />
                                 </div>
                             ))}
                             
                             {/* Text Overlay Gradient */}
                             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#050214] via-[#050214]/60 to-transparent z-20 pointer-events-none"></div>

                              {/* Title Overlay */}
                             <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-30">
                                 <div className="flex items-center gap-3 mb-3">
                                     <span className="text-[10px] font-bold tracking-[0.2em] text-black bg-yellow-400/90 px-3 py-1 rounded-full uppercase shadow-[0_0_15px_rgba(250,204,21,0.4)]">{resultTypeLabel}</span>
                                     <span className="text-[10px] font-mono text-purple-300 border border-purple-500/30 px-2 py-1 rounded bg-black/40 backdrop-blur-md">{result.date}</span>
                                 </div>
                                 <h1 className={`text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] ${isRtl ? 'font-vazir' : 'font-orbitron'}`}>{result.title}</h1>
                             </div>
                        </div>
                     ) : (
                        // STANDARD SINGLE IMAGE DISPLAY
                         <div className="relative min-h-[400px] md:min-h-[600px] flex items-center justify-center p-0 md:p-8">
                            {/* Background Blur */}
                             {result.images && result.images.length > 0 ? (
                                <div className="absolute inset-0 z-0">
                                    <img src={result.images[0]} className="w-full h-full object-cover blur-2xl opacity-50 scale-110 transition-transform duration-[20s] ease-in-out group-hover:scale-125" />
                                    <div className="absolute inset-0 bg-black/30 z-10"></div>
                                </div>
                             ) : (
                                <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1200')] bg-cover bg-center opacity-40"></div>
                             )}

                            {/* Main Image - Full View */}
                            {result.images && result.images.length > 0 ? (
                                 <img src={result.images[0]} alt="Vision" className="relative z-10 w-auto h-auto max-h-[70vh] max-w-full md:rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border-y md:border border-white/10" />
                            ) : null}

                             {/* Text Overlay Gradient */}
                             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#050214] via-[#050214]/60 to-transparent z-20 pointer-events-none"></div>

                              {/* Title Overlay */}
                             <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-30">
                                 <div className="flex items-center gap-3 mb-3">
                                     <span className="text-[10px] font-bold tracking-[0.2em] text-black bg-yellow-400/90 px-3 py-1 rounded-full uppercase shadow-[0_0_15px_rgba(250,204,21,0.4)]">{resultTypeLabel}</span>
                                     <span className="text-[10px] font-mono text-purple-300 border border-purple-500/30 px-2 py-1 rounded bg-black/40 backdrop-blur-md">{result.date}</span>
                                 </div>
                                 <h1 className={`text-2xl md:text-4xl font-bold text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] ${isRtl ? 'font-vazir' : 'font-orbitron'}`}>{result.title}</h1>
                             </div>
                        </div>
                     )}
                 </div>

                 <div className={`p-6 md:p-12 space-y-6 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
                      <div className={`prose prose-invert prose-p:text-gray-300 prose-headings:text-purple-100 prose-strong:text-yellow-100 prose-a:text-pink-400 prose-li:text-gray-300 max-w-none ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                          <ReactMarkdown>{result.content.replace(/---EMAIL_START---[\s\S]*---EMAIL_END---/, '')}</ReactMarkdown>
                      </div>
                      <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                           <div className="flex flex-col items-center md:items-start gap-1">
                               <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">{t.endMessage}</p>
                               <p className="text-[10px] text-purple-500/50 font-orbitron">{t.transmissionReceived}</p>
                           </div>
                           <button onClick={onShareClick} className="group relative px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-bold text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <span className="relative flex items-center gap-2 font-orbitron text-xs tracking-widest">
                                    <ShareIcon /> {t.share}
                                </span>
                           </button>
                      </div>
                 </div>
             </div>
        </div>
    );
};
// --- Main App Component ---
const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'HOME' | 'DASHBOARD' | 'READING' | 'BLOG'>('HOME');
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showRedeemIntro, setShowRedeemIntro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true); 
  const [currentResult, setCurrentResult] = useState<ReadingResult | null>(null);
  const [hyperspaceActive, setHyperspaceActive] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [initialFormData, setInitialFormData] = useState<AppFormData | undefined>(undefined);
  const [pendingReadingId, setPendingReadingId] = useState<string | null>(null);
  const storyTemplateRef = useRef<HTMLDivElement>(null);

  // -- New State for Notifications --
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);
  const [confirmation, setConfirmation] = useState<{ message: string, onConfirm: () => void } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      setNotification({ message, type });
  };

  useEffect(() => {
    const saved = localStorage.getItem('interastral_lang');
    if (saved) setLanguage(saved as LanguageCode);
  }, []);

  useEffect(() => {
    localStorage.setItem('interastral_lang', language);
  }, [language]);

  useEffect(() => {
    let mounted = true;
    const safetyTimeout = setTimeout(() => {
        if (mounted && isAuthLoading) {
            console.warn("Auth check timed out or failed to initialize.");
            setIsAuthLoading(false);
        }
    }, 2000);

    let unsubscribe = () => {};

    try {
        unsubscribe = onAuthStateChanged(auth, 
            async (currentUser) => { 
                if (!mounted) return;
                
                if (currentUser && currentUser.email) {
                    try {
                        // Pass current language to update user profile
                        const currentLang = localStorage.getItem('interastral_lang') || 'en';
                        const response = await axios.get(`${API_URL}/user/${currentUser.email}?lang=${currentLang}`);
                        if (mounted) {
                            setUser(response.data);
                            const storageKey = `redeem_seen_${currentUser.email}`;
                            const hasSeen = localStorage.getItem(storageKey);
                            if (!response.data.redeemedReferral && !hasSeen) {
                                setShowRedeemIntro(true);
                                localStorage.setItem(storageKey, 'true');
                            }
                        }
                    } catch (err) {
                        console.error("Error fetching user data", err);
                    }
                } else {
                    if (mounted) {
                        setUser(null);
                        if (currentView === 'DASHBOARD') {
                            setCurrentView('HOME');
                        }
                    }
                }
                
                if (mounted) setIsAuthLoading(false);
            }, 
            (error) => {
                console.error("Auth state change error:", error);
                if (mounted) setIsAuthLoading(false);
            }
        );
    } catch (e) {
        console.error("Auth Initialization Failed:", e);
        if (mounted) setIsAuthLoading(false);
    }

    return () => {
        mounted = false;
        clearTimeout(safetyTimeout);
        unsubscribe();
    };
  }, []);

  // ... (Verify Payment useEffect remains same) ...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get('payment');
    const sessionId = params.get('session_id');

    const verifyPayment = async () => {
      if (paymentStatus === 'success' && sessionId) {
        try {
          const res = await axios.post(`${API_URL}/payment/verify`, { sessionId });
          if (res.data.success) {
             const coinsAdded = res.data.coinsAdded || 0;
             const userEmail = res.data.email;
             showToast(`Payment Verified! ${coinsAdded} Stardust added to your balance.`, 'success');
             if (userEmail) {
                try {
                  const userRes = await axios.get(`${API_URL}/user/${userEmail}`);
                  setUser(userRes.data);
                } catch (e) {
                  console.error("Failed to refresh user data", e);
                  setUser(prev => prev ? ({ ...prev, coins: prev.coins + coinsAdded }) : null);
                }
             }
          }
        } catch (error: any) {
          console.error("Verification failed:", error);
          const errorMsg = error.response?.data?.error || "Could not verify payment automatically.";
          showToast(`Verification Failed: ${errorMsg}. Please contact support if coins are missing.`, 'error');
        } finally {
          window.history.replaceState({}, '', window.location.pathname);
        }
      }
    };

    verifyPayment();
  }, []);

  const t = TRANSLATIONS[language];
  const currentModules = getLocalizedModules(language);

  // ... (Handlers: Login, Logout, DeleteReading, ChangeAvatar, BuyCoins, Redeem, Invite, ModuleClick) ...
  const handleLogin = (_name: string, _email: string) => { setShowAuthModal(false); };
  const handleLogout = async () => { try { await signOut(auth); setUser(null); setCurrentView('HOME'); setInitialFormData(undefined); setPendingReadingId(null); } catch (e) { console.error("Logout error", e); setUser(null); setCurrentView('HOME'); } };
  
  const handleDeleteReading = async (e: React.MouseEvent, readingId: string) => { 
      e.stopPropagation(); 
      if (!user) return; 
      
      setConfirmation({
          message: "Are you sure you want to delete this vision forever?",
          onConfirm: async () => {
            setConfirmation(null); // Close modal
            try { 
                const newHistory = user.history.filter(h => h.id !== readingId); 
                setUser({ ...user, history: newHistory }); 
                await axios.post(`${API_URL}/readings/delete`, { email: user.email, readingId }); 
                showToast("Vision deleted successfully.", 'success');
            } catch (err) { 
                console.error("Delete failed", err); 
                showToast("Could not delete. Please refresh.", 'error'); 
            }
          }
      });
  };
  
  const changeAvatar = () => { if (!user) return; const currentIdx = PLANET_IMAGES.indexOf(user.profileImage || ''); let nextIdx = currentIdx + 1; if (nextIdx >= PLANET_IMAGES.length || currentIdx === -1) nextIdx = 0; const newImage = PLANET_IMAGES[nextIdx]; const updatedUser = { ...user, profileImage: newImage }; setUser(updatedUser); };
  
  const handleBuyCoins = async (planId: string, _coins: number) => { 
      if (!user) return; 
      try { 
          const response = await axios.post(`${API_URL}/payment/create-checkout-session`, { planId, email: user.email, returnUrl: window.location.origin }); 
          const { url } = response.data; 
          if (url) { window.location.href = url; } 
          else { showToast("Could not initiate star travel. Please try again.", 'error'); } 
      } catch (error) { 
          console.error("Payment failed", error); 
          showToast("Payment initialization failed. Please check your connection.", 'error'); 
      } 
  };
  
  const handleRedeem = async (code: string) => { 
      if(!user) return; 
      try { 
          const res = await axios.post(`${API_URL}/user/redeem`, { email: user.email, code }); 
          if(res.data.success) { 
              const added = res.data.coinsAdded; 
              setUser(prev => prev ? ({ ...prev, coins: prev.coins + added, redeemedReferral: true }) : null); 
              showToast(res.data.message || "Code redeemed successfully!", 'success');
              setShowRedeemIntro(false); 
          } 
      } catch (e: any) { 
          showToast(e.response?.data?.error || "Invalid code or already redeemed.", 'error'); 
      } 
  };
  
  const handleInviteFriend = async () => { 
      if (!user || !user.referralCode) return; 
      const inviteText = `Join me on Interastral! 🌌 Use my cosmic code to get 10 free Stardust: ${user.referralCode}\n${window.location.origin}`; 
      const shareData = { title: 'Interastral Invitation', text: inviteText, url: window.location.origin }; 
      
      const trackShare = async () => { 
          try { 
              const res = await axios.post(`${API_URL}/user/share`, { email: user.email }); 
              if (res.data.bonusAwarded) { 
                  showToast("You've earned 10 Stardust for sharing 5 times! 🌟", 'success');
                  setUser(prev => prev ? ({ ...prev, coins: prev.coins + 10 }) : null); 
              } 
          } catch (e) { console.error("Share tracking failed", e); } 
      }; 
      
      try { 
          if (navigator.share && navigator.canShare && navigator.canShare(shareData)) { 
              await navigator.share(shareData); 
              await trackShare(); 
          } else { 
              await navigator.clipboard.writeText(inviteText); 
              showToast("Invite copied to clipboard! Share it with friends.", 'success');
              await trackShare(); 
          } 
      } catch (err) { console.error("Share failed", err); } 
  };
  
  const handleModuleClick = (mod: ModuleConfig) => { if (!user) { setShowAuthModal(true); return; } setInitialFormData(undefined); setPendingReadingId(null); setHyperspaceActive(true); setTimeout(() => { setSelectedModule(mod.type); setCurrentView('READING'); setCurrentResult(null); setHyperspaceActive(false); }, 800); };
  
  const generateAndShareStory = async () => { 
      if (!storyTemplateRef.current) return; 
      try { 
          const canvas = await window.html2canvas(storyTemplateRef.current, { useCORS: true, scale: 2, backgroundColor: null }); 
          canvas.toBlob(async (blob) => { 
              if (!blob) return; 
              const file = new File([blob], "interastral-vision.png", { type: "image/png" }); 
              const shareData = { files: [file], title: 'Interastral Vision', text: 'My Cosmic Revelation' }; 
              if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) { 
                  await navigator.share(shareData); 
              } else { 
                  const url = URL.createObjectURL(blob); 
                  const a = document.createElement('a'); a.href = url; a.download = 'interastral-story.png'; a.click(); URL.revokeObjectURL(url); 
                  showToast((t.shareSuccess || 'Image saved!'), 'success'); 
              } 
          }); 
      } catch (err) { console.error("Story generation failed:", err); } 
  };
  
  const goHome = () => { setCurrentView('HOME'); setSelectedModule(null); setInitialFormData(undefined); setPendingReadingId(null); };

  const handleFormSubmit = async (data: AppFormData) => {
    if (!selectedModule || !user) return;
    
    const cost = READING_COSTS[selectedModule];
    const modTitle = currentModules.find(m => m.type === selectedModule)?.title || 'Cosmic Message';

    if (user.coins < cost) {
        const pendingResult: ReadingResult = {
            id: Date.now().toString(36).toUpperCase(),
            date: new Date().toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US'),
            type: selectedModule,
            title: modTitle,
            content: t.pendingReading,
            status: 'pending_payment',
            savedFormData: { ...data, language }
        };

        try {
            await axios.post(`${API_URL}/readings/save`, {
                email: user.email,
                readingData: pendingResult,
                moduleType: selectedModule
            });
            setUser({ 
                ...user, 
                history: [pendingResult, ...user.history] 
            });
        } catch (err) {
            console.error("Failed to save draft", err);
        }
        showToast(t.notEnough, 'error');
        // Slight delay to allow toast to be seen before modal opens, though they can overlap
        setTimeout(() => setShowShopModal(true), 500);
        return;
    }

    setLoading(true);
    
    try {
      const submissionData = { ...data, isPremium: true, language };
      const response = await generateReading(selectedModule, submissionData);

      let mainContent = response.text;
      const emailBlockStart = mainContent.indexOf('---EMAIL_START---');
      if (emailBlockStart !== -1) {
          mainContent = mainContent.substring(0, emailBlockStart).trim();
      }

      const newResult: ReadingResult = {
        id: Date.now().toString(36).toUpperCase(),
        date: new Date().toLocaleDateString(language === 'fa' ? 'fa-IR' : 'en-US'),
        type: selectedModule,
        title: modTitle,
        content: mainContent,
        images: response.images,
        status: 'completed'
      };

      await axios.post(`${API_URL}/readings/save`, {
          email: user.email,
          readingData: newResult,
          moduleType: selectedModule
      });

      // Update local history: Add new result, remove pending item if exists
      let newHistory = [newResult, ...user.history];
      if (pendingReadingId) {
          newHistory = newHistory.filter(h => h.id !== pendingReadingId);
          axios.post(`${API_URL}/readings/delete`, { 
              email: user.email, 
              readingId: pendingReadingId 
          }).catch(console.error);
      }

      const updatedUser = { 
          ...user, 
          coins: user.coins - cost, 
          history: newHistory 
      };
      setUser(updatedUser);
      setCurrentResult(newResult);
      
      // Reset pending state
      setPendingReadingId(null);
      setInitialFormData(undefined);

    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 403) {
          showToast(t.notEnough, 'error');
          setTimeout(() => setShowShopModal(true), 500);
      } else {
          showToast('Transmission failed. Please try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundStyle = () => {
    if (currentView === 'READING') {
      switch (selectedModule) {
        case ModuleType.CAFE: return { backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(5).jpg?alt=media&token=ab79d196-b075-403d-9874-5309476c7636')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' };
        case ModuleType.DREAM: return { backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/8THjUzP%20-%20Imgur%20(1).jpg?alt=media&token=645e9d49-ffc9-4e82-b5c4-7011d72a2a53')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' };
        case ModuleType.LOVE: return { backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(3).jpg?alt=media&token=ea04a2e7-d6a9-4334-be7b-bd51244e3f62')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' };
        case ModuleType.WEALTH: return { backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(7).jpg?alt=media&token=63406af8-8310-4cd8-be0b-2f9c58c3f10c')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' };
        case ModuleType.TAROT: return { backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur%20(1).jpg?alt=media&token=1a2f6099-e7b0-4132-a1ad-a125b8239ff8')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' };
        case ModuleType.DAILY: return { backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/interastral-96645.firebasestorage.app/o/undefined%20-%20Imgur.png?alt=media&token=3da865d3-f15e-4127-8c33-1c4e3974fa5c')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' };
        case ModuleType.RETURN_LOVE: return { background: 'linear-gradient(to bottom, #2c003e, #000000)' };
        case ModuleType.PAST_LIFE: return { backgroundImage: `url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2048&auto=format&fit=crop')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' };
        case ModuleType.NATAL_CHART: return { background: 'radial-gradient(circle at center, #312e81, #000000)' };
        default: return { background: 'black' };
      }
    }
    return {};
  };

  // SEO METADATA CALCULATION
  const getSEOMetadata = () => {
      let title = t.appTitle + " | " + t.tagline;
      let description = "Discover your past life, tarot readings, and astrological destiny with Interastral AI.";
      let image = BRAND_LOGO_IMAGE_ABSOLUTE;

      if (currentView === 'BLOG') {
          if (selectedBlogPost) {
              title = (selectedBlogPost.title[language] || selectedBlogPost.title['en']) + " | Interastral Blog";
              description = selectedBlogPost.excerpt[language] || selectedBlogPost.excerpt['en'];
              image = selectedBlogPost.image;
          } else {
              title = t.blog + " | Interastral";
              description = "Read the latest mysteries of the cosmos, tarot guides, and spiritual insights.";
          }
      } else if (currentView === 'READING' && selectedModule) {
          const modTitle = currentModules.find(m => m.type === selectedModule)?.title || 'Reading';
          title = `${modTitle} | Interastral AI`;
          description = `Perform a ${modTitle} using advanced AI to unlock secrets of your destiny.`;
      }

      return { title, description, image };
  };

  const seoData = getSEOMetadata();

  return (
    <div className={`min-h-screen text-white font-sans overflow-x-hidden flex flex-col transition-colors duration-1000 ease-in-out`} style={getBackgroundStyle()}>
      <SEO title={seoData.title} description={seoData.description} image={seoData.image} url={window.location.href} />
      {currentView === 'HOME' && <GalacticBackground />}
      <HyperspaceTransition isActive={hyperspaceActive} />
      <Navbar user={user} language={language} setLanguage={setLanguage} onLogin={() => setShowAuthModal(true)} onLogout={handleLogout} onDashboard={() => setCurrentView('DASHBOARD')} onHome={goHome} onPricing={() => setShowShopModal(true)} onBlog={() => { setCurrentView('BLOG'); setSelectedBlogPost(null); }} t={t} />
      <main className="flex-grow pt-20 px-4 md:px-8 relative z-10 flex flex-col justify-center">
        {currentView === 'HOME' && (<div className="w-full flex items-center justify-center animate-fade-in-up"><CircularCarousel items={currentModules} onSelect={handleModuleClick} t={t} /></div>)}
        {currentView === 'BLOG' && !selectedBlogPost && (
            <>
                <BlogList posts={BLOG_POSTS} onPostClick={setSelectedBlogPost} language={language} t={t} />
                <FAQList faqs={FAQ_ITEMS} language={language} t={t} />
            </>
        )}
        {currentView === 'BLOG' && selectedBlogPost && <BlogPostView post={selectedBlogPost} language={language} onBack={() => setSelectedBlogPost(null)} t={t} />}
        {currentView === 'DASHBOARD' && user && (
           <div className="w-full max-w-6xl mx-auto py-8 animate-fade-in">
             <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
                <div className="relative group cursor-pointer" onClick={changeAvatar}>
                   <img src={user.profileImage || PLANET_IMAGES[0]} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-purple-500/30 object-cover shadow-[0_0_30px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform" />
                   <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-xs">Change</span></div>
                </div>
                <div className="text-center md:text-left flex-grow">
                   <h2 className="text-4xl font-orbitron mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">{user.name}</h2>
                   <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                       <span className="px-4 py-1 bg-purple-900/50 rounded-full text-xs border border-purple-500/30 text-purple-200">{t.cosmicName}</span>
                       <span className="px-4 py-1 bg-yellow-900/30 rounded-full text-xs border border-yellow-500/30 text-yellow-200 font-bold flex items-center gap-1"><StardustIcon /> {user.coins}</span>
                       <span className="px-4 py-1 bg-green-900/30 rounded-full text-xs border border-green-500/30 text-green-200">{t.activePlan}</span>
                   </div>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                   <button onClick={() => setShowShopModal(true)} className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all font-orbitron tracking-wider">{t.ascend}</button>
                </div>
             </div>
             
             {/* Invite Card */}
             <div className="mb-8 bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                    <h3 className="text-xl font-bold font-orbitron text-purple-200 mb-2">Cosmic Connections</h3>
                    <p className="text-gray-300 text-sm max-w-md">Share your unique code. When a friend uses it, you both receive 10 Stardust. Plus, earn 10 Stardust for every 5 invites sent!</p>
                 </div>
                 <div className="bg-black/50 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                     <div className="text-center">
                         <span className="text-[10px] text-gray-500 block font-mono">YOUR CODE</span>
                         <span className="text-xl font-bold text-yellow-400 tracking-widest font-mono">{user.referralCode || 'LOADING...'}</span>
                     </div>
                     <button onClick={handleInviteFriend} className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors">
                         <ShareIcon />
                     </button>
                 </div>
             </div>
             {/* Referral Logs Section */}
             {user.referralLogs && user.referralLogs.length > 0 && (
                 <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                     <h3 className="text-lg font-bold font-orbitron text-purple-200 mb-4 flex items-center gap-2">
                         <span className="text-xl">🌟</span> Referral Rewards
                     </h3>
                     <div className="space-y-3">
                         {user.referralLogs.map((log, idx) => (
                             <div key={idx} className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5">
                                 <div className="flex flex-col">
                                     <span className="text-sm text-gray-300">{log.message}</span>
                                     <span className="text-[10px] text-gray-500 font-mono">{new Date(log.date).toLocaleDateString()}</span>
                                 </div>
                                 <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                                     +{log.coins} <StardustIcon />
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             )}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {user.history.map((reading) => {
                    const isPending = reading.status === 'pending_payment';
                    return (
                        <div key={reading.id} onClick={() => { if(isPending) { const cost = READING_COSTS[reading.type]; if (user.coins >= cost) { setSelectedModule(reading.type); setInitialFormData(reading.savedFormData); setPendingReadingId(reading.id); setCurrentView('READING'); setCurrentResult(null); } else { setShowShopModal(true); } return; } setCurrentResult(reading); setCurrentView('READING'); setSelectedModule(reading.type); }} className={`relative bg-black/40 border p-6 rounded-2xl transition-all cursor-pointer group ${isPending ? 'border-yellow-500/50 hover:border-yellow-400' : 'border-white/5 hover:border-purple-500/50 hover:bg-white/5'}`}>
                           <button onClick={(e) => handleDeleteReading(e, reading.id)} className="absolute top-4 right-4 text-gray-600 hover:text-red-500 z-10 p-1 bg-black/20 rounded-full backdrop-blur-sm transition-colors"><TrashIcon /></button>
                           {isPending && (<div className="absolute top-0 left-0 w-full bg-yellow-600/80 text-black text-center text-[10px] font-bold py-1 font-orbitron tracking-widest rounded-t-xl z-0">COMPLETE YOUR DESTINY - UNLOCK NOW</div>)}
                           <div className={`flex justify-between items-start mb-4 ${isPending ? 'mt-4 opacity-50' : ''}`}><span className="text-[10px] font-mono text-gray-500 border border-gray-800 px-2 py-1 rounded">{reading.date}</span><span className="text-xs text-purple-400 font-bold">{reading.type}</span></div>
                           <h3 className={`text-lg font-bold mb-2 group-hover:text-pink-300 transition-colors line-clamp-1 ${isPending ? 'text-yellow-200' : ''}`}>{reading.title}</h3>
                           {isPending ? (<div className="flex items-center justify-center h-20 bg-black/30 rounded-lg border border-white/5 mt-2"><div className="flex items-center gap-2 text-yellow-400 font-bold text-xs animate-pulse"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>LOCKED VISION</div></div>) : (<p className="text-sm text-gray-400 line-clamp-3">{reading.content.replace(/[#*`]/g, '')}</p>)}
                        </div>
                    );
                 })}
                 {user.history.length === 0 && (<div className="col-span-full text-center py-20 text-gray-500 border border-dashed border-white/10 rounded-3xl"><p className="mb-4 text-lg">{t.noHistory}</p><button onClick={goHome} className="text-pink-400 hover:text-white underline">{t.startFirst}</button></div>)}
             </div>
           </div>
        )}
        {currentView === 'READING' && selectedModule && !currentResult && (<ModuleForm type={selectedModule} config={currentModules.find(m => m.type === selectedModule)!} onSubmit={handleFormSubmit} loading={loading} user={user} t={t} language={language} initialValues={initialFormData} />)}
        {currentView === 'READING' && currentResult && (<><ResultDisplay result={currentResult} onBack={() => { setCurrentResult(null); if (user) setCurrentView('DASHBOARD'); else goHome(); }} t={t} onShareClick={generateAndShareStory} /><StoryTemplate result={currentResult} elementRef={storyTemplateRef} language={language} user={user} /></>)}
      </main>
      <Footer />
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} t={t} />}
      {showShopModal && <ShopModal onClose={() => setShowShopModal(false)} onBuy={handleBuyCoins} onRedeem={handleRedeem} t={t} user={user} />}
      {showRedeemIntro && <RedeemIntroModal onClose={() => setShowRedeemIntro(false)} onRedeem={handleRedeem} t={t} />}
      
      {/* GLOBAL MODALS */}
      {notification && <NotificationModal message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      {confirmation && <ConfirmationModal message={confirmation.message} onConfirm={confirmation.onConfirm} onCancel={() => setConfirmation(null)} />}
    </div>
  );
};

export default App;
