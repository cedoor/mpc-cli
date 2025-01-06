import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.resolve.fallback = { fs: false }

        config.module.rules.push({
            resourceQuery: /raw/,
            type: 'asset/source',
        })

        return config
    }
}

export default nextConfig
