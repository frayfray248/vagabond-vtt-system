import { Component, flushSync, mount, unmount } from "svelte";

type RenderOptions = foundry.applications.api.ApplicationV2.RenderOptions;
type RenderContext = foundry.applications.api.ApplicationV2.RenderContext;
type ApplicationConstructor = new (...args: any[]) => foundry.applications.api.ApplicationV2.Any;

const SvelteApplicationMixin = <AppData, TBase extends ApplicationConstructor = ApplicationConstructor>(BaseApplication: TBase) => {
    class SvelteApplication extends BaseApplication {

        // Subclasses narrow the props type; class type parameters can't be used in an extends clause
        svelteApp: Component<any> | null = null;
        #mounted: Record<string, any> | null = null;

        async _renderHTML(context: RenderContext & { sheetData: AppData }, options: RenderOptions) {
            return context
        }

        async _replaceHTML(result: RenderContext & { sheetData: AppData }, content: HTMLElement, options: RenderOptions) {

            if (!this.svelteApp) return;

            // Tear down the previous instance so re-renders don't stack components
            this.#unmountComponent();
            content.replaceChildren();

            content.style.padding = "0";
            content.style.background = "#000000";

            this.#mounted = mount(this.svelteApp, {
                target: content,
                props: {
                    sheetData: result.sheetData
                }
            })
            flushSync();
        }

        _onClose(options: any) {
            this.#unmountComponent();
            super._onClose(options);
        }

        #unmountComponent() {
            if (!this.#mounted) return;
            void unmount(this.#mounted);
            this.#mounted = null;
        }
    }
    return SvelteApplication
}

export default SvelteApplicationMixin;