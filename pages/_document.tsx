import { Head, Html, Main, NextScript } from "next/document";

// Kept as a minimal Pages Router document so Next can resolve its legacy
// document entry while the site itself uses the App Router.
export default function Document() {
  return <Html lang="nb"><Head /><body><Main /><NextScript /></body></Html>;
}
