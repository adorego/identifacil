/** @type {import('next').NextConfig} */
const nextConfig = {
/*    reactStrictMode: true,
    swcMinify: true,
    modularizeImports:{
        "@mui/icons-material":{
            transform: "@mui/icons-material/{{member}}",
        },
    },*/
    // webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false, os: false, path: false };
        return config;
    },
    
}



module.exports = nextConfig
