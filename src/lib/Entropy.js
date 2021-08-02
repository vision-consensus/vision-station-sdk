import Base from './Base';

export default class Entropy extends Base {

    constructor(visionStation) {
        super(visionStation);
        this.defaultTotalEntropyLimit = 10e10
    }

    async vs2FrozenEntropy(amount, options = {}) {

        this.validator.validateNumber({ n: 'amount', v: amount}, '>=', 0);

        if (options.unit === 'vdt')
            amount = this.apis.toVdt(amount);

        let totalEntropyWeight = await this.apis.getResourceByName('TotalEntropyWeight');
        let totalEntropyLimit = await this.apis.getChainParameterByName('getTotalEntropyLimit');
        return (amount * (totalEntropyLimit ? totalEntropyLimit : this.defaultTotalEntropyLimit)) / totalEntropyWeight;
    }

    async frozenEntropy2Vs(entropy, options = {}) {

        this.validator.validateNumber({ n: 'entropy', v: entropy}, '>=', 0);

        let totalEntropyWeight = await this.apis.getResourceByName('TotalEntropyWeight');
        let totalEntropyLimit = await this.apis.getChainParameterByName('getTotalEntropyLimit');
        let amount = (entropy * totalEntropyWeight) / (totalEntropyLimit ? totalEntropyLimit : this.defaultTotalEntropyLimit);

        if (options.unit === 'vdt') {
            amount = this.apis.fromVdt(amount);
        }
        return amount;
    }

    async vs2BurnedEntropy(amount, options = {}) {

        this.validator.validateNumber({ n: 'amount', v: amount}, '>=', 0);

        if (options.unit === 'vdt')
            amount = this.apis.toVdt(amount);

        let entropyFee = await this.apis.getChainParameterByName("getEntropyFee");
        return this.apis.fromVdt(amount) / entropyFee;
    }

    async burnedEntropy2Vs(entropy, options = {}) {

        this.validator.validateNumber({ n: 'entropy', v: entropy}, '>=', 0);

        let entropyFee = await this.apis.getChainParameterByName("getEntropyFee");
        let amount = entropy * this.apis.toVdt(entropyFee);

        if (options.unit === 'vdt') {
            amount = this.apis.fromVdt(amount);
        }
        return amount;
    }

    async getMaxEntropyLimit(address, feeLimit, options = {}) {

        this.validator.validateAddress(address);
        this.validator.validateNumber({ n: 'feeLimit', v: feeLimit}, '>=', 0);

        if (options.unit === 'vdt') {
            this.apis.toVdt(feeLimit);
        }
        if (feeLimit > 1000) {
            throw new Error('Max fee limit has a max limit of 1000 vs.');
        }

        let account = await this.visionWeb.vs.getAccount(address);
        if (!account || Object.keys(account).length === 0) {
            throw new Error('Account not exists or not activated.');
        }
        if (account.balance === undefined) account.balance = 0;

        let params = await this.apis.getChainParametersByName(['getTotalEntropyLimit', 'getEntropyFee']);
        let totalEntropyLimit = this.apis.filterData(params.getTotalEntropyLimit);
        let entropyFee = this.apis.filterData(params.getEntropyFee);

        let resources = await this.apis.getResourcesByName(['TotalEntropyLimit', 'TotalEntropyUsed', 'TotalEntropyWeight'], address);
        let entropyLimit = this.apis.filterData(resources.TotalEntropyLimit);
        let entropyUsed = this.apis.filterData(resources.TotalEntropyUsed);
        let totalEntropyWeight = this.apis.filterData(resources.TotalEntropyWeight);

        let ratio = totalEntropyLimit / totalEntropyWeight;
        let accountVsEntropy = (account.balance / entropyFee);
        let accountTotalEntropy = entropyLimit + accountVsEntropy - entropyUsed;
        let feeLimitEntropy = (feeLimit * ratio);

        let maxEntropyLimit;
        if (entropyLimit > feeLimitEntropy) {
            maxEntropyLimit = Math.min(accountTotalEntropy, feeLimitEntropy);
        } else {
            maxEntropyLimit = accountTotalEntropy;
        }

        return {
            accountEntropy: entropyLimit,
            accountEntropyUsed: entropyUsed,
            accountVsEntropy: accountVsEntropy,
            accountTotalEntropy: accountTotalEntropy,
            feeLimit: feeLimit,
            feeLimitEntropy: feeLimitEntropy,
            maxEntropyLimit: maxEntropyLimit
        }

    }
}
