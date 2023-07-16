import './globals.css'
import { Inter } from 'next/font/google'
import React, {useCallback} from "react";
import Bubbles from "../app/components/particles";
const inter = Inter({ subsets: ['latin'] })


export const metadata = {
    title: 'Gta Art Style Generator',
}


export default function RootLayout({ children }) {



  return (
    <html lang="en">
      <body className={inter.className}>
        <Bubbles></Bubbles>
      {children}</body>
    </html>
  )
}
