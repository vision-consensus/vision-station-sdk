const {assert, assertThrow, visionStationBuilder, net} = require('../../helpers/includes')


describe('#photon functional unit test', function () {

    let visionStation;

    before(async function () {
        this.timeout(10000);
        visionStation = visionStationBuilder.createInstance(net);
    });

    after(async function () {
        this.timeout(10000);
    });


    describe('#calculate frozen photon by amount', function () {
        this.timeout(10000);

        it('should get photon by amount with unit vs', async function () {
            const res = await visionStation.photon.vs2FrozenPhoton(1);
            assert.isTrue(res >= 0)
        });

        it('should get photon by amount with unit vdt', async function () {
            const res = await visionStation.photon.vs2FrozenPhoton(10e5, { unit: 'vdt' });
            assert.isTrue(res >= 0)
        });

        it('should throw invalid amount error', async function () {
            await assertThrow(
                visionStation.photon.vs2FrozenPhoton(''),
                'Invalid amount provided.'
            );

            await assertThrow(
                visionStation.photon.vs2FrozenPhoton(-10000),
                'Provided amount should be >= 0.'
            );
        });
    });

    describe('#calculate vs amount by frozen photon', function () {
        this.timeout(10000);

        it('should get vs by frozen photon with unit vs', async function () {
            const res = await visionStation.photon.frozenPhoton2Vs(7300.356788039041);
            assert.isTrue(res >= 0)
        });

        it('should get vs by frozen photon with unit vdt', async function () {
            const res = await visionStation.photon.frozenPhoton2Vs(7300.356788039041, { unit: 'vdt' });
            assert.isTrue(res >= 0)
        });

        it('should throw invalid photon error', async function () {
            await assertThrow(
                visionStation.photon.frozenPhoton2Vs(''),
                'Invalid photon provided.'
            );

            await assertThrow(
                visionStation.photon.frozenPhoton2Vs(-10000),
                'Provided photon should be >= 0.'
            );
        });
    });

    describe('#get account photon', function () {
        this.timeout(10000);

        it('should get max entropy limit', async function () {
            const res = await visionStation.photon.getAccountPhoton('46817ffa3d2f2028fcb9b8d2c619448cb3e3934c47');
            assert.isTrue(res.balance >= 0)
            assert.isTrue(res.freebp >= 0)
            assert.isTrue(res.freebpUsed >= 0)
            assert.isTrue(res.accountbp >= 0)
            assert.isTrue(res.accountbpUsed >= 0)
            assert.isTrue(res.totalbp >= 0)
        });

        it('should throw invalid error', async function () {
            await assertThrow(
                visionStation.photon.getAccountPhoton('123213123'),
                'Invalid address provided.'
            );
        });
    });

})
