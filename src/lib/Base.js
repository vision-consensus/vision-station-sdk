import VisitonStation from '../index';
import Validator from '../utils/Validator';
import Apis from '../utils/Apis';

class Base {

    constructor(visionStation) {
        if (!visionStation || !(visionStation instanceof VisitonStation))
            throw new Error('Expected instance of VisitonStation');
        this.fullNodeHost = 'https://vtest.infragrid.v.network';
        this.visionStation = visionStation;
        this.visionWeb = visionStation.visionWeb;
        this.apis = new Apis(this.visionStation);
        this.validator = new Validator(this.visionStation);
        this.utils = this.visionWeb.utils;
    }

}

export default Base
