import { withVercelToolbar } from '@vercel/toolbar/plugins/next'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    useTypeScriptCli: true,
  },
}

export default withVercelToolbar()(nextConfig)
