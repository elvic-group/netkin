
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Download, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { Movie } from '../types';

interface MoviePosterGeneratorProps {
  movie: Movie;
  onClose: () => void;
}

const STYLES = [
  "Cinematic Realistic",
  "Vintage Retro 80s",
  "Minimalist Vector",
  "Anime / Manga",
  "Oil Painting",
  "Cyberpunk",
  "Dark Noir",
  "Watercolor"
];

const MoviePosterGenerator: React.FC<MoviePosterGeneratorProps> = ({ movie, onClose }) => {
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `Create a high-quality, professional movie poster for a ${movie.genre} movie titled "${movie.title}". 
      Director: ${movie.author}. Year: ${movie.year}. 
      Art Style: ${selectedStyle}. 
      Visually striking, detailed, cinematic lighting. 
      Ensure the atmosphere matches the genre.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [{ text: prompt }]
        },
        config: {
            imageConfig: {
                aspectRatio: "3:4", 
            }
        }
      });

      // Extract image from response
      let foundImage = false;
      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64EncodeString = part.inlineData.data;
                setGeneratedImage(`data:${part.inlineData.mimeType};base64,${base64EncodeString}`);
                foundImage = true;
                break;
            }
        }
      }
      
      if (!foundImage) {
          setError("No image was generated. Please try again.");
      }

    } catch (err) {
      console.error("Generation failed:", err);
      setError("Failed to generate poster. Please check your API configuration.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `${movie.title.replace(/\s+/g, '_')}_poster.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#1F2024] border border-white/10 rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row h-[80vh] md:h-[600px]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:text-netkin-red hover:bg-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Panel: Controls */}
        <div className="w-full md:w-1/3 p-8 flex flex-col border-b md:border-b-0 md:border-r border-white/10 bg-[#1F2024]">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2 text-netkin-red">
              <Sparkles size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">AI Generator</span>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">
              Poster Remix
            </h2>
            <p className="text-gray-500 text-xs">
              Create a unique poster for <span className="text-white font-bold">{movie.title}</span> using Gemini AI.
            </p>
          </div>

          <div className="space-y-6 flex-grow">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                Choose Art Style
              </label>
              <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                {STYLES.map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wide border transition-all duration-200
                      ${selectedStyle === style 
                        ? 'bg-netkin-red border-netkin-red text-white' 
                        : 'bg-black/20 border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                      }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6">
             {error && (
                 <p className="text-red-500 text-[10px] font-bold uppercase mb-4 text-center">{error}</p>
             )}
             <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-white text-black hover:bg-netkin-red hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black transition-colors py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
             >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} /> Generate Poster
                  </>
                )}
             </button>
          </div>
        </div>

        {/* Right Panel: Preview */}
        <div className="w-full md:w-2/3 bg-black flex items-center justify-center relative overflow-hidden">
           {/* Background Grid Pattern */}
           <div className="absolute inset-0 opacity-20" 
                style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
           </div>

           {generatedImage ? (
             <div className="relative z-10 group h-full py-8">
                <img 
                  src={generatedImage} 
                  alt="Generated Poster" 
                  className="h-full object-contain shadow-2xl rounded-sm"
                />
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                      onClick={handleDownload}
                      className="bg-netkin-red text-white px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg hover:bg-red-700 transition-colors"
                   >
                      <Download size={16} /> Download
                   </button>
                </div>
             </div>
           ) : (
             <div className="text-center z-10 opacity-30">
                <Sparkles size={64} className="mx-auto mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest">Select a style to generate</p>
             </div>
           )}

           {/* Loading Overlay */}
           {isGenerating && (
             <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-white/10 border-t-netkin-red rounded-full animate-spin mb-4"></div>
                <p className="text-white text-xs font-bold uppercase tracking-widest animate-pulse">Creating Masterpiece...</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default MoviePosterGenerator;
