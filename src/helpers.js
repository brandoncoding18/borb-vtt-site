import React from 'react'; 

export const formatter = (passage) => {
    const regex = /~.*?~#/g;
    const lines = passage.split('\n'); // Split the entire passage into lines first

    return (
        <React.Fragment>
            {lines.map((line, lineIndex) => {
                const parts = line.split(regex);
                const matches = line.match(regex);
                const result = [];

                parts.forEach((part, partIndex) => {
                    // Always render the plain text as a span
                    if (part) {
                        result.push(<span key={`text-${lineIndex}-${partIndex}`}>{part}</span>);
                    }

                    // Render the link if it exists for this part
                    if (matches && matches[partIndex]) {
                        const match = matches[partIndex];
                        const startIndex = match.indexOf('~');
                        const endIndex = match.indexOf('~#');
                        const queryParamName = match.substring(startIndex + 1, match.indexOf("^"));
                        const queryParam = match.substring(match.indexOf("^") + 1, endIndex);

                        result.push(
                            <a 
                                key={`link-${lineIndex}-${partIndex}`}
                                href={`./Redirect/?${queryParamName}=${queryParam.replaceAll(" ", "%20")}`} 
                                target="_blank"
                            >
                                {queryParam}
                            </a>
                        );
                    }
                });

                // Wrap each full line's content in a <div> to create the desired line break
                // You can also add conditional styling here for your list items
                const isListItem = line.startsWith('\t');
                const content = isListItem ? 
                    <li style={{ display: 'inline' }}>{result}</li> : 
                    <p style={{ display: 'inline' }}>{result}</p>;

                return <span key={`line-container-${lineIndex}`}>{content}</span>;
            })}
        </React.Fragment>
    );
};