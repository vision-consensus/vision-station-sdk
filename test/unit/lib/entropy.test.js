const {assert, assertThrow, visionStationBuilder, net} = require('../../helpers/includes')


describe('#entropy functional unit test', function () {

    let visionStation;

    before(async function () {
        this.timeout(10000);
        visionStation = visionStationBuilder.createInstance(net);
    });

    after(async function () {
        this.timeout(10000);
    });


    describe('#calculate frozen entropy by amount', function () {
        this.timeout(10000);

        it('should get entropy by amount with unit vs', async function () {
            const res = await visionStation.entropy.vs2FrozenEntropy(1);
            assert.isTrue(res >= 0)
        });

        it('should get entropy by amount with unit vdt', async function () {
            const res = await visionStation.entropy.vs2FrozenEntropy(10e5, { unit: 'vdt' });
            assert.isTrue(res >= 0)
        });

        it('should throw invalid amount error', async function () {
            await assertThrow(
                visionStation.entropy.vs2FrozenEntropy(''),
                'Invalid amount provided.'
            );

            await assertThrow(
                visionStation.entropy.vs2FrozenEntropy(-10000),
                'Provided amount should be >= 0.'
            );
        });
    });

    describe('#calculate vs amount by frozen entropy', function () {
        this.timeout(10000);

        it('should get vs by frozen entropy with unit vs', async function () {
            const res = await visionStation.entropy.frozenEntropy2Vs(666.74484);
            assert.isTrue(res >= 0)
        });

        it('should get vs by frozen entropy with unit vdt', async function () {
            const res = await visionStation.entropy.frozenEntropy2Vs(666.74484, { unit: 'vdt' });
            assert.isTrue(res >= 0)
        });

        it('should throw invalid entropy error', async function () {
            await assertThrow(
                visionStation.entropy.frozenEntropy2Vs(''),
                'Invalid entropy provided.'
            );

            await assertThrow(
                visionStation.entropy.frozenEntropy2Vs(-10000),
                'Provided entropy should be >= 0.'
            );
        });
    });

    describe('#calculate burned entropy by amount', function () {
        this.timeout(10000);

        it('should get entropy by amount with unit vs', async function () {
            const res = await visionStation.entropy.vs2BurnedEntropy(1);
            assert.isTrue(res >= 0)
        });

        it('should get entropy by amount with unit vdt', async function () {
            const res = await visionStation.entropy.vs2BurnedEntropy(10e5, { unit: 'vdt' })
            assert.isTrue(res >= 0)
        });

        it('should throw invalid amount error', async function () {
            await assertThrow(
                visionStation.entropy.vs2BurnedEntropy(''),
                'Invalid amount provided.'
            );

            await assertThrow(
                visionStation.entropy.vs2BurnedEntropy(-10000),
                'Provided amount should be >= 0.'
            );
        });
    });

    describe('#calculate vs amount by burned entropy', function () {
        this.timeout(10000);

        it('should get vs by burned entropy with unit vs', async function () {
            const res = await visionStation.entropy.burnedEntropy2Vs(10e5);
            assert.equal(res, 5)
        });

        it('should get vs by burned entropy with unit vdt', async function () {
            const res = await visionStation.entropy.burnedEntropy2Vs(10e5, { unit: 'vdt' });
            assert.equal(res, 5 * 10e5)
        });

        it('should throw invalid entropy error', async function () {
            await assertThrow(
                visionStation.entropy.burnedEntropy2Vs(''),
                'Invalid entropy provided.'
            );

            await assertThrow(
                visionStation.entropy.burnedEntropy2Vs(-10000),
                'Provided entropy should be >= 0.'
            );
        });
    });

    describe('#calculate max entropy limit', function () {
        this.timeout(10000);

        it('should get max entropy limit', async function () {
            const res = await visionStation.entropy.getMaxEntropyLimit('46817ffa3d2f2028fcb9b8d2c619448cb3e3934c47', 1000);
            assert.isTrue(res.accountEntropy >= 0)
            assert.isTrue(res.accountEntropyUsed >= 0)
            assert.isTrue(res.accountVsEntropy >= 0)
            assert.isTrue(res.accountTotalEntropy >= 0)
            assert.isTrue(res.feeLimit >= 0)
            assert.isTrue(res.feeLimitEntropy >= 0)
            assert.isTrue(res.maxEntropyLimit >= 0)
        });

        it('should throw invalid error', async function () {
            await assertThrow(
                visionStation.entropy.getMaxEntropyLimit('123213123', 1000),
                'Invalid address provided.'
            );

            await assertThrow(
                visionStation.entropy.getMaxEntropyLimit('46817ffa3d2f2028fcb9b8d2c619448cb3e3934c47', -10000),
                'Provided feeLimit should be >= 0.'
            );

            await assertThrow(
                visionStation.entropy.getMaxEntropyLimit('46817ffa3d2f2028fcb9b8d2c619448cb3e3934c47', 10000),
                'Max fee limit has a max limit of 1000 vs.'
            );

            await assertThrow(
                visionStation.entropy.getMaxEntropyLimit('46817ffa3d2f2028fcb9b8d2c619448cb3e3934c48', 1000),
                'Account not exists or not activated.'
            );
        });
    });

})
