export default class Validator {

    constructor(visionStation) {
        this.visionWeb = visionStation.visionWeb;
        this.utils = this.visionWeb.utils;
    }

    validateNumber(param, opt, val) {
        if (!param.v || typeof param.v !== 'number') {
            throw new Error(`Invalid ${param.n} provided.`);
        }
        switch (opt) {
            case '>=': {
                if (param.v < val)
                    throw new Error(`Provided ${param.n} should be ${opt} ${val}.`);
            }
        }
    }

    validateAddress(address) {
        if (!this.visionWeb.isAddress(address))
            throw new Error('Invalid address provided.');
    }

};
