import { WidgetOpenHandler } from "@theia/core/lib/browser";
import URI from "@theia/core/lib/common/uri";
import { injectable, inject } from "inversify";
import { EditorManager } from "@theia/editor/lib/browser";
import { JsonFormsWidget, JsonschemaFormWidgetOptions } from "./jsonforms-widget";

/**
 * To obtain the action in the contextual menu.
 */
@injectable()
export class JsonFormsOpenHandler extends WidgetOpenHandler<JsonFormsWidget> {
    
    readonly id = JsonFormsWidget.id;
    readonly label = "JsonForms widget";

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

    protected createWidgetOptions(uri: URI): JsonschemaFormWidgetOptions {
        return { uri: uri.withoutFragment().toString() };
    }
    
}