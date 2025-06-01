import { type Alchemy, HistoricalPriceInterval } from 'alchemy-sdk';
import { Tokens } from './utils';

export class AlchemyPrice {
	private alchemy: Alchemy;

	constructor(alchemy: Alchemy) {
		this.alchemy = alchemy;
	}

	async getTokenPrices() {
		const prices = await this.alchemy.prices.getTokenPriceBySymbol(Tokens);

		return prices;
	}

	async getTokenPriceHistory(start: number, end: number) {
		const prices = Tokens.map(
			async (token) =>
				await this.alchemy.prices.getHistoricalPriceBySymbol(
					token,
					start,
					end,
					HistoricalPriceInterval.ONE_DAY,
				),
		);

		return prices;
	}
}
