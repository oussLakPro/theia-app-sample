import { ContainerModule } from "inversify";
import { CommandContribution, MenuContribution } from "@theia/core/lib/common";
import { JsonschemaFormCommandContribution, JsonschemaFormMenuContribution } from "./jsonforms-contribution";
import { OpenHandler, WidgetFactory } from "@theia/core/lib/browser";
import { JsonFormsOpenHandler } from "./jsonforms-open-handler";
import { ReactTestWidget, ReactWidgetOptions } from "./react-test/react-test-widget";
import { JsonFormsWidget, JsonschemaFormWidgetOptions } from "./jsonforms-widget";
import { ReactTestOpenHandler } from "./react-test/react-test-open-handler";
import { ThemeService } from "@theia/core/lib/browser/theming";

const bootstrapLink = document.createElement("link");
bootstrapLink.rel = 'stylesheet';
document.head.appendChild(bootstrapLink);

function updateTheme(newTheme: string): void {
    const theme = bootstrapLink.getAttribute('theme');
    if (theme === newTheme) {
        return;
    }
    bootstrapLink.setAttribute('theme', newTheme);
    bootstrapLink.href = newTheme === 'dark' ?
        '//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/darkly/bootstrap.min.css' :
        '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css';
}
updateTheme(ThemeService.get().getCurrentTheme().id);
ThemeService.get().onThemeChange(({newTheme}) => updateTheme(newTheme.id));

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(JsonschemaFormCommandContribution).inSingletonScope();
    bind(MenuContribution).to(JsonschemaFormMenuContribution).inSingletonScope();
    
    // *****************************
    //  To test jsonforms component
    // *****************************
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
    bind(OpenHandler).to(ReactTestOpenHandler).inSingletonScope();
    bind(WidgetFactory).toDynamicValue(({ container }) => ({
        id: ReactTestWidget.id,
        createWidget: (options: ReactWidgetOptions) => {
            const child = container.createChild();
            child.bind(ReactWidgetOptions).toConstantValue(options);
            child.bind(ReactTestWidget).toSelf();
            return child.get(ReactTestWidget);
        }
    }));
});