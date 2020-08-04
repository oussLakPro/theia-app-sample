/**
 * Generated using theia-extension-generator
 */
import { DiscoMenusExtensionCommandContribution, DiscoMenusExtensionMenuContribution } from './disco-menus-extension-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";
import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(DiscoMenusExtensionCommandContribution);
    bind(MenuContribution).to(DiscoMenusExtensionMenuContribution);
});
