# Example: sway_sources/sway/docs/reference/src/code/language/style-guide/annotation_style/src/lib.sw

```sway
library;

// ANCHOR: type_annotation
fn execute() {
    // Avoid unless it's more helpful to annotate
    let executed: bool = false;

    // Generally encouraged
    let executed = false;
}
// ANCHOR_END: type_annotation

```
