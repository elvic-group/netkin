
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { X, Download, Loader2, Film, Play } from 'lucide-react';
import { Movie } from '../types';

interface MovieVideoGeneratorProps {
  movie: Movie;
  onClose: () => void;
}

const MovieVideoGenerator: React.FC<MovieVideoGeneratorProps> = ({ movie, onClose }) => {
  const [prompt, setPrompt] = useState(`A cinematic trailer scene for the movie "${movie.title}", a ${movie.genre} film. High quality, photorealistic, dramatic lighting.`);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Check for API Key on mount or before generation
  const checkApiKey = async () => {
    // @ts-ignore
    if (window.aistudio && window.aistudio.hasSelectedApiKey) {
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
          // @ts-ignore
          await window.aistudio.openSelectKey();
          // We assume success or retry on next click
      }
      return true;
    }
    return true; // Fallback for local dev environments without the wrapper
  };

  const handleGenerate = async () => {
    setError(null);
    
    try {
      await checkApiKey();
      
      setIsGenerating(true);
      setStatusMessage('Initializing Veo model...');

      // Create a new client instance to ensure we have the latest selected key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      setStatusMessage('Sending request to Veo...');
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      setStatusMessage('Veo is dreaming up your video... This takes about 1-2 minutes.');

      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5 seconds
        // @ts-ignore - The SDK types might be slightly behind the simplified wrapper usage in instructions, but logic holds
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      if (operation.error) {
          throw new Error(operation.error.message || "Unknown error during generation");
      }

      const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!videoUri) {
          throw new Error("No video URI returned.");
      }

      setStatusMessage('Downloading video stream...');

      // Fetch the video content using the URI and API Key
      const response = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
      if (!response.ok) throw new Error("Failed to download generated video.");
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      setGeneratedVideoUrl(url);
      setStatusMessage('');

    } catch (err: any) {
      console.error("Video generation failed:", err);
      
      // Handle specific "entity not found" error which implies API key issues (race condition)
      if (err.message && err.message.includes("Requested entity was not found")) {
         // @ts-ignore
         if (window.aistudio && window.aistudio.openSelectKey) {
             setError("API Key synchronization failed. Please select your key again.");
             // @ts-ignore
             window.aistudio.openSelectKey();
         } else {
             setError("Video generation failed. Please try again.");
         }
      } else {
         setError(err.message || "Failed to generate video. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedVideoUrl) {
      const link = document.createElement('a');
      link.href = generatedVideoUrl;
      link.download = `${movie.title.replace(/\s+/g, '_')}_teaser.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#1F2024] border border-white/10 rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[700px]">
        
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
              <Film size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Veo Generator</span>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-1">
              Teaser Creator
            </h2>
            <p className="text-gray-500 text-xs">
              Generate a cinematic teaser video for <span className="text-white font-bold">{movie.title}</span> using Google Veo.
            </p>
            <div className="mt-2 text-[10px] text-gray-400 flex items-center gap-1">
                 <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-white">
                    Paid API Key Required
                 </a>
            </div>
          </div>

          <div className="space-y-6 flex-grow">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                Describe the Scene
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-40 bg-black/20 border border-white/10 text-white text-xs p-4 focus:border-netkin-red focus:outline-none resize-none rounded-sm"
                placeholder="Describe the camera movement, lighting, and action..."
              />
              <p className="mt-2 text-[9px] text-gray-500">
                  Tip: Be specific about lighting (e.g., "Neon hologram") and action (e.g., "driving at top speed").
              </p>
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
                    <Loader2 size={16} className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Film size={16} /> Generate Video
                  </>
                )}
             </button>
          </div>
        </div>

        {/* Right Panel: Preview */}
        <div className="w-full md:w-2/3 bg-black flex items-center justify-center relative overflow-hidden">
           {/* Background Grid Pattern */}
           <div className="absolute inset-0 opacity-20" 
                style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
           </div>

           {generatedVideoUrl ? (
             <div className="relative z-10 group w-full h-full flex flex-col items-center justify-center p-8">
                <video 
                  src={generatedVideoUrl} 
                  controls
                  autoPlay
                  loop
                  className="max-w-full max-h-[80%] shadow-2xl border border-white/10"
                />
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                      onClick={handleDownload}
                      className="bg-netkin-red text-white px-6 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg hover:bg-red-700 transition-colors"
                   >
                      <Download size={16} /> Download MP4
                   </button>
                </div>
             </div>
           ) : (
             <div className="text-center z-10 opacity-30 px-12">
                <Film size={80} className="mx-auto mb-6" strokeWidth={1} />
                <p className="text-sm font-bold uppercase tracking-widest mb-2">Ready to Produce</p>
                <p className="text-xs max-w-xs mx-auto">Use the controls to generate a short high-definition video clip.</p>
             </div>
           )}

           {/* Loading Overlay */}
           {isGenerating && (
             <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="w-20 h-20 border-4 border-white/10 border-t-netkin-red rounded-full animate-spin mb-6"></div>
                <p className="text-white text-sm font-bold uppercase tracking-widest animate-pulse mb-2">Generating Video</p>
                <p className="text-gray-400 text-xs">{statusMessage}</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default MovieVideoGenerator;
