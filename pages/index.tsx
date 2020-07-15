import React from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";

export default function Home({
	allPostsData
}) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section style={styles.headingMd}>
				<p>🐜🐜🐜BUILD🐜🐜🐜</p>
			</section>
			<section style={styles.headingMd && styles.padding1px}>
				<h2 style={styles.headingLg}>Blog</h2>
				<ul style={styles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li style={styles.listItem} key={id}>
							<Link href="/posts/[id]" as={`/posts/${id}`}>
								<a>{title}</a>
							</Link>
							<br />
							<small style={styles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData
		}
	};
};

const styles: { [k: string]: React.CSSProperties } = {
	h1: {
		fontSize: "2rem",
		lineHeight: 1.3,
		fontWeight: 800,
		letterSpacing: "-0.05rem",
		margin: "1rem 0"
	},
	a: {
		color: "#666"
	},
	headingLg: {
		fontSize: "1.5rem",
		lineHeight: 1.4,
		margin: "1rem 0"
	},
	padding1px: {
		paddingTop: "1px"
	},
	headingMd: {
		fontSize: "1.2rem",
		lineHeight: 1.5,
		paddingLeft: "8.75em"
	},
	list: {
		listStyle: "none",
		padding: 0,
		margin: 0
	},
	listItem: {
		margin: "0 0 1.25rem"
	},
	lightText: {
		color: "#666"
	}
};