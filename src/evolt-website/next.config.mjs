// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://34.101.227.125:3000/:path*',
            },
        ];
    },
};

export default nextConfig;
