import { ContainerModule } from "inversify";
import { CommandContribution, MenuContribution } from "@theia/core/lib/common";
import { JsonschemaFormCommandContribution, JsonschemaFormMenuContribution } from "./jsonforms-contribution";
import { OpenHandler, WidgetFactory } from "@theia/core/lib/browser";
import { JsonFormsOpenHandler } from "./jsonforms-open-handler";
import { JsonschemaFormWidgetOptions, JsonFormsWidget } from "./jsonforms-widget";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(JsonschemaFormCommandContribution).inSingletonScope();
    bind(MenuContribution).to(JsonschemaFormMenuContribution).inSingletonScope();

    bind(OpenHandler).to(JsonFormsOpenHandler).inSingletonScope();

    bind(WidgetFactory).toDynamicValue(({ container }) => ({
        id: JsonFormsWidget.id,
        createWidget: (options: JsonschemaFormWidgetOptions) => {
            const child = container.createChild();
            child.bind(JsonschemaFormWidgetOptions).toConstantValue(options);
            child.bind(JsonFormsWidget).toSelf();
            return child.get(JsonFormsWidget);
        }
    }));

    // *************************
    //  To test react component
    // *************************
    // bind(WidgetFactory).toDynamicValue(({ container }) => ({
    //     id: JsonFormsWidget.id,
    //     createWidget: (options: JsonschemaFormWidgetOptions) => {
    //         const child = container.createChild();
    //         child.bind(JsonschemaFormWidgetOptions).toConstantValue(options);
    //         child.bind(JsonFormsWidget).toSelf();
    //         return child.get(JsonFormsWidget);
    //     }
    // }));
});