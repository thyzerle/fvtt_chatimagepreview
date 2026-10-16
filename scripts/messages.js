import { parseHttpUrl, trimUrl, isImageUrl } from './detection.js';
import { buildEmbed } from './embed.js';

export function processMessage(html, options) {
    const root = html.querySelector('.message-content');
    if (!root || root.dataset.cipProcessed) return;
    root.dataset.cipProcessed = 'true';

    for (const anchor of root.querySelectorAll('a[href]')) {
        if (anchor.closest('.cip-embed') || anchor.querySelector('img')) continue;

        const parsed = parseHttpUrl(trimUrl(anchor.href));

        if (!parsed || !isImageUrl(parsed)) continue;

        const embed = buildEmbed(parsed, options);

        const label = anchor.textContent.trim();
        const labelIsUrl = label === anchor.getAttribute('href') || parseHttpUrl(label)?.href === parsed.href;

        if (labelIsUrl) anchor.replaceWith(embed);
        else anchor.after(embed);
    }
}
