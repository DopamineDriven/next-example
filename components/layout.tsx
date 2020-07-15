import React from "react";
import Head from "next/head";
import Link from "next/link";

const name = "Andrew Ross";
export const siteTitle = "Next.js Sample Website";

export default function Layout({
	children,
	home
}: {
	children: React.ReactNode;
	home?: boolean;
}) {
	return (
		<div style={styles.container}>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Learn how to build a personal website using Next.js"
				/>
				<meta
					property="og:image"
					content={`https://og-image.now.sh/${encodeURI(
						siteTitle
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<header style={styles.header}>
				{home ? (
					<>
						<img
							src="/images/pp.png"
							style={styles.headerHomeImage}
							alt={name}
						/>
						<h1 style={styles.heading2Xl}>{name}</h1>
					</>
				) : (
					<>
						<Link href="/">
							<a>
								<img
									src="/images/pp.png"
									style={styles.headerImage}
									alt={name}
								/>
							</a>
						</Link>
						<h2 style={styles.headingLg}>
							<Link href="/">
								<a style={styles.colorInherit}>{name}</a>
							</Link>
						</h2>
					</>
				)}
			</header>
			<main>{children}</main>
			{!home && (
				<div style={styles.backToHome}>
					<Link href="/">
						<a>&larr; Back to home</a>
					</Link>
				</div>
			)}
		</div>
	);
}

const styles: { [k: string]: React.CSSProperties } = {
	heading2X1: {
		fontSize: "2.5rem",
		lineHeight: 1.2,
		fontWeight: 800,
		letterSpacing: "-0.05rem",
		margin: "1rem 0"
	},
	headingLg: {
		fontSize: "1.5rem",
		lineHeight: 1.4,
		margin: "1rem 0"
	},
	colorInherit: {
		color: "inherit"
	},
	container: {
		maxWidth: "36rem",
		padding: "0 1rem",
		margin: "3rem auto 6rem"
	},
	header: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	headerImage: {
		width: "6rem",
		height: "6rem",
		borderRadius: "9999px"
	},
	headerHomeImage: {
		width: "8rem",
		height: "8rem",
		borderRadius: "9999px"
	},
	backToHome: {
		margin: "3rem 0 0"
	}
};

/*
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.headerImage {
  width: 6rem;
  height: 6rem;
}

.headerHomeImage {
  width: 8rem;
  height: 8rem;
}

.backToHome {
  margin: 3rem 0 0;
}

*/
