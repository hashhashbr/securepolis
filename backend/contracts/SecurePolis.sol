// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.24;


contract SecurePolis {
    struct Policy {
        address insured;
        uint256 insuredAmount;
        uint256 premium;
        uint256 expirationDate;
        bool isActive;
    }

    mapping(uint256 => Policy) public policies;
    uint256 public policyCount;
    address public insurer;

    event PolicyCreated(uint256 policyId, address insured, uint256 insuredAmount, uint256 premium, uint256 expirationDate);
    event ClaimPaid(uint256 policyId, uint256 amount);
    event PolicyDeactivated(uint256 policyId);

    modifier onlyInsurer() {
        require(msg.sender == insurer, "Only the insurer can perform this action");
        _;
    }

    modifier onlyInsured(uint256 policyId) {
        require(msg.sender == policies[policyId].insured, "Only the insured can access this policy");
        _;
    }

    constructor() {
        insurer = msg.sender; // The insurer is the contract deployer
    }

    function createPolicy(
        address insured,
        uint256 insuredAmount,
        uint256 premium,
        uint256 expirationDate
    ) public onlyInsurer {
        require(expirationDate > block.timestamp, "Expiration date must be in the future");

        policies[policyCount] = Policy({
            insured: insured,
            insuredAmount: insuredAmount,
            premium: premium,
            expirationDate: expirationDate,
            isActive: true
        });

        emit PolicyCreated(policyCount, insured, insuredAmount, premium, expirationDate);
        policyCount++;
    }

    function fileClaim(uint256 policyId) public onlyInsured(policyId) {
        Policy storage policy = policies[policyId];
        require(policy.isActive, "The policy is not active");
        require(block.timestamp <= policy.expirationDate, "The policy has expired");

        policy.isActive = false;
        payable(policy.insured).transfer(policy.insuredAmount);

        emit ClaimPaid(policyId, policy.insuredAmount);
    }

    function deactivatePolicy(uint256 policyId) public onlyInsurer {
        policies[policyId].isActive = false;
        emit PolicyDeactivated(policyId);
    }

    function viewPolicy(uint256 policyId) public view returns (Policy memory) {
        return policies[policyId];
    }

    receive() external payable {}
}
