// Fallback text splitter if LangChain's splitter isn't working

/**
 * Simple text splitter that splits text into chunks of approximately the specified size,
 * trying to maintain sentence and paragraph boundaries when possible.
 */
export class SimpleSplitter {
    private chunkSize: number;
    private chunkOverlap: number;
  
    constructor(options: { chunkSize?: number; chunkOverlap?: number } = {}) {
      this.chunkSize = options.chunkSize || 1000;
      this.chunkOverlap = options.chunkOverlap || 200;
    }
  
    /**
     * Split text into chunks, trying to respect sentence boundaries.
     */
    async splitText(text: string): Promise<string[]> {
      console.log(`Splitting text of length ${text.length} into chunks...`);
      
      // Clean up text - normalize line breaks and whitespace
      const cleanedText = text
        .replace(/\r\n/g, '\n')
        .replace(/\s+/g, ' ')
        .trim();
        
      // First, split by paragraphs
      const paragraphs = cleanedText.split(/\n\s*\n/);
      
      // Then, process each paragraph
      const chunks: string[] = [];
      let currentChunk = '';
      
      for (const paragraph of paragraphs) {
        // If paragraph is already longer than chunk size, split it by sentences
        if (paragraph.length > this.chunkSize) {
          const sentences = this.splitIntoSentences(paragraph);
          
          for (const sentence of sentences) {
            // If a single sentence is too long, split it by words
            if (sentence.length > this.chunkSize) {
              const sentenceChunks = this.splitLongSentence(sentence);
              for (const sentenceChunk of sentenceChunks) {
                if (currentChunk.length + sentenceChunk.length > this.chunkSize) {
                  chunks.push(currentChunk.trim());
                  currentChunk = sentenceChunk + ' ';
                } else {
                  currentChunk += sentenceChunk + ' ';
                }
              }
            }
            // Otherwise, add sentence to current chunk if it fits
            else if (currentChunk.length + sentence.length <= this.chunkSize) {
              currentChunk += sentence + ' ';
            } 
            // If it doesn't fit, start a new chunk
            else {
              chunks.push(currentChunk.trim());
              currentChunk = sentence + ' ';
            }
          }
        }
        // If paragraph fits in a chunk, add it
        else if (currentChunk.length + paragraph.length <= this.chunkSize) {
          currentChunk += paragraph + '\n\n';
        }
        // If paragraph doesn't fit, start a new chunk
        else {
          chunks.push(currentChunk.trim());
          currentChunk = paragraph + '\n\n';
        }
      }
      
      // Add the last chunk if not empty
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }
      
      // Apply overlap if needed
      if (this.chunkOverlap > 0 && chunks.length > 1) {
        return this.applyOverlap(chunks);
      }
      
      console.log(`Split into ${chunks.length} chunks`);
      return chunks;
    }
    
    /**
     * Split text into sentences, handling various punctuation patterns.
     */
    private splitIntoSentences(text: string): string[] {
      // This regex splits on sentence-ending punctuation followed by a space or line break
      return text
        .split(/(?<=[.!?])\s+/)
        .filter(s => s.trim().length > 0)
        .map(s => s.trim());
    }
    
    /**
     * Split very long sentences by words to fit chunk size.
     */
    private splitLongSentence(sentence: string): string[] {
      const words = sentence.split(/\s+/);
      const chunks: string[] = [];
      let currentChunk = '';
      
      for (const word of words) {
        if (currentChunk.length + word.length + 1 <= this.chunkSize) {
          currentChunk += (currentChunk ? ' ' : '') + word;
        } else {
          chunks.push(currentChunk);
          currentChunk = word;
        }
      }
      
      if (currentChunk) {
        chunks.push(currentChunk);
      }
      
      return chunks;
    }
    
    /**
     * Apply overlap between consecutive chunks.
     */
    private applyOverlap(chunks: string[]): string[] {
      if (chunks.length <= 1) return chunks;
      
      const result: string[] = [];
      
      for (let i = 0; i < chunks.length; i++) {
        if (i === 0) {
          // First chunk doesn't need prefix overlap
          result.push(chunks[i]);
        } else {
          // Get overlap from previous chunk
          const prevChunk = chunks[i-1];
          const overlap = prevChunk.length > this.chunkOverlap 
            ? prevChunk.substring(prevChunk.length - this.chunkOverlap) 
            : prevChunk;
            
          // Only add overlap if current chunk doesn't already start with it
          if (!chunks[i].startsWith(overlap)) {
            result.push(overlap + ' ' + chunks[i]);
          } else {
            result.push(chunks[i]);
          }
        }
      }
      
      return result;
    }
  }
  
  /**
   * Alternative implementation compatible with LangChain's RecursiveCharacterTextSplitter interface
   */
  export class RecursiveCharacterTextSplitter {
    private splitter: SimpleSplitter;
  
    constructor(options: { chunkSize?: number; chunkOverlap?: number } = {}) {
      this.splitter = new SimpleSplitter(options);
    }
  
    async splitText(text: string): Promise<string[]> {
      return this.splitter.splitText(text);
    }
  }