import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();
/**
 * Chunks markdown content.
 * Tries to keep chunks near targetTokenSize, but:
 * - Does not split code blocks (```).
 * - Allows chunks containing a single code block to exceed targetTokenSize.
 * - Splits text content primarily by paragraphs or thematic breaks.
 *
 * @param markdown The raw markdown string.
 * @param targetTokenSize The desired token size for text chunks.
 * @param estimateTokens Function to estimate token count for a string.
 * @returns An array of MarkdownChunks.
 */
export function chunkMarkdown(markdown, targetTokenSize, estimateTokens) {
    if (!markdown?.trim()) {
        return [];
    }
    const chunks = [];
    // Regex to split by fenced code blocks, keeping the delimiters
    const codeBlockRegex = /(```[\s\S]*?```)/g;
    const parts = markdown.split(codeBlockRegex).filter(part => part);
    let currentTextChunk = "";
    for (const part of parts) {
        if (part.startsWith('```') && part.endsWith('```')) {
            // Finalize any pending text chunk before the code block
            if (currentTextChunk.trim()) {
                chunks.push(...splitTextChunk(currentTextChunk, targetTokenSize, estimateTokens));
                currentTextChunk = "";
            }
            // Add the code block as a single chunk
            chunks.push({ content: part.trim(), type: 'code' });
        }
        else {
            // Append text part to the current text chunk buffer
            currentTextChunk += part;
        }
    }
    // Finalize any remaining text chunk after the last code block (or if no code blocks)
    if (currentTextChunk.trim()) {
        chunks.push(...splitTextChunk(currentTextChunk, targetTokenSize, estimateTokens));
    }
    return chunks;
}
/**
 * Splits a larger text block (without code fences) into smaller chunks.
 * It splits by paragraphs (`\n\n`) or lines if necessary.
 */
function splitTextChunk(text, targetTokenSize, estimateTokens) {
    const textChunks = [];
    // Attempt to split by paragraphs first, then fall back to lines if a paragraph is too big
    const separators = ['\n\n', '\n'];
    let currentSegments = [text.trim()];
    for (const sep of separators) {
        const nextSegments = [];
        let needsFurtherSplitting = false;
        for (const segment of currentSegments) {
            const estimatedSize = estimateTokens(segment);
            // Increase buffer slightly to 1.2
            if (estimatedSize > targetTokenSize * 1.2 && segment.includes(sep)) {
                nextSegments.push(...segment.split(sep).map(s => s.trim()).filter(Boolean));
                needsFurtherSplitting = true;
            }
            else {
                nextSegments.push(segment); // Keep as is if small enough or no separator found
            }
        }
        currentSegments = nextSegments;
        // If we split using double newlines and some chunks are still too big,
        // the next loop iteration will try splitting by single newlines.
        // Optimization note: If no further splitting was needed with double newlines,
        // we could potentially stop early, but for simplicity, we always try both separators.
    }
    // Now, combine the split segments into chunks respecting the target size
    let currentChunkContent = "";
    for (let i = 0; i < currentSegments.length; i++) {
        const segment = currentSegments[i];
        // Assert segment is non-null/undefined here, as filter(Boolean) should guarantee it
        const segmentSize = estimateTokens(segment);
        const currentChunkSize = estimateTokens(currentChunkContent); // currentChunkContent is always string
        const combinedSize = estimateTokens(currentChunkContent ? `${currentChunkContent}\n\n${segment}` : segment); // Assert segment here too
        // If the segment itself is larger than the target, add it as its own chunk
        // Adjust buffer here as well
        if (segmentSize > targetTokenSize * 1.2 && !currentChunkContent) {
            textChunks.push({ content: segment, type: 'text' }); // Assert segment
            continue;
        }
        // If adding the next segment exceeds the target size, finalize the current chunk
        // Adjust buffer here too
        if (currentChunkContent && combinedSize > targetTokenSize * 1.2) {
            textChunks.push({ content: currentChunkContent, type: 'text' }); // currentChunkContent is string
            currentChunkContent = segment; // Assert segment
        }
        else {
            // Otherwise, add the segment to the current chunk
            currentChunkContent = currentChunkContent ? `${currentChunkContent}\n\n${segment}` : segment; // Assert segment
        }
    }
    // Add the last remaining chunk
    if (currentChunkContent) {
        textChunks.push({ content: currentChunkContent, type: 'text' });
    }
    return textChunks;
}
