import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.resolve.fallback = { fs: false }

        return config
    },
    eslint: {
        ignoreDuringBuilds: true
    }
}

export default nextConfig
