import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	experimental: {
		useCache: true
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'befbb7a338eb-pkk-media.s3.ru1.storage.beget.cloud',
				port: '',
				pathname: '/**'
			}
		]
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '')}/uploads/:path*`
			}
		];
	}
};

export default nextConfig;
