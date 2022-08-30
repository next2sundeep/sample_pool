const { expect } = require("chai");
const { ethers } =  require('hardhat');
// import '@nomiclabs/hardhat-ethers'
// import "hardhat/console.sol";
describe("ERC20Pool", function () {
  it("Checking the owner of the pool contract", async function () {
    const [owner] = await ethers.getSigners();

    const ERC20Pool = await ethers.getContractFactory("ERC20Pool");

    const pool = await ERC20Pool.deploy();

    let  ownerOf = await pool.owner();
    // console.log(ownerOf)
    expect(await pool.owner()).to.equal(owner.address);
  });
});

  describe("DG", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const [owner] = await ethers.getSigners();
  
      const Token = await ethers.getContractFactory("DG");
  
      const hardhatToken = await Token.deploy();
      // console.log(owner.address)
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });
  describe("DG", function () {
  it("Sending tokens to another address", async function () {
    const [owner,addr1] = await ethers.getSigners();

    // const ERC20Pool = await ethers.getContractFactory("ERC20Pool");
    const Token = await ethers.getContractFactory("DG");
    // const pool = await ERC20Pool.deploy();
    // console.log("pool "+pool)
    const hardhatToken = await Token.deploy();
    console.log(owner.address)
    expect(await hardhatToken.transfer(addr1.address, 1)).to.changeTokenBalance(
      hardhatToken,
      addr1,
      1
    );
});
});

describe("DG", function () {
  it("Sending tokens to contract", async function () {
    const [owner,addr1] = await ethers.getSigners();

    const ERC20Pool = await ethers.getContractFactory("ERC20Pool");
    const Token = await ethers.getContractFactory("DG");
    const pool = await ERC20Pool.deploy();
    const hardhatToken = await Token.deploy();
    console.log(owner.address)
    expect(await hardhatToken.transfer(pool.address, 1)).to.changeTokenBalance(
      hardhatToken,
      pool,
      1
    );
});
});
describe("DG", function () {
  it("checking deposit function after approve and withdraw function", async function () {
    const [owner,addr1] = await ethers.getSigners();

    const ERC20Pool = await ethers.getContractFactory("ERC20Pool");
    const Token = await ethers.getContractFactory("DG");
    const pool = await ERC20Pool.deploy();
    // console.log("pool "+pool)
    const hardhatToken = await Token.deploy();
    await hardhatToken.approve(pool.address,1);
    let send_amount =1;
    expect(await pool.depositTokens(hardhatToken.address,send_amount)).to.changeTokenBalance(
      owner.address,
      pool,
      send_amount
    );
    expect(await pool.hasDeposits(hardhatToken.address,owner.address)).to.equal(true);
    expect(await pool.withdrawDepositsAndRewards(hardhatToken.address)).to.changeTokenBalance(
      pool,
      owner.address,
      send_amount
    );
});

});
