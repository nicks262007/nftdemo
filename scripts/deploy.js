async function main() {
    const TestNFT = await ethers.getContractFactory("testNFT")
  
    // Start deployment, returning a promise that resolves to a contract object
    const testNFT = await TestNFT.deploy()
    await testNFT.deployed()
    console.log("Contract deployed to address:", testNFT.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  