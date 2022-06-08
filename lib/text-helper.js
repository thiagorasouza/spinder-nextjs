export default class TextHelper {
  constructor(text) {
    this._text = text;
  }

  extractSummary({ maxChars, maxSentences }) {
    this.stripAfterDelimiter();
    this.sliceBefore(maxChars);
    this.extractNSentences(maxSentences);
    // console.log(this._text);
    return this._text;
  }

  stripAfterDelimiter(delimiter) {
    const delimiterIndex = this._text.search(/<|==/);
    if (delimiterIndex !== -1) {
      this._text = this.sliceBefore(delimiterIndex).trim();
    }
    return this._text;
  }

  sliceBefore(n) {
    this._text = this._text.slice(0, n);
    return this._text;
  }

  extractNSentences(n) {
    const sentences = this._text
      .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
      .split("|");
    const lastSentence = sentences[sentences.length - 1];
    const lastChar = lastSentence[lastSentence.length - 1];
    // console.log("Sentences", sentences);

    if (sentences.length > n) {
      this._text = sentences.slice(0, n).join(" ");
    } else if (sentences.length === 1) {
      this._text = sentences[0];
    } else if (lastChar === ".") {
      this._text = sentences.join(" ");
    } else {
      this._text = sentences.slice(0, sentences.length - 1).join(" ");
    }

    return this._text;
  }
}
