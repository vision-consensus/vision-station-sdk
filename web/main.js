




function main() {
  var timer = setInterval(async () => {
    if (window.visionWeb && window.visionWeb.defaultAddress.base58) {
      clearInterval(timer)
      var VisionStation = window['visionstation-sdk']
      var visionWeb = window.visionWeb
      var visionStation = new VisionStation(visionWeb);
      window.visionStation = visionStation
      var address = '46817ffa3d2f2028fcb9b8d2c619448cb3e3934c47'
      // var address = 'VNTxQP1qojBwiMkVfjfwcZ9vj7LF3DRQPn'
      // 1. success
      // const res = await visionStation.photon.getAccountPhoton(address);
      // 2. success
      // const res = await visionStation.entropy.vs2FrozenEntropy(1);
      // 3. success
      // const res = await visionStation.entropy.vs2FrozenEntropy(10e5, { unit: 'vdt' });
      // 4. success
      // const res = await visionStation.entropy.frozenEntropy2Vs(666.74484);
      // 5. success
      // const res = await visionStation.entropy.frozenEntropy2Vs(666.74484, { unit: 'vdt' });
      // 6. success
      // const res = await visionStation.entropy.vs2BurnedEntropy(1);
      // 7. success
      // const res = await visionStation.entropy.vs2BurnedEntropy(10e5, { unit: 'vdt' });
      // 8. success
      // const res = await visionStation.entropy.burnedEntropy2Vs(10e5);
      // 9. success
      // const res = await visionStation.entropy.burnedEntropy2Vs(10e5, { unit: 'vdt' });
      // 10. success
      // const res = await visionStation.entropy.getMaxEntropyLimit(address, 1000);
      // 11. success
      // const res = await visionStation.photon.vs2FrozenPhoton(1);
      // 12. success
      // const res = await visionStation.photon.vs2FrozenPhoton(10e5, { unit: 'vdt' });
      // 13. success
      // const res = await visionStation.photon.frozenPhoton2Vs(7300.356788039041);
      // 14. success
      // const res = await visionStation.photon.frozenPhoton2Vs(7300.356788039041, { unit: 'vdt' });
      // 15. success
      // const res = await visionStation.photon.getAccountPhoton(address);
      // 16. success
      // const res = await visionStation.witness.calculateSrReward(1000, address);
      // 17. success
      // const res = await visionStation.witness.calculateSrReward(1000);
      // 18. success
      const res = await visionStation.witness.getSrVoteRewardList();
      // 19. success
      // const res = await visionStation.apis.fromVdt(1);
      // 20. success
      // const res = await visionStation.apis.toVdt(10e5);
      // 21. success
      // const res = await visionStation.apis.getResourceByName('TotalEntropyWeight');
      // 22. error
      // const res = await visionStation.apis.getResourcesByName(['TotalPhotonLimit', 'TotalPhotonWeight']);
      // 23. success
      // const res = await visionStation.apis.getChainParameterByName('getEntropyFee');
      // 24. success
      // const res = await visionStation.apis.getChainParametersByName(['getTotalEntropyLimit', 'getEntropyFee']);
      // 25. success
      // const res = await visionStation.witness.getSrVoteRewardList()
      console.log(res)
    }
  }, 10);
  
}

main()
