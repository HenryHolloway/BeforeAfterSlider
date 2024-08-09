const { registerBlockType } = wp.blocks;
const { MediaUpload, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, PanelRow, Placeholder } = wp.components;

console.log("Registering Before/After Image Slider block");

registerBlockType('ba/slider', {
    title: 'Before/After Image Slider',
    icon: 'images-alt2',
    category: 'common',
    attributes: {
        beforeImage: {
            type: 'string',
            default: ''
        },
        afterImage: {
            type: 'string',
            default: ''
        }
    },
    edit: function(props) {
        console.log("Editing Before/After Image Slider block");
        var attributes = props.attributes;
        var setAttributes = props.setAttributes;
        var beforeImage = attributes.beforeImage;
        var afterImage = attributes.afterImage;

        function onSelectBeforeImage(media) {
            setAttributes({ beforeImage: media.url });
        }

        function onSelectAfterImage(media) {
            setAttributes({ afterImage: media.url });
        }

        return wp.element.createElement(
            wp.element.Fragment,
            null,
            wp.element.createElement(
                InspectorControls,
                null,
                wp.element.createElement(
                    PanelBody,
                    { title: "Before Image" },
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(MediaUpload, {
                            onSelect: onSelectBeforeImage,
                            allowedTypes: ['image'],
                            value: beforeImage,
                            render: function(obj) {
                                return wp.element.createElement(
                                    Button,
                                    { onClick: obj.open, isDefault: true, isLarge: true },
                                    !beforeImage ? 'Select Before Image' : 'Replace Before Image'
                                );
                            }
                        })
                    ),
                    beforeImage && wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(
                            Button,
                            { onClick: function() { setAttributes({ beforeImage: '' }); }, isLink: true, isDestructive: true },
                            "Remove Before Image"
                        )
                    )
                ),
                wp.element.createElement(
                    PanelBody,
                    { title: "After Image" },
                    wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(MediaUpload, {
                            onSelect: onSelectAfterImage,
                            allowedTypes: ['image'],
                            value: afterImage,
                            render: function(obj) {
                                return wp.element.createElement(
                                    Button,
                                    { onClick: obj.open, isDefault: true, isLarge: true },
                                    !afterImage ? 'Select After Image' : 'Replace After Image'
                                );
                            }
                        })
                    ),
                    afterImage && wp.element.createElement(
                        PanelRow,
                        null,
                        wp.element.createElement(
                            Button,
                            { onClick: function() { setAttributes({ afterImage: '' }); }, isLink: true, isDestructive: true },
                            "Remove After Image"
                        )
                    )
                )
            ),
            wp.element.createElement(
                "div",
                { className: "editor-slider-container" },
                beforeImage ? wp.element.createElement("img", { src: beforeImage, alt: "Before", style: { width: '48%' } }) : wp.element.createElement(
                    Placeholder,
                    { label: "Before Image" },
                    wp.element.createElement(MediaUpload, {
                        onSelect: onSelectBeforeImage,
                        allowedTypes: ['image'],
                        render: function(obj) {
                            return wp.element.createElement(
                                Button,
                                { onClick: obj.open, isDefault: true, isLarge: true },
                                'Select or Upload Before Image'
                            );
                        }
                    })
                ),
                afterImage ? wp.element.createElement("img", { src: afterImage, alt: "After", style: { width: '48%' } }) : wp.element.createElement(
                    Placeholder,
                    { label: "After Image" },
                    wp.element.createElement(MediaUpload, {
                        onSelect: onSelectAfterImage,
                        allowedTypes: ['image'],
                        render: function(obj) {
                            return wp.element.createElement(
                                Button,
                                { onClick: obj.open, isDefault: true, isLarge: true },
                                'Select or Upload After Image'
                            );
                        }
                    })
                )
            )
        );
    },
    save: function() {
        return null; // Let PHP handle the rendering.
    },
});
