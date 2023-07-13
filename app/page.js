'use client'
import Image from 'next/image'
import styles from './page.module.css'
export default function Home() {
  return (
    <main className={styles.main}>
        <div>
            <h1 className="transition filter duration-500 hover:drop-shadow-[0_7px_11px_rgba(100,100,100,1)]">GTA Artwork Generator</h1>
            <script type="module" src="https://gradio.s3-us-west-2.amazonaws.com/3.36.1/gradio.js" async />
            <gradio-app info="false" src="https://eyecatcher-itsjayqz-gta5-artwork-diffusion.hf.space"></gradio-app>
        </div>
    </main>
  )
}