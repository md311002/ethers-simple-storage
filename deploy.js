const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf-8')
    const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf-8')
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("deploying please wait...")
    const contract = await contractFactory.deploy()
    await contract.deployTransaction.wait(1)
    const currentFavouriteNumber = await contract.retrieve()
    console.log(currentFavouriteNumber.toString())
    await contract.store("9")
    const updatedFavouriteNumber = await contract.retrieve()
    console.log(updatedFavouriteNumber.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => console.log(error))