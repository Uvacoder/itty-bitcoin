import { Html, Head, Main, NextScript } from "next/document";

const meta = {
  title:
    "Tiny Wallet - A simple, secure, and private way to store your crypto.",
  description:
    "Tiny Wallet is a simple, secure, and private way to store your crypto. It's a web app that runs in your browser, so you don't have to download anything.",
  type: "website",
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Tiny Wallet" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />

        <meta
          name="google-site-verification"
          content="ehkgub95G0HGA3ym6sKTkPafYi13C27s50Tssb6-H10"
        />
      </Head>
      <body className="antialiased bg-rose-50 dark:bg-stone-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
