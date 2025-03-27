import { Alchemy, type Network } from 'alchemy-sdk';
import { NETWORKS, type SupportedNetwork } from './utils';

// alchemy.core.getBlock(15221026).then(console.log);

export class AlchemyPort {
	private apiKey: string;
	private instances: Record<SupportedNetwork, Alchemy> = {} as Record<
		SupportedNetwork,
		Alchemy
	>;

	constructor() {
		this.apiKey = Bun.env['ALCHEMY_API_KEY'] || '';

		for (const network of Object.keys(NETWORKS) as Network[]) {
			this.instances[network] = new Alchemy({ apiKey: this.apiKey, network });
		}
	}

	getAlchemy(network: SupportedNetwork) {
		if (!this.instances[network]) {
			this.instances[network] = new Alchemy({
				apiKey: this.apiKey,
				network: network as Network,
			});
		}
		return this.instances[network];
	}
}
