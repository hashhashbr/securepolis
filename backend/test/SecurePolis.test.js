const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SecurePolis", function () {
  let SecurePolis, securePolis, insurer, insured;

  beforeEach(async function () {
    
    [insurer, insured] = await ethers.getSigners();
    
    
    SecurePolis = await ethers.getContractFactory("SecurePolis");

    
    securePolis = await SecurePolis.deploy();

   
    await securePolis.waitForDeployment();

    
    console.log("Contrato deployado no endereço:", securePolis.target); 
  });

  it("should allow the insurer to create a new policy", async function () {
    const insuredAmount = ethers.parseEther("0.001"); 
    const premium = ethers.parseEther("0.0001"); 
    const expirationDate = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30; 

    
    await expect(
      securePolis
        .connect(insurer)
        .createPolicy(insured.address, insuredAmount, premium, expirationDate)
    )
      .to.emit(securePolis, "PolicyCreated")
      .withArgs(0, insured.address, insuredAmount, premium, expirationDate);

    const policy = await securePolis.viewPolicy(0);
    expect(policy.insured).to.equal(insured.address);
    expect(policy.insuredAmount).to.equal(insuredAmount);
    expect(policy.isActive).to.be.true;
  });
});
