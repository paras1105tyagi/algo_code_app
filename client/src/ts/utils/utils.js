import MarkdownIt from "markdown-it";

export function convertMarkdownToHtml(markdownContent) {
    const md = new MarkdownIt();
    return md.render(markdownContent);
}

export function deleteTokenAndId(token, id) {
    if (!token || !id) return;
    localStorage.removeItem(token);
    localStorage.removeItem(id);
} 