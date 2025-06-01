import {
	type Alchemy,
	AssetTransfersCategory,
	SortingOrder,
} from 'alchemy-sdk';

export class AlchemyTransfer {
	private alchemy: Alchemy;

	constructor(alchemy: Alchemy) {
		this.alchemy = alchemy;
	}

	async getAssetTransfersFrom(fromAddress: string) {
		const transfers = await this.alchemy.core.getAssetTransfers({
			fromAddress,
			order: SortingOrder.DESCENDING,
			category: [
				AssetTransfersCategory.EXTERNAL,
				AssetTransfersCategory.INTERNAL,
				// AssetTransfersCategory.ERC1155,
				AssetTransfersCategory.ERC20,
				// AssetTransfersCategory.ERC721,
			],
		});

		return transfers;
	}

	async getAssetTransfersTo(toAddress: string) {
		const transfers = await this.alchemy.core.getAssetTransfers({
			toAddress,
			order: SortingOrder.DESCENDING,
			category: [
				AssetTransfersCategory.EXTERNAL,
				AssetTransfersCategory.INTERNAL,
				// AssetTransfersCategory.ERC1155,
				AssetTransfersCategory.ERC20,
				// AssetTransfersCategory.ERC721,
			],
		});

		return transfers;
	}
}
