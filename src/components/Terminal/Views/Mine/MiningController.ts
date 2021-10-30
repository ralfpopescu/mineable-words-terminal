import { createWorkerFactory, terminate } from "@shopify/web-worker";
import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import { FoundWord } from "../../../../miner/mine";
import { access } from "fs";

const createWorker = createWorkerFactory(() => import("../../../../miner/mine-bulk"));

type MiningControllerConstructorArgs = {
  library: Web3Provider;
  address: string;
  workerCount: number;
  onWordsFound: (words: FoundWord[]) => void;
  updateHashRate: (rate: number) => void;
  lookingFor?: string[],
  startingNonce?: BigNumber,
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
      console.log('Starting miner')
    let lastFetchTime = Date.now() / 1000;

    for (var i = 0; i < this.args.workerCount; i++) {
      const worker = createWorker();
      this.workers.push(worker);
    }

    const rangeLength = BigNumber.from("0x0000000007ab5b000100000").div(
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

      let now = Date.now() / 1000;
      if (now - lastFetchTime > 5) {
        console.log("Refreshing mining data...");
        lastFetchTime = now;
      }

      const workerThreads = [];
      const lookingForMap = this.args.lookingFor?.reduce((acc, curr) => ({ ...acc, [curr]: true }), {})

      for (
        var workerIndex = 0;
        workerIndex < this.workers.length;
        workerIndex++
      ) {
        const worker = this.workers[workerIndex];

        workerThreads.push(
          worker.mine(
            rangeLength.mul(workerIndex).add(this.args.startingNonce || 0),
            rangeLength.mul(workerIndex).add(rangeBegin).add(notificationRate),
            BigNumber.from(123),
            lookingForMap,
          )
        );
      }

      const results = await Promise.all(workerThreads);

      this.hashes = this.hashes.add(notificationRate * this.workers.length);

      if (!this.terminated) {
        this.args.updateHashRate(this.getHashRate());
      }

      console.log({ results })


      const validResults = results.reduce((acc, curr) => [...acc, ...curr])

      if (validResults.length > 0) {
          //@ts-ignore
        this.args.onWordsFound(validResults as FoundWord[]);
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
