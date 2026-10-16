const IMAGE_EXTENSIONS = new Set([
    'png', 'jpg', 'jpeg', 'jfif', 'gif', 'webp', 'avif', 'apng', 'bmp', 'svg',
]);

const TRAILING_PUNCTUATION = /[.,;:!?'"*_~\]\)}]+$/;

/** Parse a string into a http(s) URL, or null. */
export function parseHttpUrl(str) {
    try {
        const url = new URL(str);
        return (url.protocol === 'http:' || url.protocol === 'https:') ? url : null;
    } catch {
        return null;
    }
}

export function trimUrl(url) {
    return url.replace(TRAILING_PUNCTUATION, '');
}

/** Decide whether a URL points to an image we should embed. */
export function isImageUrl(url) {
    const lastSegment = decodeURIComponent(url.pathname.split('/').pop() ?? '');
    const dot = lastSegment.lastIndexOf('.');

    if (dot === -1) return false;

    const urlExtension = lastSegment.slice(dot + 1).toLowerCase();
    return IMAGE_EXTENSIONS.has(urlExtension);
}
