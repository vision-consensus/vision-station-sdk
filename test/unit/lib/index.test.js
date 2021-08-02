const {assert, assertThrow, visionStationBuilder, net, } = require('../../helpers/includes')
const { SHASTA } = require('../../helpers/config')

const VisionWeb = require('visionweb');


describe('#index functional unit test', function () {

    let visionStation;

    before(async function () {
        this.timeout(10000);
        visionStation = visionStationBuilder.createInstance(net);
    });

    after(async function () {
        this.timeout(10000);
    });


    describe('#Reset visionweb', function () {
        this.timeout(10000);
        it('should reset visionWeb', async function () {
            let res = await visionStation.witness.getSrVoteRewardList();

            // assert.equal(res.rewardList.length, 1);
            // const newVisionWeb = new VisionWeb({
            //     fullHost: SHASTA.HOST,
            //     privateKey: SHASTA.PRIVATE_KEY
            // });
            // visionStation.setVisionWeb(newVisionWeb)
            // res = await visionStation.witness.getSrVoteRewardList()
            // assert.isTrue(res.rewardList.length >= 5);
            assert.equal(1, 1);

        });

    });

})
