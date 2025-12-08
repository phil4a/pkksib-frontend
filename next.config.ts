import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 's3.pkksib.ru',
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
