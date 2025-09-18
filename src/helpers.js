export const formatter = (passage) => {
        const regex = /~.*?~#/g;
        const matches = passage.match(regex);


        return <span>{ passage.split("\n").map((line) => {
           var fullHtmlString = []; 
    line =  line.startsWith('\t')
                            ? `<li>${line.replace(/^\t+/, (tabs) => '\u00A0\u00A0\u00A0\u00A0'.repeat(tabs.length))}</li>`
                            : `<p>${line}</p>`
          // return <div>{l.indexOf('~#')}</div>
          console.log("Original Line: " + line)
          matches?.map((x) => {
            const startIndex = x.indexOf('~')
            const endIndex = x.indexOf('~#')
            const queryParamName = x.substring(startIndex + 1,x.indexOf("^"))
            const queryParam = x.substring(x.indexOf("^") + 1, endIndex)
            line = line.replace(x, `<span><a href=./Redirect/?${queryParamName}=${queryParam.replaceAll(" ", "%20")} target="_blank">${queryParam}</a></span>`)
            }
            )
           /*while(line.indexOf('~#') != -1) {
                const startIndex = line.indexOf('~')
                const endIndex = line.indexOf('~#')
                const param = line.substring(startIndex, endIndex + 2)
                console.log("Entire Param: " + param); 
                const queryParamName = line.substring(startIndex + 1,line.indexOf("^"))
                console.log("Query Param: " + queryParamName); 
                const queryParam = line.substring(line.indexOf("^") + 1, endIndex)
                
                line = line.replace(param, `<span><a href=./Redirect/?${queryParamName}=${queryParam.replaceAll(" ", "%20")} target="_blank">${queryParam}</a></span>`)
                
           }*/
            fullHtmlString += line;

            return <div
                dangerouslySetInnerHTML={{ __html: fullHtmlString }}
                />
        })
        }
        </span>
    }