import Base from './Base';

export default class Photon extends Base {

    constructor(visionStation) {
        super(visionStation);
    }

    async vs2FrozenPhoton(amount, options = {}) {

        this.validator.validateNumber({ n: 'amount', v: amount}, '>=', 0);

        if (options.unit === 'vdt')
            amount = this.apis.toVdt(amount);

        let accountResources = await this.apis.getResourcesByName(['TotalPhotonWeight', 'TotalPhotonLimit']);
        let totalPhotonLimit = this.apis.filterData(accountResources.TotalPhotonLimit);
        let totalPhotonWeight = accountResources.TotalPhotonWeight;
        return (amount * totalPhotonLimit) / totalPhotonWeight;
    }

    async frozenPhoton2Vs(photon, options = {}) {

        this.validator.validateNumber({ n: 'photon', v: photon}, '>=', 0);

        let accountResources = await this.apis.getResourcesByName(['TotalPhotonLimit', 'TotalPhotonWeight']);
        let totalPhotonLimit = this.apis.filterData(accountResources.TotalPhotonLimit);
        let totalPhotonWeight = accountResources.TotalPhotonWeight;
        let amount = (photon * totalPhotonWeight) / totalPhotonLimit;

        if (options.unit === 'vdt') {
            amount = this.apis.fromVdt(amount);
        }
        return amount;
    }

    async getAccountPhoton(address, options = {}) {

        this.validator.validateAddress(address)

        let account = await this.visionWeb.vs.getAccount(address);
        if (account.balance === undefined) account.balance = 0;

        let resources = ["freeNetLimit", "freeNetUsed", "NetLimit", "NetUsed"];
        let accountResources = await this.apis.getResourcesByName(resources, address);

        let balance = this.apis.filterData(account.balance);
        let freebp = this.apis.filterData(accountResources.freeNetLimit);
        let freebpUsed = this.apis.filterData(accountResources.freeNetUsed);
        let accountbp = this.apis.filterData(accountResources.NetLimit);
        let accountbpUsed = this.apis.filterData(accountResources.NetUsed);
        let totalbp = freebp + accountbp - freebpUsed - accountbpUsed;

        return {
            balance: balance,
            freebp: freebp,
            freebpUsed: freebpUsed,
            accountbp: accountbp,
            accountbpUsed: accountbpUsed,
            totalbp: totalbp
        }
    }

}
