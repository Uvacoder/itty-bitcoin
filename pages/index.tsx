import { Layout } from "../components/Layout";
import { AnimatePresence, motion } from "framer-motion";
import type { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";
import { Label } from "@radix-ui/react-label";
import Skeleton from "react-loading-skeleton";
import { usePrivateKeyInput } from "../lib/hooks/usePrivateKeyInput";
import { useBalance } from "../lib/hooks/useBalance";
import { ArrowIcon, InfoIcon } from "../components/icons";
import { Tooltip } from "../components/Tooltip";
import { useTokens } from "../lib/hooks/useTokens";
import { useTokenInput } from "../lib/hooks/useTokenInput";
import * as Tabs from "../components/Tabs";
import { formatAddress } from "../lib/utils";
import { useTransfer } from "../lib/hooks/useTransfer";
import { useTransferHistory } from "../lib/hooks/useTransferHistory";

const Home: NextPageWithLayout = () => {
  const { wallet, error: privateKeyError, handleSubmit } = usePrivateKeyInput();
  const { data: balance } = useBalance(wallet);
  const {
    tokenAddresses,
    error: tokenError,
    handleAddTokenSubmit,
  } = useTokenInput();

  const { data: tokens } = useTokens(wallet, tokenAddresses);
  const { data: transferHistory } = useTransferHistory(wallet, tokens ?? []);

  const { handleTransferSubmit } = useTransfer(wallet);

  return (
    <div className="flex flex-col flex-1 items-center py-32">
      <section
        id="first-section"
        className="font-gambetta mx-auto w-full md:max-w-lg lg:max-w-xl px-8 sm:px-14 md:px-0 transition-all duration-75 dark:text-slate-200 text-slate-800"
      >
        <motion.h1
          initial={{ opacity: 0, translateX: -5 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5 }}
          className="text-slate-900 dark:text-slate-200 text-[20px] font-semibold tracking-wide"
        >
          Tiny Wallet
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, translateX: 5 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-2 text-md text-slate-700/70 dark:text-slate-200/70"
        >
          A simple, secure, and private way to store your crypto.
        </motion.p>
      </section>
      <br />
      <motion.section
        id="second-section"
        initial={{ opacity: 0, translateX: -5 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-4 font-gambetta mx-auto w-full md:max-w-lg lg:max-w-xl px-8 sm:px-14 md:px-0 transition-all duration-75 dark:text-slate-200 text-slate-800"
      >
        <form onSubmit={handleSubmit}>
          <div className="relative flex items-center">
            <Label htmlFor="privateKey" className="whitespace-nowrap">
              Private Key
            </Label>
            <input
              type="password"
              id="privateKey"
              name="privateKey"
              placeholder="Insert your private key"
              className="ml-4 w-full px-4 py-2 text-sm text-slate-900 dark:text-yellow-300 bg-stone-100 dark:bg-stone-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 placeholder:text-stone-500"
            />
            <span className="absolute top-[3rem] left-[6rem] text-red-600">
              {privateKeyError}
            </span>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-4 px-4 py-2 text-sm text-slate-900 dark:text-yellow-300 bg-stone-100 dark:bg-stone-800 rounded-md transition-colors duration-300 dark:hover:bg-yellow-300 dark:hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 placeholder:text-stone-500"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.section>
      {wallet && (
        <>
          <motion.section
            id="info-section"
            initial={{ opacity: 0, translateX: -5 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 font-gambetta mx-auto w-full md:max-w-lg lg:max-w-xl px-8 sm:px-14 md:px-0 transition-all duration-75 dark:text-slate-200 text-slate-800"
          >
            <div className="flex items-center justify-between">
              <p className="whitespace-nowrap">Address</p>
              <pre>{wallet.address}</pre>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="whitespace-nowrap">ETH Balance</p>
              <pre>
                {balance ? balance.toFormat(5) : <Skeleton width={60} />}
              </pre>
            </div>
          </motion.section>
          <motion.section
            id="add-token-section"
            initial={{ opacity: 0, translateX: 5 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 font-gambetta mx-auto w-full md:max-w-lg lg:max-w-xl px-8 sm:px-14 md:px-0 transition-all duration-75 dark:text-slate-200 text-slate-800"
          >
            <form onSubmit={handleAddTokenSubmit}>
              <div className="relative flex items-center">
                <Tooltip content="Add new ERC-20 token addresses to see your balance.">
                  <Label
                    htmlFor="add-token-input"
                    className="flex items-center whitespace-nowrap group"
                  >
                    Token Address{" "}
                    <InfoIcon className="ml-2 w-4 h-4 group-hover:stroke-yellow-500" />
                  </Label>
                </Tooltip>
                <input
                  type="text"
                  id="add-token-input"
                  name="token"
                  placeholder="Enter token address"
                  className="ml-4 w-full px-4 py-2 text-sm text-slate-900 dark:text-yellow-300 bg-stone-100 dark:bg-stone-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 placeholder:text-stone-500"
                />
                <span className="absolute top-[3rem] left-[9rem] text-red-600">
                  {tokenError}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p>Token Count: {tokenAddresses.length}</p>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-slate-900 dark:text-yellow-300 bg-stone-100 dark:bg-stone-800 rounded-md transition-colors duration-300 dark:hover:bg-yellow-300 dark:hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 placeholder:text-stone-500"
                >
                  Add
                </button>
              </div>
            </form>
          </motion.section>
          <AnimatePresence>
            {tokens && (
              <Tabs.Root defaultValue="balances">
                <Tabs.List>
                  <Tabs.Trigger value="balances">Balances</Tabs.Trigger>
                  <Tabs.Trigger value="history">History</Tabs.Trigger>
                  <Tabs.Trigger value="Transfer">Transfer</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="balances">
                  <section className="mt-4 font-gambetta mx-auto w-full md:max-w-lg lg:max-w-xl px-8 sm:px-14 md:px-0 transition-all duration-75 dark:text-slate-200 text-slate-800">
                    <motion.div className="py-1 px-4 flex flex-col overflow-y-scroll max-h-48 h-full items-center justify-between rounded-md border border-stone-700">
                      {tokens.map((token) => (
                        <div
                          key={token.address}
                          className="py-2 flex flex-col w-full"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-lg text-yellow-300">
                              {token.symbol}
                            </span>
                            <pre>{token.balance.toFormat(5)}</pre>
                          </div>
                          <div className="text-sm text-stone-500">
                            {token.address}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </section>
                </Tabs.Content>
                <Tabs.Content value="history">
                  <section className="mt-4 font-gambetta mx-auto w-full md:max-w-lg lg:max-w-xl px-8 sm:px-14 md:px-0 transition-all duration-75 dark:text-slate-200 text-slate-800">
                    <motion.div
                      layout
                      className="py-1 px-4 flex flex-col overflow-y-scroll max-h-48 h-full items-center justify-between rounded-md border border-stone-700"
                    >
                      {transferHistory ? (
                        transferHistory.length === 0 ? (
                          <div>No transactions made yet.</div>
                        ) : (
                          transferHistory.map((tx) => (
                            <div
                              key={tx.blockNumber}
                              className="py-2 flex flex-col w-full"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-md text-yellow-300">
                                  {formatAddress(tx.from)}
                                </span>
                                {tx.to && (
                                  <>
                                    <ArrowIcon className="w-4 h-4" />
                                    <span className="text-md text-yellow-300">
                                      {formatAddress(tx.to)}
                                    </span>
                                  </>
                                )}
                              </div>
                              <div className="text-sm text-stone-500">
                                Block: {tx.blockNumber}
                              </div>
                            </div>
                          ))
                        )
                      ) : (
                        <div>Loading Transactions...</div>
                      )}
                    </motion.div>
                  </section>
                </Tabs.Content>
                <Tabs.Content value="Transfer">
                  <section
                    id="transfer-section"
                    className="mt-4 font-gambetta mx-auto w-full md:max-w-lg lg:max-w-xl px-8 sm:px-14 md:px-0 transition-all duration-75 dark:text-slate-200 text-slate-800"
                  >
                    <form onSubmit={handleTransferSubmit}>
                      <div className="relative flex items-center">
                        <Label
                          htmlFor="transfer-token-input"
                          className="flex items-center whitespace-nowrap group"
                        >
                          Token Address
                        </Label>
                        <input
                          type="text"
                          id="transfer-token-input"
                          name="token"
                          placeholder="Enter token address to transfer"
                          className="ml-4 w-full px-4 py-2 text-sm text-slate-900 dark:text-yellow-300 bg-stone-100 dark:bg-stone-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 placeholder:text-stone-500"
                        />
                        <span className="absolute top-[3rem] left-[9rem] text-red-600">
                          {tokenError}
                        </span>
                      </div>
                      <div className="pt-2 relative flex items-center">
                        <Label
                          htmlFor="transfer-recipient-input"
                          className="flex items-center whitespace-nowrap group"
                        >
                          Recipient Address
                        </Label>
                        <input
                          type="text"
                          id="transfer-recipient-input"
                          name="recipient"
                          placeholder="Enter recipient address"
                          className="ml-4 w-full px-4 py-2 text-sm text-slate-900 dark:text-yellow-300 bg-stone-100 dark:bg-stone-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 placeholder:text-stone-500"
                        />
                        <span className="absolute top-[3rem] left-[9rem] text-red-600">
                          {tokenError}
                        </span>
                      </div>
                      <div className="pt-2 relative flex items-center">
                        <Label
                          htmlFor="transfer-amount-input"
                          className="flex items-center whitespace-nowrap group"
                        >
                          Amount
                        </Label>
                        <input
                          type="text"
                          id="transfer-amount-input"
                          name="amount"
                          placeholder="Enter amount to send"
                          className="ml-4 w-full px-4 py-2 text-sm text-slate-900 dark:text-yellow-300 bg-stone-100 dark:bg-stone-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 placeholder:text-stone-500"
                        />
                        <span className="absolute top-[3rem] left-[9rem] text-red-600">
                          {tokenError}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm text-slate-900 dark:text-yellow-300 bg-stone-100 dark:bg-stone-800 rounded-md transition-colors duration-300 dark:hover:bg-yellow-300 dark:hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 placeholder:text-stone-500"
                        >
                          Transfer
                        </button>
                      </div>
                    </form>
                  </section>
                </Tabs.Content>
              </Tabs.Root>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
