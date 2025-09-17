//import puppeteer from "puppeteer";
import axios from 'axios'; 
import fs from 'fs'; 
import jsdom from 'jsdom'; 
const { JSDOM } = jsdom;
const url = "https://dnd5e.wikidot.com/"
const classes = ["artificer", "barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue","sorcerer","warlock","wizard"]
/*
classes.map((c) => {
    axios.get(`${url}/${c}`)
    .then(response => {
        fs.writeFile(`./test/scraper_log_${c}`, response.data, (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('File saved');
            }
        });
    })
    .catch(error => {
        console.error('Error fetching URL ' + error)
    });
    //console.log(response)

})
*/
async function fetchFeatData() {
    const response = await axios.get(`${url}/#toc70`)
    const dom = new JSDOM(response.data);
    const re = new RegExp(".*\/feat:.*")
    const anchorElements = dom.window.document.querySelectorAll('a');
    const featNames = Array.from(anchorElements)
    .map(anchor => anchor.href) 
    .filter(href => re.test(href)); 
    const featPromises = featNames.map(async(s, index) => {
        var feat = {}; 
        const res = await axios.get(`${url}${s}`)
        const dom = new JSDOM(res.data);
        const featName = dom.window.document.querySelector('.page-title.page-header').textContent;
        //const spellElements = dom.window.document.querySelector('.main-content-wrap.col-md-9').textContent; 
        const elements = dom.window.document.querySelectorAll('p, ul')
        const ma = Array.from(elements).map(s => s.textContent.trim())
        const startIndex = ma.findIndex((s) => s.indexOf("Source: ") !== -1); 
        console.log("START" + startIndex)
        const matchingElements = ma.slice(startIndex, ma.length)
        //const matchingElements = Array.from(spellElements)
        feat["Name"] = featName
        try {
            feat["Source"] = matchingElements.find((x) => x.indexOf("Source: ") !== -1).replace("Source: ", "")
        }
        catch {
            feat["Source"] = "N/A"
        }
        //feat["Name"] = matchingElementsSpliced.find((x) => x.indexOf("Source") != -1.replace())
        try {
        feat["Prereq"] = matchingElements.find((x) => x.indexOf("Prerequisite: ") !== -1).replace("Prerequisite: ", "")
        }
        catch {
            feat["Prereq"] = "N/A"
        }
        feat["Desc"] = "".concat(matchingElements.slice(2, matchingElements.length))
        console.log(`Feats Progress: ${index} / ${featNames.length}`)
        return feat;
    })
    const feats = await Promise.all(featPromises)
    return feats; 

}

async function fetchSpellData() {
    const response = await axios.get(`${url}/spells`)
    const dom = new JSDOM(response.data);
    const re = new RegExp(".*\/spell:.*")
    const anchorElements = dom.window.document.querySelectorAll('a');
    const spellNames = Array.from(anchorElements)
    .map(anchor => anchor.href) 
    .filter(href => re.test(href)); 
    const spellPromises = spellNames.map(async(s, index) => {
        const res = await axios.get(`${url}${s}`)
        const dom = new JSDOM(res.data);
        const spellName = dom.window.document.querySelector('.page-title.page-header').textContent;
        const spellElements = dom.window.document.querySelectorAll('p, ul');
        const matchingElements = Array.from(spellElements)
        .map(s => s.textContent.trim()) 
        //.filter(s => re.test(s)); 
        
        var spell = {}
        spell["Name"] = spellName
        spell["Source"] = matchingElements.find((x) => x.indexOf("Source: ") !== -1).replace("Source: ", "")

    // console.log(matchingElements)
        var level = matchingElements.find((x) => x.toLowerCase().indexOf("-level") !== -1 || x.indexOf(" cantrip") !== -1)
        spell["Level"] = level.indexOf("cantrip") !== -1 ? 0 : level[0]
    // var school = matchingElements[1]//.find((x) => x.indexOf("-level ") !== -1)//.split(" ")[1]
        spell["Ritual"] = level.indexOf('ritual') !== -1; 
        var school = level.indexOf("cantrip") !== -1 ? level.replace(" cantrip", "") : level.split(" ")[1]
        school = school.slice(0, 1).toUpperCase() + school.slice(1, school.length)
        spell["School"] = school
        var components = matchingElements.find((x) => x.indexOf("Casting Time: ") !== -1).split("\n")
        const parsedComponents = components.reduce((acc, line) => {
            line = line.split(": ")
            const key = line[0]
            const value = line[1]
            acc[key] = value;
            return acc;
        }, {}); 
        Object.assign(spell, parsedComponents)
        
        var start = matchingElements.findIndex((x) => x.indexOf("Casting Time: ") !== -1) + 1
        var end = matchingElements.findIndex((x) => x.indexOf("At Higher Levels. ") !== -1 
                                                || x.indexOf("Spell Lists.") !== -1) 
                                                - 1


        var desc = ""

        for(let i = start; i <= end; i++) {
            desc += matchingElements[i]
        }
        spell["Description"] = desc
        var upcast = matchingElements.find((x) => x.indexOf("At Higher Levels. ") !== -1)
        spell["Upcast"] = upcast ? upcast.replace("At Higher Levels.", "") : "N/A"
        try {
            spell["Spell Lists"] = matchingElements.find((x) => x.indexOf("Spell Lists. ") !== -1).replace("Spell Lists. ", "").replaceAll(" ", "").replace("(Optional)", "").split(",")

        }
        catch {
            spell["Spell Lists"] = "n/a"
        }
        console.log(`Spells Progress: ${index} / ${spellNames.length}`)
        return spell;


    });
    const spells = await Promise.all(spellPromises)
    return spells; 
}
/*
const data = await fetchSpellData(); 
const jsonData = JSON.stringify(data, null, 2);

fs.writeFile('./test/spells.json', jsonData, (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("JSON file has been saved successfully!");
  }
});*/

//const featData = await fetchFeatData(); 
//const jsonFeatData = JSON.stringify(featData, null, 2);
const spellData = await fetchSpellData(); 
const jsonSpellData = JSON.stringify(spellData, null, 2);

fs.writeFile('./test/spells.json', jsonSpellData, (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("Spell JSON file has been saved successfully!");
  }
});

/*
fs.writeFile('./test/feats.json', jsonFeatData, (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("Feat JSON file has been saved successfully!");
  }
});
*/
/*
const response =  axios.get(url)
    .then(response => {
        fs.writeFile('index.html', response.data, (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('File saved as index.html');
            }
        });
    })
    .catch(error => {
        console.error('Error fetching U')
    });*/