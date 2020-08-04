import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";

export const ImportFileCommand = {
    id: 'importFile.command',
    label: "Import model"
};

@injectable()
export class DiscoMenusExtensionCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(ImportFileCommand, {
            execute: () => this.messageService.info('Import File Command !!')
        });
    }
}

@injectable()
export class DiscoMenusExtensionMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.FILE, {
            commandId: ImportFileCommand.id,
            label: ImportFileCommand.label,
            order: '5'
        });
    }
}

// @injectable()
// export class DiscoMenusContribution implements FrontendApplicationContribution {

//     /**
//      * Called after the application shell has been attached in case there is no previous workbench layout state.
//      * Should return a promise if it runs asynchronously.
//      */
//     onDidInitializeLayout(app: FrontendApplication): MaybePromise<void> {
//         console.log("onDidInitializeLayout");
//         // Remove unused widgets
//         app.shell.widgets.forEach((widget: Widget) => {
//             if (['search-in-workspace', 'explorer-view-container', 'scm-view-container', 'scm-view'].includes(widget.id) || widget.id.startsWith('debug')) {
//                 // widget.dispose();
//                 console.log(widget);
//             }
//         });
//     }

//     onStart(app: FrontendApplication): void {
//         console.log("start");
//         console.log("registered");
//     }
// }