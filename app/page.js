import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <script type="module"
              src="https://gradio.s3-us-west-2.amazonaws.com/3.36.1/gradio.js">
      </script>
        <gradio-app src="models/ItsJayQz/GTA5_Artwork_Diffusion"></gradio-app>
    </main>
  )
}
