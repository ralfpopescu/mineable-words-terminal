import { createWorkerFactory, terminate } from "@shopify/web-worker";
import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";

const createWorker = createWorkerFactory(() => import("./mine"));

type MiningControllerConstructorArgs = {
  library: Web3Provider;
  address: string;
  workerCount: number;
  onNonceFound: (nonce: BigNumber) => void;
  updateHashRate: (rate: number) => void;
};

export default class MiningController {
  args: MiningControllerConstructorArgs;
  workers: Array<ReturnType<typeof createWorker>> = [];
  startTime: number = 0;
  hashes: BigNumber = BigNumber.from(0);
  terminated: boolean = false;

  constructor(_args: MiningControllerConstructorArgs) {
    this.args = _args;
    this.startTime = Math.floor(Date.now() / 1000);
  }

  async start(): Promise<void> {
    for (var i = 0; i < this.args.workerCount; i++) {
      const worker = createWorker();
      this.workers.push(worker);
    }

    const rangeLength = BigNumber.from("0x1000000027ab5b000000000").div(
      this.workers.length
    );

    const notificationRate = 25000;

    for (
      var rangeBegin = BigNumber.from(0);
      rangeBegin.lt(rangeLength);
      rangeBegin = rangeBegin.add(notificationRate)
    ) {
      if (this.terminated) {
        break;
      }

      const workerThreads = [];
      for (
        var workerIndex = 0;
        workerIndex < this.workers.length;
        workerIndex++
      ) {
        const worker = this.workers[workerIndex];

        workerThreads.push(
          worker.mine(
            rangeLength.mul(workerIndex).add(rangeBegin),
            rangeLength.mul(workerIndex).add(rangeBegin).add(notificationRate),
            BigNumber.from(this.args.address),
          )
        );
      }

      const results = await Promise.all(workerThreads);
      this.hashes = this.hashes.add(notificationRate * this.workers.length);

      if (!this.terminated) {
        this.args.updateHashRate(this.getHashRate());
      }

      const bigNumberResults = results.map((_result) => {
        return BigNumber.from(_result.i);
      });

      const validResults = bigNumberResults.filter((result) => {
        return result.gte(0);
      });

      if (validResults.length > 0) {
        this.args.onNonceFound(BigNumber.from(validResults[0].toHexString()));
        break;
      }
    }
  }

  terminate(): void {
    console.log("Terminating...");
    this.terminated = true;
    for (var worker in this.workers) {
      terminate(worker);
      console.log("Terminated");
    }
  }

  getHashRate(): number {
    const secondsPassed = Math.floor(Date.now() / 1000) - this.startTime;
    const hashRate = this.hashes.div(secondsPassed);
    return hashRate.toNumber();
  }
}
