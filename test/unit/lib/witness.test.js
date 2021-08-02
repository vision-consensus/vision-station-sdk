const {assert, assertThrow, visionStationBuilder, net} = require('../../helpers/includes')


describe('#witness functional unit test', function () {

    let visionStation;

    before(async function () {
        this.timeout(10000);
        visionStation = visionStationBuilder.createInstance(net);
    });

    after(async function () {
        this.timeout(10000);
    });


    describe('#witness get srs reward list', function () {
        this.timeout(10000);

        it('should get srs reward list', async function () {
            const res = await visionStation.witness.getSrVoteRewardList();
            assert.isTrue(res.totalVotes >= 0);
            assert.isTrue(res.rewardList.length >= 0);
        });

    });

    describe('#calculate new/old sr reward', function () {
        this.timeout(10000);

        it('should calculate existed sr reward', async function () {
            //zion sr
            const res = await visionStation.witness.calculateSrReward(1000, '46817ffa3d2f2028fcb9b8d2c619448cb3e3934c47');
            assert.isTrue(res.rank === 2);
        });

        it('should calculate new sr reward', async function () {
            const res = await visionStation.witness.calculateSrReward(1000);
            assert.equal(res.sr, 'New SR');
        });

        it('should throw invalid error', async function () {
            await assertThrow(
                visionStation.witness.calculateSrReward(-10000),
                'Provided addedVotes should be >= 0.'
            );

            await assertThrow(
                visionStation.witness.calculateSrReward(10000, '1231232123213'),
                'Invalid address provided.'
            );
        });
    });

})
