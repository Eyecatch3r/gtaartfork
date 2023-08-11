'use client'
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import React from "react";



export default function Home() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleInputChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleQuery = async () => {
        setIsLoading(true);
        const data = { inputs: prompt + " gtav style" };
        const response = await query(data);

        if (response) {
            const imageUrl = URL.createObjectURL(response);
            setImage(imageUrl);
            setImageLoaded(true);
        } else {
            setImageLoaded(false);
        }

        setIsLoading(false);
    };

    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/ItsJayQz/GTA5_Artwork_Diffusion",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.blob();
        return result;
    }



    return (
        <main className={styles.main}>

            <div>
                <h1 className={styles.title}>GTA Artwork Generator</h1>
                <div className={`${styles.mainContainer} min-w-[300px] md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto`}>
                    <form className={styles.searchinput}>
                        <input type="text" value={prompt} onChange={handleInputChange} placeholder="Enter prompt" className={`${styles.search} mb-4`} />
                        {isLoading?
                            <div className={`${styles.loading}`}>
                                <div className={styles.spinner}></div>
                            </div> : null
                        }
                    </form>
                    <button onClick={handleQuery} className={`${styles.button} bg-blue-500 md:mt-4 text-white py-2 px-4 rounded-md w-full`}>
                        Generate Artwork
                    </button>
                    {image ? (
                        <div className={`${styles.imageContainer} max-w-full mt-4`}>
                            <Image
                                src={image}
                                alt="Model currently unavailable, please try again"
                                width={300}
                                height={300}
                                sizes={'80vw'}
                                style={{width: '90%', height: 'auto'}}
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

