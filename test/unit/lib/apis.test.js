const {assert, assertThrow, visionStationBuilder, net, } = require('../../helpers/includes')
const VisionWeb = require('visionweb');


describe('#apis functional unit test', function () {

    let visionStation;

    before(async function () {
        this.timeout(10000);
        visionStation = visionStationBuilder.createInstance(net);
    });

    after(async function () {
        this.timeout(10000);
    });


    describe('#from vdt', function () {
        this.timeout(10000);

        it('should convert vs to vdt', async function () {
            const res = await visionStation.apis.fromVdt(1);
            assert.equal(res, 10e5);
        });

    });

    describe('#getResourceByName', function () {
        this.timeout(10000);

        it('should get resource value by name', async function () {
            const res = await visionStation.apis.getResourceByName('TotalEntropyWeight');
            assert.isTrue(typeof res === 'number' && res >= 0);
        });

    });

    describe('#getResourcesByName', function () {
        this.timeout(10000);

        it('should get resources by names', async function () {
            const res = await visionStation.apis.getResourcesByName(['TotalPhotonLimit', 'TotalPhotonWeight']);
            assert.isTrue(!!res.TotalPhotonLimit && !!res.TotalPhotonWeight);
        });

    });

    describe('#getChainParameterByName', function () {
        this.timeout(10000);

        it('should get proposal value by name', async function () {
            const res = await visionStation.apis.getChainParameterByName('getEntropyFee');
            assert.equal(res, 5);
        });

    });

    describe('#getChainParametersByName', function () {
        this.timeout(10000);

        it('should get proposals by names', async function () {
            const res = await visionStation.apis.getChainParametersByName(['getTotalEntropyLimit', 'getEntropyFee']);
            assert.isTrue(!!res.getTotalEntropyLimit && !!res.getEntropyFee);
        });

    });

})
