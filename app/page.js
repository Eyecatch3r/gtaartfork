'use client'
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
    const [prompt, setPrompt] = useState('');
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
        const data = { inputs: prompt+" gtav style" };
        const response = await query(data);
        const imageUrl = URL.createObjectURL(response);
        setImage(imageUrl);
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
                <h1 className={styles.title}>
                    GTA Artwork Generator
                </h1>
                <div className={styles.container}>
                    <input
                        type="text"
                        value={prompt}
                        onChange={handleInputChange}
                        placeholder="Enter prompt"
                        className={styles.input}
                    />
                    <button onClick={handleQuery} className={styles.button}>
                        Generate Artwork
                    </button>
                    <br/>
                    {isLoading ? (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                        </div>
                    ) : image ? (
                        <div
                            className={styles.imageContainer}
                        >
                            <Image
                                src={image}
                                alt="Generated Artwork"
                                width={500} // Replace with the actual width of the generated image
                                height={500} // Replace with the actual height of the generated image
                                className={styles.image}
                                onLoad={handleImageLoad}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </main>
    );
}

