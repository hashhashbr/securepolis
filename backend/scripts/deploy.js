async function main() {
  
  const SecurePolis = await ethers.getContractFactory("SecurePolis");

  
  const insurance = await SecurePolis.deploy();

  
  await insurance.waitForDeployment(); 

  
  console.log("Contrato SecurePolis deployado em:", insurance.target); 
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
