import React from 'react'; 
import './styles.css'
export const formatter = (passage) => {
    const regex = /~.*?~#/g;
    const lines = (`${passage}`).split('\n') || passage; // Split the entire passage into lines first

    return (
        <React.Fragment>
            {lines.map((line, lineIndex) => {
                console.log(line.length)
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
                
                const isListItem = line.indexOf('\t') > -1;
                const content = isListItem ? 
                    <li class="bullet-item">{result}</li> : 
                    <a>{result} {line.length < 1 ? <br/> : <></>} </a>;

                return <div key={`line-container-${lineIndex}`}>{content}</div>;
            })}
        </React.Fragment>
    );
};

 export const GiantLine = () => {
  return (
    <div
      style={{
        height: "10px", // Thickness of the line
        backgroundColor: "#000", // Line color
        width: "100vw", // Full width
        margin: "20px 0", // Spacing around the line
      }}
    ></div>
  );
};

export const formatForGUI = (text) => {
    
    return (text || "").replaceAll("\n", "\\n").replaceAll("\t", "\\t")
    
}