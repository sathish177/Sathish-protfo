import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Wand2, Loader, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';

// Simple in-memory cache
const cache = new Map();

const ImageEditor: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [originalMimeType, setOriginalMimeType] = useState<string>('');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setEditedImage(null);
            setError(null);
            setOriginalMimeType(file.type);
            const reader = new FileReader();
            reader.onloadend = () => {
                setOriginalImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const generateImage = async () => {
        if (!originalImage || !prompt) {
            setError("Please upload an image and provide an editing prompt.");
            return;
        }

        if (!process.env.API_KEY) {
            setError("API Key is not configured. Please contact the site owner.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setEditedImage(null);

        const cacheKey = `${originalImage.substring(0,100)}|${prompt}`;
        if (cache.has(cacheKey)) {
            setEditedImage(cache.get(cacheKey));
            setIsLoading(false);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const base64Data = originalImage.split(',')[1];
            
            const imagePart = {
                inlineData: {
                    data: base64Data,
                    mimeType: originalMimeType,
                },
            };
            const textPart = { text: prompt };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [imagePart, textPart] },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });

            const firstPart = response.candidates?.[0]?.content?.parts?.[0];
            if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
                const newBase64 = firstPart.inlineData.data;
                const newImageSrc = `data:${originalMimeType};base64,${newBase64}`;
                setEditedImage(newImageSrc);
                cache.set(cacheKey, newImageSrc);
            } else {
                throw new Error("No image was generated. The model may not have been able to fulfill the request.");
            }

        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : "An unknown error occurred while generating the image.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    return (
        <section id="image-editor" className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                    <motion.h2 className="text-3xl sm:text-4xl font-bold text-center mb-4" variants={cardVariants}>
                        AI Image Magic
                    </motion.h2>
                    <motion.div className="w-24 h-1 bg-primary mx-auto mb-12" variants={cardVariants}></motion.div>
                </motion.div>
                
                <div className="bg-light-surface dark:bg-surface p-6 sm:p-8 rounded-xl shadow-2xl border border-primary/20 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="image-upload" className="block text-lg font-semibold mb-2">1. Upload Image</label>
                                <div className="relative border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-primary dark:hover:border-primary transition-colors">
                                    <input id="image-upload" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageUpload} />
                                    <div className="flex flex-col items-center justify-center space-y-2 text-light-text-secondary dark:text-text-secondary">
                                        <Upload size={40} />
                                        <span>{originalImage ? "Image selected!" : "Click or drag to upload"}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="prompt" className="block text-lg font-semibold mb-2">2. Describe Your Edit</label>
                                <input 
                                    id="prompt" 
                                    type="text" 
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="e.g., 'Add a retro filter'" 
                                    className="w-full px-4 py-2 bg-light-background dark:bg-background rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>
                            <button 
                                onClick={generateImage}
                                disabled={isLoading || !originalImage || !prompt}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-violet-500 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <Loader className="animate-spin" /> : <Wand2 />}
                                {isLoading ? "Generating..." : "Apply Magic"}
                            </button>
                        </div>

                        <div className="space-y-4">
                             <h3 className="text-lg font-semibold text-center">Result</h3>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-center space-y-2">
                                    <p className="font-medium text-light-text-secondary dark:text-text-secondary">Original</p>
                                    <div className="w-full aspect-square bg-light-background dark:bg-background rounded-lg flex items-center justify-center border border-gray-300 dark:border-gray-600 overflow-hidden">
                                        {originalImage ? <img src={originalImage} alt="Original" className="w-full h-full object-contain" /> : <ImageIcon size={48} className="text-gray-400" />}
                                    </div>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <p className="font-medium text-light-text-secondary dark:text-text-secondary">Edited</p>
                                    <div className="w-full aspect-square bg-light-background dark:bg-background rounded-lg flex items-center justify-center border border-gray-300 dark:border-gray-600 overflow-hidden relative">
                                        {isLoading && <Loader size={48} className="text-primary animate-spin" />}
                                        {!isLoading && editedImage && <img src={editedImage} alt="Edited" className="w-full h-full object-contain" />}
                                        {!isLoading && !editedImage && <ImageIcon size={48} className="text-gray-400" />}
                                    </div>
                                </div>
                             </div>
                             {error && (
                                <div className="flex items-center gap-2 text-red-500 p-3 bg-red-500/10 rounded-md">
                                    <AlertTriangle size={20} />
                                    <p className="text-sm">{error}</p>
                                </div>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImageEditor;