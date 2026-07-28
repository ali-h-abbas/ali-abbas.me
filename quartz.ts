import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components/registry"
import { registerCondition } from "./quartz/plugins/loader/conditions"
import Navigation from "./quartz/components/Navigation"

// RecentNotes should only render on the homepage — no built-in YAML condition
// preset covers "is index", so register one for use via `condition: is-index`.
registerCondition("is-index", (props) => props.fileData.slug === "index")

// Explorer's filterFn is a callback and can't be expressed in YAML.
componentRegistry.setOptionOverrides("@quartz-community/explorer", {
  filterFn: (node: { slugSegment?: string }) => {
    return (
      node.slugSegment !== "tags" && node.slugSegment !== "about" && node.slugSegment !== "contact"
    )
  },
})

// Register the custom Navigation component so the "./plugins/navigation"
// entry in quartz.config.yaml (position: header) can resolve it.
componentRegistry.register("navigation", Navigation, "local-plugin")

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
