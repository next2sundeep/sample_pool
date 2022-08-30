// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract ERC20Pool  is Ownable,ReentrancyGuard{
    using SafeERC20 for IERC20;

    struct UserBalance{
        address user;
        uint256 balance;
    }
    event userDeposited(address tokenContract,address user,uint amount);
    event userWithdrew(address tokenContract,address user,uint amount);
    event rewardDeposited(address tokenContract,uint amount);

    //100 simultaneous listings allowed for each token on each sale type
    mapping(address=>UserBalance[]) public userBalance;
    mapping(address => uint256) public poolBalance;
    mapping(address => mapping(address => uint256)) public userPoolPosition;
    mapping(address => mapping(address => bool)) public hasDeposits;
        constructor() Ownable(){
    }
    // function rest(address tokenContract)external view returns(uint256){
    //     uint256 percent = ((100 * userBalance[tokenContract][0].balance)/poolBalance[tokenContract]);
    //     return percent;
    // }

    //  function depo(address tokenContract,uint256 numberOfTokens) external nonReentrant returns (bool){
    //     IERC20(tokenContract).safeApprove(address(this),numberOfTokens);
    //     IERC20(tokenContract).safeTransferFrom(address(this),msg.sender , numberOfTokens);
    //     return true;
    //  }

    function depositTokens(address tokenContract,uint256 numberOfTokens) external nonReentrant returns (bool){
        IERC20(tokenContract).safeTransferFrom(msg.sender, address(this), numberOfTokens);//token must be approved by the user
        poolBalance[tokenContract] += numberOfTokens;
        if(hasDeposits[tokenContract][msg.sender] == true){
            uint position = userPoolPosition[tokenContract][msg.sender];
            userBalance[tokenContract][position].balance += numberOfTokens;
        }
        else {
            // uint256 l = userBalance[tokenContract].length;
            UserBalance memory newItem = UserBalance({
                user : msg.sender,
                balance : numberOfTokens
        });
            userBalance[tokenContract].push(newItem);
            hasDeposits[tokenContract][msg.sender] = true;
        }
        emit userDeposited(tokenContract,msg.sender,numberOfTokens);
        return true;
    }
    function depositRewards(address tokenContract,uint256 numberOfTokens) external nonReentrant onlyOwner returns (bool){
        IERC20(tokenContract).safeTransferFrom(msg.sender, address(this), numberOfTokens);//token must be approved by the user
        for(uint i = 0;i<userBalance[tokenContract].length;i++){
            if(userBalance[tokenContract][i].balance>0){
                uint256 percent = ((100 * userBalance[tokenContract][i].balance)/poolBalance[tokenContract]);
                uint256 reward = (percent * numberOfTokens)/100;
                userBalance[tokenContract][i].balance = reward + userBalance[tokenContract][i].balance;
                emit rewardDeposited(tokenContract,percent);
            }
        }
        poolBalance[tokenContract] += numberOfTokens;
        emit rewardDeposited(tokenContract,numberOfTokens);
        return true;
    }
    function withdrawDepositsAndRewards(address tokenContract) external nonReentrant returns (bool){
        require(hasDeposits[tokenContract][msg.sender] = true,"User has no deposits in this pool");
        require(userBalance[tokenContract][userPoolPosition[tokenContract][msg.sender]].balance >0,"User has no balance in this pool");
        uint256 balance = userBalance[tokenContract][userPoolPosition[tokenContract][msg.sender]].balance;
        emit rewardDeposited(tokenContract,balance);
        IERC20(tokenContract).safeApprove(address(this),balance);
        IERC20(tokenContract).safeTransferFrom(address(this),msg.sender , balance);
        emit userWithdrew(tokenContract,msg.sender,balance);
        poolBalance[tokenContract] -= balance;
        userBalance[tokenContract][userPoolPosition[tokenContract][msg.sender]].balance = 0;
        return true;
    }
}