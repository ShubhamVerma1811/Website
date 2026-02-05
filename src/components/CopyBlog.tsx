"use client";

import { useState } from "react";
import type { Blog } from "types";

export const CopyBlog = ({ blog }: { blog: Blog }) => {
	const [isOpen, setIsOpen] = useState(false);

	function handleCopyCode() {
		const frontmatter = `---
title: ${blog.title}
---`.trim();

		const content = `${frontmatter}\n\n${blog.body}`;

		navigator.clipboard.writeText(content);
		setIsOpen(false);
	}

	function handleViewAsMarkdown() {
		const frontmatter = `---
title: ${blog.title}
---`.trim();

		const content = `${frontmatter}\n\n${blog.body}`;

		const newWindow = window.open("", "_blank");
		if (newWindow) {
			newWindow.document.write(`<pre>${content}</pre>`);
			newWindow.document.close();
		}
		setIsOpen(false);
	}

	function handleOpenInChatGPT() {
		const frontmatter = `---
title: ${blog.title}
---`.trim();

		const content = `${frontmatter}\n\n${blog.body}`;

		const encodedContent = encodeURIComponent(content);
		window.open(`https://chat.openai.com/?q=${encodedContent}`, "_blank");
		setIsOpen(false);
	}

	function handleOpenInClaude() {
		const frontmatter = `---
title: ${blog.title}
---`.trim();

		const content = `${frontmatter}\n\n${blog.body}`;

		const encodedContent = encodeURIComponent(content);
		window.open(`https://claude.ai/new?q=${encodedContent}`, "_blank");
		setIsOpen(false);
	}

	return (
		<div className="relative">
			<button
				type="button"
				className="flex items-center gap-2 rounded-lg border border-skin-secondary bg-transparent px-3 py-2 text-skin-secondary transition-colors hover:bg-skin-secondary/10"
				onClick={() => setIsOpen(!isOpen)}
			>
				<svg
					className="h-4 w-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<title>Copy page menu</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
					/>
				</svg>
				Copy page
			</button>

			{isOpen && (
				<div className="absolute top-full right-0 z-50 mt-2 w-64 rounded-lg border border-skin-secondary bg-white shadow-lg dark:bg-gray-800">
					<button
						type="button"
						className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
						onClick={handleCopyCode}
					>
						<svg
							className="h-5 w-5 text-gray-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Copy icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						</svg>
						<div className="flex-1">
							<div className="font-medium text-gray-900 dark:text-white">
								Copy page
							</div>
							<div className="text-gray-500 text-sm dark:text-gray-400">
								Copy page as Markdown for LLMs
							</div>
						</div>
					</button>

					<button
						type="button"
						className="flex w-full items-center gap-3 border-skin-secondary border-t px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
						onClick={handleViewAsMarkdown}
					>
						<svg
							className="h-5 w-5 text-gray-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Markdown icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						<div className="flex-1">
							<div className="font-medium text-gray-900 dark:text-white">
								View as Markdown
							</div>
							<div className="text-gray-500 text-sm dark:text-gray-400">
								View this page as plain text
							</div>
						</div>
						<svg
							className="h-4 w-4 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>External link</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</button>

					<button
						type="button"
						className="flex w-full items-center gap-3 border-skin-secondary border-t px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
						onClick={handleOpenInChatGPT}
					>
						<div className="flex h-5 w-5 items-center justify-center rounded bg-green-500">
							<span className="font-bold text-white text-xs">GPT</span>
						</div>
						<div className="flex-1">
							<div className="font-medium text-gray-900 dark:text-white">
								Open in ChatGPT
							</div>
							<div className="text-gray-500 text-sm dark:text-gray-400">
								Ask questions about this page
							</div>
						</div>
						<svg
							className="h-4 w-4 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>External link</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</button>

					<button
						type="button"
						className="flex w-full items-center gap-3 border-skin-secondary border-t px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
						onClick={handleOpenInClaude}
					>
						<div className="flex h-5 w-5 items-center justify-center rounded bg-orange-500">
							<span className="font-bold text-white text-xs">C</span>
						</div>
						<div className="flex-1">
							<div className="font-medium text-gray-900 dark:text-white">
								Open in Claude
							</div>
							<div className="text-gray-500 text-sm dark:text-gray-400">
								Ask questions about this page
							</div>
						</div>
						<svg
							className="h-4 w-4 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>External link</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</button>
				</div>
			)}
		</div>
	);
};
