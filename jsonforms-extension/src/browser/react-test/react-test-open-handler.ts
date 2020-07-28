import { WidgetOpenHandler } from "@theia/core/lib/browser";
import URI from "@theia/core/lib/common/uri";
import { injectable, inject } from "inversify";
import { EditorManager } from "@theia/editor/lib/browser";
import { ReactTestWidget, ReactWidgetOptions } from "./react-test-widget";

/**
 * To obtain the action in the contextual menu.
 */
@injectable()
export class ReactTestOpenHandler extends WidgetOpenHandler<ReactTestWidget> {
    
    readonly id = ReactTestWidget.id;
    readonly label = "react component";

    @inject(EditorManager)
    protected readonly editorManager: EditorManager;

    canHandle(uri: URI): number {
        if (uri.path.ext !== '.json') {
            return 0;
        }
        if (uri.path.name.endsWith('-data')) {
            return this.editorManager.canHandle(uri) * 2;    
        }
        return this.editorManager.canHandle(uri) / 2;
    }

    protected createWidgetOptions(uri: URI): ReactWidgetOptions {
        return { uri: uri.withoutFragment().toString() };
    }
    
}