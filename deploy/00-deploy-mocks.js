const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config.js")

const BASE_FEE = ethers.utils.parseEther("0.25")
// every time you call a random number on Rinkeby is gonna cost a base fee
// 0.25 is the premium from https://docs.chain.link/docs/vrf-contracts/#rinkeby-testnet

const GAS_PRICE_LINK = 1e9 // calculated value based on the gas price of the chain

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")

        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            args: args,
            log: true,
        })

        log("Mocks deployed!")
        log("----------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
