function openPreview(url, newTab) {
    if (newTab) {
        window.open(url, '_blank');
        return;
    }

    const popout = new foundry.applications.apps.ImagePopout({
        src: url,
        window: { title: game.i18n.localize('CHATIMAGEPREVIEW.ImageTitle') },
    });

    popout.render({ force: true });
}

function createImage(url) {
    const img = document.createElement('img');
    img.className = 'cip-image';
    img.addEventListener('click', event => {
        event.preventDefault();
        openPreview(url, event.ctrlKey || event.metaKey || event.shiftKey);
    });

    img.src = url;
    return img;
}

function showFailure(figure, url) {
    figure.replaceWith(`${game.i18n.localize('CHATIMAGEPREVIEW.Failed')}: ${url}`);
}

export function buildEmbed(parsedUrl, { maxHeight, showLink }) {
    if (window.location.protocol === 'https:' && parsedUrl.protocol === 'http:') {
        parsedUrl = new URL(parsedUrl.href.replace(/^http:/i, 'https:'));
    }
    const url = parsedUrl.href;

    const figure = document.createElement('figure');
    figure.className = 'cip-embed';
    figure.style.setProperty('--cip-max-height', `${maxHeight}px`);

    const img = createImage(url);
    img.addEventListener('error', () => showFailure(figure, url), { once: true });
    figure.prepend(img);

    if (showLink) {
        const caption = document.createElement('figcaption');
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.textContent = parsedUrl.hostname;
        caption.append(link);
        figure.append(caption);
    }
    return figure;
}
