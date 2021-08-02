## What is Vision Station SDK?

__[Vision Station SDK - Developer Document](https://developers.vision.network/docs/vision-station-intro)__

Vision Station SDK is a library for estimating Vision entropy and photon consumption based on Vision network. Developers can quickly review entropy and photon points information before deploying/triggering a smart contract or make a transaction.


## Compatibility
- Version built for Node.js v6 and above
- Version built for browsers with more than 0.25% market share

Vision Station SDK is also compatible with frontend frameworks such as:
- Angular 
- React
- Vue

You can also ship Vision Station SDK in a Chrome extension.

## Installation

__[Vision Station SDK - NPM Package](https://www.npmjs.com/package/visionstation)__


### NPM
```bash
> npm install visionstation
```

### Yarn
```bash
> yarn add visionstation
```

## Build Steps

If you'd like to download and build locally, please follow the steps below.
```bash
> git clone https://github.com/vision-consensus/vision-station-sdk.git
> cd vision-station-sdk
> yarn install
> yarn build
> yarn test
```

## Usage

### Install [VisionWeb](https://github.com/vision-consensus/visionweb)

### NPM
```bash
> npm install visionweb
```

### Yarn
```bash
> yarn add visionweb
```

### Initialize VisionWeb and create Vision Station SDK instance

```js
import VisionStation from 'visionstation';
import VisionWeb from 'visionweb';

const fullNode = new HttpProvider('https://vtest.infragrid.v.network');
const solidityNode = new HttpProvider('https://vtest.infragrid.v.network');
const eventServer = new HttpProvider('https://vtest.infragrid.v.network');

const privateKey = 'your private key';

const visionWeb = new VisionWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);

// Constructor params are the visionWeb object and specification on if the net type is on main net or test net/private net
const visionStation = new VisionStation(visionWeb);

// If you want to reset or switch node net work, just try to re-config your visionWeb and reset in visionStation sdk.
const newVisionWeb = new VisionWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);
visionStation.setVisionWeb(visionWeb);
```
## APIs

VisionStation-SDK provides three parts of calculators and some of utils can be used easily to estimate entropy, photon and super representatives data.
There are also some sample usages provided in test directory.

### Energy Calculators
```js
// 1. Converter between frozen entropy and vs amount.
const res = await visionStation.photon.vs2FrozenEntropy(1);
const res = await visionStation.entropy.vs2FrozenEntropy(10e5, { unit: 'vdt' });

const res = await visionStation.entropy.frozenEntropy2Vs(666.74484);
const res = await visionStation.entropy.frozenEnergy2Vs(666.74484, { unit: 'vdt' });

// 2. Converter between burned entropy and vs amount.
const res = await visionStation.entropy.vs2BurnedEntropy(1);
const res = await visionStation.entropy.vs2BurnedEntropy(10e5, { unit: 'vdt' });

const res = await visionStation.entropy.burnedEntropy2Vs(10e4);
const res = await visionStation.entropy.burnedEntropy2Vs(10e4, { unit: 'vdt' });

// 3. Calculator of max entropy limit for deploying or triggering contract.
const res = await visionStation.entropy.getMaxEntropyLimit('46817ffa3d2f2028fcb9b8d2c619448cb3e3934c47', 1000);
```

### Bandwidth Calculators
```js
// 1. Converter between frozen phonton points and vs amount.
const res = await visionStation.photon.vs2FrozenPhoton(1);
const res = await visionStation.photon.vs2FrozenPhoton(10e5, { unit: 'vdt' });

const res = await visionStation.photon.frozenPhoton2Vs(7300.356788039041);
const res = await visionStation.photon.frozenPhoton2Vs(7300.356788039041, { unit: 'vdt' });

// 2. API for getting account photon.
const res = await visionStation.photon.getAccountPhoton('46817ffa3d2f2028fcb9b8d2c619448cb3e3934c47');
```

### Super Representatives Calculators
```js
// 1. Calculator for estimating rank and votes reward by votes amount.
// existed SR/Candidate
const res = await visionStation.witness.calculateSrReward(1000, '46817ffa3d2f2028fcb9b8d2c619448cb3e3934c47');
// New SR/Candidate
const res = await visionStation.witness.calculateSrReward(1000);

// 2. API for getting current SR reward list.
const res = await visionStation.witness.getSrVoteRewardList();
```

### Other tools
```js
// 1. Convert between vs and vdt.
const res = await visionStation.apis.fromVdt(1);
const res = await visionStation.apis.toVdt(10e5)

// 2. Get account resource by name.
const res = await visionStation.apis.getResourceByName('TotalEntropyWeight');
const res = await visionStation.apis.getResourcesByName(['TotalPhotonLimit', 'TotalPhotonWeight']);

// 3. Get proposals by name.
const res = await visionStation.apis.getChainParameterByName('getEntropyFee');
const res = await visionStation.apis.getChainParametersByName(['getTotalEntropyLimit', 'getEntropyFee']);
```