import { ContainerModule } from "inversify";
import { CommandContribution, MenuContribution } from "@theia/core/lib/common";
import { JsonschemaFormCommandContribution, JsonschemaFormMenuContribution } from "./jsonforms-contribution";

export default new ContainerModule(bind => {
    // add your contribution bindings here

    bind(CommandContribution).to(JsonschemaFormCommandContribution).inSingletonScope();
    bind(MenuContribution).to(JsonschemaFormMenuContribution).inSingletonScope();
});