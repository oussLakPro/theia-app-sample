import * as React from "react";
import * as ReactDOM from "react-dom";
import { injectable, inject, postConstruct } from "inversify";
import { BaseWidget } from "@theia/core/lib/browser";
import URI from "@theia/core/lib/common/uri";
import { Disposable } from "@theia/core";
import { JsonFormsView } from "./jsonforms-view";

export const JsonschemaFormWidgetOptions = Symbol('JsonschemaFormWidgetOptions');
export interface JsonschemaFormWidgetOptions {
    uri: string
}

@injectable()
export class JsonFormsWidget extends BaseWidget {

    static id = 'jsonforms-widget';

    @inject(JsonschemaFormWidgetOptions)
    protected readonly options: JsonschemaFormWidgetOptions;

    @postConstruct()
    protected async init(): Promise<void> {
        const { uri } = this.options;
        this.id = JsonFormsWidget.id + ':' + uri
        this.title.label = 'JSONForm ' + new URI(uri).displayName;
        this.title.closable = true;

        this.node.style.padding = '0px 15px';
        this.node.style.color = 'var(--theia-ui-font-color1)';
        this.toDispose.push(Disposable.create(() => ReactDOM.unmountComponentAtNode(this.node)));
        ReactDOM.render(<JsonFormsView />, this.node);
    }

}