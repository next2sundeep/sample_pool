//ERC20Pool is deployed at 0x27198A4FD72115B4B67696Fe3ce7Dd20ff424B30 on rinkeby

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
	const ERC20Pool = await ethers.getContractFactory('ERC20Pool');
	const pool = await ERC20Pool.deploy(); //dummy string
	await pool.deployed();

	console.log('ERC20Pool contract deployed to:', pool.address);

    await ethers.provider.getBalance(pool.address).then((balance) => {
        // convert a currency unit from wei to ether
        const balanceInEth = ethers.utils.formatEther(balance)
        console.log(`balance: ${balanceInEth} ETH`)
       });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
