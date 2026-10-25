import { Component, mount } from "svelte";
import NumberEditorDialog from "@/ui/components/Actor/Hero/dialogs/NumberEditorDialog.svelte";

export interface SystemDialogOptions<
    Props extends Record<string, any>,
    ReturnData = Record<string, any>
> {
    App: Component<Props>
    title: string
    props: Props,
    buttons: foundry.applications.api.DialogV2.Button<foundry.applications.api.DialogV2.Any>[],
}

export const renderDialog = <
    Props extends Record<string, any>,
>(options: SystemDialogOptions<Props>) => {

    const { App, title, props, buttons } = options;

    const root = document.createElement("div");

    mount(App, {
        target: root,
        props: props
    })

    new foundry.applications.api.DialogV2({
        window: {
            title: title,

        },
        content: root,
        buttons: buttons
    }).render({ force: true })
}

export const renderNumberEditor = (options: { name: string, value: number, onSubmit: (data: number) => Promise<void> }) => {
    renderDialog({
        App: NumberEditorDialog,
        title: `Edit ${options.name}`,
        props: { name: options.name, value: options.value },
        buttons: [{
            label: "Submit",
            action: options.name,
            callback: async (event, button, dialog) => {
                const form = button.form

                if (!form) {
                    console.error("Form not found in dialog button.");
                    return;
                }
                const formData = new FormData(form)
                const data = Object.fromEntries(formData.entries()) as Record<string, any>

                const value = Number((data as Record<string, unknown>)[options.name]);
                if (!Number.isFinite(value)) {
                    ui.notifications?.warn(`Invalid ${options.name} value.`);
                    return;
                }
                await options.onSubmit(value)
            }
        }]
    })
}