'use client'
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import React from "react";
import { HfInference } from "@huggingface/inference";

export default function Home() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState(null);
    const [imageAlt, setImageAlt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedModel, setSelectedModel] = useState("schnell");
    const [guidanceScale, setGuidanceScale] = useState(3.5);
    const [inferenceSteps, setInferenceSteps] = useState(28);

    const hf = new HfInference("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",{use_cache: false});

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleInputChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
    };

    const handleGuidanceScaleChange = (e) => {
        setGuidanceScale(e.target.value);
    };

    const handleInferenceStepsChange = (e) => {
        setInferenceSteps(e.target.value);
    };

    const handleQuery = async () => {
        setIsLoading(true);
        const data = {
            inputs: prompt,
            parameters: {
                guidance_scale: parseFloat(guidanceScale),
                num_inference_steps: parseInt(inferenceSteps, 10),

            },
        };
        const response = await query(data, selectedModel);

        if (response.success) {
            const imageUrl = URL.createObjectURL(response.result);
            setImage(imageUrl);
            setImageAlt("");
            setImageLoaded(true);
        } else {
            setImage(null);
            setImageAlt(response.errorMessage);
            setImageLoaded(false);
        }

        setIsLoading(false);
    };

    async function query(data, model) {
        const modelUrl = model === "schnell"
            ? "black-forest-labs/FLUX.1-schnell"
            : "black-forest-labs/FLUX.1-dev";

        try {
            const result = await hf.textToImage({
                model: modelUrl,
                inputs: data.inputs,
                parameters: data.parameters,
            });

            return { success: true, result: await result };
        } catch (error) {
            return { success: false, errorMessage: error.message || "An error occurred" };
        }
    }

    return (
        <main className={styles.main}>
            <div>
                <h1 className={styles.title}>RP Artwork Generator</h1>
                <div className={`${styles.mainContainer} min-w-[300px] md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto`}>
                    <form className={styles.searchinput}>
                        <input
                            contentEditable={true}
                            type="text"
                            value={prompt}
                            onChange={handleInputChange}
                            placeholder="Enter prompt"
                            className={`${styles.search} mb-4`}
                        />
                        {isLoading ? (
                            <div className={`${styles.loading}`}>
                                <div className={styles.spinner}></div>
                            </div>
                        ) : null}
                    </form>
                    <div style={{marginTop: "10px", display: "flex", justifyContent: "space-between"}}>
                        <label htmlFor="modelSelect" className="mr-2">Choose Model:</label>
                        <select
                            id="modelSelect"
                            value={selectedModel}
                            onChange={handleModelChange}
                            className={styles.select}
                        >
                            <option value="schnell">FLUX.1-schnell</option>
                            <option value="dev">FLUX.1-dev</option>
                        </select>
                    </div>

                    {selectedModel === "dev" ? (
                    <div className="flex justify-between mb-4">
                        <div>
                            <label htmlFor="guidanceScale" className="mr-2">Guidance Scale</label>
                            <input
                                type="range"
                                id="guidanceScale"
                                min="0"
                                max="20"
                                step="0.5"
                                value={guidanceScale}
                                onChange={handleGuidanceScaleChange}
                                className={styles.slider}
                            />
                            <input
                                type="text"
                                value={guidanceScale}
                                readOnly
                                className={styles.sliderValue}
                            />
                        </div>
                        <div>
                            <label htmlFor="inferenceSteps" className="mr-2">Number of Inference Steps</label>
                            <input
                                type="range"
                                id="inferenceSteps"
                                min="1"
                                max="100"
                                value={inferenceSteps}
                                onChange={handleInferenceStepsChange}
                                className={styles.slider}
                            />
                            <input
                                type="text"
                                value={inferenceSteps}
                                readOnly
                                className={styles.sliderValue}
                            />
                        </div>
                    </div>
                    ) : null}

                    <button
                        onClick={handleQuery}
                        className={`${styles.button} bg-purple-600 hover:bg-purple-700 md:mt-4 text-white py-2 px-4 rounded-full w-full`}
                    >
                        Generate Artwork
                    </button>
                    {image || imageAlt ? (
                        <div className={`${styles.imageContainer} max-w-full mt-4`}>
                            <Image
                                src={image || "/placeholder.png"} // Placeholder image if image is null
                                alt={imageAlt || "Generated artwork"}
                                width={300}
                                height={300}
                                sizes={'80vw'}
                                style={{ width: '90%', height: 'auto' }}
                                className={`${styles.image}`}
                                onLoad={handleImageLoad}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </main>
    );
}
