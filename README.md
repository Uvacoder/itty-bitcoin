# Tiny Wallet

A simple, secure, and private way to store your crypto. It's a web app that runs in your browser, so you don't have to download anything.

You can visit `https://tiny-wallet.vercel.app` to use it.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). The following are the most relevant uses:

* ReactJS
* Typescript
* Cypress
* ethers
* tailwindcss
* framer-motion
* radix-ui
* hardhat

## Development

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment

1. Create a local `.env` file
2. Set `NEXT_PUBLIC_ALCHEMY_KEY` and `TEST_ALCHEMY_KEY` to a valid Alchemy API key
3. Set `TEST_MNEMONIC` to the mnemonic of the testchain deployer

## Tests

Tests are written with cypress. The basic flow of the tests is setting up a local JSON-RPC node forking eth-mainnet (homestead)
and connecting the app to it.

All the tests are e2e tests in the interest of time. You can find them under the `cypress` folder.

## Considerations

Task #6 of the challenge says:

> 6. Figure out how to show history of transactions

It wasn't clear whether you wanted the history of all transactions of the address or just the history of the transfers.
At first, I implemented the first by using the `ethers.providers.EtherscanProvider` provider, which has a handy `getHistory`
method, but then I figured you might want to know if I know how to use `filters`.

