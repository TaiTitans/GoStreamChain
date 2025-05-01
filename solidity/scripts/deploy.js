const hre = require("hardhat");

async function main() {
    const Signaling = await hre.ethers.getContractFactory("Signaling");
    const signaling = await Signaling.deploy({
        gasPrice: hre.ethers.parseUnits("10", "gwei"), 
        gasLimit: 3000000,
    });

    console.log("Signaling deployed to:", await signaling.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
