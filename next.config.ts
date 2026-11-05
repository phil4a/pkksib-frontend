import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	output: 'standalone',

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.pkksib.ru',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'pkksib.s3.twcstorage.ru',
				port: '',
				pathname: '/**'
			}
		]
	},
	async rewrites() {
		const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '');
		if (!apiBase) return [];
		return [
			{
				source: '/uploads/:path*',
				destination: `${apiBase}/uploads/:path*`
			}
		];
	}
};

export default nextConfig;
