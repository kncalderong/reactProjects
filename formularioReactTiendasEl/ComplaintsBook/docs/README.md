# Custom Components

## To use this custom form, please follow the instructions bellow:

1. Add the custom component as a submodule, and change the vendor name

2. Remember to create an schema in your masterdata as the example included in this folder ./docs

3. Declare the custom component in the manifest of your store. Remember to change the vendor:

```json
"blacksipqa.complaintsbook": "0.x"
```

4. include the block into a block of your theme:

```json
"store.home": {
    "blocks": ["rich-text", "complaints-book"]
  },
```
