import MarkdownIt from 'markdown-it';

export interface MarkdownChunk {
    content: string;
    type: 'text' | 'code';
}

const md = new MarkdownIt();

export function chunkMarkdown(
    markdown: string,
    targetTokenSize: number,
    estimateTokens: (text: string) => number
): MarkdownChunk[] {
    if (!markdown?.trim()) {
        return [];
    }

    const chunks: MarkdownChunk[] = [];
    const codeBlockRegex = /(```[\s\S]*?```)/g;
    const parts = markdown.split(codeBlockRegex).filter(part => part);

    let currentTextChunk = "";

    for (const part of parts) {
        if (part.startsWith('```') && part.endsWith('```')) {
            if (currentTextChunk.trim()) {
                chunks.push(...splitTextChunk(currentTextChunk, targetTokenSize, estimateTokens));
                currentTextChunk = "";
            }
            chunks.push({ content: part.trim(), type: 'code' });
        } else {
            currentTextChunk += part;
        }
    }

    if (currentTextChunk.trim()) {
        chunks.push(...splitTextChunk(currentTextChunk, targetTokenSize, estimateTokens));
    }

    return chunks;
}

function splitTextChunk(
    text: string,
    targetTokenSize: number,
    estimateTokens: (text: string) => number
): MarkdownChunk[] {
    const textChunks: MarkdownChunk[] = [];
    const separators = ['\n\n', '\n'];
    let currentSegments: string[] = [text.trim()];

    for (const sep of separators) {
        const nextSegments: string[] = [];
        let needsFurtherSplitting = false;
        for(const segment of currentSegments) {
            const estimatedSize = estimateTokens(segment!);
            if (estimatedSize > targetTokenSize * 1.2 && segment!.includes(sep)) {
                nextSegments.push(...segment!.split(sep).map(s => s.trim()).filter(Boolean));
                needsFurtherSplitting = true;
            } else {
                nextSegments.push(segment);
            }
        }
        currentSegments = nextSegments;
    }

    let currentChunkContent = "";
    for (let i = 0; i < currentSegments.length; i++) {
        const segment = currentSegments[i];
        const segmentSize = estimateTokens(segment!);
        const currentChunkSize = estimateTokens(currentChunkContent);
        const combinedSize = estimateTokens(currentChunkContent ? `${currentChunkContent}\n\n${segment!}` : segment!);

        if (segmentSize > targetTokenSize * 1.2 && !currentChunkContent) {
            textChunks.push({ content: segment!, type: 'text' });
            continue;
        }

        if (currentChunkContent && combinedSize > targetTokenSize * 1.2) {
            textChunks.push({ content: currentChunkContent, type: 'text' });
            currentChunkContent = segment!;
        } else {
            currentChunkContent = currentChunkContent ? `${currentChunkContent}\n\n${segment!}` : segment!;
        }
    }

    if (currentChunkContent) {
        textChunks.push({ content: currentChunkContent, type: 'text' });
    }

    return textChunks;
}
