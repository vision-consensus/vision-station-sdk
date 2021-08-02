import Entropy from 'lib/Entropy';
import Photon from 'lib/Photon';
import Witness from 'lib/Witness';
import Apis from 'utils/Apis';

// Photon - 带宽  - 光量子
// Entropy - 能量 - 烱

export default class VisionStation {

    constructor(visionWeb = false) {
        if (!visionWeb)
            throw new Error('Expected instance of VisionWeb');

        if (!visionWeb.defaultAddress)
            throw new Error('Expected default account set up in VisionWeb');
        this.visionWeb = visionWeb;
        this.entropy = new Entropy(this);
        this.defaultAddress = visionWeb.defaultAddress;
        this.photon = new Photon(this);
        this.witness = new Witness(this);
        this.apis = new Apis(this);
    }

    setVisionWeb(visionWeb = false) {
        if (!visionWeb)
            throw new Error('Expected instance of VisionWeb');
        if (!visionWeb.defaultAddress)
            throw new Error('Expected default account set up in VisionWeb');
        this.visionWeb = visionWeb;
        this.defaultAddress = visionWeb.defaultAddress;
        this.entropy = new Entropy(this);
        this.defaultAddress = visionWeb.defaultAddress;
        this.photon = new Photon(this);
        this.witness = new Witness(this);
        this.apis = new Apis(this);
    }

}
