import React, { useEffect } from 'react';
import { toHtml } from 'hast-util-to-html';
import { styled } from "@galacean/editor-ui";

const StyledToc = styled("div", {
  position: "fixed",
  top: "$16",
  right: 0,
  zIndex: 1,
  padding: "$4",
  margin: "$2 $4 $2 $2",
  fontSize: "$1",
  color: "$slate11",
  maxWidth: "200px",
  "& ol": {
    "& > li": {
      listStyle: "none",
      marginLeft: "$3",
      "& p": {
        padding: "$0_5 0"
      }
    }
  },
  '@media (max-width: 768px)': {
    display: "none"
  }
});

const DocToc: React.FC = (props: any) => {

  useEffect(() => {
    const navItems = document.querySelectorAll('#markdown-nav-container p');

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetContent = item.textContent;
        const headings = document.querySelectorAll('#markdown-container h1, #markdown-container h2, #markdown-container h3, #markdown-container h4, #markdown-container h5');

        for (const heading of headings) {
          if (heading.textContent === targetContent) {
            const headingTop = heading.getBoundingClientRect().top + window.pageYOffset;
            const offset = 60;
            const scrollToPosition = headingTop - offset;
            window.scrollTo({
              top: scrollToPosition,
              behavior: 'smooth'
            });
            break;
          }
        }
      });
    });
  }, [props.node]);

  return (
    <div id="markdown-nav-container">
      <StyledToc dangerouslySetInnerHTML={{
        __html: toHtml(props.node),
      }}>
      </StyledToc>
    </div>
  );
};
export default DocToc;
