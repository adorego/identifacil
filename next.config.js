/** @type {import('next').NextConfig} */
const nextConfig = {
/*    reactStrictMode: true,
    swcMinify: true,
    modularizeImports:{
        "@mui/icons-material":{
            transform: "@mui/icons-material/{{member}}",
        },
    },*/
    webpack: (config) => {
          config.watchOptions.poll = 300;
          return config;
        },
    
    
}



module.exports = nextConfig
