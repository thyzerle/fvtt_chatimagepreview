/* 
 * Chat Image Preview
 */

import { processMessage } from './messages.js';

const MODULE_ID = 'chatimagepreview';

Hooks.once('init', () => {
    game.settings.register(MODULE_ID, 'enabled', {
        name: 'CHATIMAGEPREVIEW.Settings.Enabled.Name',
        hint: 'CHATIMAGEPREVIEW.Settings.Enabled.Hint',
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
    });

    game.settings.register(MODULE_ID, 'maxHeight', {
        name: 'CHATIMAGEPREVIEW.Settings.MaxHeight.Name',
        hint: 'CHATIMAGEPREVIEW.Settings.MaxHeight.Hint',
        scope: 'client',
        config: true,
        type: new foundry.data.fields.NumberField({
            required: true, nullable: false, integer: true, min: 80, max: 1200, step: 20, initial: 400,
        }),
        default: 400,
    });

    game.settings.register(MODULE_ID, 'showLink', {
        name: 'CHATIMAGEPREVIEW.Settings.ShowLink.Name',
        hint: 'CHATIMAGEPREVIEW.Settings.ShowLink.Hint',
        scope: 'client',
        config: true,
        type: Boolean,
        default: true,
    });

    Hooks.on('renderChatMessageHTML', (_message, html) => {
        if (!game.settings.get(MODULE_ID, 'enabled')) return;

        processMessage(html, {
            maxHeight: game.settings.get(MODULE_ID, 'maxHeight'),
            showLink: game.settings.get(MODULE_ID, 'showLink'),
        });
    });
});
