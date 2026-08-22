import type { paths } from './schema';
import { fetcher } from 'utils-fetcher';

// Production RGS URLs arrive as a bare host (e.g. "rgs.stakeengine.com") and must go
// over https. Local dev sometimes points at a plain-http mock server instead (e.g.
// "http://localhost:8787" for tools/mock-rgs) -- respect an explicit protocol when the
// caller already included one, instead of always forcing https.
const buildEndpoint = (rgsUrl: string, url: string) =>
	/^https?:\/\//.test(rgsUrl) ? `${rgsUrl}${url}` : `https://${rgsUrl}${url}`;

export const rgsFetcher = {
	post: async function post<
		T extends keyof paths,
		TResponse = paths[T]['post']['responses'][200]['content']['application/json'],
	>(options: {
		url: T;
		rgsUrl: string;
		variables?: paths[T]['post']['requestBody']['content']['application/json'];
	}): Promise<TResponse> {
		const response = await fetcher({
			method: 'POST',
			variables: options.variables,
			endpoint: buildEndpoint(options.rgsUrl, options.url),
		});

		if (response.status !== 200) console.error('error', response);
		const data = await response.json();
		return data as TResponse;
	},
	get: async function get<
		T extends keyof paths,
		TResponse = paths[T]['get']['responses'][200]['content']['application/json'],
	>(options: { url: T; rgsUrl: string }): Promise<TResponse> {
		const response = await fetcher({
			method: 'GET',
			endpoint: buildEndpoint(options.rgsUrl, options.url),
		});

		if (response.status !== 200) console.error('error', response);
		const data = await response.json();
		return data as TResponse;
	},
};
