/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable node/no-missing-require */
require('@nomiclabs/hardhat-waffle');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
	ovm: {
		solcVersion: '0.5.16',
	},
	solidity: {
		version: '0.8.4',
		settings: {
			optimizer: {
			  enabled: true,
			  runs: 200
			}
		  },
	},
	networks: {
		localhost: {
			gas: 12e6,
			blockGasLimit: 12e6,
			url: 'http://localhost:8545',
		},
		mumbai: {
			url: "https://polygon-mumbai.g.alchemy.com/v2/7jGCCAfJ7PrWZGdDjrIqW0NSo-ZkY0__",
			accounts: {
				mnemonic:
					'guess nature trick west happy tree else slab pupil delay fantasy say purity behave woman',
			},
		  },
		rinkeby: {
			url: `https://eth-rinkeby.alchemyapi.io/v2/5am696FcLI-4j8gzaGQwmk2N32-IsWeB`,
			accounts: {
				mnemonic:
					'guess nature trick west happy tree else slab pupil delay fantasy say purity behave woman',
			},
		},
	},
	gasReporter: {
		enabled: false,
		showTimeSpent: true,
		gasPrice: 20,
		currency: 'USD',
		maxMethodDiff: 25, // CI will fail if gas usage is > than this %
		outputFile: 'test-gas-used.log',
	},
	mocha: {
		timeout: 90e3, // 90s
	},
};
