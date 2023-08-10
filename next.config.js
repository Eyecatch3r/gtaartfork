/** @type {import('next').NextConfig} */
const nextConfig = {experimental: {
        serverActions: true,
    },
    images: {
        domains: ['cdn.discordapp.com','media.discordapp.net'],
    },}
module.exports = nextConfig
