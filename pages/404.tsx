import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 – Page Not Found</title>
        <meta name="robots" content="noindex, noarchive" />
      </Head>

      <main style={{ textAlign: "center", padding: "4rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          404 – Page Not Found
        </h1>
        <p style={{ marginBottom: "2rem" }}>
          Sorry, we can’t find that page.
        </p>
        <Link href="/" style={{ textDecoration: "underline" }}>
          Go back home
        </Link>
      </main>
    </>
  );
}
