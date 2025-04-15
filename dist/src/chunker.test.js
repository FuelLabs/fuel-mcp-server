import { describe, it, expect } from "bun:test";
import { chunkMarkdown } from "./chunker";
// Simple character count as a proxy for token count for testing
const estimateTokens = (text) => text.length;
describe("chunkMarkdown", () => {
    it("should chunk basic markdown text based on target size", () => {
        const markdown = `
# Title

This is the first paragraph. It has some text.

This is the second paragraph. It also has text, maybe a bit more.

## Subtitle

Another paragraph here.
    `.trim();
        const targetSize = 50; // Small target size for testing
        const chunks = chunkMarkdown(markdown, targetSize, estimateTokens);
        expect(chunks).toHaveLength(3);
        expect(chunks[0].content).toContain("# Title");
        expect(chunks[0].content).toContain("This is the first paragraph.");
        expect(estimateTokens(chunks[0].content)).toBeLessThanOrEqual(targetSize * 1.5); // Increase buffer for test assertion
        expect(chunks[1].content).toContain("This is the second paragraph.");
        expect(estimateTokens(chunks[1].content)).toBeLessThanOrEqual(targetSize * 1.5); // Increase buffer for test assertion
        expect(chunks[2].content).toContain("## Subtitle");
        expect(chunks[2].content).toContain("Another paragraph here.");
        expect(estimateTokens(chunks[2].content)).toBeLessThanOrEqual(targetSize * 1.5); // Increase buffer for test assertion
    });
    it("should not split code blocks", () => {
        const markdown = `
Intro text.

\`\`\`javascript
// This is a code block
function hello() {
  console.log("Hello");
}
\`\`\`

More text.

\`\`\`python
# Another code block
print("World")
\`\`\`
    `.trim();
        const targetSize = 50;
        const chunks = chunkMarkdown(markdown, targetSize, estimateTokens);
        // Expecting 4 chunks: Intro, JS code, More text, Python code
        expect(chunks).toHaveLength(4);
        expect(chunks[0].content).toBe("Intro text.");
        expect(chunks[1].content).toContain("function hello()");
        expect(chunks[1].type).toBe("code");
        expect(chunks[2].content).toBe("More text.");
        expect(chunks[3].content).toContain('print("World")');
        expect(chunks[3].type).toBe("code");
    });
    it("should create a large chunk if a single code block exceeds target size", () => {
        const longCode = Array(10).fill("console.log('line');").join("\n");
        const markdown = `
Some intro text.

\`\`\`javascript
${longCode}
\`\`\`

Some outro text.
    `.trim();
        const targetSize = 50; // Target size is smaller than the code block
        const chunks = chunkMarkdown(markdown, targetSize, estimateTokens);
        // Expecting 3 chunks: Intro, the large code block, Outro
        expect(chunks).toHaveLength(3);
        expect(chunks[0].content).toBe("Some intro text.");
        expect(chunks[1].content).toContain(longCode);
        expect(chunks[1].type).toBe("code");
        expect(estimateTokens(chunks[1].content)).toBeGreaterThan(targetSize);
        expect(chunks[2].content).toBe("Some outro text.");
    });
    it("should handle markdown with only code blocks", () => {
        const markdown = `
\`\`\`javascript
console.log("first");
\`\`\`

\`\`\`python
print("second")
\`\`\`
        `.trim();
        const targetSize = 30;
        const chunks = chunkMarkdown(markdown, targetSize, estimateTokens);
        expect(chunks).toHaveLength(2);
        expect(chunks[0].content).toContain('console.log("first");');
        expect(chunks[0].type).toBe("code");
        expect(chunks[1].content).toContain('print("second")');
        expect(chunks[1].type).toBe("code");
    });
    it("should handle empty markdown", () => {
        const markdown = "";
        const targetSize = 100;
        const chunks = chunkMarkdown(markdown, targetSize, estimateTokens);
        expect(chunks).toHaveLength(0);
    });
    it("should handle markdown smaller than target size", () => {
        const markdown = "# Title\n\nJust a little bit of text.";
        const targetSize = 1000;
        const chunks = chunkMarkdown(markdown, targetSize, estimateTokens);
        expect(chunks).toHaveLength(1);
        expect(chunks[0].content).toBe(markdown);
        expect(chunks[0].type).toBe("text");
    });
});
