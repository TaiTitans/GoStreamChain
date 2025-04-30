async function main() {
    const Signaling = await ethers.getContractFactory("Signaling");
    const signaling = await Signaling.deploy();
    await signaling.deployed();
    console.log("Signaling deployed to:", signaling.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});