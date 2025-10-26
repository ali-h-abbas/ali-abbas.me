import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface NavigationOptions {
  links: {
    text: string
    link: string
  }[]
}

const defaultOptions: NavigationOptions = {
  links: [
    { text: "Home", link: "/" },
    { text: "Writing", link: "/tags/writing" },
    { text: "Speaking", link: "/tags/speaking" },
    { text: "Contact", link: "/contact" },
  ],
}

export default ((userOpts?: Partial<NavigationOptions>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const Navigation: QuartzComponent = ({ displayClass, fileData }: QuartzComponentProps) => {
    const currentSlug = fileData.slug || ""
    
    return (
      <nav class={classNames(displayClass, "navigation")}>
        <ul>
          {opts.links.map((item) => {
            const isActive = 
              (item.link === "/" && currentSlug === "index") ||
              (item.link !== "/" && currentSlug?.startsWith(item.link.substring(1)))
            
            return (
              <li key={item.link}>
                <a 
                  href={item.link} 
                  class={isActive ? "active" : ""}
                >
                  {item.text}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  Navigation.css = `
  .navigation {
    margin: 0;
  }

  .navigation ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;
  }

  .navigation li {
    margin: 0;
    padding: 0;
  }

  .navigation a {
    text-decoration: none;
    padding: 0.5rem 0.75rem;
    border-radius: 5px;
    transition: background-color 0.2s ease, color 0.2s ease;
    display: block;
    color: var(--gray);
  }

  .navigation a:hover {
    background-color: var(--lightgray);
    color: var(--dark);
  }

  .navigation a.active {
    background-color: var(--secondary);
    color: var(--light);
    font-weight: 600;
  }

  @media (max-width: 600px) {
    .navigation ul {
      gap: 0.5rem;
    }
    
    .navigation a {
      padding: 0.4rem 0.6rem;
      font-size: 0.9rem;
    }
  }
  `

  return Navigation
}) satisfies QuartzComponentConstructor<NavigationOptions>
