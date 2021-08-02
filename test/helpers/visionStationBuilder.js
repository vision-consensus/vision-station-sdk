const VisionWeb = require('visionweb');
const VisionStation = require('../setup/VisionStation-SDK');
const {SHASTA, LOCAL, NET} = require('./config');

const createInstance = net => {
    let node;
    switch (net) {
        case 'shasta':
            node = SHASTA;
            break;
        case 'local':
            node = LOCAL;
            break;
        default:
            throw new Error('has to choose net in config.js');
    };

    let visionWeb = new VisionWeb({
        fullHost: node.HOST,
        privateKey: node.PRIVATE_KEY
    });
    return new VisionStation(visionWeb);
}

let instance;

const getInstance = net => {
    if (!instance) {
        instance = createInstance(net);
    }
    return instance;
};

const getTestAccounts = async (block) => {
    const accounts = {
        b58: [],
        hex: [],
        pks: []
    }
    const visionStation = createInstance(NET);
    const visionWeb = visionStation.visionWeb;
    const accountsJson = await visionWeb.fullNode.request('/admin/accounts-json');
    accounts.pks = accountsJson.privateKeys;
    for (let i = 0; i < accounts.pks.length; i++) {
        let addr = visionWeb.address.fromPrivateKey(accounts.pks[i]);
        accounts.b58.push(addr);
        accounts.hex.push(visionWeb.address.toHex(addr));
    }
    return Promise.resolve(accounts);
}

module.exports = {
    createInstance,
    getInstance,
    getTestAccounts,
    VisionStation
};

