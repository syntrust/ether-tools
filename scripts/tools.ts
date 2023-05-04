import { ethers } from "hardhat";


const EXECUTION_NODE_RPC = "https://rpc.4844-devnet-5.ethpandaops.io";
const provider = new ethers.providers.JsonRpcProvider(EXECUTION_NODE_RPC);
let PRIVATE_KEY = "";

async function tx2Block() {
    const tx = "0x6f95e391a857b89fe123a66783c1182ccf5f5e2e6826a74dcbe4a08826ba7557"
    const receipt = await provider.getTransactionReceipt(tx)
    console.log("receipt", receipt.blockNumber)
}

async function txResult() {
    const tx = "0xf7af0f8c6ad7be7cde737cac2d72645f33ea233e8676b83ee5a80737d1b17b54"
    const receipt = await provider.getTransactionReceipt(tx)
    console.log("tx status", receipt.status)
    console.log("tx from", receipt.from)
}

async function tx() {
    const hash = "0x6f95e391a857b89fe123a66783c1182ccf5f5e2e6826a74dcbe4a08826ba7557"
    const tx = await provider.getTransaction(hash)
    console.log("tx", tx)

}
async function sendEther() {
    const signer = await ethers.getSigners()
    // const target = "0xE253B4d600d795D003002AF8ed9166b1Fff14e58"
    const target = "0x6D4a199f603b084a2f1761Dc9F322F92E68bfd5E"
    console.log("balance of " + signer[0].address, await signer[0].getBalance())
    console.log("signer's nonce", await signer[0].getTransactionCount())

    
    // const PRIVATE_KEY = "3fd1988c494d0700d2004c9f6b8c4093c36e1b18c7c9abfe4b293e750ab5a3cd";  //0x851f968a852C9Cc243836E4C1267bfBbb73b9F61

    // const PRIVATE_KEY = "457b1a62d321961467dd5045d30eee52175df164ccee75eee2e963aa988c4808"
    // let signer = new ethers.Wallet(PRIVATE_KEY, provider);

    // console.log("balance of " + signer.address, await signer.getBalance())


    const tx = await signer[0].sendTransaction({
        to: target,
        value: ethers.utils.parseEther("1")
    });
    await tx.wait()

    const balance = await provider.getBalance(target)
    console.log("balance of " + target, balance)
}

async function balance() {
    
    const target = "0x216B8C8d998aC50f43C28c7E4e3D22057292C0Bf"
    const balance = await provider.getBalance(target)
    console.log("balance of " + target, balance)
}

async function contractCall() {
    const address = "0x0000000000000000000000000000000003330001"
    const Contract = await ethers.getContractFactory('DecentralizedKVDaggerHashimoto');
    const contract = Contract.attach(address);
    const tx = await contract.initShard(0, "0x1111111111111111111111111111111111111111111111111111111111111111");
    await tx.wait();
    console.log("initShard success");
    const info = await contract.infos(1)
    console.log("info", info)
}

async function sweep() {
    const target = "0xE253B4d600d795D003002AF8ed9166b1Fff14e58"
    let signer = new ethers.Wallet(PRIVATE_KEY, provider);
    console.log("address", signer.address)
    console.log("signer's balance", await signer.getBalance())

    const tx = await signer.sendTransaction({
        to: target,
        value: ethers.utils.parseEther("1")
    });
    await tx.wait()

    const balance = await provider.getBalance(target)
    console.log("balance of " + target, balance)
}

async function getSignerBalance() {

    let signer = new ethers.Wallet(PRIVATE_KEY, provider);
    console.log("address", signer.address)
    console.log("signer's balance", await signer.getBalance())
    console.log("signer's nonce", await signer.getTransactionCount())


    // const balance = await provider.getBalance("0x216B8C8d998aC50f43C28c7E4e3D22057292C0Bf")
    // console.log("balance", balance)
    
}

async function encodeCalldata() {
    let iface = new ethers.utils.Interface(["function getAndSetBlobHash(address getter, uint256 idx) public"])
    const result = iface.encodeFunctionData("getAndSetBlobHash", ["0x1B2464a637BD521db6bb26166e4fAA5F7A89b5d1", 0])
    console.log("encoded calldata: ", result)
}


async function main() {
//    console.log(ethers.Wallet.createRandom().mnemonic) 
    // await getSignerBalance()
    await sendEther()
// await sweep()
    // await balance()


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});